from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from blogs.serializers import BlogListSerializer
from blogs.models import Blog


class ListBlogView(ListAPIView):
    """
    get:
        All users can retrieve list of all available blogs.
    """
    serializer_class = BlogListSerializer
    queryset = Blog.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]