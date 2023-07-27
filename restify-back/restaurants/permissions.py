from pickle import FALSE
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, BasePermission

from accounts.models import Follows
from accounts.models import LikesRestaurant

from .models import Restaurant

class NotOwnOneRestaurant(BasePermission):

    message = 'You cannot own more than one restaurant'

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

class HasLikedRestaurant(BasePermission):
    message = 'You have already liked this restaurant'

    def has_permission(self, request, view):
        likes = LikesRestaurant.objects.filter(user_id=request.user.id).filter(restaurant_id=view.kwargs.get('pk'))
        return len(likes) == 0
    

class HasNotLikedRestaurant(BasePermission):
    message = 'You have not yet liked this restaurant, therefore you cannot unlike it'

    def has_permission(self, request, view):
        likes = LikesRestaurant.objects.filter(user_id=request.user.id).filter(restaurant_id=view.kwargs.get('pk'))
        return len(likes) == 1

    


class HasFollowedRestaurant(BasePermission):
    message = 'You have already followed this restaurant'

    def has_permission(self, request, view):
        follows = Follows.objects.filter(user_id=request.user.id).filter(restaurant_id=view.kwargs.get('pk'))
        return len(follows) == 0

    

class HasNotFollowedRestaurant(BasePermission):
    message = 'You have not yet followed this restaurant, therefore you cannot unfollow it'
    
    def has_permission(self, request, view):
        follows = Follows.objects.filter(user_id=request.user.id).filter(restaurant_id=view.kwargs.get('pk'))
        return len(follows) == 1

    