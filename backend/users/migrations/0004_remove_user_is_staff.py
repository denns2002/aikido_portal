# Generated by Django 4.1.7 on 2023-07-06 10:15

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_remove_user_is_supervisor_remove_user_is_trainer"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="is_staff",
        ),
    ]
