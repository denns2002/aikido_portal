from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken

from utils.check_language import check_ru_lang, multilang_verb


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if username is None:
            raise TypeError("Users should have a username")
        if email is None:
            raise TypeError("Users should have a Email")

        user = self.model(
            username=username,
            email=self.normalize_email(email).lower(),
            **extra_fields,
        )
        user.set_password(password)
        user.save()

    def create_superuser(self, username, password, **extra_fields):
        email = username + "@" + username + ".com"
        if password is None:
            raise TypeError("Users should have a password")
        user = self.create_user(
            username,
            email,
            password,
            is_superuser=True,
            is_staff=True,
            is_verified=True,
        )

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=255,
        unique=True,
        db_index=True,
        verbose_name=multilang_verb("Username", "Логин"),
    )
    email = models.EmailField(
        max_length=255,
        unique=True,
        db_index=True,
        verbose_name=multilang_verb("Email", "Электронная почта"),
    )
    is_staff = models.BooleanField(default=False, verbose_name=multilang_verb("Is staff", "Персонал"))
    is_active = models.BooleanField(default=True, verbose_name=multilang_verb("Is active", "Активный"))
    is_verified = models.BooleanField(
        default=False, verbose_name=multilang_verb("Is verified", "Верифицированный")
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=multilang_verb("Created at", "Создан"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=multilang_verb("Updated at", "Обновлен"))

    objects = UserManager()

    USERNAME_FIELD = "username"

    def tokens(self):
        refresh = RefreshToken.for_user(self)

        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    def __str__(self):
        return f"{str(self.username)} {str(self.email)}"

    class Meta:
        if check_ru_lang():
            verbose_name = "Пользователь"
            verbose_name_plural = "Пользователи"
        else:
            verbose_name = "User"
            verbose_name_plural = "Users"
