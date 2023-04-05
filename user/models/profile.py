from django.contrib.auth import get_user_model
from django.db import models
from django.utils.safestring import mark_safe
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from transliterate import translit

from cities.models import *
from clubs.models.club import Club


class Rank(models.Model):
    RANKS = [(str(x) + ' kyu child', str(x) + ' кю детский') for x in range(6, 0, -1)] \
            + [(str(x) + ' kyu', str(x) + ' кю') for x in range(5, 0, -1)] \
            + [(str(x) + ' dan', str(x) + ' дан') for x in range(1, 11)] \
            + [('Dosyu', 'Досю')]
    name = models.CharField(max_length=255, choices=RANKS)
    price = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class Role(models.Model):
    ROLES = [
        ('Trainer', 'Trainer'),
        ('Student', 'Student'),
        ('Supervisor', 'Supervisor')
    ]
    name = models.CharField(max_length=255, choices=ROLES)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mid_name = models.CharField(blank=True, max_length=255)
    avatar = models.ImageField(upload_to="photo/%Y/%m/%d/", blank=True, null=True, verbose_name='Avatar')
    birth_date = models.DateField(blank=True, null=True)
    city = models.ForeignKey(City, blank=True, null=True, on_delete=models.SET_NULL)
    rank = models.ForeignKey(Rank, blank=True, null=True, on_delete=models.SET_NULL)
    role = models.ManyToManyField(Role, blank=True)
    clubs = models.ManyToManyField(Club, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=55,  verbose_name="URL", blank=True)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.slug:
            slug = str(self.first_name) + str(self.last_name) + str(self.mid_name)
            slug = translit(slug[:10], language_code='ru', reversed=True)
            slug = slugify(slug) + get_random_string(length=10)

            while Profile.objects.filter(slug=slug).exists():
                slug = slug + get_random_string(length=4)

            self.slug = slug

        super(Profile, self).save()

    def __str__(self):
        return ' '.join([self.first_name, self.mid_name, self.last_name])

    def get_avatar(self):
        if not self.avatar:
            return '/static/images/user.jpg'
        return self.avatar.url

    def avatar_tag(self):
        return mark_safe('<img src="%s" width="50" height="50" />' % self.get_avatar())

    def avatar_full(self):
        return mark_safe('<img src="%s" width="200" />' % self.get_avatar())

    avatar_tag.short_description = 'Avatar'


class Phone(models.Model):
    number = PhoneNumberField(blank=True, null=True, unique=True, verbose_name='Phone')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    # clubs = models.ForeignKey(Club, on_delete=models.CASCADE)


class Photo(models.Model):
    link = models.ImageField(upload_to="photo/%Y/%m/%d/", blank=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)


