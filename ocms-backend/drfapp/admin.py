from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(user)
admin.site.register(course)
admin.site.register(message)
admin.site.register(video)
admin.site.register(assignment)
admin.site.register(solution)
admin.site.register(grade)