# Generated by Django 4.1.7 on 2023-07-11 06:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("profiles", "0003_profile_photos"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="mid_name",
            field=models.CharField(
                blank=True, max_length=255, null=True, verbose_name="Отчество"
            ),
        ),
    ]
