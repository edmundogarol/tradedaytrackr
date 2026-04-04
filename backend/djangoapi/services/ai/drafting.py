import logging

from django.conf import settings
from openai import OpenAI

logger = logging.getLogger(__name__)

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def generate_draft_from_tags(tags: list[str], instrument: str | None = None):
    if not tags:
        logger.warning("No tags provided for draft generation.")
        return {"description": ""}

    prompt = f"""
        You are a professional trading journal assistant.

        Generate a concise but realistic trading journal entry draft based on the tags.

        Guidelines:
        - Use natural trading language (ICT/SMC style if applicable)
        - Keep it 1-2 sentences
        - Do NOT hallucinate details outside the tags
        - Do NOT mention tags explicitly
        - Make it sound like a real trader wrote it

        Tags:
        {tags}

        Instrument: {instrument or "N/A"}

        Return ONLY plain text (no JSON, no quotes).
        """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )

        content = response.choices[0].message.content.strip()

    except Exception:
        logger.error(
            "Draft generation failed.",
            exc_info=True,
            extra={"tags": tags},
        )
        return {"description": ""}

    logger.info(
        "Draft generated successfully",
        extra={"tags_count": len(tags)},
    )

    return {"description": content}
