from django.contrib import admin

from .models import Reservation
from .forms import ReservationCreationForm, ReservationChangeForm

class ReservationAdmin(admin.ModelAdmin):
    add_form = ReservationCreationForm
    form = ReservationChangeForm
    model = Reservation
    list_display = ('id', 'user','vehicle','start_date','end_date', 'extra_equipment', 'created_on', 'checked_in', 'checked_out', 'cancelled')
    list_filter = ('id', 'user','vehicle','start_date','end_date', 'extra_equipment', 'created_on', 'checked_in', 'checked_out', 'cancelled')
    fieldsets = (
        (None, {"fields": ('user','vehicle','start_date','end_date', 'extra_equipment', 'checked_in', 'checked_out', 'cancelled')}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ('user','vehicle','start_date','end_date', 'extra_equipment')}
        ),
    )
    search_fields = ('id', 'start_date','end_date', 'extra_equipment', 'checked_in', 'checked_out', 'cancelled')
    ordering = ('id', 'user','vehicle','start_date','end_date', 'extra_equipment', "created_on", 'checked_in', 'checked_out', 'cancelled')

admin.site.register(Reservation, ReservationAdmin)