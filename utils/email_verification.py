import logging

from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from utils.send_mail import send_email


def send_verify_email(user_data, request):
    try:
        user = get_user_model().objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token
        domain = get_current_site(request).domain
        relative_link = reverse('confirm-email')
        url = f'https://{domain}{relative_link}?token={str(token)}'

        email_body = 'Hi, ' + user.username + '!\nUse link to verify your email. \n' + url

        data = {
            'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Verify your email'
        }
        send_email(data)

    except Exception as error:
        logger = logging.getLogger(__name__)
        logger.error(error)







