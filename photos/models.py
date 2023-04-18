from django.db import models
from django.utils.safestring import mark_safe

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

    def get_photo(self):
        if not self.link:
            return '/static/images/user.jpg'
        return self.link.url

    def photo_tag(self):
        return mark_safe('<img src="%s" width="50" height="50" />' % self.get_photo())

    def photo_full(self):
        return mark_safe('<img src="%s" width="200" />' % self.get_photo())

    photo_tag.short_description = photo_full.short_description = \
        'Фото' if check_ru_lang() else 'Photo'

    class Meta:
        if check_ru_lang():
            verbose_name = 'Фото'
            verbose_name_plural = 'Фото'
        else:
            verbose_name = 'Photo'
            verbose_name_plural = 'Photos'

    def __str__(self):
        return str(self.name)
