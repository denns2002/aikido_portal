from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import UpdateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from users.serializers.reset_password_serializer import ChangePasswordSerializer
from users.serializers.user_serializer import ActivatingSerializer


class ActivatingAPIView(UpdateAPIView):
    """
    Activating, deactivating an account
    """
    queryset = get_user_model().objects.all()
    serializer_class = ActivatingSerializer
    lookup_field = "pk"


class ChangePasswordAPIView(GenericAPIView):
    """
    Changing password for auth users in update profile page.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    model = get_user_model()

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            return Response(
                {"OK": "Password updated successfully"},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#
# class ChangeEmailAPIView(GenericAPIView):
#     """
#     Changing email for auth users in update profile page.
#     """
#
#     def post(self, request):
#         """
#         Register and send email verify if the user is not verified.
#         """
#
#         user = request.data
#         serializer = RegisterSerializer(data=user)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         user_data = serializer.data
#
#         if user['email'] and not user['is_verified']:
#             send_verify_email(user_data, request)
#
#         return Response(user_data, status=status.HTTP_201_CREATED)
#
#
# class ChangeEmailVerifyAPIView(GenericAPIView):
