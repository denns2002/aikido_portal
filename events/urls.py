from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView


urlpatterns = [
    # Default Auth URLs
    # path('', EventListAPIView.as_view(), name='event'),
    # path('<slug:slug>/', EventDetailAPIView.as_view(), name='event-detail')
]
