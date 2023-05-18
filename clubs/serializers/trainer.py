from rest_framework import serializers

from clubs.models.group import Group, GroupMember
from profile.models.profile import Profile


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


class TrainerChangeSerializer(serializers.ModelSerializer):
    trainer_slug = serializers.SlugField(source="trainer.slug")

    class Meta:
        model = Group
        fields = ['trainer_slug']

    def update(self, instance, validated_data):
        if 'trainer' in validated_data and 'slug' in validated_data['trainer']:
            # print(validated_data)
            instance.trainer = Profile.objects.get(slug=validated_data['trainer']['slug'])
        instance.save()
        return instance
