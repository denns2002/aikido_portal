# Generated by Django 4.1.7 on 2023-04-18 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='link',
            field=models.ImageField(upload_to='photo/%Y/%m/%d/', verbose_name='Ссылка'),
        ),
    ]