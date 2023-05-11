from rest_framework import serializers

from clubs.models.group import Group, GroupMember
from clubs.serializers.group_serializer import GroupMemberSerializer
from user.admin import models
from user.models.profile import Profile
from user.serializers.profile_serializer import ProfileSerializer


class TrainerGroupsSerializer(serializers.ModelSerializer):
    groupmember_count = serializers.IntegerField(source='groupmember_set.count', read_only=True)

    # members_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Group
        fields = ('name', 'number', 'groupmember_count', 'slug')

    def get_members_count(self, language):
        return language.groupmembers.count()


class TrainerGroupMemberSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='profile.first_name', read_only=True)
    last_name = serializers.CharField(source='profile.last_name', read_only=True)
    mid_name = serializers.CharField(source='profile.mid_name', read_only=True)
    avatar = serializers.ImageField(source='profile.avatar', read_only=True)
    rank = serializers.CharField(source='profile.rank.name', read_only=True)
    slug = serializers.SlugField(source='profile.slug', read_only=True)

    # @property
    # def debts_sum(self):
    #     sum_price = self.debts_set.objects.all().aggregate(price_sum=models.Sum('debts_set.price'))
    #     return sum_price['price_sum']

    class Meta:
        model = GroupMember
        fields = ['annual_fee', 'first_name', 'last_name', 'mid_name', 'avatar', 'rank', 'slug']


class TrainerGroupDetailSerializer(serializers.ModelSerializer):
    groupmember_set = TrainerGroupMemberSerializer(read_only=True, many=True)

    class Meta:
        model = Group
        fields = ['groupmember_set', 'name']


class TrainerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class TrainerChangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ['trainer']
