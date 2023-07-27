from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse
from django.views.generic import TemplateView, ListView, FormView
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurants.permissions import CheckUserOwnsObj
from restaurants.serializers import ImageSerializer
from restaurants.models import Image


class RemoveImageView(DestroyAPIView):
    """
    delete:
        An authenticated owner can delete an image of their restaurant by specifying image id in the url.
    """
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    permission_classes = (IsAuthenticated,CheckUserOwnsObj)


    