from django.apps import AppConfig

from utils.check_language import check_ru_lang


class SpreadsheetsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "spreadsheets"
    if check_ru_lang():
        verbose_name = "Гугл Таблицы"
    else:
        verbose_name = "Spreadsheets"
