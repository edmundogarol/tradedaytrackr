import logging
import socket

import pytz
from rest_framework import serializers
from rest_framework.permissions import BasePermission

logger = logging.getLogger(__name__)


def visitor_ip_address(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")

    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")

    try:
        socket.inet_aton(ip)
        ip_valid = True
    except socket.error:
        ip_valid = False
        logger.warning(
            "Invalid visitor IP address detected.",
            extra={"ip": ip},
        )

    return {"ip": ip, "valid": ip_valid}


def staff(request):
    return request.user.is_authenticated and request.user.is_staff


class AdminOnly(BasePermission):
    def has_permission(self, request):
        return request.user.is_authenticated and request.user.is_staff


class PostOnly(BasePermission):
    def has_permission(self, request, view):
        WRITE_METHODS = [
            "POST",
        ]
        return request.method in WRITE_METHODS or staff(request)


class UserTimezoneDateTimeField(serializers.DateTimeField):
    def to_representation(self, value):
        request = self.context.get("request")
        if request and hasattr(request.user, "timezone"):
            tz = pytz.timezone(request.user.timezone)
            value = value.astimezone(tz)
        return super().to_representation(value)
