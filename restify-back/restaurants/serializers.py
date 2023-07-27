from rest_framework import serializers

import accounts
import blogs

from restaurants.models import Image, Restaurant
from restaurants.models import Menu
from blogs.serializers import BlogSerializer

from accounts.models import Follows, LikesRestaurant, Comments

class RestaurantSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(source='owner.get_full_name', read_only=True)

    id = serializers.ReadOnlyField()

    class Meta:
        model = Restaurant
        fields = ['id', 'owner', 'name', 'phone_number', 'address', 'postal_code','description', 'schedule', 'logo', 'rating']

class MenuSerializer(serializers.ModelSerializer):

    restaurant = serializers.CharField(source='restaurant.name', read_only=True)

    class Meta:
        model = Menu
        fields = ['restaurant', 'image', 'name', 'description', 'price']

    def update(self, instance, validated_data):
        
        return super().update(instance, validated_data)


class ImageSerializer(serializers.ModelSerializer):

    restaurant = serializers.CharField(source='restaurant.name', read_only=True)


    class Meta:
        model = Image
        fields = ['restaurant', 'image']


class SearchRestaurantSerializer(serializers.ModelSerializer):
    followers = serializers.IntegerField(source='numfollowers')

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address','followers','logo', 'description']


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts.models.Comments
        fields = ['user_id', 'description']


class RestaurantInfoSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(source='owner.get_full_name', read_only=True)
    id = serializers.ReadOnlyField()
    followers = serializers.IntegerField(source='numfollowers')
    likes = serializers.IntegerField(source='numlikes')
    images = ImageSerializer(source='listimages', many=True)
    menu = MenuSerializer(source='listmenu', many=True)
    blogs = BlogSerializer(source='listblogs', many=True)
    comments = CommentsSerializer(source='listcomments', many=True)

    class Meta:
        model = Restaurant
        fields = ['id', 'owner', 'name', 'phone_number', 'address', 'postal_code','description', 'schedule', 'logo', 'rating'
        ,'followers', 'likes', 'images', 'menu', 'blogs', 'comments']


  
class RestaurantLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikesRestaurant
        fields = ['user']

class RestaurantFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follows
        fields = ['user']


class CommentRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['description']