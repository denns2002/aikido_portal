from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from clubs.models.club import Club
from user.models.profile import Profile
from utils.check_language import multilang_verb, check_ru_lang


class Phone(models.Model):
    number = PhoneNumberField(
        unique=True,
        verbose_name=multilang_verb('Phone', 'Телефон')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Телефон'
            verbose_name_plural = 'Телефоны'
        else:
            verbose_name = 'Phone'
            verbose_name_plural = 'Phones'

    def __str__(self):
        return str(self.number)


class UserPhone(models.Model):
    phone = models.OneToOneField(Phone, on_delete=models.CASCADE)
    profiles = models.ForeignKey(Profile, on_delete=models.CASCADE)


class ClubPhone(models.Model):
    phone = models.OneToOneField(Phone, on_delete=models.CASCADE)
    clubs = models.ForeignKey(Club, on_delete=models.CASCADE)

