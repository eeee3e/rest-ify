from django.shortcuts import render
from rest_framework.generics import ListAPIView
from notifications.models import Notification
from notifications.serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.



class NotificationsView(ListAPIView):
    """
    get:
        Retrieves list of notification of authenticated user
    """
    
    serializer_class = NotificationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        userid = self.request.user.id
        queryset = Notification.objects.all().filter(user_id=userid)
        return queryset
    