from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse


def send_email(data):
    """Sends a confirmation link by email. (refresh token)"""
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        to=[data['to_email']],
        from_email=settings.EMAIL_HOST_USER + settings.EMAIL_DOMAIN,
    )
    email.send()
