from rest_framework.permissions import BasePermission, SAFE_METHODS

from restaurants.models import Restaurant
from accounts.models import LikesBlog


class IsOwnerOrReadOnly(BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.restaurant.owner == request.user

class HasLikedBlog(BasePermission):

    message = 'You have already liked this blog'

    def has_permission(self, request, view):
        likes = LikesBlog.objects.filter(user_id=request.user.id).filter(blog_id=view.kwargs.get('pk'))
        return len(likes) == 0


class HasNotLikedBlog(BasePermission):

    message = 'You have not yet liked this blog, therefore you cannot unlike it'

    def has_permission(self, request, view):
        likes = LikesBlog.objects.filter(user_id=request.user.id).filter(blog_id=view.kwargs.get('pk'))
        return len(likes) == 1
