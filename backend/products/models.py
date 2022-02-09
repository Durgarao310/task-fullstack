from django.db import models
from users.models import User
# Create your models here.


class Products(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=90)
    price = models.CharField(max_length=90)
    description = models.TextField()
    count = models.CharField(max_length=90)


    class Meta:
        ordering = ['created']
