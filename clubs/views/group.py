from django.contrib.auth import get_user_model
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

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
    lookup_field = "slug"


class TrainerGroupListAPIView(ListAPIView):
    serializer_class = GroupSerializer

    def get_queryset(self):
        trainer = get_user_model().objects.get(id=self.request.user.id)
        groups = Group.objects.filter(trainers__id=trainer.id)

        return groups
