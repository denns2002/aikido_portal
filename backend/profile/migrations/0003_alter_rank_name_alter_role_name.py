# Generated by Django 4.1.7 on 2023-05-15 09:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("profile", "0002_remove_rank_price_profile_is_child_alter_rank_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="rank",
            name="name",
            field=models.CharField(
                choices=[
                    ("6 кю детский", "6 кю детский"),
                    ("5 кю детский", "5 кю детский"),
                    ("4 кю детский", "4 кю детский"),
                    ("3 кю детский", "3 кю детский"),
                    ("2 кю детский", "2 кю детский"),
                    ("1 кю детский", "1 кю детский"),
                    ("5 кю", "5 кю"),
                    ("4 кю", "4 кю"),
                    ("3 кю", "3 кю"),
                    ("2 кю", "2 кю"),
                    ("1 кю", "1 кю"),
                    ("1 дан", "1 дан"),
                    ("2 дан", "2 дан"),
                    ("3 дан", "3 дан"),
                    ("4 дан", "4 дан"),
                    ("5 дан", "5 дан"),
                    ("Досю", "Досю"),
                ],
                max_length=255,
                verbose_name="Название",
            ),
        ),
        migrations.AlterField(
            model_name="role",
            name="name",
            field=models.CharField(
                choices=[
                    ("Тренер", "Тренер"),
                    ("Студент", "Студент"),
                    ("Руководитель", "Руководитель"),
                ],
                max_length=255,
                verbose_name="Название",
            ),
        ),
    ]