from django.conf.urls import url, include
from rest_framework import routers
from turbine_data import views

router = routers.DefaultRouter()
router.register(r'turbine-data', views.TurbineDataViewSet)

urlpatterns = [
    url(r'^', include(router.urls), name='turbine-data'),
    url(
        r'^last', 
        views.getLastTurbineData, 
        name='turbine-data-last'
    ),
    url(
        r'^start_year:(?P<start_year>\d{4})&&finish_year:(?P<finish_year>\d{4})::(?P<selected_value>[\w]+)/$', 
        views.getTurbineDataByYear, 
        name='turbine-data-year'
    ),
    url(
        r'^period:(?P<period>\w+)&&start:(?P<start_date>[-\w]+)&&finish:(?P<finish_date>[-\w]+)::(?P<selected_values>[,\w]+)/$', 
        views.getTurbineDataByCompleteDate, 
        name='turbine-data-complete'
    ),
]
