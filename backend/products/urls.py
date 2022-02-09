from rest_framework.routers import DefaultRouter
from django.urls import path, include
from products import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
