"""restify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from restaurants.views.create import CreateRestaurantView


from blogs.views.addBlog import AddBlogView
from blogs.views.detailBlog import DetailBlogView
from blogs.views.listBlog import ListBlogView
from blogs.views.feed import UserFeedView
from blogs.views.likeBlog import LikeBlogView
from blogs.views.unlikeBlog import UnlikeBlogView

urlpatterns = [
    path('add/', AddBlogView.as_view(), name='add-blog'),
    path('<int:pk>/', DetailBlogView.as_view(), name='detail-blog'),
    path('', ListBlogView.as_view(), name='list-blog'),
    path('feed/', UserFeedView.as_view(), name='user-feed'),
    path('<int:pk>/like/', LikeBlogView.as_view(), name='like-blog'),
    path('<int:pk>/unlike/', UnlikeBlogView.as_view(), name='unlike-blog'),

]