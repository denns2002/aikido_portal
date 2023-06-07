from django.urls import path

from cities.views import CityDetailAPIView, CityListAPIView, \
    AddressCreateAPIView

urlpatterns = [
    path("<int:pk>/", CityDetailAPIView.as_view(), name="city"),
    path("", CityListAPIView.as_view(), name="cities"),
    path("address-create", AddressCreateAPIView.as_view(), name="address-create"),
]
