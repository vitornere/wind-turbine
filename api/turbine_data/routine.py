import time
import random
import requests

def create_new_data():
    wind_speed = random.uniform(1, 8)
    electric_voltage = random.uniform(0, 100)
    electric_current = random.uniform(0, 5)
    mppt = electric_voltage * electric_current
    print("\nMaking a post request with data = {");
    print("\twind_speed: " + str(wind_speed))
    print("\telectric_voltage: "+ str(electric_voltage)) 
    print("\telectric_current: " + str(electric_current)) 
    print("\tmppt: " + str(mppt))
    print("}")
    r = requests.post('http://127.0.0.1:8000/turbine-data/', json = { 'wind_speed':wind_speed, 
                                                      'electric_voltage':electric_voltage, 
                                                      'electric_current':electric_current, 
                                                      'mppt':mppt })
    print(r.json())

while True:
   create_new_data()
   time.sleep(1)
