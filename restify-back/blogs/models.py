from django.db import models
from django.db.models import CASCADE

from accounts.models import LikesBlog





# Create your models here.


class Blog(models.Model):
  restaurant = models.ForeignKey(to="restaurants.Restaurant", on_delete=CASCADE, related_name='blog')
  title = models.CharField(max_length=100)
  content = models.TextField()
  date_created = models.DateField(auto_now_add=True)
  image = models.ImageField(upload_to='blog_images/', null=True)

  class Meta:
    ordering = ['date_created']

  def numlikes(self):
    likes = len(LikesBlog.objects.filter(blog_id=self.id))
    return likes

  def __str__(self):
    return f'{self.title} by {self.restaurant}'