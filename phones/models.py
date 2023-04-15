from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from clubs.models.club import Club
from user.models.profile import Profile


class Phone(models.Model):
    number = PhoneNumberField(blank=True, null=True, unique=True, verbose_name='Phone')

    def __str__(self):
        return str(self.number)


class UserPhone(models.Model):
    phone = models.OneToOneField(Phone, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)


class ClubPhone(models.Model):
    phone = models.OneToOneField(Phone, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)

