from django.apps import AppConfig

from utils.check_language import check_ru_lang


class ClubsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "clubs"
    if check_ru_lang():
        verbose_name = "Группы и клубы"
    else:
        verbose_name = "Groups & Clubs"
