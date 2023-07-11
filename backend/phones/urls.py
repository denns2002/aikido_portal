from django.urls import path

from phones.views.phone_view import PhoneCreateAPIView


urlpatterns = [
    path('', PhoneCreateAPIView.as_view(), name="phone-create"),
]
