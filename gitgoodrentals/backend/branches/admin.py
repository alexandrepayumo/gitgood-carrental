from django.contrib import admin
from django_google_maps import widgets as map_widgets
from django_google_maps import fields as map_fields

from .models import Branch
from .forms import BranchCreationForm, BranchChangeForm 

class BranchAdmin(admin.ModelAdmin):
    add_form = BranchCreationForm
    form = BranchChangeForm
    model = Branch
    list_display = ('name', 'address', 'geolocation')
    list_filter = ('name',)
    fieldsets = (
        (None, {"fields": ('name', 'address', 'geolocation')}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ('name', 'address', 'geolocation')}
        ),
    )
    search_fields = ('name',)
    ordering = ('name',)

    formfield_overrides = {
        map_fields.AddressField: {'widget': map_widgets.GoogleMapsAddressWidget},
    }

admin.site.register(Branch, BranchAdmin)