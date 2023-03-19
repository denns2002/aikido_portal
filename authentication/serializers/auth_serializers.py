from django.contrib.auth import get_user_model
from rest_framework import serializers


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=68, write_only=True)
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'tokens']

    @staticmethod
    def get_tokens(self, obj):
        user = get_user_model().objects.get(username=obj['username'])
        tokens = user.tokens()

        return {
            'REFRESH': tokens['refresh'],
            'ACCESS': tokens['access']
        }

    def validate(self, attrs):
        user = get_user_model().objects.filter(email=attrs.get('username')).first() \
               or get_user_model().objects.filter(username=attrs.get('username')).first()









