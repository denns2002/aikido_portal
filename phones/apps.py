from django.apps import AppConfig

from utils.check_language import check_ru_lang


class PhonesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'phones'
    if check_ru_lang():
        verbose_name = 'Номера телефонов'
    else:
        verbose_name = "Phones"
