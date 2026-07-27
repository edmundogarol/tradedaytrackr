import logging

from django.contrib.auth import get_user_model, login
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.serializers import UserSerializer
from backend.djangoapi.serializers.user import RegisterSerializer, UpdateUserSerializer
from backend.djangoapi.services.trades.timezone_recompute import recompute_user_timezone

logger = logging.getLogger(__name__)

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]

        if self.action == "list":
            return [IsAdminUser()]

        return [IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"detail": "Forbidden"}, status=403)

        search = request.GET.get("search", None)

        if search:
            logger.info(
                "Filtering users by search term.",
                extra={"search": search},
            )

        queryset = User.objects.all().order_by("-id")

        if search:
            queryset = queryset.filter(email__icontains=search)

        page = self.paginate_queryset(queryset)
        serializer = UserSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data, context={"request": request})

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            logger.error(
                "User registration validation failed.",
                exc_info=True,
                extra={"email": request.data.get("email")},
            )
            raise

        user = serializer.save()

        login(request, user)
        return Response(
            {
                "user": UserSerializer(user).data,
                "logged_in": True,
            },
            status=status.HTTP_201_CREATED,
        )

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)

        if request.user != user and not request.user.is_staff:
            logger.warning(
                "Unauthorized attempt to access user details.",
                extra={
                    "requesting_user_id": request.user.id,
                    "target_user_id": user.id,
                },
            )
            return Response({"detail": "Forbidden"}, status=403)

        serializer = UserSerializer(user)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()

        serializer = UpdateUserSerializer(
            user,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            logger.error(
                "User update validation failed.",
                exc_info=True,
                extra={"user_id": request.user.id},
            )
            raise

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["patch"], url_path="update_me")
    def update_me(self, request):
        if not request.user.is_authenticated:
            logger.warning("Unauthenticated user attempted update_me")
            return Response({"detail": "Not authenticated"}, status=401)

        user = request.user
        data = request.data.copy()

        if "timezone" in data and len(data.keys()) == 1:
            new_timezone = data.get("timezone")

            if not new_timezone:
                return Response(
                    {"timezone": "Timezone is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            old_timezone = user.timezone

            if old_timezone == new_timezone:
                return Response(
                    {"user": UserSerializer(user, context={"request": request}).data},
                    status=200,
                )

            user.timezone = new_timezone
            user.save(update_fields=["timezone"])

            recompute_user_timezone(user)

            logger.info(
                "User timezone updated.",
                extra={"user_id": user.id, "timezone": new_timezone},
            )

            return Response(
                {"user": UserSerializer(user, context={"request": request}).data},
                status=200,
            )

        if data.get("current_password"):
            if not user.check_password(data.get("current_password")):
                logger.warning(
                    "Incorrect current password provided.",
                    extra={"user_id": user.id},
                )
                return Response(
                    {"current_password": "Current password is incorrect"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not data.get("new_password"):
                logger.warning(
                    "Missing new password during update.",
                    extra={"user_id": user.id},
                )
                return Response(
                    {"new_password": "Please enter a new password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if data.get("new_password") != data.get("confirm_new_password"):
                logger.warning(
                    "Password mismatch during update.",
                    extra={"user_id": user.id},
                )
                return Response(
                    {"confirm_new_password": "The passwords entered do not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.set_password(data.get("new_password"))
            user.save()

            logger.info(
                "Password updated successfully.",
                extra={"user_id": user.id},
            )

            return Response(
                {"detail": "Password updated successfully"},
                status=status.HTTP_200_OK,
            )

        serializer = UpdateUserSerializer(
            user,
            data=data,
            partial=True,
            context={"request": request},
        )

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            logger.error(
                "User update validation failed.",
                exc_info=True,
                extra={"user_id": user.id},
            )
            raise

        serializer.save()

        logger.info(
            "User profile updated successfully.",
            extra={"user_id": user.id},
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()

        if request.user != user:
            logger.warning(
                "Unauthorized attempt to delete user account.",
                extra={
                    "requesting_user_id": request.user.id,
                    "target_user_id": user.id,
                },
            )
            return Response(
                {"detail": "You can only delete your own account"}, status=403
            )

        user.delete()

        return Response({"detail": "Account deleted"}, status=200)

    @action(detail=False, methods=["delete"], url_path="delete_me")
    def delete_me(self, request):
        user = request.user
        user.delete()

        return Response({"detail": "Account deleted"}, status=200)
