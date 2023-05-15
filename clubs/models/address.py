from django.db import models
from clubs.models.club import Club


class Address(models.Model):
    name = models.CharField(max_length=255)
    clubs = models.ForeignKey(Club, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
