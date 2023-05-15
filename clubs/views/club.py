from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView, UpdateAPIView)

from clubs.models.club import Club
from clubs.serializers.club_serializer import ClubSerializer, ArchiveClubSerializer


class ClubListAPIView(ListCreateAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.filter()

    def get_queryset(self):
        return self.queryset.all()


class ClubDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.filter()
    lookup_field = "slug"


class ArchiveClubAPIView(UpdateAPIView):
    serializer_class = ArchiveClubSerializer
    queryset = Club.objects.all()
    lookup_field = "slug"
