# Generated by Django 4.1.7 on 2023-07-29 08:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("profiles", "0004_alter_profile_mid_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="is_manager",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="profile",
            name="is_trainer",
            field=models.BooleanField(default=False),
        ),
    ]
