from django.contrib import admin
from .models import Day


class DayAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date_created', )
    list_display_links = ('title', )
    list_per_page = 25


admin.site.register(Day, DayAdmin)
