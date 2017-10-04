from rest_framework import viewsets
from .models import TurbineData
from .serializers import TurbineDataSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import datetime

@api_view(['GET'])
def getLastTurbineData(response):
        turbineData = TurbineData.objects.last()

        if turbineData is not None:
            serialize = TurbineDataSerializer(turbineData)

            return Response(serialize.data, status.HTTP_200_OK)
        else:
            return Response({}, status.HTTP_200_OK)

@api_view(['GET'])
def getTurbineDataByCompleteDate(response, start_year, start_month, start_day, finish_year, finish_month, finish_day ):
    #turbineData = TurbineData.objects.filter(date__year__range=(start_year, finish_year))

    turbineData = TurbineData.objects.filter(
        date__range=(
            datetime.datetime(int(start_year), int(start_month), int(start_day), 0, 0, 0),
            datetime.datetime(int(finish_year), int(finish_month), int(finish_day), 23, 59, 59) 
        )
    )

    if turbineData is not None:
        return Response(turbineData.values(), status.HTTP_200_OK)        
    else:
        return Response({}, status.HTTP_404_OK)

class TurbineDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allow TurbineData to be viewed or edited.
    """
    queryset = TurbineData.objects.all()
    serializer_class = TurbineDataSerializer
