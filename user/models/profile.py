from django.contrib.auth import get_user_model
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from cities.models import *


class Rank(models.Model):
    RANKS = [(str(x) + ' kyu', str(x) + ' кю') for x in range(10, 0, -1)] \
            + [(str(x) + ' dan', str(x) + ' дан') for x in range(1, 11)] \
            + [('Dosyu', 'Досю')]
    name = models.CharField(max_length=255, choices=RANKS)

    def __str__(self):
        return self.name


class Role(models.Model):
    ROLES = [
        ('Trainer', 'Trainer'),
        ('Student', 'Student'),
        ('Free', 'Free')
    ]
    name = models.CharField(max_length=255, choices=ROLES)

    def __str__(self):
        return self.name


class Club(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(max_length=255)
    number = models.IntegerField(unique=True)
    club = models.ForeignKey(Club, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.club.name + ': №' + str(self.number) + ' - ' + self.name


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mid_name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", blank=True)
    birth_date = models.DateField()
    city = models.ForeignKey(City, null=True, on_delete=models.SET_NULL)
    region = models.ForeignKey(Region, null=True, on_delete=models.SET_NULL)
    country = models.ForeignKey(Country, null=True, on_delete=models.SET_NULL)

    current_rank = models.ForeignKey(
        Rank, null=True, on_delete=models.SET_NULL, related_name='current_rank'
    )
    next_rank = models.ForeignKey(
        Rank, null=True, on_delete=models.SET_NULL, related_name='next_rank'
    )
    role = models.ForeignKey(Role, null=True, on_delete=models.SET_NULL)
    clubs = models.ManyToManyField(Club)
    groups = models.ManyToManyField(Group)
    # competitions = models.ManyToManyField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return ' '.join([self.first_name, self.mid_name, self.last_name])


class UserRank(models.Model):
    rank = models.ManyToManyField(Rank)
    user = models.ManyToManyField(Profile)
    data = models.DateTimeField()


class Phone(models.Model):
    number = PhoneNumberField(blank=True, null=True, unique=True, verbose_name='Phone')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
