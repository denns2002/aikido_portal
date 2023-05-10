from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from clubs.models.group import GroupMember
from statements.models.statement import Statement, StatementMember
from user.models.profile import Profile, Rank
from user.serializers.profile_serializer import ProfileSerializer


class StatementMemberSerializer(serializers.ModelSerializer):
    # first_name = serializers.CharField(source='member.first_name')
    # last_name = serializers.CharField(source='member.last_name')
    # mid_name = serializers.CharField(source='member.mid_name')
    # rank = serializers.CharField(source='member.rank.name')

    class Meta:
        model = StatementMember
        fields = [
            # 'first_name',
            # 'last_name',
            # 'mid_name',
            # 'rank',
            "member",
            "attestation",
            "seminar",
        ]


class StatementSerializer(serializers.ModelSerializer):
    statementmember_set = StatementMemberSerializer(many=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Statement
        fields = ["id", "created_at", "file", "statementmember_set", "event", "creator"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        print(validated_data)

        members = []
        for item in validated_data["statementmember_set"]:
            member = {}
            profile = Profile.objects.get(user=item["member"].id)
            fio = f"{str(profile.first_name)} {str(profile.last_name)}"

            if profile.mid_name:
                fio += f" {str(profile.mid_name)}"

            member["fio"] = fio
            member["rank"] = Rank.objects.get(id=profile.rank.id)
            member["next_rank"] = Rank.objects.get(id=profile.next_rank.id)

            group = GroupMember.objects.get(profile=profile.id)
            print(group)
            member["group_type"] = group.type

            trainer = group.trainer
            trainer_fio = f"{str(trainer.first_name)} {str(trainer.last_name)}"

            if profile.mid_name:
                fio += f" {str(trainer.mid_name)}"

            member["trainer_fio"] = trainer_fio

            members.append(member)
            print(members)

        # фио!, текущий ранк!, тренер фио!, группа по возрасту!, по программе, на какой аттестуется!, годовой взнос, семинар, аттестация, паспорт
        return super().create(validated_data)


# {'file': None, 'statementmember_set': [OrderedDict([('member', <User: aboba aboba@aboba.com>), ('attestation', True), ('seminar', False), ('statement', <Statement: State
# ment object (13)>)]), OrderedDict([('member', <User: 1111 1111@afe.ru>), ('attestation', True), ('seminar', True), ('statement', <Statement: Statement object (13)>)])]}
# Performing system checks...