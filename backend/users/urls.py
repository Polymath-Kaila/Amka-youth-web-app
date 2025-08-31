from django.urls import path
from .views import RegisterView, MeView, MyTokenObtainPairView, MyTokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("jwt/create/", MyTokenObtainPairView.as_view(), name="jwt-create"),
    path("jwt/refresh/", MyTokenRefreshView.as_view(), name="jwt-refresh"),
    path("me/", MeView.as_view(), name="me"),
]
