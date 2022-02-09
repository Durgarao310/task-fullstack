from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    message = 'Adding customers not allowed.'
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN' 


class IsManagerorAdmin(permissions.BasePermission):
    message = 'Adding customers not allowed.'
    def has_permission(self, request, view):
        return request.user.role == 'MANAGER' or request.user.role == 'ADMIN'



