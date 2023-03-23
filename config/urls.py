from django.conf.urls.static import static
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.conf import settings

schema_view = get_schema_view(
   openapi.Info(
      title="Aikido Potal API",
      default_version='v0.1',
      description="be sport",
      terms_of_service="nope",
      contact=openapi.Contact(email="denis.israfilov2002@mail.ru"),
      # license=openapi.License(name="Test License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

api = 'api/'

urlpatterns = [
    # SWAGGER
    path(api + '', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(api + 'redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Admin
    path(api + 'admin/', include('admincustom.urls')),

    # Authentication urls
    path(api + 'auth/', include('authentication.urls')),

    # # Profile and user info
    # path(api + 'api/profile/', include('user.urls')),

    # Events
    path(api + 'api/events/', include('events.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
