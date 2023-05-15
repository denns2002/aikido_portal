from rest_framework import serializers

from clubs.models.group import Group, GroupMember
from profile.serializers.profile_serializer import ProfileSerializer


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class GroupMemberSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    group = GroupSerializer()

    class Meta:
        model = GroupMember
        fields = ["profile", "group"]
