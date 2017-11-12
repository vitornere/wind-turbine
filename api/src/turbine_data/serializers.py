from rest_framework import serializers
from .models import TurbineData

class TurbineDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TurbineData
        fields = ('wind_speed', 'electric_voltage', 'electric_current', 'mppt', 'date')