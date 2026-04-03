import logging

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.services.account.ai.tagging import generate_tags

logger = logging.getLogger(__name__)


class AutoTagView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        description = request.data.get("description", "")

        logger.info("AutoTagView called", extra={"has_description": bool(description)})

        if not description:
            logger.warning("No description provided in AutoTagView")
            return Response({"tags": []})

        try:
            tags = generate_tags(description)

            logger.info(
                "Tag generation successful",
                extra={
                    "tags_count": len(tags),
                    "tags_preview": tags[:5],
                    "description_preview": description[:200],
                },
            )

            return Response({"tags": tags})

        except Exception as e:
            logger.exception("Error in AutoTagView", extra={"error": str(e)})
            return Response({"tags": []})
