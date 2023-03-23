from django.db import models
from django.contrib.auth import get_user_model


class Event(models.Model):
    name = models.CharField(max_length=255)
    reg_start = models.DateTimeField()
    reg_end = models.DateTimeField()
    date = models.DateField()  # а что за дата? Типо дата проведения? Если что то указал неправильно, исправьте
    place = models.CharField(max_length=255)  # не уверен
    about = models.TextField()
    members = models.ManyToManyField(get_user_model(), blank=True)

    def __str__(self):
        return self.name
