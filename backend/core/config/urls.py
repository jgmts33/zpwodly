from django.contrib import admin
from django.urls import path
from django.urls import include
from django.conf import settings

from rest_framework import routers

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/", include("dj_rest_auth.urls")),
    path("api/v1/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns = [
    path(settings.BASE_URL, include(urlpatterns)),
]
