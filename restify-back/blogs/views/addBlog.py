from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant

from blogs.permissions import IsOwnerOrReadOnly
from rest_framework.generics import get_object_or_404, CreateAPIView
from restaurants.models import Restaurant

from blogs.serializers import BlogSerializer
from blogs.models import Blog

# Create your views here.

class AddBlogView(CreateAPIView):
    """
    post:
        An authenicated owner can post a blog to their restaurant by specifying the fields.
    """
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        user_restaurant = get_object_or_404(Restaurant,owner_id=self.request.user.id)
        serializer.save(restaurant=user_restaurant)
        return super().perform_create(serializer)
