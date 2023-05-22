import datetime

from django.contrib.auth import get_user_model
from rest_framework import serializers

from authentication.serializers.user_serializer import UserSerializer
from cities.models import City
from cities.serializers import CitySerializer
from profile.models.profile import Profile, Rank, Role


class CityUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id"]


class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = "__all__"


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    mid_name = serializers.CharField(max_length=255)
    avatar = serializers.ImageField()
    birth_date = serializers.DateField()
    updated_at = serializers.DateTimeField()
    slug = serializers.SlugField(max_length=55)

    user = UserSerializer()
    city = CitySerializer()
    rank = RankSerializer()
    roles = RoleSerializer(many=True)

    class Meta:
        model = Profile
        fields = (
            "user",
            "first_name",
            "last_name",
            "mid_name",
            "avatar",
            "birth_date",
            "updated_at",
            "slug",
            "city",
            "rank",
            "roles",
        )


class UpdateUserSerializer(serializers.ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = Profile
        fields = (
            "first_name",
            "last_name",
            "mid_name",
            "avatar",
            "birth_date",
            "city",
        )

    def validate_email(self, value):
        user = self.context["request"].profile.user
        if get_user_model().objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value

    def validate_username(self, value):
        user = self.context["request"].profile.user
        if get_user_model.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({"username": "This username is already in use."})
        return value

    def update(self, instance, validate_data):
        if "first_name" in validate_data:
            instance.first_name = validate_data["first_name"]
        if "last_name" in validate_data:
            instance.last_name = validate_data["last_name"]
        if "mid_name" in validate_data:
            instance.mid_name = validate_data["mid_name"]
        if "avatar" in validate_data:
            instance.avatar = validate_data["avatar"]
        if "birth_date" in validate_data:
            instance.birth_date = validate_data["birth_date"]

        if "user" in validate_data:
            if "username" in validate_data["user"]:
                instance.user.username = validate_data["user"]["username"]
            if "email" in validate_data["user"]:
                instance.user.email = validate_data["user"]["email"]

        instance.update_at = instance.user.updated_at = datetime.datetime.now()
        instance.save()
        return instance


class ProfileChangeRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["roles"]


class ProfileChangeCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["city"]


class ProfileChangeRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["rank"]
