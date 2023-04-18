from django.apps import AppConfig

from utils.check_language import check_ru_lang


class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication'
    if check_ru_lang():
        verbose_name = 'Аутентификация'
    else:
        verbose_name = "Authentication"
