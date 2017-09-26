from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import TurbineData

class TurbineDataTests(APITestCase):
    url = '/turbine-data/'

    def test_creste_turbine_data(self):
        """
        Ensure we can create a new turbine data object.
        """
        data = {
            "wind_speed": 1.89,
            "electric_voltage": 3.56,
            "electric_current": 10.0,
            "mppt": 5.45
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TurbineData.objects.count(), 1)
        self.assertEqual(TurbineData.objects.last().wind_speed, 1.89)
        self.assertEqual(TurbineData.objects.last().electric_voltage, 3.56)
        self.assertEqual(TurbineData.objects.last().electric_current, 10.0)
        self.assertEqual(TurbineData.objects.last().mppt, 5.45)


    def test_get_all_turbine_data(self):
        """
        Ensure we can get all turbine data objects
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])