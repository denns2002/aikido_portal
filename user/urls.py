from django.urls import path

from user.views.profile import MyProfileAPIView, UpdateProfileView, ProfileAPIView

urlpatterns = [
    path('profile/<slug:slug>', ProfileAPIView.as_view(), name='login'),
    path('my_profile/', MyProfileAPIView.as_view(), name='my-profile'),
    path('update_profile/<str:slug>/', UpdateProfileView.as_view(), name='update-profile'),
]
