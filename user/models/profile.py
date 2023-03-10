from django.contrib.auth import get_user_model
from django.db import models
from django.utils.safestring import mark_safe
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.text import slugify
from django.utils.crypto import get_random_string

from cities.models import *


class Rank(models.Model):
    RANKS = [(str(x) + ' kyu', str(x) + ' кю') for x in range(10, 0, -1)] \
            + [(str(x) + ' dan', str(x) + ' дан') for x in range(1, 11)] \
            + [('Dosyu', 'Досю')]
    name = models.CharField(max_length=255, choices=RANKS)

    def __str__(self):
        return self.name


class Role(models.Model):
    ROLES = [
        ('Trainer', 'Trainer'),
        ('Student', 'Student'),
        ('Free', 'Free')
    ]
    name = models.CharField(max_length=255, choices=ROLES)

    def __str__(self):
        return self.name


class Club(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(max_length=255)
    number = models.IntegerField(unique=True)
    club = models.ForeignKey(Club, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.club.name + ': №' + str(self.number) + ' - ' + self.name


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mid_name = models.CharField(blank=True, max_length=255)
    avatar = models.ImageField(upload_to="photo/%Y/%m/%d/", blank=True, null=True, verbose_name='Avatar')
    birth_date = models.DateField(blank=True, null=True)
    city = models.ForeignKey(City, blank=True, null=True, on_delete=models.SET_NULL)
    region = models.ForeignKey(Region, blank=True, null=True, on_delete=models.SET_NULL)
    country = models.ForeignKey(Country, blank=True, null=True, on_delete=models.SET_NULL)
    current_rank = models.ForeignKey(Rank, blank=True, null=True, on_delete=models.SET_NULL, related_name='current_rank')
    next_rank = models.ForeignKey(Rank, blank=True, null=True, on_delete=models.SET_NULL, related_name='next_rank')
    role = models.ForeignKey(Role, blank=True, null=True, on_delete=models.SET_NULL)
    clubs = models.ManyToManyField(Club, blank=True)
    groups = models.ManyToManyField(Group, blank=True)
    # competitions = models.ManyToManyField()
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=55,  verbose_name="URL", blank=True)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.slug:
            slug = slugify(self.first_name) + slugify(self.last_name) + \
                        slugify(self.mid_name) + get_random_string(length=4)

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


class UserRank(models.Model):
    rank = models.ManyToManyField(Rank)
    user = models.ManyToManyField(Profile)
    data = models.DateTimeField()


class Phone(models.Model):
    number = PhoneNumberField(blank=True, null=True, unique=True, verbose_name='Phone')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Photo(models.Model):
    link = models.ImageField(upload_to="photo/%Y/%m/%d/", blank=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)


