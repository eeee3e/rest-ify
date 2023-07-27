from pickle import FALSE
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, BasePermission
from .models import Restaurant

class NotOwnOneRestaurant(BasePermission):

    def has_permission(self, request, view):
        restaurant_owned = Restaurant.objects.filter(owner_id=request.user.id)
        return not restaurant_owned



class CheckUserOwnsObj(BasePermission):

    def has_object_permission(self, request, view, obj):
        restaurant = get_object_or_404(Restaurant,owner_id=request.user.id)
        return restaurant.id == obj.restaurant_id


class IsOwner(BasePermission):

    # for object level permissions
    def has_object_permission(self, request, view, instance):
        return instance.owner_id == request.user.id


