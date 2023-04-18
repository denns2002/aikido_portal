from django.apps import AppConfig

from utils.check_language import check_ru_lang


class PhotosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'photos'
    if check_ru_lang():
        verbose_name = 'Фото'
    else:
        verbose_name = "Photos"
