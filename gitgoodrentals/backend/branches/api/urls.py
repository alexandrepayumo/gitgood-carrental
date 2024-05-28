from django.urls import path, include
from .views import (get_branches, get_branch)

urlpatterns = [
    path('', get_branches),
    path('<int:branch_id>/', get_branch)
]