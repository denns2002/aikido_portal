from drf_yasg.inspectors import SwaggerAutoSchema
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.response import Response

from authentication.serializers.register_serializer import RegisterSerializer
from utils.email_verification import send_verify_email


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    @swagger_auto_schema(
        auto_schema=SwaggerAutoSchema,
        security=[],
        operation_id="register",
        operation_description="Register and send email verify.",
        tags=["register"],
    )
    def post(self, request):
        user = request.data
        serializer = RegisterSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        send_verify_email(user_data, request)

        return Response(user_data, status=status.HTTP_201_CREATED)
