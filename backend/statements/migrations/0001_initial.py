# Generated by Django 4.1.7 on 2023-07-25 13:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("profiles", "0004_alter_profile_mid_name"),
        ("events", "0002_remove_event_addresses_event_addresses"),
    ]

    operations = [
        migrations.CreateModel(
            name="Statement",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("link", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("Группа", "Группа"),
                            ("Свободный", "Свободный"),
                            ("Мероприятие", "Мероприятие"),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "event",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="events.event",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="StatementMember",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("attestation", models.BooleanField(default=False)),
                ("seminar", models.BooleanField(default=False)),
                (
                    "member",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="profiles.profile",
                    ),
                ),
                (
                    "statement",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="statements.statement",
                    ),
                ),
            ],
        ),
    ]