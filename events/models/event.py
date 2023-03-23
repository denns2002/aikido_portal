from django.db import models
from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string
from django.utils.text import slugify
from transliterate import translit


class Event(models.Model):
    name = models.CharField(max_length=255)
    reg_start = models.DateField()
    reg_end = models.DateField()
    date_start = models.DateField()
    date_end = models.DateField()
    place = models.CharField(max_length=255)
    about = models.TextField()
    members = models.ManyToManyField(get_user_model(), blank=True, related_name='members')
    organizers = models.ManyToManyField(get_user_model(), blank=True, related_name='organizers')
    co_organizers = models.ManyToManyField(get_user_model(), blank=True, related_name='co_organizers')
    is_attestation = models.BooleanField(default=False)
    is_seminar = models.BooleanField(default=False)
    slug = models.SlugField(max_length=55,  verbose_name="URL", blank=True)

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
