from config.settings.dev import *

print(DATABASES)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test_database',
    }
}
