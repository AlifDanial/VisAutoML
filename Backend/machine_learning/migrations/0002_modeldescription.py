# Generated by Django 4.0.3 on 2022-11-03 21:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('machine_learning', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModelDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.JSONField()),
                ('model', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='machine_learning.model')),
            ],
        ),
    ]
