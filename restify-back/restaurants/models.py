from django.db import models
from django.db.models import SET_NULL
from django.db.models import CASCADE

import accounts
import blogs





# Create your models here.



class Restaurant(models.Model):
    owner = models.OneToOneField(to="accounts.User", on_delete=CASCADE, null=True, related_name='restaurant')
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=12)
    address = models.TextField(max_length=200)
    logo = models.ImageField(upload_to='restaurant_logos/')
    postal_code = models.TextField(max_length=200)
    description = models.TextField(max_length=200,null=True,blank=True)
    schedule = models.TextField(max_length=200,null=True, blank=True)
    rating = models.IntegerField(null=True,blank=True)
    
    def __str__(self):
        return self.name

    def numfollowers(self):
        followers = len(accounts.models.Follows.objects.filter(restaurant_id=self.id))
        return followers

    def numlikes(self):
        likes = len(accounts.models.LikesRestaurant.objects.filter(restaurant_id=self.id))
        return likes

    def listimages(self):
        images = Image.objects.filter(restaurant_id=self.id)
        return images

    def listmenu(self):
        menu = Menu.objects.filter(restaurant_id=self.id)
        return menu

    def listcomments(self):
        comments = accounts.models.Comments.objects.filter(restaurant_id=self.id)
        return comments

    def listblogs(self):
        blogs_list = blogs.models.Blog.objects.filter(restaurant_id=self.id)
        return blogs_list

    

    
    


class Image(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, null=True, on_delete=CASCADE, related_name='image')
    image = models.ImageField(upload_to='restaurant_images/')

    class Meta:
        unique_together = ('restaurant' , 'id')

    def __str__(self):
        return f'{self.restaurant} posted image {self.id}'


class Menu(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, null=True, on_delete=CASCADE, related_name='menu')
    image = models.ImageField(upload_to='restaurant_menu/')
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        unique_together = ('restaurant' , 'id')

    def __str__(self):
        return self.restaurant + " added to menu " + self.name



