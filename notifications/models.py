from django.contrib.auth import get_user_model
from django.db import models

from user.models.profile import Profile
from utils.check_language import check_ru_lang, multilang_verb


class Notification(models.Model):
    title = models.CharField(max_length=255, verbose_name=multilang_verb("Title", "Заголовок"))
    message = models.TextField(blank=True, verbose_name=multilang_verb("Message", "Сообщение"))
    timestamp = models.DateTimeField(
        auto_now_add=True, verbose_name=multilang_verb("Timestamp", "Временная отметка")
    )

    class Meta:
        if check_ru_lang():
            verbose_name = "Уведомление"
            verbose_name_plural = "Уведомления"
        else:
            verbose_name = "Notification"
            verbose_name_plural = "Notifications"

    def __str__(self):
        return self.title


class UserNotification(models.Model):
    notifications = models.ForeignKey(
        Notification,
        on_delete=models.CASCADE,
        verbose_name=multilang_verb("Notifications", "Уведомления"),
    )
    users = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        verbose_name=multilang_verb("Users", "Получатели"),
    )
    is_read = models.BooleanField(default=False, verbose_name=multilang_verb("Is read", "Прочитано"))
