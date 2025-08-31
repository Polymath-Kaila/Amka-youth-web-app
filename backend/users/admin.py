from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Profile", {"fields": ("phone","region","age","gender","interests")}),
    )
    list_display = ("username","email","first_name","last_name","region","age","gender")
    search_fields = ("username","email","first_name","last_name","phone")
