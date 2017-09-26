from django.conf.urls import url, include
from rest_framework import routers
from turbine_data import views

router = routers.DefaultRouter()
router.register(r'turbine-data', views.TurbineDataViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]
