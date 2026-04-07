from backend.djangoapi.models import Tag


def seed_demo_tags(user):
    tags = [
        "fvg",
        "discount",
        "premium",
        "50% tap",
        "bpr",
        "vshape",
    ]

    for name in tags:
        Tag.objects.get_or_create(
            user=user,
            name=name.strip().lower(),
        )
