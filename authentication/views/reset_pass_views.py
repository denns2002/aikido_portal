from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import DjangoUnicodeDecodeError, smart_str
from django.utils.http import urlsafe_base64_decode
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from authentication.serializers.reset_pass_serializer import (
    ChangePasswordSerializer, ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer)
from utils.reset_password import send_reset_password


class ChangePasswordAPIView(GenericAPIView):
    """
    Changing password with.
    """

    serializer_class = ChangePasswordSerializer
    model = get_user_model()

    @swagger_auto_schema(
        tags=["password"],
    )
    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            return Response({"OK": "Password updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetAPIView(GenericAPIView):
    """
    Send password reset link with tokens to email.
    """

    serializer_class = ResetPasswordEmailRequestSerializer

    @swagger_auto_schema(
        operation_description="Send email for reset email.",
        tags=["password"],
    )
    def post(self, request):
        email = request.data.get("email", "")

        if get_user_model().objects.filter(email=email).exists():
            user = get_user_model().objects.get(email=email)
            send_reset_password(user, request)

            return Response(
                {"OK": "We have sent you a link to reset your password"},
                status=status.HTTP_200_OK,
            )

        return Response({"ERROR": "This email isn't registered"}, status=status.HTTP_404_NOT_FOUND)


class PasswordTokenCheckAPI(GenericAPIView):
    """
    Validate uidb64 and token.
    """

    serializer_class = SetNewPasswordSerializer

    @swagger_auto_schema(
        operation_description="Token and uid verification",
        tags=["password"],
    )
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise DjangoUnicodeDecodeError

            return Response({"OK": True, "message": "Valid", "uidb64": uidb64, "token": token})

        except DjangoUnicodeDecodeError:
            return Response(
                {"error": "Token is not valid, please request a new one"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SetNewPasswordAPIView(GenericAPIView):
    """
    Patch new password (needs uidb64 and token).
    """

    serializer_class = SetNewPasswordSerializer

    @swagger_auto_schema(
        operation_description="Change password from email",
        tags=["password"],
    )
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"OK": True, "message": "Password reset success"}, status=status.HTTP_200_OK)
