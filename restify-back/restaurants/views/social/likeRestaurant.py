from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.models import LikesRestaurant
from restaurants.permissions import HasLikedRestaurant
from restaurants.serializers import RestaurantLikeSerializer


class LikeRestaurantView(CreateAPIView):
  """
    post:
        Authenticated user can like another restaurant by specifying restaurant id in the url.

    """
  serializer_class = RestaurantLikeSerializer
  permission_classes = [IsAuthenticated, HasLikedRestaurant]
  queryset = LikesRestaurant.objects.all()

  def perform_create(self, serializer):
    user = self.request.user
    restaurant = get_object_or_404(Restaurant, id=self.kwargs['pk'])
    serializer.save(user=user, restaurant=restaurant)
    return super().perform_create(serializer)
