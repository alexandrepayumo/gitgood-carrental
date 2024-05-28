from django.urls import path, include
from .views import (get_all_users, create_user, delete_user, update_user, get_user, get_user_by_id)

urlpatterns = [
    path('', get_all_users),
    path('create/', create_user),
    path('find/', get_user),
    path('get/<int:user_id>/', get_user_by_id),
    path('<int:user_id>/delete/', delete_user),
    path('<int:user_id>/update/', update_user),
]