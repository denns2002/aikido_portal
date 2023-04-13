import logging
import jwt

from django.contrib.auth import get_user_model
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from config.settings import base as settings
from config.settings import packeges
from rest_framework import status, views
from rest_framework.response import Response

from authentication.serializers.email_verify_serializer import EmailVerifySerializer


class ConfirmEmailAPIView(views.APIView):
    serializer_class = EmailVerifySerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Access token', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY,
                                 algorithms=packeges.SIMPLE_JWT['ALGORITHM'])
            user = get_user_model().objects.get(id=payload['user_id'])

            if not user.is_verified:
                user.is_verified = True
                user.save()

                return Response({'OK': 'Successfully activated'},
                                status=status.HTTP_200_OK)

            return Response({'OK': 'The account is already verified'})

        except jwt.ExpiredSignatureError as _:
            return Response({'ERROR': 'Activation expired'},
                            status=status.HTTP_400_BAD_REQUEST)

        except jwt.exceptions.DecodeError as _:
            return Response({'ERROR': 'Invalid token'},
                            status=status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            logger = logging.getLogger(__name__)
            logger.error(error)
