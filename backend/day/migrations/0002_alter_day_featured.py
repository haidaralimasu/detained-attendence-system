# Generated by Django 4.0.5 on 2022-06-04 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('day', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='day',
            name='featured',
            field=models.BooleanField(default=True),
        ),
    ]
