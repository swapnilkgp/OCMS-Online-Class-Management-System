# Generated by Django 4.1.3 on 2023-03-29 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("drfapp", "0013_alter_course_professor"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="students",
            field=models.ManyToManyField(to="drfapp.user"),
        ),
    ]
