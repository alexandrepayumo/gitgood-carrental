from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.forms.models import model_to_dict

from .serializers import AuthUserSerializer


# @api_view(['POST'])
# def login(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
#     user = authenticate(email=email, password=password)
#     if user is None:
#         return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)
#     token, created = Token.objects.get_or_create(user=user)
#     return Response({'token': token.key}, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(email=email, password=password)
    if user is None:
        return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)
    token, create = Token.objects.get_or_create(user=user)

    user_serializer = AuthUserSerializer(user)
    # user_dict = model_to_dict(User.objects.get(email=email))


    return Response({'token': token.key, 'user': user_serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    # Delete the token
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)