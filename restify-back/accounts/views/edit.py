from django.shortcuts import render
from rest_framework.generics import get_object_or_404, UpdateAPIView, RetrieveUpdateAPIView
import accounts
from accounts.models import User
from accounts.serializers import EditSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission
from accounts.permissions import IsOwner




class EditView(RetrieveUpdateAPIView):
    """
    put:
        Edits user profile of account with given id in url if client is owner of the acount and authenticated.

    patch:
        Edits user profile of account with given id in url with given fields if client is owner of the acount and authenticated.

    get:
        Retrieve user profile of account with given id in url if client is owner of the acount and authenticated.
    """
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,IsOwner)
    serializer_class = EditSerializer