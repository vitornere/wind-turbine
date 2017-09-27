from rest_framework import viewsets
from .models import TurbineData
from .serializers import TurbineDataSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

@api_view(['GET'])
def getLastTurbineData(response):
        turbineData = TurbineData.objects.last()

        if turbineData is not None:
            serialize = TurbineDataSerializer(turbineData)

            return Response(serialize.data, status.HTTP_200_OK)
        else:
            return Response({}, status.HTTP_200_OK)
    
class TurbineDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allow TurbineData to be viewed or edited.
    """
    queryset = TurbineData.objects.all()
    serializer_class = TurbineDataSerializer
