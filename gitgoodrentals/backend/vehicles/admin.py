from django.contrib import admin

from .models import Vehicle
from .forms import VehicleCreationForm, VehicleChangeForm

class VehicleAdmin(admin.ModelAdmin):
    add_form = VehicleCreationForm
    form = VehicleChangeForm
    model = Vehicle
    list_display = ("model", 'brand', 'year', 'price', 'color','category','mileage', 'branch')
    list_filter = ("model", 'brand', 'year', 'price', 'color','category','mileage', 'branch')
    fieldsets = (
        (None, {"fields": ("model", "brand", "year", "price", "color",'category','mileage', 'branch')}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("model", "brand", "year", "price", "color",'category','mileage', 'branch')}
        ),
    )
    search_fields = ("model", "brand")
    ordering = ("brand",)

admin.site.register(Vehicle, VehicleAdmin)