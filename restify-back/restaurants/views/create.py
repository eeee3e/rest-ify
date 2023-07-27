from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurants.permissions import NotOwnOneRestaurant
from restaurants.serializers import RestaurantSerializer
from restaurants.models import Restaurant

# Create your views here.

class CreateRestaurantView(CreateAPIView):
    """
    post:
        An authenticated user can create at most one restaurant, of which I will become the owner. 
        A restaurant is created by specifying its name, address, logo, postal code, and phone number.
    """
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()
    permission_classes = (IsAuthenticated,NotOwnOneRestaurant)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return super().perform_create(serializer)


