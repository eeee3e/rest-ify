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
from restaurants.views.menu.add import AddMenuItemView
from restaurants.views.menu.update import UpdateMenuView
from restaurants.views.images.add import AddImageView
from restaurants.views.images.remove import RemoveImageView
from restaurants.views.search import SearchView
from restaurants.views.generalinfo.edit import UpdateInfoView
from restaurants.views.generalinfo.info import InfoView
from restaurants.views.social.likeRestaurant import LikeRestaurantView
from restaurants.views.social.unlikeRestaurant import UnlikeRestaurantView
from restaurants.views.social.followRestaurant import FollowRestaurantView
from restaurants.views.social.unfollowRestaurant import UnfollowRestaurantView
from restaurants.views.social.comments import CommentsRestaurantView

urlpatterns = [
    path('create/', CreateRestaurantView.as_view(), name='create-restaurant'),
    path('search/', SearchView.as_view(), name='search-restaurant'),
    path('edit/<int:pk>/', UpdateInfoView.as_view(), name='edit-restaurant-info'),
    path('info/<int:pk>/', InfoView.as_view(), name='restaurant-info'),
    path('menu/add/', AddMenuItemView.as_view(), name='add-menu-item'),
    path('menu/update/<int:pk>/', UpdateMenuView.as_view(), name='update-menu-item'),
    path('images/add/', AddImageView.as_view(), name='add-image'),
    path('images/remove/<int:pk>/', RemoveImageView.as_view(), name='remove-image'),
    path('<int:pk>/like/', LikeRestaurantView.as_view(), name='like-restaurant'),
    path('<int:pk>/unlike/', UnlikeRestaurantView.as_view(), name='unlike-restaurant'),
    path('<int:pk>/follow/', FollowRestaurantView.as_view(), name='follow-restaurant'),
    path('<int:pk>/unfollow/', UnfollowRestaurantView.as_view(), name='unfollow-restaurant'),
    path('<int:pk>/comment/', CommentsRestaurantView.as_view(), name='comment-restaurant'),
]
