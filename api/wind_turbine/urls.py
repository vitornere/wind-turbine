from django.conf.urls import url, include
from rest_framework import routers
from turbine_data import views

router = routers.DefaultRouter()
router.register(r'turbine-data', views.TurbineDataViewSet)

urlpatterns = [
    url(r'^', include(router.urls), name='turbine-data'),
    url(r'^turbine-data/last', views.getLastTurbineData, name='turbine-data-last'),
    url(r'^start:(?P<start_date>\d{4})&&finish:(?P<finish_date>\d{4})/$', views.getTurbineDataByDate, name='turbine-data-last'),
]
