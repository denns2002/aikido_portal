# Generated by Django 4.1.7 on 2023-04-18 06:24

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('phones', '0002_alter_phone_options_alter_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='number',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, unique=True, verbose_name='Телефон'),
        ),
    ]