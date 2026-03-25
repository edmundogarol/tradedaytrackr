from django.contrib.auth import get_user_model, login
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.serializers import UserSerializer
from backend.djangoapi.serializers.user import RegisterSerializer, UpdateUserSerializer

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer
    # TODO - PERMISSIONS - Fix permissions class for Auth Model / Models

    def list(self, request, *args, **kwargs):
        queryset = User.objects.all().order_by("-id")
        search = request.GET.get("search", None)

        if search:
            queryset = queryset.filter(email__icontains=search)

        page = self.paginate_queryset(queryset)
        serializer = UserSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

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
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        user = request.user  # 🔥 secure: only update self

        serializer = UpdateUserSerializer(
            user,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
