from django.contrib.auth import get_user_model
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView, \
    DestroyAPIView

from clubs.models.group import Group, GroupMember
from clubs.serializers.group_serializer import GroupSerializer, GroupMemberDebtsSerializer, TrainerGroupSerializer, \
    GroupMemberChangeSerializer, GroupMemberDeleteSerializer
from clubs.serializers.trainer import TrainerGroupsSerializer, TrainerGroupDetailSerializer, TrainerChangeSerializer
from profile.models.profile import Profile


class GroupListAPIView(ListCreateAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

    # def get_queryset(self):
    #     return self.queryset.all()


class GroupDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.filter()
    lookup_field = "slug"


class TrainerGroupListAPIView(ListAPIView):
    serializer_class = TrainerGroupsSerializer

    def get_queryset(self):
        trainer = get_user_model().objects.get(id=self.request.user.id)
        groups = Group.objects.filter(trainer__id=trainer.id)

        return groups


class TrainerGroupDetailAPIView(ListAPIView):
    serializer_class = TrainerGroupDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        trainer = get_user_model().objects.get(id=self.request.user.id)
        groups = Group.objects.filter(trainer__id=trainer.id)

        return groups


class GroupMemberDebtsAPIView(ListAPIView):
    serializer_class = GroupMemberDebtsSerializer
    lookup_field = "slug"

    def get_queryset(self):
        # profile = Profile.objects.get(slug=self.request.data["slug"])
        group_members = GroupMember.objects.filter(profile__slug=self.kwargs["slug"])
        return group_members


class GroupTrainerListAPIView(ListAPIView):
    serializer_class = TrainerGroupSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Group.objects.filter(slug=self.kwargs["slug"])


class GroupTrainerChangeAPIView(UpdateAPIView):
    serializer_class = TrainerChangeSerializer
    lookup_field = "slug"
    queryset = Group.objects.all()

    # def get_queryset(self):
    #     return Group.objects.filter(slug=self.kwargs["slug"])


class GroupMemberChangeAPIView(UpdateAPIView):
    serializer_class = GroupMemberChangeSerializer
    # queryset = GroupMember.objects.all()
    lookup_field = "profile__slug"

    def get_queryset(self):
        return GroupMember.objects.filter(profile__slug=self.kwargs["profile__slug"])


class GroupMemberDeleteAPIView(DestroyAPIView):
    serializer_class = GroupMemberDeleteSerializer
    lookup_field = "profile__slug"

    def get_queryset(self):
        return GroupMember.objects.filter(profile__slug=self.kwargs["profile__slug"])
