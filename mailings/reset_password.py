import logging

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from mailings.send_mail import send_email


def send_reset_password(user, request):
    try:
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        current_site = get_current_site(request=request).domain
        relative_link = reverse('password-reset-confirm',
                               kwargs={'uidb64': uidb64, 'token': token})
        absurl = f'https://{current_site}{relative_link}'
        email_body = 'Hello, \n Use link below to reset your password  \n' + absurl
        data = {
            'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Reset your passsword'
        }

        send_email(data)

    except Exception as error:
        logger = logging.getLogger(__name__)
        logger.error(error)
