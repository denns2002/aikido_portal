from django.db import models


class Club(models.Model):
    name = models.CharField(max_length=255)
    info = models.TextField()

    # address
    # phones
    # groups
    # всё добавлено через foreign key

    class Meta:
        verbose_name = "Club"

    def __str__(self):
        return self.name
