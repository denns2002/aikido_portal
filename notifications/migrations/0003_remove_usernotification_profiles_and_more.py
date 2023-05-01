# Generated by Django 4.1.7 on 2023-04-19 05:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('notifications', '0002_rename_profile_usernotification_profiles'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usernotification',
            name='profiles',
        ),
        migrations.AddField(
            model_name='usernotification',
            name='users',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Получатели'),
            preserve_default=False,
        ),
    ]