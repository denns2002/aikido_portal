from rest_framework import serializers

from cities.models import City, Region, Address


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ["name"]


class CitySerializer(serializers.ModelSerializer):
    region = RegionSerializer()

    class Meta:
        model = City
        fields = ["region", "name", "id"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
