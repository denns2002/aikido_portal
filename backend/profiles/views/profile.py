from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from profiles.models.profile import Profile
from profiles.serializers.profile_serializer import ProfileSerializer, \
    TrainerRegisterSerializer


class UserProfileAPIView(APIView):
    """
    User profile details.
    """

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


class ProfileListAPIView(ListAPIView):
    """
    All profiles by filters.
    """

    serializer_class = ProfileSerializer

    def get_queryset(self):
        queryset = Profile.objects.filter(user__is_verified=True)

        return queryset


class ProfileDetailAPIView(RetrieveUpdateAPIView):
    """
    Profile details by slug. Update profile for owner or trainer and etc.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = "slug"


class TrainerRegisterAPIView(CreateAPIView):
    serializer_class = TrainerRegisterSerializer
    queryset = Profile.objects.all()

    def post(self, request, *args, **kwargs):
        profile = request.data
        serializer = self.serializer_class(data=profile)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        return Response(user_data, status=status.HTTP_201_CREATED)
