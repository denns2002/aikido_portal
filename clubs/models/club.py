from django.db import models
from django.utils.crypto import get_random_string
from transliterate import slugify, translit

from cities.models import Address
from clubs.models.group import Group
from photos.models import Photo
from utils.check_language import check_ru_lang, multilang_verb


class Club(models.Model):
    name = models.CharField(max_length=255, verbose_name=multilang_verb("Name", "Название"))
    info = models.TextField(verbose_name=multilang_verb("Info", "Информация"))
    addresses = models.ManyToManyField(
        Address, blank=True, verbose_name=multilang_verb("Addresses", "Адреса")
    )
    slug = models.SlugField(max_length=55, blank=True, verbose_name=multilang_verb("URL", "Ссылка"))
    groups = models.ManyToManyField(Group, blank=True, verbose_name=multilang_verb("Groups", "Группы"))
    photos = models.ManyToManyField(Photo, verbose_name=multilang_verb("Photos", "Фото"))

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.slug:
            slug = translit(str(self.name)[:10], language_code="ru", reversed=True)
            slug = slugify(slug) + get_random_string(length=10)

            while Club.objects.filter(slug=slug).exists():
                slug = slug + get_random_string(length=4)

            self.slug = slug

    def __str__(self):
        return self.name

    class Meta:
        if check_ru_lang():
            verbose_name = "Клуб"
            verbose_name_plural = "Клубы"
        else:
            verbose_name = "Club"
            verbose_name_plural = "Clubs"
