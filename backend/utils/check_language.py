from django.conf import settings


def multilang_verb(eng, ru):
    return ru if settings.LANGUAGE_CODE == "RU" else eng


def check_ru_lang():
    return settings.LANGUAGE_CODE == "RU"
