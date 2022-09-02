# Generated by Django 3.2.8 on 2021-10-23 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='school',
            name='ccas',
        ),
        migrations.AddField(
            model_name='school',
            name='ccs',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='school',
            name='courses',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='school',
            name='cutoff',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='school',
            name='subjects',
            field=models.JSONField(blank=True, null=True),
        ),
    ]