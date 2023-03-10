from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    region = models.ForeignKey(Region, null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = 'Cities'

    def __str__(self):
        return self.name
