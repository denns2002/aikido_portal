# Generated by Django 4.1.7 on 2023-03-23 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='slug',
            field=models.SlugField(blank=True, max_length=55, verbose_name='URL'),
        ),
    ]