from .base import *
from .packeges import *

DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1'
]

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ["NAME"],
        'USER': os.environ["USER"],
        'PASSWORD': os.environ["PASSWORD"],
        'HOST': os.environ["HOST"],
        'PORT': os.environ["PORT"],
    }
}

# Yandex SMTP
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_PORT = 465
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True



