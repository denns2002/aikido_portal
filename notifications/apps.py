from django.apps import AppConfig

from utils.check_language import check_ru_lang


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'
    if check_ru_lang():
        verbose_name = 'Уведомления'
    else:
        verbose_name = "Notifications"
