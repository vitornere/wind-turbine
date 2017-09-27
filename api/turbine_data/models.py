from django.db import models

class TurbineData(models.Model):
    wind_speed = models.FloatField()
    electric_voltage = models.FloatField()
    electric_current = models.FloatField()
    mppt = models.FloatField()
    date = models.DateTimeField(auto_now=False, auto_now_add=True)
