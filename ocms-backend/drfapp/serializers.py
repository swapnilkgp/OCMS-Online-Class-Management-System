
from rest_framework import serializers
from .models import user
from .models import course

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = (
            'username','email','password', 'userID'
        )

class courseSerializer(serializers.ModelSerializer):
    class Meta:
        model = course
        fields = ['courseno', 'coursename']
