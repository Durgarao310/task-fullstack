from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ADMIN = 'ADMIN'
    MANAGER = 'MANAGER'
    STAFF = 'STAFF'
    ROLE = [
        (ADMIN, 'admin'),
        (MANAGER, 'manager'),
        (STAFF, 'staff'), 
    ]
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    role = models.CharField(choices=ROLE, max_length=8)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username',]

    def __str__(self):
        return self.email