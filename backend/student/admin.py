from django.contrib import admin
from .models import Student


class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'date_created', )
    list_display_links = ('user', )
    list_per_page = 25


admin.site.register(Student, StudentAdmin)
