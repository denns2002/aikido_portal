from rest_framework.generics import CreateAPIView

from phones.serializers.phone_serializer import PhoneSerinalizer


class PhoneCreateAPIView(CreateAPIView):
    serializer_class = PhoneSerinalizer
