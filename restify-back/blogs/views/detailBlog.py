from rest_framework.generics import RetrieveUpdateDestroyAPIView
from blogs.models import Blog
from blogs.serializers import BlogDetailSerializer
from blogs.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class DetailBlogView(RetrieveUpdateDestroyAPIView):
    """
    get:
        An authenticated user can retrieve info about a blog by specifying the blog id in the url

    put:
        An authenticated owner can update it's blog by specifying id in the url and all required fields

    patch:
        An authenticated owner can partially update it's blog by specifying id in the url and all desired fields

    delete:
        An authenticated owner can delete their blog by specifying the blog id.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]