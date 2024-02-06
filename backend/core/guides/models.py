from django.db import models
from django.contrib.auth.models import User

GUIDE_SLUGS = (
    ("basics", "The Basics"),
    ("sending_money_intl", "Sending Money Internationally"),
)


class Guide(models.Model):
    title = models.CharField(
        help_text="Appears as the title for this guide", max_length=100
    )
    slug = models.SlugField(
        help_text="Used by the clients to lookup specific guides.", choices=GUIDE_SLUGS
    )


class GuideStep(models.Model):
    sort_index = models.PositiveIntegerField()


class GuideStepRead(models.Model):
    step = models.ForeignKey(GuideStep, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
