from django.urls import path

from cities.views import CityDetailAPIView, CityListAPIView

urlpatterns = [
    path("<int:pk>", CityDetailAPIView.as_view(), name="city"),
    path("", CityListAPIView.as_view(), name="cities"),
]
