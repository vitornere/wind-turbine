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
def getTurbineDataByCompleteDate(response, period, start_date, finish_date, selected_values):
    selected_values = selected_values.split(',')
    init_date = start_date.split('-')
    end_date = finish_date.split('-')

    turbineData = TurbineData.objects.filter(
        date__range=(
            datetime.datetime(int(init_date[0]), int(init_date[1]), int(init_date[2]), 0, 0, 0),
            datetime.datetime(int(end_date[0]), int(end_date[1]), int(end_date[2]), 23, 59, 59)
        )
    )
    
    if turbineData is not None:
        labels = {}
        for i in selected_values:
            if (i=='date'):
                labels.update({'date':'Data'})
            if (i=='wind_speed'):
                labels.update({'wind_speed': 'Velocidade do Vento'})
            if (i=='electric_voltage'):
                labels.update({'electric_voltage' : 'Tensão'})
            if (i=='electric_current'):
                labels.update({'electric_current': 'Corrente'})
            if (i=='mppt'):
                labels.update({'mppt': 'Potência'})
        context = list(turbineData.values(*selected_values))
        context.insert(0, labels)
        return Response(context, status.HTTP_200_OK)        
    else:
        return Response({}, status.HTTP_404_OK)

@api_view(['GET'])
def getTurbineDataByYear(response, start_year, finish_year ):
    turbineData = TurbineData.objects.filter(
        date__year__range=(start_year, finish_year)
    )
    if turbineData is not None:
        return Response(turbineData.values(), status.HTTP_200_OK)        
    else:
        return Response({}, status.HTTP_404_OK)

@api_view(['GET'])
def getTurbineDataByMonth(response, year, start_month, finish_month ):
    turbineData = TurbineData.objects.filter(
        date__range=(
            datetime.datetime(int(year), int(start_month), 1, 1),
            datetime.datetime(int(year), int(finish_month), 30, 23) 
        )
    )
    if turbineData is not None:
        return Response(turbineData.values(), status.HTTP_200_OK)        
    else:
        return Response({}, status.HTTP_404_OK)

@api_view(['GET'])
def getTurbineDataByDay(response, start_year, start_month, start_day):
    turbineData = TurbineData.objects.filter(
        date__range=(
            datetime.datetime(int(start_year), int(start_month), int(start_day), 0, 0, 0),
            datetime.datetime(int(start_year), int(start_month), int(start_day), 23, 59, 59) 
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
