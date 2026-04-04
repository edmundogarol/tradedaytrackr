import logging

from django.conf import settings
from openai import OpenAI

from backend.djangoapi.constants.trading import STRATEGIES

logger = logging.getLogger(__name__)

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def detect_strategy(description: str):
    logger.info(
        "Detecting strategy for description", extra={"description": description[:200]}
    )

    prompt = f"""
    You are a trading strategy classifier.

    You MUST choose EXACTLY ONE from this list:

    {STRATEGIES}

    Rules:
    - Do NOT create new strategies
    - Do NOT explain
    - Return ONLY the exact string

    If unsure, return: "ICT/SMC"

    Description:
    {description}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )

        strategy = response.choices[0].message.content.strip()

        logger.info("OpenAI response received", extra={"raw_strategy": strategy})

        if strategy not in STRATEGIES:
            logger.warning(
                "Invalid strategy returned, defaulting", extra={"returned": strategy}
            )
            return "ICT/SMC"

        logger.info("Strategy detected successfully", extra={"strategy": strategy})

        return strategy

    except Exception as e:
        logger.exception(
            "Error detecting strategy, defaulting to ICT/SMC", extra={"error": str(e)}
        )
        return "ICT/SMC"
