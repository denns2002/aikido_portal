# Generated by Django 4.1.7 on 2023-04-18 09:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0020_alter_profile_options_alter_rank_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='clubs',
        ),
    ]