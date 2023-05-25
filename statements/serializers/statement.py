from rest_framework import serializers

from cities.models import Address
from clubs.models.club import Club
from clubs.models.group import GroupMember
from statements.models.statement import Statement, StatementMember
from profile.models.profile import Profile, Rank

import spreadsheets_api.spreads as s


class StatementMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatementMember
        fields = [
            "member",
            "attestation",
            "seminar",
        ]


class GroupStatementSerializer(serializers.ModelSerializer):
    """
    {
      "statementmember_set": [
        {
          "member": 0,
          "attestation": true,
          "seminar": true
        },

        {
          "member": 1,
          "attestation": true,
          "seminar": true
        },
      ],
      "event": 0
    }
    """

    statementmember_set = StatementMemberSerializer(many=True)

    class Meta:
        model = Statement
        fields = ["id", "created_at", "link", "statementmember_set", "event"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        members = []

        for item in validated_data["statementmember_set"]:
            profile = Profile.objects.get(user=item["member"].id)
            fio = f"{str(profile.first_name)} {str(profile.last_name)}"

            if profile.mid_name:
                fio += f" {str(profile.mid_name)}"

            groupmember = GroupMember.objects.get(profile=profile.id)
            group = groupmember.group

            trainer = group.trainer
            trainer_fio = f"{str(trainer.first_name)} {str(trainer.last_name)}"

            if trainer.mid_name:
                trainer_fio += f" {str(trainer.mid_name)}"

            event = validated_data['event']

            attestation_date = '%s/%s/%s' % (
                event.attestation_date.day,
                event.attestation_date.month,
                event.attestation_date.year)

            seminar_date = '%s/%s/%s' % (
                event.seminar_date.day,
                event.seminar_date.month,
                event.seminar_date.year)

            club = Club.objects.get(groups=group.id)
            club_name = club.name

            city = ""
            if club.addresses:
                city = club.addresses.all().first().city.name

            member = {
                "fio": fio,
                "rank": Rank.objects.get(id=profile.rank.id).name,
                "next_rank": Rank.objects.get(id=profile.next_rank.id).name,
                "annual_fee": groupmember.annual_fee,
                "group_type": 'детская',
                "trainer_fio": trainer_fio,
                "attestation_date": attestation_date,
                "seminar_date": seminar_date,
                "club": club_name,
                "city": city,
            }

            members.append(member)

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
        s.prepare_filter_set_basic_request(batch_update_structure_body)
        spreadsheet_id = s.create_sample(
            "Ведомость",
            services['service'],
            services['drive_service'],
            10 + len(members),
            batch_update_values_data,
            batch_update_structure_body,
            members[0]["city"],
            members[0]["club"]
        )
        link = "https://docs.google.com/spreadsheets/d/" + spreadsheet_id + "/edit#gid=0"

        statement = Statement(
            link=link,
            event=validated_data['event'],
            type='group'
        )
        statement.save()

        return statement


class FreeStatementSerializer(serializers.ModelSerializer):
    """
    {
      "fio": "string",

      "is_child": false
    }
    """

    fio = serializers.CharField(max_length=255)
    is_child = serializers.BooleanField(default=False)

    class Meta:
        model = Statement
        fields = ["fio", "is_child"]

    def create(self, validated_data):
        fio = validated_data['fio']
        is_child = validated_data['is_child']

        # HERE

        link = ''
        statement = Statement(
            link=link,
            event=validated_data['event'],
            type='Свободный'
        )
        statement.save()

        return statement


class EventStatementSerializer(serializers.ModelSerializer):
    """
    {
      "event": 0
    }
    """

    class Meta:
        model = Statement
        fields = ["event"]

    def create(self, validated_data):
        queryset = Statement.objects.filter(event=validated_data['event'])

        links = []

        for item in queryset:
            links.append(item.link)

        print(links)
        # HERE
        services = s.start_services('credentials.json')
        values_data = s.unite_data_spreads(links, services['service'])
        batch_data = []
        struct_data = []
        s.prepare_spreadsheet_values_data('A6:L', 'ROWS', batch_data, values_data)
        spread_id = s.create_sample('Ведомость',
                        services['service'],
                        services['drive_service'],
                        20,
                        batch_data,
                        struct_data,
                        'Екат',
                        'Солнце')
        link = f'https://docs.google.com/spreadsheets/d/{spread_id}/edit#gid=0'

        statement = Statement(
            link=link,
            event=validated_data['event'],
            type='Мероприятие'
        )
        statement.save()

        return statement
