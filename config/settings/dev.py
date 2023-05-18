from .base import *
from .packeges import *

DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ["NAME"],
        "USER": os.environ["USER"],
        "PASSWORD": os.environ["PASSWORD"],
        "HOST": os.environ["HOST"],
        "PORT": os.environ["PORT"],
    }
}

# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "formatters": {
#         "console": {"format": "%(name)-12s %(levelname)-8s %(message)s"},
#         "file": {"format": "%(asctime)s %(name)-12s %(levelname)-8s %(message)s"},
#     },
#     "handlers": {
#         "console": {"class": "logging.StreamHandler", "formatter": "console"},
#         "generalfile": {
#             "level": "DEBUG",
#             "class": "logging.FileHandler",
#             "formatter": "file",
#             "filename": "general.log",
#         },
#         "errorfile": {
#             "level": "ERROR",
#             "class": "logging.FileHandler",
#             "formatter": "file",
#             "filename": "error.log",
#         },
#     },
#     "loggers": {
#         "": {"level": "ERROR", "handlers": ["errorfile"], "propagate": True},
#         "django": {"level": "DEBUG", "handlers": ["generalfile"], "propagate": True},
#         "django.request": {
#             "level": "ERROR",
#             "handlers": ["errorfile"],
#             "propagate": True,
#         },
#     },
# }

# Yandex SMTP
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.yandex.ru"
EMAIL_PORT = 465
EMAIL_DOMAIN = "@yandex.ru"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True

SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] = timedelta(minutes=60)
