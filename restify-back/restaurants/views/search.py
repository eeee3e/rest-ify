from django.shortcuts import render
from restaurants.serializers import SearchRestaurantSerializer
from restaurants.models import Restaurant
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView, ListCreateAPIView
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class SearchView(ListAPIView):
    """
    get:
        Authenticated user can search through restaurants by their name, foods, or address. Most popular restaurants should come up first in the results.
        You could search by sending a query parameter in the url with the key 'search'.
    """
    search_fields = ['name','address','menu__name']
    filter_backends = (filters.SearchFilter,)
    queryset = Restaurant.objects.all()
    serializer_class = SearchRestaurantSerializer
    permission_classes = (IsAuthenticated,)
    ordering = ('followers',)




