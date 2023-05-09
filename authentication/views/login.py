import logging

from django.contrib.auth import get_user_model
from drf_yasg.inspectors import SwaggerAutoSchema
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from authentication.serializers.login_serializer import LoginSerializer
from utils.email_verification import send_verify_email


class LoginAPIView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    @swagger_auto_schema(
        auto_schema=SwaggerAutoSchema,
        security=[],
        operation_id="login",
        operation_description="Login.",
        tags=["login"],
    )
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.data
        username = user_data["username"]

        try:
            user = get_user_model().objects.get(username=username)
            if not user.is_verified:
                send_verify_email({"email": user.email}, request)

                return Response(
                    {"OK": f"Hello, {user}! We sent you a confirmation email"},
                    status=status.HTTP_200_OK,
                )

        except Exception as error:
            logger = logging.getLogger(__name__)
            logger.error(error)
            return Response({"ERROR": "Server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.data, status=status.HTTP_200_OK)
