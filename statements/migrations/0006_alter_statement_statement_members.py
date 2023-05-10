# Generated by Django 4.1.7 on 2023-05-10 10:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("statements", "0005_alter_statement_file"),
    ]

    operations = [
        migrations.AlterField(
            model_name="statement",
            name="statement_members",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="statements.statementmember",
            ),
        ),
    ]