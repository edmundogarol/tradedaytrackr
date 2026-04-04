import logging

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.services.ai.drafting import generate_draft_from_tags

logger = logging.getLogger(__name__)


class GenerateDraftView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        tags = request.data.get("tags", [])
        instrument = request.data.get("instrument")

        logger.info(
            "GenerateDraftView called",
            extra={"tags_count": len(tags)},
        )

        if not tags:
            return Response({"description": ""})

        try:
            result = generate_draft_from_tags(tags, instrument)
            description = result.get("description", "")

            return Response({"description": description})

        except Exception as e:
            logger.exception("Error in GenerateDraftView", extra={"error": str(e)})
            return Response({"description": ""})
