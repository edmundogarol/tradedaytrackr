from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=100)
    uses = models.IntegerField(default=0)

    class Meta:
        unique_together = ("name",)

    def __str__(self):
        return self.name
