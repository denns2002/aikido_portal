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
    group_slug = serializers.SlugField(source='group.slug')

    class Meta:
        model = GroupMember
        fields = ["group_slug"]

    def update(self, instance, validated_data):
        if 'group' in validated_data and 'slug' in validated_data['group']:
            instance.group = Group.objects.get(slug=validated_data['group']['slug'])
        instance.save()
        return instance


class GroupMemberDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = "__all__"
