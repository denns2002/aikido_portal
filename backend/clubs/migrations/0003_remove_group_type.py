# Generated by Django 4.1.7 on 2023-05-18 10:00

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("clubs", "0002_alter_group_type"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="group",
            name="type",
        ),
    ]