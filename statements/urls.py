from django.urls import path

from statements.views.statement import (StatementCreateAPIView,
                                        StatementDetailAPIView)

urlpatterns = [
    path("", StatementCreateAPIView.as_view(), name="statement-create"),
    # path("", StatementUploadAPIView.as_view(), name="statement-upload"),
    path("<int:pk>", StatementDetailAPIView.as_view(), name="statement-detail"),
]
