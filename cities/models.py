from django.db import models

from utils.check_language import multilang_verb, check_ru_lang


class Country(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Name', 'Название')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Страна'
            verbose_name_plural = 'Страны'
        else:
            verbose_name = 'Country'
            verbose_name_plural = 'Countries'

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Name', 'Название')
    )
    country = models.ForeignKey(
        Country,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('Country', 'Страна')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Регион'
            verbose_name_plural = 'Регионы'
        else:
            verbose_name = 'Region'
            verbose_name_plural = 'Regions'

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Name', 'Название')
    )
    postal_code = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Postal Code', 'Почтовый индекс')
    )
    region = models.ForeignKey(
        Region,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('Region', 'Регион')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Город'
            verbose_name_plural = 'Города'
        else:
            verbose_name = 'City'
            verbose_name_plural = 'Cities'

    def __str__(self):
        return self.name


class Street(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Name', 'Название')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Улица'
            verbose_name_plural = 'Улицы'
        else:
            verbose_name = 'Street'
            verbose_name_plural = 'Streets'

    def __str__(self):
        return str(self.name)


class House(models.Model):
    number = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Number', 'Номер дома')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Номер дома'
            verbose_name_plural = 'Номера домов'
        else:
            verbose_name = 'House'
            verbose_name_plural = 'Houses'

    def __str__(self):
        return str(self.number)


class Apt(models.Model):
    number = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Number', 'Номер квартиры')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Номер квартиры'
            verbose_name_plural = 'Номера квартир'
        else:
            verbose_name = 'Apt'
            verbose_name_plural = 'Apts'

    def __str__(self):
        return str(self.number)


class Address(models.Model):
    city = models.ForeignKey(
        City,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('City', 'Город')
    )
    street = models.ForeignKey(
        Street,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('Street', 'Улица')
    )
    house = models.ForeignKey(
        House,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('House', 'Номер дома')
    )
    apt = models.ForeignKey(
        Apt,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('Apt', 'Номер квартиры')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Адрес'
            verbose_name_plural = 'Адреса'
        else:
            verbose_name = 'Address'
            verbose_name_plural = 'Addresses'

    def __str__(self):
        string = str(self.city.name)
        if self.street:
            string += f'ул. {str(self.street.name)}'

        if self.house:
            string += f'д. {str(self.house.number)}'

        if self.apt:
            string += f'кв. {str(self.apt.number)}'

        return string

