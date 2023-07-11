from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "email",
            "is_staff",
            "is_active",
            "is_verified",
            "created_at",
            "updated_at",
        ]


class ActivatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["is_active"]
