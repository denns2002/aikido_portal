from django.contrib.auth import get_user_model
from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView


class MyProfileAPIView(APIView):
    # serializer_class = ProfileSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(user)

        return Response(serializer.data)


class ProfileAPIView(RetrieveAPIView):
    queryset = get_user_model().objects.all()
    # serializer_class = ProfileSerializer
    lookup_field = 'username'


class UpdateProfileView(UpdateAPIView):
    lookup_field = 'username'
    queryset = get_user_model().objects.all()
    # serializer_class = UpdateUserSerializer

