from django.contrib.auth import get_user_model
from django.db import models

from events.models.event import Event
from user.models.profile import Profile


class Statement(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(null=True, blank=True, upload_to="statements/")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, blank=True, null=True)


class StatementMember(models.Model):
    member = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True, null=True)
    attestation = models.BooleanField(default=False)
    seminar = models.BooleanField(default=False)
    statement = models.ForeignKey(Statement, on_delete=models.CASCADE, blank=True, null=True)
