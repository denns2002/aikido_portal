# Generated by Django 4.1.7 on 2023-05-08 13:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0022_profile_photos"),
        ("clubs", "0009_alter_groupmember_group_alter_groupmember_profile"),
    ]

    operations = [
        migrations.AlterField(
            model_name="groupmember",
            name="group",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="group_items",
                to="clubs.group",
                verbose_name="Группа",
            ),
        ),
        migrations.AlterField(
            model_name="groupmember",
            name="profile",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="profile_items",
                to="user.profile",
                verbose_name="Профиль",
            ),
        ),
    ]
