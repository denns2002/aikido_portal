from django.urls import path

from cities.views import CityDetailAPIView, CityListAPIView

urlpatterns = [
    path("city/<int:pk>", CityDetailAPIView.as_view(), name="city"),
    path("cities/", CityListAPIView.as_view(), name="cities"),
]
