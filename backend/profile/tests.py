from rest_framework.reverse import reverse_lazy
from rest_framework.test import APITestCase, APIRequestFactory
from authentication.models.user import User
from profile.models.profile import Profile

class UserTests(APITestCase):
    def setUp(cls):
        user = User.objects.create(username='testuser1',
                                 password='testuser1testuser1',
                                 email='testuser1@mail.ru')

        profile = Profile.objects.create()
