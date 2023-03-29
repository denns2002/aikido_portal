from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from mailings.email_verification import send_verify_email
from authentication.models.user import UserManager
from authentication.serializers.reg_serializer import RegisterSerializer


class RegisterAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.data

        try:
            UserManager().create_user(user_data['username'], user_data['email'], user_data['password'])
            send_verify_email(user_data, request)

        except Exception as e:
            return Response({'ERROR': e}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)
