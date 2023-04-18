from django.contrib.auth import get_user_model
from django.utils.safestring import mark_safe
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from transliterate import translit

from cities.models import *


class Rank(models.Model):
    RANKS = [(str(x) + ' kyu child', str(x) + ' кю детский') for x in range(6, 0, -1)] \
            + [(str(x) + ' kyu', str(x) + ' кю') for x in range(5, 0, -1)] \
            + [(str(x) + ' dan', str(x) + ' дан') for x in range(1, 11)] \
            + [('Dosyu', 'Досю')]
    name = models.CharField(
        max_length=255,
        choices=RANKS,
        verbose_name=multilang_verb('Name', 'Название')
    )
    price = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        if check_ru_lang():
            verbose_name = 'Ранг'
            verbose_name_plural = 'Ранги'
        else:
            verbose_name = 'Rank'
            verbose_name_plural = 'Ranks'


class Role(models.Model):
    ROLES = [
        ('Trainer', 'Trainer'),
        ('Student', 'Student'),
        ('Supervisor', 'Supervisor')
    ]
    name = models.CharField(
        max_length=255,
        choices=ROLES,
        verbose_name=multilang_verb('Name', 'Название')
    )

    def __str__(self):
        return self.name

    class Meta:
        if check_ru_lang():
            verbose_name = 'Роль'
            verbose_name_plural = 'Роли'
        else:
            verbose_name = 'Role'
            verbose_name_plural = 'Roles'


class Profile(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        null=True,
        on_delete=models.CASCADE,
        verbose_name=multilang_verb('User', 'Пользователь')
    )
    first_name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('First Name', 'Имя')
    )
    last_name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Last Name', 'Фамилия')
    )
    mid_name = models.CharField(
        blank=True,
        max_length=255,
        verbose_name=multilang_verb('Mid Name', 'Отчество')
    )
    avatar = models.ImageField(
        upload_to="photo/%Y/%m/%d/",
        blank=True,
        null=True,
        verbose_name=multilang_verb('Avatar', 'Аватар')
    )
    birth_date = models.DateField(
        blank=True,
        null=True,
        verbose_name=multilang_verb('Birth Date', 'День рождения')
    )
    city = models.ForeignKey(
        City,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('City', 'Город')
    )
    rank = models.ForeignKey(
        Rank,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name=multilang_verb('Rank', 'Ранг')
    )
    roles = models.ManyToManyField(
        Role,
        blank=True,
        verbose_name=multilang_verb('Roles', 'Роли')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=multilang_verb('Updated at', 'Обновлен')
    )
    slug = models.SlugField(
        max_length=55,
        blank=True,
        verbose_name=multilang_verb('URL', 'Ссылка')
    )

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.slug:
            slug = str(self.first_name) + str(self.last_name) + str(self.mid_name)
            slug = translit(slug[:10], language_code='ru', reversed=True)
            slug = slugify(slug) + get_random_string(length=10)

            while Profile.objects.filter(slug=slug).exists():
                slug = slug + get_random_string(length=4)

            self.slug = slug

        self.first_name = str(self.first_name)[0].upper() + str(self.first_name)[1:]
        self.last_name = str(self.last_name)[0].upper() + str(self.last_name)[1:]

        if self.mid_name:
            self.mid_name = str(self.mid_name)[0].upper() + str(self.mid_name)[1:]

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

    class Meta:
        if check_ru_lang():
            verbose_name = 'Профиль'
            verbose_name_plural = 'Профили'
        else:
            verbose_name = 'Profile'
            verbose_name_plural = 'Profiles'

