from rest_framework.generics import CreateAPIView, RetrieveAPIView

from statements.models.statement import Statement
from statements.serializers.statement import StatementSerializer


class StatementCreateAPIView(CreateAPIView):
    serializer_class = StatementSerializer
    queryset = Statement.objects.all()


class StatementDetailAPIView(RetrieveAPIView):
    serializer_class = StatementSerializer
    queryset = Statement.objects.all()
    lookup_field = "pk"
