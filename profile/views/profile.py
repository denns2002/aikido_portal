from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, \
    get_object_or_404, GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.serializers.user_serializer import UserSerializer
from profile.models.profile import Profile
from profile.serializers.profile_serializer import (ProfileSerializer, UpdateUserSerializer)


class MyProfileAPIView(APIView):
    serializer_class = ProfileSerializer

    def get_object(self, queryset=None):
        user = self.request.user
        print(user)
        profile = Profile.objects.get(user=user.id)
        print(profile)
        return profile

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = ProfileSerializer(user)

        return Response(serializer.data)


class ProfileAPIView(RetrieveAPIView):
    serializer_class = ProfileSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Profile.objects.filter(slug=self.kwargs["slug"])


class UpdateProfileView(UpdateAPIView):
    """
    Update profile for owner or trainer and etc.
    """

    queryset = get_user_model().objects.all()
    serializer_class = UpdateUserSerializer
    lookup_field = "slug"

    def get_object(self):
        return Profile.objects.get(slug=self.kwargs["slug"])
