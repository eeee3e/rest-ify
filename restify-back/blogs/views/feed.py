from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from blogs.serializers import BlogListSerializer
from blogs.models import Blog
from accounts.models import Follows

from rest_framework import pagination

class FeedPagination(pagination.PageNumberPagination):       
       page_size = 50


class UserFeedView(ListAPIView):
    """
    get:
        An authenticated user can retrieve list of all the blogs from restaurants
        that they follow.
    """
    serializer_class = BlogListSerializer
    #queryset = Blog.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = FeedPagination
    def get_queryset(self):
        user = self.request.user
        followed_restaurants = Follows.objects.filter(user=user).values_list('restaurant', flat=True)[::1]
        return Blog.objects.filter(restaurant__in=followed_restaurants).order_by('date_created')