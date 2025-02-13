from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('rooms/', views.get_rooms)
]