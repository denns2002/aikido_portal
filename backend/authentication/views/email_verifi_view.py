from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model


class EmailVerifyAPIView(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get("token")
        try:
            user_data = JWTAuthentication().get_user(token)
            user = get_user_model().objects().get(email=user_data['email'])
            user.is_verified = True
            return Response({'OK': "your email has been confirmed"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'ERROR': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
