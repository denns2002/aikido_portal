# Generated by Django 4.1.7 on 2023-07-25 13:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("events", "0002_remove_event_addresses_event_addresses"),
        ("clubs_groups", "0006_alter_club_managers_alter_group_trainers_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="club",
            name="addresses",
        ),
        migrations.DeleteModel(
            name="Address",
        ),
        migrations.AddField(
            model_name="club",
            name="addresses",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="Адрес"
            ),
        ),
    ]
