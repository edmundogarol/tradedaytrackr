import base64
import hashlib
import hmac

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView, settings

from backend.djangoapi.services.account.membership import activate_membership_from_whop


@method_decorator(csrf_exempt, name="dispatch")
class WhopWebhookView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        secret = settings.WHOP_WEBHOOK_SECRET

        webhook_id = request.headers.get("Webhook-Id")
        timestamp = request.headers.get("Webhook-Timestamp")
        signature_header = request.headers.get("Webhook-Signature")

        if not webhook_id or not timestamp or not signature_header:
            return Response({"error": "Missing headers"}, status=400)

        version, signature = signature_header.split(",")

        payload = webhook_id.encode() + b"." + timestamp.encode() + b"." + request.body

        expected_signature = base64.b64encode(
            hmac.new(secret.encode(), payload, hashlib.sha256).digest()
        ).decode()

        if not hmac.compare_digest(signature, expected_signature):
            return Response({"error": "Invalid signature"}, status=401)

        data = request.data.get("data", {})

        print(f"Received Whop webhook with data: {data}")
        if data.get("status") == "trialing":
            activate_membership_from_whop(data.get("user"))

        return Response({"status": "ok"}, status=status.HTTP_200_OK)
