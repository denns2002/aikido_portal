from rest_framework import generics
from rest_framework.generics import ListCreateAPIView, CreateAPIView

from cities.models import City, Address
from cities.serializers import CitySerializer, AddressSerializer


class CityListAPIView(ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class AddressCreateAPIView(CreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CityDetailAPIView(generics.RetrieveAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    lookup_field = "pk"
