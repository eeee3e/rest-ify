from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurants.serializers import MenuSerializer
from restaurants.permissions import CheckUserOwnsObj
from restaurants.models import Menu, Restaurant


class UpdateMenuView(UpdateAPIView):
    """
    put:
        An authenticated owner can update a menu item on their menu.
    patch:
        An authenticated owner can update a menu item on their menu by specifying fields.

    """
    serializer_class = MenuSerializer
    queryset = Menu.objects.all()
    permission_classes = (IsAuthenticated,CheckUserOwnsObj)

    