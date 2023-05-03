from django.apps import AppConfig

from utils.check_language import check_ru_lang


class CitiesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "cities"
    if check_ru_lang():
        verbose_name = "Адреса"
    else:
        verbose_name = "Adresses"
