from .serializers import VehicleSerializer
from ..models import Vehicle

from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.conf import settings

from django.contrib.auth import get_user_model

@api_view(['GET'])
def get_vehicles(request):
    vehicles = Vehicle.objects.all()
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_vehicles_from_branch(request, branch_id):
    print(branch_id)
    vehicles = Vehicle.objects.filter(branch=branch_id)
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_vehicle(request, vehicle_id):
    vehicle = Vehicle.objects.get(id=vehicle_id)
    serializer = VehicleSerializer(vehicle)
    return Response(serializer.data)