from rest_framework import serializers

from clubs.models.group import Group, GroupMember, Debts
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


class DebtsSerializer(serializers.ModelSerializer):
    remainder = serializers.IntegerField(source='get_remainder', read_only=True)

    class Meta:
        model = Debts
        fields = ['name', 'price', 'paid', 'is_active', 'remainder']


class GroupMemberDebtsSerializer(serializers.ModelSerializer):
    debts_set = DebtsSerializer(read_only=True, many=True)

    class Meta:
        model = GroupMember
        fields = ['debts_set']


class TrainerGroupSerializer(serializers.ModelSerializer):
    trainer = ProfileSerializer(read_only=True)

    class Meta:
        model = Group
        fields = ['trainer']


class GroupMemberChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = ["group"]
