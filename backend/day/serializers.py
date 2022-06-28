from this import d
from rest_framework import serializers
from .models import Day


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'
        lookup_field = 'slug'
