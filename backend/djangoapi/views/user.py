from rest_framework import status
from rest_framework.viewsets import  ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404

from secrets import token_urlsafe

from backend.djangoapi.models import User
from backend.djangoapi.serializers import UserSerializer
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

    def create(self, validated_data):
        user = None

        ip_data = visitor_ip_address(validated_data)

        if not validated_data.data["password"] or not validated_data.data["email"]:
            content = {"error": "Please provide both email and password."}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            password_validation.validate_password(validated_data.data["password"])
        except ValidationError as error:
            content = {"error": error}
            return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            user = User.objects.create_user(
                email=validated_data.data["email"].lower(),
                password=validated_data.data["password"],
            )
        except IntegrityError:
            content = {"error": "Duplicate email. User already exists."}
            return Response(content, status=status.HTTP_409_CONFLICT)

        user.last_ip = ip_data["ip"] if ip_data["valid"] else None
        user.verified = token_urlsafe(20)
        user.set_password(validated_data.data["password"])
        user.save()

        # TODO - EMAIL - Account verification
        # Thread(
        #     target=send_account_verification_email,
        #     args=(
        #         user,
        #         user.verified,
        #     ),
        # ).start()

        content = {
            "user": str(user),
            "logged_in": True,  # None
        }

        return Response(content)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        password = request.data.get("password", None)
        email = request.data.get("email", None)
        username = request.data.get("username", None)
        user_id = request.data.get("user_id", None)

        # Validate password
        if password is not None:
            try:
                password_validation.validate_password(request.data["password"])
            except ValidationError as error:
                content = {"error": error}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        # Validate email
        if email is not None:
            try:
                validate_email(email)

            except ValidationError as e:
                content = {"error": e}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)

        # Validate username
        if username is not None and username != "":
            try:
                user = User.objects.get(username=username)
                content = {"Error": "User with this username already exists."}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
            except User.DoesNotExist:
                pass

        queryset = User.objects.all()
        user = queryset.get(pk=user_id if user_id else kwargs.get("pk"))

        # Sanitise email to lowercase
        mutable_req_data = request.data.copy()
        mutable_req_data["email"] = email.lower()
        serializer = UserSerializer(user, data=mutable_req_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if email is not None:
            user = User.objects.get(id=user.id)
            user.verified = None
            user.save()

            serializer = UserSerializer(user)
            return Response(serializer.data)

        return Response(serializer.data)

