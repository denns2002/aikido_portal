# Generated by Django 4.1.7 on 2023-07-25 14:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("events", "0002_remove_event_addresses_event_addresses"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="event",
            name="addresses",
        ),
        migrations.AddField(
            model_name="event",
            name="address",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="Адрес"
            ),
        ),
    ]
