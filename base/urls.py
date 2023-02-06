
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('student/',views.MyStudentView.as_view()),
    path('', views.index ),
    # path('all', views.get_students ),
    path('login/', views.MyTokenObtainPairView.as_view()),
]
