from django.dispatch import receiver
from rest_framework import serializers

from notifications.models import Notification

class NotificationSerializer(serializers.ModelSerializer):

    receiver = serializers.CharField(source='user.get_full_name', read_only=True)

    id = serializers.ReadOnlyField()

    class Meta:
        model = Notification
        fields = ['id', 'receiver', 'description']

class AddNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['user', 'description']