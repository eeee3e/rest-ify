from django.contrib import admin

from .models import Image, Menu, Restaurant

# Register your models here.
admin.site.register(Restaurant)
admin.site.register(Image)
admin.site.register(Menu)