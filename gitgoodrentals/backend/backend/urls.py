"""
Defines the routes of the Django API.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.api.urls')),
    path('auth/', include('authentication.api.urls')),
    path('reservations/', include('reservations.api.urls')),
    path('vehicles/', include('vehicles.api.urls')),
    path('branches/', include('branches.api.urls')),
]

admin.site.site_header = "GitGood Rentals System Administration"
