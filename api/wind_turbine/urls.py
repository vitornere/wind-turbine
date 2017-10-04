from django.conf.urls import url, include
from rest_framework import routers
from turbine_data import views

router = routers.DefaultRouter()
router.register(r'turbine-data', views.TurbineDataViewSet)

urlpatterns = [
    url(r'^', include(router.urls), name='turbine-data'),
    url(r'^turbine-data/last', views.getLastTurbineData, name='turbine-data-last'),
    url(r'^start:(?P<start_year>\d{4})-(?P<start_month>\d{2})-(?P<start_day>\d{2})&&finish:(?P<finish_year>\d{4})-(?P<finish_month>\d{2})-(?P<finish_day>\d{2})/$', views.getTurbineDataByDate, name='turbine-data-last'),
]
