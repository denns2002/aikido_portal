from django.apps import AppConfig

from utils.check_language import check_ru_lang


class EventsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "events"
    if check_ru_lang():
        verbose_name = "Мероприятия"
    else:
        verbose_name = "Events"
