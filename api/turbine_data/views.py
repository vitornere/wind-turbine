from rest_framework import viewsets
from .models import TurbineData
from .serializers import TurbineDataSerializer

class TurbineDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allow TurbineData to be viewed or edited.
    """
    queryset = TurbineData.objects.all().order_by('date')
    serializer_class = TurbineDataSerializer