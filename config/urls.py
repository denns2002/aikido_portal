from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Aikido Potal API",
        default_version="v0.1",
        description="be sport",
        terms_of_service="nope",
        contact=openapi.Contact(email="denis.israfilov2002@mail.ru"),
        # license=openapi.License(name="Test License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

api = "api/"

urlpatterns = [
    # SWAGGER
    path(
        api + "",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path(
        api + "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
    path(api + "admin/", include("admincustom.urls")),  # Admin
    path(api + "auth/", include("authentication.urls")),  # Authentication urls
    path(api + "profile/", include("user.urls")),  # Profile
    path(api + "events/", include("events.urls")),  # Events
    path(api + "", include("clubs.urls")),  # Clubs
    path(api + "", include("cities.urls")),  # Cities
    path(api + "notifications/", include("notifications.urls")),  # Notifications
    path(api + "statements/", include("statements.urls")),  # Statements
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
