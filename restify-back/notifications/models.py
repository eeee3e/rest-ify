from django.db import models
from django.db.models import SET_NULL
from django.db.models import CASCADE

# Create your models here.


class Notification(models.Model):
      user = models.ForeignKey(to="accounts.User", null=True, on_delete=CASCADE, related_name='notification')
      description = models.TextField(max_length=200)

      class Meta:
         unique_together = ('user' , 'id')

      def __str__(self):
            return "user " + self.user + " has notification " + self.description