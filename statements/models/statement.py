from django.contrib.auth import get_user_model
from django.db import models

from events.models.event import Event
from profile.models.profile import Profile


class Statement(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    link = models.CharField(max_length=255, null=True, blank=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)


class StatementMember(models.Model):
    member = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True, null=True)
    attestation = models.BooleanField(default=False)
    seminar = models.BooleanField(default=False)
    statement = models.ForeignKey(Statement, on_delete=models.CASCADE, blank=True, null=True)
