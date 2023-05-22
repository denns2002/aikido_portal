from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response

from statements.models.statement import Statement
from statements.serializers.statement import GroupStatementSerializer, FreeStatementSerializer, EventStatementSerializer


class StatementCreateAPIView(CreateAPIView):
    serializer_classes = {
        'group': GroupStatementSerializer,
        'free': FreeStatementSerializer,
        'event': EventStatementSerializer
    }
    serializer_class = serializer_classes['group']
    queryset = Statement.objects.all()

    def post(self, request, *args, **kwargs):
        # self.serializer_class = self.serializer_classes['event']
        #
        # if request.user.is_authenticated:
        #     if request.user.rank.name == 'Тренер':
        #         self.serializer_class = self.serializer_classes['group']
        #
        #     if request.user.rank.name == 'Руководитель':
        #         self.serializer_class = self.serializer_classes['event']

        return self.create(request, *args, **kwargs)


class StatementDetailAPIView(RetrieveAPIView):
    serializer_class = GroupStatementSerializer
    queryset = Statement.objects.all()
    lookup_field = "pk"
