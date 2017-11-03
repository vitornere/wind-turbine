import time
import random
import requests

def create_new_data():
    wind_speed = "%.2f" % random.uniform(1, 10)
    electric_voltage = "%.2f" % random.uniform(1, 10)
    electric_current = "%.2f" % random.uniform(1, 10)
    mppt = "%.2f" % random.uniform(1, 10)
    print("\nMaking a post request with data = {");
    print("\twind_speed: " + wind_speed)
    print("\telectric_voltage: "+ electric_voltage) 
    print("\telectric_current: " + electric_current) 
    print("\tmppt: " + mppt)
    print("}")
    r = requests.post('http://10.0.0.1/turbine-data/', data = { 'wind_speed':wind_speed, 
                                                      'electric_voltage':electric_voltage, 
                                                      'electric_current':electric_current, 
                                                      'mppt':mppt })

while True:
   create_new_data()
   time.sleep(1)
