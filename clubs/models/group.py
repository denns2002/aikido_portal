from django.contrib.auth import get_user_model
from django.db import models
from django.utils.crypto import get_random_string
from transliterate import slugify, translit

from profile.models.profile import Profile
from utils.check_language import check_ru_lang, multilang_verb


class Group(models.Model):
    name = models.CharField(max_length=255, verbose_name=multilang_verb("Name", "Название"))
    number = models.IntegerField(unique=True, verbose_name=multilang_verb("Number", "Номер"))
    trainer = models.ForeignKey(
        Profile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=multilang_verb("Trainer", "Тренер"),
    )
    slug = models.SlugField(max_length=55, blank=True, verbose_name=multilang_verb("URL", "Ссылка"))

    def save(self, *args, **kwargs):
        if not self.slug:
            slug = str(self.name) + str(self.number)
            slug = translit(slug[:10], language_code="ru", reversed=True)
            slug = str(slugify(slug)) + get_random_string(length=10)

            while Group.objects.filter(slug=slug).exists():
                slug = slug + get_random_string(length=10)

            self.slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return "№" + str(self.number) + " - " + str(self.name)

    class Meta:
        if check_ru_lang():
            verbose_name = "Группа"
            verbose_name_plural = "Группы"
        else:
            verbose_name = "Group"
            verbose_name_plural = "Groups"


class GroupMember(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name=multilang_verb("Group", "Группа"))
    profile = models.ForeignKey(
        Profile,
        unique=True,
        on_delete=models.CASCADE,
        verbose_name=multilang_verb("Profile", "Профиль"),
    )
    annual_fee = models.BooleanField(
        default=False, verbose_name=multilang_verb("Annual Fee", "Ежегодная выплата")
    )

    class Meta:
        if check_ru_lang():
            verbose_name = "Участник группы"
            verbose_name_plural = "Участники группы"
        else:
            verbose_name = "Group Member"
            verbose_name_plural = "Group Members"


class Debts(models.Model):
    member = models.ForeignKey(
        GroupMember,
        on_delete=models.CASCADE,
        verbose_name=multilang_verb("Member", "Участник"),
    )
    is_active = models.BooleanField(default=True, verbose_name=multilang_verb("Is active", "Активна"))
    name = models.CharField(max_length=255, verbose_name=multilang_verb("Name", "Название"))
    price = models.IntegerField(default=0, verbose_name=multilang_verb("Price", "Стоимость"))
    paid = models.IntegerField(default=0, verbose_name=multilang_verb("Paid", "Выплачено"))

    def get_remainder(self):
        return int(self.price) - int(self.paid)

    class Meta:
        if check_ru_lang():
            verbose_name = "Задолжность"
            verbose_name_plural = "Задолжности"
        else:
            verbose_name = "Debt"
            verbose_name_plural = "Debts"
