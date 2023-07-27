from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import SET_NULL
from django.db.models import CASCADE

# Create your models here.

class User(AbstractUser):
    phone_number = models.CharField(max_length=12)
    avatar = models.ImageField(upload_to='user_avatar/')
    def __str__(self):
        return self.username
    
class Follows(models.Model):
    user = models.ForeignKey(to=User, null=True, on_delete=CASCADE, related_name='userfollow')
    restaurant = models.ForeignKey(to="restaurants.Restaurant", null=True, on_delete=CASCADE, related_name='restaurantfollow')

    class Meta:
         unique_together = ('restaurant' , 'user')

    def __str__(self):
        return f'user "{self.user}" follows "{self.restaurant}" restaurant'

class LikesRestaurant(models.Model):
    user = models.ForeignKey(to=User, null=True, on_delete=CASCADE, related_name='userlike')
    restaurant = models.ForeignKey(to="restaurants.Restaurant", null=True, on_delete=CASCADE, related_name='restaurantlike')

    class Meta:
         unique_together = ('restaurant' , 'user')

    def __str__(self):
        return "user " + self.user + " likes " + self.restaurant + " restaurant"

class Comments(models.Model):
    user = models.ForeignKey(to=User, null=True, on_delete=CASCADE, related_name='usercomment')
    restaurant = models.ForeignKey(to="restaurants.Restaurant", null=True, on_delete=CASCADE, related_name='restaurantcomments')
    description = models.TextField(max_length=200)

    def __str__(self):
        return "user " + self.user + " comments " + self.description + " on " + self.Restaurant.name + " restaurant"

class LikesBlog(models.Model):
    user = models.ForeignKey(to=User, null=True, on_delete=CASCADE, related_name='userlikesblog')
    blog = models.ForeignKey(to="blogs.Blog", null=True, on_delete=CASCADE, related_name='blogliked')

    class Meta:
         unique_together = ('blog' , 'user')

    def __str__(self):
        return f'User: "{self.user}" likes Blog: "{self.blog}"'


