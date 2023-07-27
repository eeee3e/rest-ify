from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurants.permissions import IsOwner
from restaurants.serializers import MenuSerializer, RestaurantSerializer
from restaurants.permissions import CheckUserOwnsObj
from restaurants.models import Menu, Restaurant


class UpdateInfoView(UpdateAPIView):
    """
    put:
        An authenticeted owner can edit the general information of their restaurant.
    
    patch:
        An authenticeted owner can edit the general information of their restaurant by specifiing the fields.
    """
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()
    permission_classes = (IsAuthenticated,IsOwner)