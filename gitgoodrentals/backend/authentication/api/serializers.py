from rest_framework import serializers
from django.contrib.auth import get_user_model

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'first_name', 'last_name']