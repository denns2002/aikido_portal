# Generated by Django 4.1.7 on 2023-07-25 14:29

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("clubs_groups", "0008_alter_groupmember_profile"),
    ]

    operations = [
        migrations.RenameField(
            model_name="club",
            old_name="addresses",
            new_name="address",
        ),
    ]
