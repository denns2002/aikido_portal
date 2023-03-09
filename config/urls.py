from django.conf.urls.static import static
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from config import settings

schema_view = get_schema_view(
   openapi.Info(
      title="Interesnee HR API",
      default_version='v1',
      description="Swagger api for all endpoints for HR.",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="denis.israfilov2002@mail.ru"),
      # license=openapi.License(name="Test License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('api/admin/', include('admincustom.urls')),
    path('api/user/', include('user.urls')),

    # SWAGGER
    path('api/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )