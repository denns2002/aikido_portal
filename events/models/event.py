from django.db import models
from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string
from django.utils.text import slugify
from transliterate import translit

from cities.models import Address
from clubs.models.group import Group
from utils.check_language import check_ru_lang, multilang_verb


class Event(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Name', 'Название')
    )
    reg_start = models.DateField(
        verbose_name=multilang_verb('Start of registration', 'Начало регистрации')
    )
    reg_end = models.DateField(
        verbose_name=multilang_verb('End of registration', 'Окончание регистрации')
    )
    date_start = models.DateField(
        verbose_name=multilang_verb('Start date', 'Дата начала')
    )
    date_end = models.DateField(
        verbose_name=multilang_verb('End date', 'Дата окончания')
    )
    addresses = models.ForeignKey(
        Address,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('Address', 'Адрес')
    )
    about = models.TextField(
        verbose_name=multilang_verb('About', 'Описание')
    )
    members = models.ManyToManyField(
        get_user_model(),
        blank=True,
        related_name='members',
        verbose_name=multilang_verb('Members', 'Участники')
    )
    organizers = models.ManyToManyField(
        get_user_model(),
        blank=True,
        related_name='organizers',
        verbose_name=multilang_verb('Organizers', 'Организаторы')
    )
    co_organizers = models.ManyToManyField(
        get_user_model(),
        blank=True,
        related_name='co_organizers',
        verbose_name=multilang_verb('Co-organizers', 'Соорганизаторы')
    )
    is_attestation = models.BooleanField(
        default=False,
        verbose_name=multilang_verb('Is attestation', 'Аттестация')
    )
    is_seminar = models.BooleanField(
        default=False,
        verbose_name=multilang_verb('Is seminar', 'Семинар')
    )
    slug = models.SlugField(
        max_length=55,
        blank=True,
        verbose_name=multilang_verb('URL', 'Ссылка')
    )

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.slug:
            name = translit(self.name, language_code='ru', reversed=True)
            slug = slugify(name[10:]) + get_random_string(length=10)

            while Event.objects.filter(slug=slug).exists():
                slug = slug + get_random_string(length=4)

            self.slug = slug

        super(Event, self).save()

    def __str__(self):
        return self.name

    class Meta:
        if check_ru_lang():
            verbose_name = 'Мероприятие'
            verbose_name_plural = 'Мероприятия'
        else:
            verbose_name = 'Event'
            verbose_name_plural = 'Events'


class PlannedEvents(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
