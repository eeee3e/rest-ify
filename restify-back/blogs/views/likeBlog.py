from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from blogs.models import Blog
from accounts.models import LikesBlog
from blogs.permissions import HasLikedBlog
from blogs.serializers import BlogLikeSerializer


class LikeBlogView(CreateAPIView):
  """
  post:
      An authenticated user can like a blog post if they have not already done so.
  """

  serializer_class = BlogLikeSerializer
  permission_classes = [IsAuthenticated, HasLikedBlog]
  queryset = LikesBlog.objects.all()

  def perform_create(self, serializer):
    user = self.request.user
    blog = get_object_or_404(Blog, id=self.kwargs['pk'])
    serializer.save(user=user, blog=blog)
    return super().perform_create(serializer)
