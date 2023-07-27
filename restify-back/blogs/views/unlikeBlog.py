from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from blogs.models import Blog
from accounts.models import LikesBlog
from blogs.permissions import HasNotLikedBlog
from blogs.serializers import BlogLikeSerializer


class UnlikeBlogView(DestroyAPIView):
  """
  delete:
      An authenticated user can unlike a blog post they have currently liked.
  """
  serializer_class = BlogLikeSerializer
  queryset = LikesBlog.objects.all()
  permission_classes = [IsAuthenticated, HasNotLikedBlog]

