from django.forms import IntegerField
from rest_framework import serializers

from blogs.models import Blog
from accounts.models import LikesBlog



class BlogSerializer(serializers.ModelSerializer):

  restaurant = serializers.ReadOnlyField(source='restaurant.id')

  class Meta:
    model = Blog
    fields = ['restaurant', 'title', 'content', 'image']

  def validate_title(self, value):
    if len(value) > 100:
      return serializers.ValidationError("Blog title cannot exceed 100 characters")
    return value

class BlogListSerializer(serializers.ModelSerializer):
  likes = serializers.IntegerField(source='numlikes')
  class Meta:
    model = Blog
    fields = ['id', 'restaurant', 'title', 'content', 'date_created', 'image', 'likes']

class BlogDetailSerializer(serializers.ModelSerializer):
  likes = serializers.IntegerField(source='numlikes')
  class Meta:
    model = Blog
    fields = ['id', 'restaurant', 'title', 'content', 'date_created', 'image', 'likes']

class BlogLikeSerializer(serializers.ModelSerializer):
  #user = serializers.ReadOnlyField()
  class Meta:
    model = LikesBlog
    fields = []