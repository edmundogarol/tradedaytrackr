import logging
from secrets import token_urlsafe

from django.conf import settings
from django.contrib.auth import get_user_model, login
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.serializers import UserSerializer
from backend.djangoapi.serializers.user import RegisterSerializer, UpdateUserSerializer
from backend.djangoapi.tasks.user import (
    send_account_deleted_email,
    send_verification_email,
)

logger = logging.getLogger(__name__)

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
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
        old_email = user.email

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

        updated_user = serializer.save()

        if "email" in request.data and old_email != updated_user.email:
            logger.info(
                "User email updated, sending verification email.",
                extra={"user_id": request.user.id},
            )
            updated_user.is_verified = False
            updated_user.verification_token = token_urlsafe(32)
            updated_user.verification_sent_at = timezone.now()
            updated_user.save()

            verification_url = f"{settings.WEB_APP_URL}/dashboard?verification_token={updated_user.verification_token}"

            try:
                send_verification_email(updated_user, verification_url)
            except Exception:
                logger.error(
                    "Failed to send verification email after email update.",
                    exc_info=True,
                    extra={"user_id": request.user.id},
                )

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["patch"], url_path="update_me")
    def update_me(self, request):
        if request.user.is_demo and request.data.get("current_password"):
            logger.warning(
                "Demo user attempted to update password.",
                extra={"user_id": request.user.id},
            )
            return Response(
                {"password_error": "Demo accounts cannot update password"},
                status=status.HTTP_403_FORBIDDEN,
            )
        elif request.user.is_demo:
            logger.warning(
                "Demo user attempted to update account.",
                extra={"user_id": request.user.id},
            )
            return Response(
                {"error": "Demo accounts cannot be updated"},
                status=status.HTTP_403_FORBIDDEN,
            )

        user = request.user
        old_email = user.email

        request.data["password"] = request.data.get("new_password", "")

        serializer = UpdateUserSerializer(
            user,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        if request.data.get("current_password") and not user.check_password(
            request.data.get("current_password", "")
        ):
            logger.warning(
                "User provided incorrect current password for update.",
                extra={"user_id": request.user.id},
            )
            return Response(
                {"current_password": "Current password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif request.data.get("current_password") and request.data.get(
            "new_password"
        ) != request.data.get("confirm_new_password"):
            logger.warning(
                "User provided non-matching new passwords for update.",
                extra={"user_id": request.user.id},
            )
            return Response(
                {
                    "confirm_new_password": "The passwords entered do not match",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif request.data.get("current_password") and not request.data.get(
            "new_password"
        ):
            logger.warning(
                "User did not provide a new password for update.",
                extra={"user_id": request.user.id},
            )
            return Response(
                {"new_password": "Please enter a new password"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif request.data.get("current_password"):
            serializer.is_valid(raise_exception=True)
            updated_user = serializer.save()
            logger.info(
                "Password updated successfully.",
                extra={"user_id": request.user.id},
            )
            return Response(
                {
                    "detail": "Password updated successfully",
                },
                status=status.HTTP_200_OK,
            )

        serializer.is_valid(raise_exception=True)
        updated_user = serializer.save()

        if "email" in request.data and old_email != updated_user.email:
            logger.info(
                "User email updated, sending verification email.",
                extra={"user_id": request.user.id},
            )
            updated_user.is_verified = False
            updated_user.verification_token = token_urlsafe(32)
            updated_user.verification_sent_at = timezone.now()
            updated_user.save()

            verification_url = f"{settings.WEB_APP_URL}/dashboard?verification_token={updated_user.verification_token}"
            send_verification_email(updated_user, verification_url)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()

        if user.is_demo:
            logger.warning(
                "Demo user attempted to delete account.",
                extra={"user_id": request.user.id},
            )
            return Response({"detail": "Demo accounts cannot be deleted"}, status=403)

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

        email = user.email
        user.delete()

        try:
            send_account_deleted_email(email)
        except Exception:
            logger.error(
                "Failed to send account deleted email.",
                exc_info=True,
                extra={"email": email},
            )

        return Response({"detail": "Account deleted"}, status=200)

    @action(detail=False, methods=["delete"], url_path="delete_me")
    def delete_me(self, request):
        if request.user.is_demo:
            logger.warning(
                "Demo user attempted to delete account.",
                extra={"user_id": request.user.id},
            )
            return Response({"detail": "Demo accounts cannot be deleted"}, status=403)

        user = request.user

        email = user.email
        user.delete()

        try:
            send_account_deleted_email(email)
        except Exception:
            logger.error(
                "Failed to send account deleted email.",
                exc_info=True,
                extra={"email": email},
            )

        return Response({"detail": "Account deleted"}, status=200)
