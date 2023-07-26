# Generated by Django 4.1.7 on 2023-07-26 20:25

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("events", "0003_remove_event_addresses_event_address"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="members",
            field=models.ManyToManyField(
                blank=True,
                related_name="members",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Участники",
            ),
        ),
    ]
