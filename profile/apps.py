from django.apps import AppConfig

from utils.check_language import check_ru_lang


class ProfileConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "profile"
    if check_ru_lang():
        verbose_name = "Профили"
    else:
        verbose_name = "Profiles"
