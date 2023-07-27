from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.models import LikesRestaurant
from restaurants.permissions import HasNotLikedRestaurant
from restaurants.serializers import RestaurantLikeSerializer


class UnlikeRestaurantView(DestroyAPIView):
  """
    delete:
        Authenticated user can unlike another restaurant by specifying id in the url.
  """
  serializer_class = RestaurantLikeSerializer
  permission_classes = [IsAuthenticated, HasNotLikedRestaurant]
  queryset = LikesRestaurant.objects.all()
