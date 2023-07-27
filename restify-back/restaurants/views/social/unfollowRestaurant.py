from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.models import Follows
from restaurants.permissions import HasNotFollowedRestaurant
from restaurants.serializers import RestaurantFollowSerializer


class UnfollowRestaurantView(DestroyAPIView):
  """
    delete:
        Authenticated user can unfollow another restaurant by specifying id in the url.

    """
  serializer_class = RestaurantFollowSerializer
  permission_classes = [IsAuthenticated, HasNotFollowedRestaurant]
  queryset = Follows.objects.all()
  

  