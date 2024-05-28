from django.urls import path, include
from .views import (get_reservations, create_reservation, delete_reservation, update_reservation, get_all_reservations, get_reservation)

urlpatterns = [
    path('', get_reservations),
    path('all/', get_all_reservations),
    path('create/', create_reservation),
    path('<int:reservation_id>/', get_reservation),
    path('<int:reservation_id>/delete/', delete_reservation),
    path('<int:reservation_id>/update/', update_reservation),
]