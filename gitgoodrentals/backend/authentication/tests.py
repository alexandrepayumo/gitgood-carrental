from django.test import TestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

class TokenTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(email='test@example.com', password='testpassword')

    def test_token_create_and_delete(self):
        # Create a token for the user
        token = Token.objects.create(user=self.user)
        self.assertIsNotNone(token)

        # Check that the token was created
        self.assertTrue(Token.objects.filter(user=self.user).exists())

        # Delete the token
        token.delete()

        # Check that the token was deleted
        self.assertFalse(Token.objects.filter(user=self.user).exists())