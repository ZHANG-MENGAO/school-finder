from rest_framework import serializers
from .models import School


class SchoolListSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'name', 'level', 'address', 'latitude', 'longitude', 'distance', 'eta']


class SchoolDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
