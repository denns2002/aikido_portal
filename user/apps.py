from django.apps import AppConfig

from utils.check_language import check_ru_lang


class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user'
    if check_ru_lang():
        verbose_name = 'Профили'
    else:
        verbose_name = "User Details"
