# Generated by Django 4.1.3 on 2023-03-28 20:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("drfapp", "0010_alter_course_professor"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="course",
            name="professor",
        ),
    ]