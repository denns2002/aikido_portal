from django.contrib.auth import get_user_model
from django.db import models


class Club(models.Model):
    name = models.CharField(max_length=255)
    info = models.TextField()

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(max_length=255)
    number = models.IntegerField(unique=True)
    club = models.ForeignKey(Club, null=True, on_delete=models.SET_NULL)
    trainers = models.ManyToManyField(get_user_model(), blank=True)

    def __str__(self):
        return self.club.name + ': №' + str(self.number) + ' - ' + self.name
