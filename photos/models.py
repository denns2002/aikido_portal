from django.db import models
from django.utils.safestring import mark_safe

from clubs.models.club import Club
from user.models.profile import Profile
from utils.check_language import multilang_verb, check_ru_lang


class Photo(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=multilang_verb('Name', 'Название')
    )
    link = models.ImageField(
        upload_to="photo/%Y/%m/%d/",
        verbose_name=multilang_verb('Link', 'Ссылка')
    )
    uploaded_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=multilang_verb('Uploaded at', 'Загружено')
    )

    class Meta:
        if check_ru_lang():
            verbose_name = 'Фото'
            verbose_name_plural = 'Фото'
        else:
            verbose_name = 'Photo'
            verbose_name_plural = 'Photos'

    def __str__(self):
        return str(self.name)

    def get_avatar(self):
        if not self.link:
            return '/static/images/user.jpg'
        return self.link.url

    def avatar_tag(self):
        return mark_safe('<img src="%s" width="50" height="50" />' % self.get_avatar())

    def avatar_full(self):
        return mark_safe('<img src="%s" width="200" />' % self.get_avatar())


class UserPhoto(models.Model):
    photo = models.OneToOneField(Photo, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)


class ClubPhoto(models.Model):
    photo = models.OneToOneField(Photo, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)

