import socket

from rest_framework.permissions import BasePermission


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
