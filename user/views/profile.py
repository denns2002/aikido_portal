from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models.profile import Profile
from user.serializers.profile_serializer import ProfileSerializer, UpdateUserSerializer


class MyProfileAPIView(APIView):
    serializer_class = ProfileSerializer

    def get_object(self, queryset=None):
        return Profile.objects.get(user=self.request.user.id)

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(user)

        return Response(serializer.data)


class ProfileAPIView(RetrieveAPIView):
    serializer_class = ProfileSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Profile.objects.filter(slug=self.kwargs["slug"])


class UpdateProfileView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UpdateUserSerializer
    lookup_field = "slug"

    def get_object(self):
        return Profile.objects.get(slug=self.kwargs["slug"])
