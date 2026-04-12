import json
import logging
import re

from django.conf import settings
from openai import OpenAI

from backend.djangoapi.constants.trading import STRATEGY_TAG_MAP
from backend.djangoapi.services.ai.strategy import detect_strategy

logger = logging.getLogger(__name__)

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def extract_json_array(text: str):
    match = re.search(r"\[.*\]", text, re.DOTALL)
    return match.group(0) if match else "[]"


def generate_tags(description: str):

    strategy = detect_strategy(description)

    if not strategy:
        logger.warning("Strategy detection returned None.")
        return {"strategy": None, "tags": []}

    tag_pool = STRATEGY_TAG_MAP.get(strategy, [])

    if not tag_pool:
        logger.warning(
            "No tag pool found for detected strategy.",
            extra={"strategy": strategy},
        )
        return {"strategy": strategy, "tags": []}

    normalized_tags = [tag.lower() for tag in tag_pool]

    prompt = f"""
        You are a trading assistant.

        From the journal description below, select relevant tags.

        ONLY choose from this list:
        {normalized_tags}

        Return ONLY a JSON array.

        Example:
        ["fvg", "displacement"]

        Description:
        {description}
        """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )

        content = response.choices[0].message.content

    except Exception:
        logger.error(
            "OpenAI tag generation failed.",
            exc_info=True,
            extra={"strategy": strategy},
        )
        return {"strategy": strategy, "tags": []}

    # --- SAFE PARSE ---
    try:
        cleaned = extract_json_array(content)
        tags = json.loads(cleaned)
    except Exception:
        logger.warning(
            "Failed to parse AI tag response.",
            extra={"strategy": strategy, "raw_response": content},
        )
        tags = []

    # --- FILTER VALID TAGS ---
    tags = [tag for tag in tags if tag in normalized_tags]

    logger.info(
        "AI tags generated.",
        extra={
            "strategy": strategy,
            "tag_count": len(tags),
        },
    )

    return {
        "strategy": strategy,
        "tags": tags,
    }
