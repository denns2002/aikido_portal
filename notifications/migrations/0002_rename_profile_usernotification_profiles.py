# Generated by Django 4.1.7 on 2023-04-19 05:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usernotification',
            old_name='profile',
            new_name='profiles',
        ),
    ]
