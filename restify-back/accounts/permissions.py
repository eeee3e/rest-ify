from rest_framework.permissions import IsAuthenticated, BasePermission



class IsOwner(BasePermission):
    # for view permission
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    # for object level permissions
    def has_object_permission(self, request, view, instance):
        return instance.id == request.user.id