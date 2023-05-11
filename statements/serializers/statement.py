from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from clubs.models.group import GroupMember
from statements.models.statement import Statement, StatementMember
from user.models.profile import Profile, Rank
from user.serializers.profile_serializer import ProfileSerializer

import spreadsheets_api.spreads as s


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
            member["rank"] = Rank.objects.get(id=profile.rank.id).name
            member["next_rank"] = Rank.objects.get(id=profile.next_rank.id).name

            groupmember = GroupMember.objects.get(profile=profile.id)
            member['annual_fee'] = groupmember.annual_fee
            group = groupmember.group
            member["group_type"] = group.type

            trainer = group.trainer
            trainer_fio = f"{str(trainer.first_name)} {str(trainer.last_name)}"

            if trainer.mid_name:
                trainer_fio += f" {str(trainer.mid_name)}"

            member["trainer_fio"] = trainer_fio

            event = validated_data['event']

            member["attestation_date"] = event.attestation_date
            member["seminar_date"] = event.seminar_date

            members.append(member)

        print(members)

        services = s.start_services('credentials.json')
        batch_update_structure_body = {"requests": []}
        batch_update_values_data = []
        values = []
        for i in range(len(members)):
            inside_values = [i+1,
                             members[i]['fio'],
                             members[i]['rank'],
                             members[i]['trainer_fio'],
                             members[i]['group_type'],
                             'program group?',
                             members[i]['next_rank'],
                             members[i]['annual_fee'],
                             members[i]['seminar_date'],
                             members[i]['attestation_date'],
                             'passport?',
                             'notes'
                             ]
            values.append(inside_values)
        s.prepare_spreadsheet_values_data(f'A7:L{6+len(members)}',
                                          "ROWS",
                                          batch_update_values_data,
                                          values)
        spreadsheet_id = s.create_sample(
            "Ведомость",
            services['service'],
            services['drive_service'],
            10 + len(members),
            batch_update_values_data,
            batch_update_structure_body,
        )
        link = "https://docs.google.com/spreadsheets/d/" + spreadsheet_id + "/edit#gid=0"


        # фио!, текущий ранк!, тренер фио!, группа по возрасту!, по программе, на какой аттестуется!, годовой взнос, семинар, аттестация, паспорт
        return super().create(validated_data)


# {'file': None, 'statementmember_set': [OrderedDict([('member', <User: aboba aboba@aboba.com>), ('attestation', True), ('seminar', False), ('statement', <Statement: State
# ment object (13)>)]), OrderedDict([('member', <User: 1111 1111@afe.ru>), ('attestation', True), ('seminar', True), ('statement', <Statement: Statement object (13)>)])]}
# Performing system checks...
