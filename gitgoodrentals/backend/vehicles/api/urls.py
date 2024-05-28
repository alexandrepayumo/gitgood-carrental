from django.urls import path, include
from .views import (get_vehicles, get_vehicles_from_branch, get_vehicle)

urlpatterns = [
    path('', get_vehicles),
    path('vehicle/<int:vehicle_id>', get_vehicle),
    path('branch/<int:branch_id>', get_vehicles_from_branch),
]