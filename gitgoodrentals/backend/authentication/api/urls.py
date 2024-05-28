from django.urls import path, include
from .views import (login, logout)

urlpatterns = [
    path('login/', login),
    path('logout/', logout)
]