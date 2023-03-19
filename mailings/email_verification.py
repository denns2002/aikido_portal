from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist
from mailings.send_mail import send_email


def send_verify_email(user_data, request):
    try:
        user = get_user_model().objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relative_link = reverse('email_verify')
        abs_url = 'http://' + current_site + relative_link + "?token=" + str(token)
        email_body = 'Hi, ' + user.username + '!\nUse link to verify your email. \n' + abs_url

        data = {
            'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Verify your email'
        }
        send_email(data)

    except Exception as e:
        raise e







