from django.db import models


class Tag(models.Model):
    user = models.ForeignKey(
        "djangoapi.User",
        on_delete=models.CASCADE,
        related_name="tags",
    )
    name = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "name"],
                name="unique_tag_per_user",
            )
        ]

    def __str__(self):
        return self.name
