from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from notifications.models import Notification
from notifications.serializers import AddNotificationSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# Create your views here.



class AddNotificationView(CreateAPIView):
    """
    post:
        Creates a new notification for the specified user with the specified description
    """
    serializer_class = AddNotificationSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)
    queryset = Notification.objects.all()