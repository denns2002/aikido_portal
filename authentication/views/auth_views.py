# import jwt
# from django.contrib.auth import get_user_model
# from rest_framework import generics, status
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
#
# from authentication.serializers.auth_serializers import *
# from mailings.email_verification import send_verify_email
#
#
# class LoginAPIView(generics.GenericAPIView):
#     permission_classes = [AllowAny]
#     serializer_class = LoginSerializer
#
#     def post(self, request):
#         user = request.data
#         serializer = self.serializer_class(data=user)
#         serializer.is_valid(raise_exception=True)
#         user_data = serializer.data
#         username = user_data['username']
#
#         try:
#             user = get_user_model().objects.get(username=username)
#
#             if not user.is_verified:
#                 send_verify_email({'email': user.mail}, request)
#
#                 return Response({
#                     'OK': f'Hello, {user}! We sent you a confirmation email.'
#                 }, status=status.HTTP_200_OK)
#
#         except Exception as e:
#             return Response({'ERROR': e}, status=status.HTTP_400_BAD_REQUEST)
#
#         return Response(serializer.data, status=status.HTTP_200_OK)
