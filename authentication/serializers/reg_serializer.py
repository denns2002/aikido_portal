from django.contrib.auth import get_user_model
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=68, write_only=True)
    email = serializers.EmailField()

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email']

    def is_he_just_register(self):
        #здесь, наверное должна быть соответсвующая провер_очка, но пока лень
        return False
