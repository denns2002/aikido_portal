from rest_framework import serializers

from clubs.models.club import Club


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = "__all__"


class ArchiveClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ["is_active"]
