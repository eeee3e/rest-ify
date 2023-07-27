from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.models import Comments
from restaurants.permissions import HasFollowedRestaurant
from restaurants.serializers import CommentRestaurantSerializer


class CommentsRestaurantView(CreateAPIView):
    """
    post:
        An authenticated user can comment on a restaurant by specifying restaurant id in the url and description field in the body.
    """
    serializer_class = CommentRestaurantSerializer
    permission_classes = [IsAuthenticated, ]
    queryset = Comments.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['pk'])
        serializer.save(user=user, restaurant=restaurant)
        return super().perform_create(serializer)
