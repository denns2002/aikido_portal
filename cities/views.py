from rest_framework import generics
from rest_framework.generics import ListCreateAPIView

from cities.models import City
from cities.serializers import CitySerializer


class CityListAPIView(ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CityDetailAPIView(generics.RetrieveAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    lookup_field = 'pk'

