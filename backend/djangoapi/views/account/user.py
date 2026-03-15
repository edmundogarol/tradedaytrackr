from time import timezone

from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404

from secrets import token_urlsafe

from backend.djangoapi.models import User, user
from backend.djangoapi.serializers import UserSerializer
from backend.djangoapi.serializers.user import RegisterSerializer
from backend.djangoapi.tasks.user import send_verification_email
from backend.djangoapi.utils import visitor_ip_address


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

        return Response(
            {
                "user": str(user),
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

        user = self.get_object()

        serializer = UpdateUserSerializer(
            user,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
