from django.contrib.auth import get_user_model
from django.contrib.auth.models import PermissionsMixin
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), null=True, on_delete=models.CASCADE)
    first_name = models.CharField(255)
    last_name = models.CharField(255)
    mid_name = models.CharField(255)
    # photo =
    birth_date = models.DateField()
    # ranks =
    # current_rank =
    # next_rank =
    # city =
    # phones = models.ForeignKey()
    # role =
    # clubs =
    # competitions = models.ManyToManyField()
    # country =