from django.contrib.auth import get_user_model
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class City(models.Model):
    name = models.CharField(255)


class Rank(models.Model):
    name = models.CharField(255)


class Role(models.Model):
    name = models.CharField(255)


class Club(models.Model):
    name = models.CharField(255)


class Group(models.Model):
    name = models.CharField(255)
    number = models.IntegerField(unique=True)
    club = models.ForeignKey(Club, null=True, on_delete=models.SET_NULL)


class Country(models.Model):
    name = models.CharField(255)


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), null=True, on_delete=models.CASCADE)
    first_name = models.CharField(255)
    last_name = models.CharField(255)
    mid_name = models.CharField(255)
    # photo =
    birth_date = models.DateField()
    current_rank = models.ForeignKey(Rank, null=True, on_delete=models.SET_NULL)
    next_rank = models.ForeignKey(Rank, null=True, on_delete=models.SET_NULL)
    city = models.ForeignKey(City, null=True, on_delete=models.SET_NULL)
    role = models.ForeignKey(Role, null=True, on_delete=models.SET_NULL)
    clubs = models.ManyToManyField(Club)
    # competitions = models.ManyToManyField()
    country = models.ForeignKey(Country, null=True, on_delete=models.SET_NULL)


class UserRank(models.Model):
    rank = models.ManyToManyField(Rank, null=True, on_delete=models.SET_NULL)
    user = models.ManyToManyField(Profile, on_delete=models.CASCADE)
    data = models.DateTimeField()


class Phone(models.Model):
    number = PhoneNumberField(blank=True, null=True, unique=True, verbose_name='Phone')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
