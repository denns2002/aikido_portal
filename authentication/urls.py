# from django.urls import path, include, re_path
# from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
#
#
# urlpatterns = [
#     # Default Auth URLs
#     path('login/', LoginAPIView.as_view(), name='login'),
#     path('logout/', LogoutAPIView.as_view(), name='logout'),
#     path('register/', RegisterAPIView.as_view(), name='register'),
#
#     # Registration verification
#     path('email-verify/', EmailVerifyAPIView.as_view(), name='email-verify'),
#
#     # Reset password
#     path('change-password/', ChangePasswordAPIView.as_view(), name='change-password'),
#     path('request-pass-reset/', RequestPasswordResetAPIView.as_view(), name='request-pass-reset'),
#     path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
#     path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
#
#     # Tokens
#     path('verify/', TokenVerifyView.as_view(), name='token-verify'),
#     path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
# ]
