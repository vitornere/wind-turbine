import factory  
import factory.django
from .models import TurbineData

class TurbineFactorty(factory.django.TurbineData):
    class Meta:
        model = TurbineData

