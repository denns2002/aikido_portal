from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from clubs.models.group import Group
from clubs.serializers.group_serializer import GroupSerializer


class GroupListAPIView(ListCreateAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.filter()

    def get_queryset(self):
        return self.queryset.all()


class GroupDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.filter()
    lookup_field = 'slug'
