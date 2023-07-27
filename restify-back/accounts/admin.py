from xml.etree.ElementTree import Comment
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Comments, Follows, LikesBlog, LikesRestaurant, User

# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Follows)
admin.site.register(LikesRestaurant)
admin.site.register(Comments)
admin.site.register(LikesBlog)
