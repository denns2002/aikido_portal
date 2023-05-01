from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authentication.serializers.logout_serializer import LogoutSerializer


class LogoutAPIView(generics.GenericAPIView):
    """You need an access token for headers and a refresh token for the form."""

    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"OK": "Bye!"}, status=status.HTTP_204_NO_CONTENT)
