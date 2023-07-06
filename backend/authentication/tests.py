import requests
from rest_framework.reverse import reverse_lazy
from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from authentication.models.user import User
from rest_framework_simplejwt import authentication


class UserTests(APITestCase):
    not_verified_user = {'username': 'testuser1',
                         'password': 'testuser1testuser1',
                         'password2': 'testuser1testuser1',
                         'email': 'testuser1@mail.ru'}
    verified_user = {'username': 'testuser2',
                     'password': 'testuser2testuser2',
                     'password2': 'testuser2testuser2',
                     'email': 'testuse2@mail.ru',
                     'is_verified': True}
    test_user3 = {'username': 'testuser3',
                  'password': 'testuser3testuser3',
                  'password2': 'testuser3testuser3',
                  'email': 'testuser3@mail.ru',
                  'is_verified': True}

    def setUp(cls):
        User.objects.create_user(username=UserTests.not_verified_user['username'],
                                 password=UserTests.not_verified_user['password'],
                                 email=UserTests.not_verified_user['email'])
        User.objects.create_user(username=UserTests.verified_user['username'],
                                 password=UserTests.verified_user['password'],
                                 email=UserTests.verified_user['email'],
                                 is_verified=UserTests.verified_user['is_verified'])

    # region login
    def test_login_correct(self):
        client = APIClient()
        response = UserTests.login(client,
                                   UserTests.not_verified_user['username'],
                                   UserTests.not_verified_user['password'])
        self.assertEqual(response.status_code, 200)
        self.assertTrue('testuser1' in response.data or response.data['OK'])

    def test_login_username_only(self):
        client = APIClient()
        response = client.post(reverse_lazy('login'),
                               {'username': UserTests.not_verified_user['username']},
                               format='json')
        self.assertEqual(response.status_code, 400)

    def test_login_nonexistent(self):
        client = APIClient()
        response = UserTests.login(client, 'nonexistent_user', 'secret')
        self.assertEqual(response.status_code, 401)

    def test_login_incorrect_password(self):
        client = APIClient()
        response = UserTests.login(client, UserTests.not_verified_user['username'], 'secret')
        self.assertEqual(response.status_code, 401)

        # endregion

        # region logout

    def test_logout_correct(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        client.credentials(HTTP_AUTHORIZATION='JWT ' + tokens['access'])
        response = client.post(reverse_lazy('logout'), {'refresh': tokens['refresh']}, format='json')
        self.assertEqual(response.status_code, 204)

    def test_logout_not_authenticated(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        response = client.post(reverse_lazy('logout'), {'refresh': tokens['refresh']}, format='json')
        self.assertEqual(response.status_code, 401)

    def test_logout_bad_refresh_token(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        client.credentials(HTTP_AUTHORIZATION='JWT ' + tokens['access'])
        with self.assertRaises(AssertionError):
            response = client.post(reverse_lazy('logout'), {'refresh': tokens['refresh'][:-5]}, format='json')

    # endregion

    # region register
    def test_register_correct(self):
        response = self.client.post(reverse_lazy('register'),
                                    {'email': UserTests.test_user3['email'],
                                     'username': UserTests.test_user3['username'],
                                     'password': UserTests.test_user3['password'],
                                     'password2': UserTests.test_user3['password2']},
                                    format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['email'], UserTests.test_user3['email'])
        self.assertTrue(User.objects.get(email=UserTests.test_user3['email']))

    def test_register_incorrect_email(self):
        response = self.client.post(reverse_lazy('register'),
                                    {'email': 'testuser4mail',
                                     'username': UserTests.test_user3['username'],
                                     'password': UserTests.test_user3['password'],
                                     'password2': UserTests.test_user3['password2']},
                                    format='json')
        self.assertEqual(response.status_code, 400)

    def test_register_weak_password(self):
        response = self.client.post(reverse_lazy('register'),
                                    {'email': UserTests.test_user3['email'],
                                     'username': UserTests.test_user3['username'],
                                     'password': 'open',
                                     'password2': 'open'},
                                    format='json')
        self.assertEqual(response.status_code, 400)

    def test_register_different_password(self):
        response = self.client.post(reverse_lazy('register'),
                                    {'email': UserTests.test_user3['email'],
                                     'username': UserTests.test_user3['username'],
                                     'password': UserTests.test_user3['password'],
                                     'password2': 'uberR_PasSw0Rd!'},
                                    format='json')
        self.assertEqual(response.status_code, 400)

    def test_register_duplicate_email(self):
        response = self.client.post(reverse_lazy('register'),
                                    {'email': UserTests.verified_user['email'],
                                     'username': UserTests.test_user3['username'],
                                     'password': UserTests.test_user3['password'],
                                     'password2': UserTests.test_user3['password2']},
                                    format='json')
        self.assertEqual(response.status_code, 400)

    def test_register_duplicate_username(self):
        response = self.client.post(reverse_lazy('register'),
                                    {'email': UserTests.test_user3['email'],
                                     'username': UserTests.not_verified_user['username'],
                                     'password': UserTests.test_user3['password'],
                                     'password2': UserTests.test_user3['password2']},
                                    format='json')
        self.assertEqual(response.status_code, 400)

    # endregion

    # def test_confirm_email(self):
    #     self.assertTrue(False, 'Сначала тест надо написать')

    # region request_password_reset
    def test_request_password_reset_correct(self):
        response = self.client.post(reverse_lazy('request-pass-reset'),
                                    {'email': UserTests.verified_user['email']},
                                    format='json')
        self.assertEqual(response.status_code, 200)

    def test_request_password_reset_nonexistent_email(self):
        response = self.client.post(reverse_lazy('request-pass-reset'),
                                    {'email': 'nonexistent@mail.ru'},
                                    format='json')
        self.assertEqual(response.status_code, 404)

    def test_request_password_reset_not_verified(self):
        response = self.client.post(reverse_lazy('request-pass-reset'),
                                    {'email': UserTests.not_verified_user['email']},
                                    format='json')
        self.assertEqual(response.status_code, 200)

    # endregion

    # def test_password_reset_confirm(self):
    #     self.assertTrue(False, 'Сначала тест надо написать')

    # def test_password_reset_complete(self):
    #     self.assertTrue(False, 'Сначала тест надо написать')

    # region change_password
    def test_change_password_correct(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        client.credentials(HTTP_AUTHORIZATION='JWT ' + tokens['access'])
        new_password = 'testuser222'
        response = client.patch(reverse_lazy('change-password'),
                                {'old_password': UserTests.verified_user['password'],
                                 'password': new_password,
                                 'password2': new_password},
                                format='json')
        self.assertEqual(response.status_code, 200)

        client.post(reverse_lazy('logout'), {'refresh': tokens['refresh']}, format='json')
        response = UserTests.login(client, UserTests.verified_user['username'], new_password)
        self.assertEqual(response.status_code, 200)

    def test_change_password_not_verified_email(self):
        client = APIClient()
        response = UserTests.login(client,
                                   UserTests.not_verified_user['username'],
                                   UserTests.not_verified_user['password'])
        self.assertFalse('tokens' in response.data)

        with self.assertRaises(NotImplementedError):
            new_password = 'ForCe_pasSw0rd1'
            response = client.patch(reverse_lazy('change-password'),
                                    {'old_password': UserTests.not_verified_user['password'],
                                     'password': new_password,
                                     'password2': new_password},
                                    format='json')

        response = UserTests.login(client, UserTests.not_verified_user['username'], new_password)
        self.assertEqual(response.status_code, 401)

    def test_change_password_different_new_password(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        client.credentials(HTTP_AUTHORIZATION='JWT ' + tokens['access'])
        new_password = 'testuser222'
        response = client.patch(reverse_lazy('change-password'),
                                {'old_password': UserTests.verified_user['password'],
                                 'password': new_password,
                                 'password2': 'Other_passw0rd'},
                                format='json')
        self.assertEqual(response.status_code, 400)

        client.post(reverse_lazy('logout'), {'refresh': tokens['refresh']}, format='json')
        response = UserTests.login(client, UserTests.verified_user['username'], new_password)
        self.assertEqual(response.status_code, 401)

    def test_change_password_incorrect_old_password(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        client.credentials(HTTP_AUTHORIZATION='JWT ' + tokens['access'])
        new_password = 'testuser222'
        response = client.patch(reverse_lazy('change-password'),
                                {'old_password': 'wrong_passw0rd',
                                 'password': new_password,
                                 'password2': new_password},
                                format='json')
        self.assertEqual(response.status_code, 400)

        client.post(reverse_lazy('logout'), {'refresh': tokens['refresh']}, format='json')
        response = UserTests.login(client, UserTests.verified_user['username'], new_password)
        self.assertEqual(response.status_code, 401)

    def test_change_password_weak_new_password(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        client.credentials(HTTP_AUTHORIZATION='JWT ' + tokens['access'])
        new_password = 'open'
        response = client.patch(reverse_lazy('change-password'),
                                {'old_password': UserTests.verified_user['password'],
                                 'password': new_password,
                                 'password2': new_password},
                                format='json')
        self.assertEqual(response.status_code, 400)

        client.post(reverse_lazy('logout'), {'refresh': tokens['refresh']}, format='json')
        response = UserTests.login(client, UserTests.verified_user['username'], new_password)
        self.assertEqual(response.status_code, 401)

    def test_change_password_not_authenticated(self):
        client = APIClient()
        tokens = UserTests.login(client,
                                 UserTests.verified_user['username'],
                                 UserTests.verified_user['password']).data['tokens']
        with self.assertRaises(NotImplementedError):
            new_password = 'open'
            response = client.patch(reverse_lazy('change-password'),
                                    {'old_password': UserTests.verified_user['password'],
                                     'password': new_password,
                                     'password2': new_password},
                                    format='json')

        client.post(reverse_lazy('logout'), {'refresh': tokens['refresh']}, format='json')
        response = UserTests.login(client, UserTests.verified_user['username'], new_password)
        self.assertEqual(response.status_code, 401)

    # endregion

    @staticmethod
    def login(client, username, password):
        return client.post(reverse_lazy('login'),
                           {'username': username, 'password': password},
                           format='json')
