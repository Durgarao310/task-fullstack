from django.shortcuts import render
from products.models import Products
from products.permissions import IsAdmin, IsManagerorAdmin
from products.serializers import ProductsSerializer
from rest_framework.viewsets import  ModelViewSet


class ProductViewSet(ModelViewSet):
    serializer_class = ProductsSerializer
    queryset = Products.objects.all()

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAdmin]
        elif self.action == 'list':
            permission_classes = [IsManagerorAdmin]
        elif self.action == 'retrieve' or self.action == 'update':
            permission_classes = [IsManagerorAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsManagerorAdmin]
        return [permission() for permission in permission_classes]
