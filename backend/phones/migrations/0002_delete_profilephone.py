# Generated by Django 4.1.7 on 2023-07-10 07:32

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("phones", "0001_initial"),
    ]

    operations = [
        migrations.DeleteModel(
            name="ProfilePhone",
        ),
    ]
