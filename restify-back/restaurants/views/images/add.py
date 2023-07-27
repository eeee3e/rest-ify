from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from restaurants.serializers import ImageSerializer
from restaurants.models import Image, Restaurant


class AddImageView(CreateAPIView):
    """
    post:
        An authenticated owner can add images to their restaurant.
    """
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        user_restaurant = get_object_or_404(Restaurant,owner_id=self.request.user.id)
        serializer.save(restaurant=user_restaurant)
        return super().perform_create(serializer)