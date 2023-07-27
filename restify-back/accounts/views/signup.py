from django.shortcuts import render
from rest_framework.generics import get_object_or_404, CreateAPIView
from accounts.models import User
from accounts.serializers import SignUpSerializer
from rest_framework.permissions import AllowAny




class SignUpView(CreateAPIView):
    """
    post:
        Registers user in the database with given valid fields.
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer
    
   