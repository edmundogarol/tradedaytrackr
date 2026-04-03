import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.services.account.ai.strategy import detect_strategy

logger = logging.getLogger(__name__)


class DetectStrategyView(APIView):
    def post(self, request):
        description = request.data.get("description", "")

        logger.info(
            "DetectStrategyView called", extra={"has_description": bool(description)}
        )

        if not description:
            logger.warning("No description provided in request")
            return Response({"strategy": None})

        try:
            strategy = detect_strategy(description)

            logger.info(
                "Strategy detection successful",
                extra={
                    "strategy": strategy,
                    "description_preview": description[:200],
                },
            )

            return Response({"strategy": strategy})

        except Exception as e:
            logger.exception("Error in DetectStrategyView", extra={"error": str(e)})
            return Response({"strategy": "ICT/SMC"})
