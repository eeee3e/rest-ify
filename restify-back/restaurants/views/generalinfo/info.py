from django.shortcuts import render
from restaurants.serializers import RestaurantInfoSerializer
from restaurants.models import Restaurant
from rest_framework.generics import get_object_or_404, RetrieveAPIView
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class InfoView(RetrieveAPIView):
    """
    get:
        An authenticated user can retrieve info about a restaurant by specifying restaurant id in the url
    """
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantInfoSerializer
    permission_classes = (IsAuthenticated,)



