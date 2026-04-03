import base64
import hashlib
import hmac
import logging

from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.services.account.membership import (
    activate_membership_from_whop,
    cancel_membership_from_whop,
)
from backend.djangoapi.utils.helpers import RequestPayload

logger = logging.getLogger(__name__)


def validate_whop_webhook(type, request):
    if type == "membership.activated":
        secret = settings.WHOP_WEBHOOK_ACTIVATE_MEMBERSHIP_SECRET
    elif type == "membership.deactivated":
        secret = settings.WHOP_WEBHOOK_DEACTIVATE_MEMBERSHIP_SECRET
    else:
        logger.warning("Invalid webhook type received.", extra={"type": type})
        return Response({"error": "Webhook access denied"}, status=400)

    webhook_id = request.headers.get("Webhook-Id")
    timestamp = request.headers.get("Webhook-Timestamp")
    signature_header = request.headers.get("Webhook-Signature")

    if not webhook_id or not timestamp or not signature_header:
        logger.warning("Missing webhook headers.")
        return Response({"error": "Missing headers"}, status=400)

    version, signature = signature_header.split(",")

    payload = webhook_id.encode() + b"." + timestamp.encode() + b"." + request.body

    expected_signature = base64.b64encode(
        hmac.new(secret.encode(), payload, hashlib.sha256).digest()
    ).decode()

    if not hmac.compare_digest(signature, expected_signature):
        logger.warning("Invalid webhook signature.")
        return Response({"error": "Invalid signature"}, status=401)


@method_decorator(csrf_exempt, name="dispatch")
class WhopMembershipActivatedWebhookView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        payload = RequestPayload(request)

        logger.info("Received membership activation webhook.")

        validate_whop_webhook(payload.get("type"), request)
        data = payload.get("data")

        if payload.get("type") == "membership.activated":
            activate_membership_from_whop(data.get("user"))

        return Response({"status": "ok"}, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name="dispatch")
class WhopMembershipDeactivatedWebhookView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        payload = RequestPayload(request)

        logger.info("Received membership cancellation webhook.")

        validate_whop_webhook(payload.get("type"), request)
        data = payload.get("data")

        if payload.get("type") == "membership.deactivated":
            cancel_membership_from_whop(data.get("user"))

        return Response({"status": "ok"}, status=status.HTTP_200_OK)
