import serial
import time
import requests

connected = False
ser = None
count = 0
MAX_COUNT = 100

while(connected != True):
    try:
        ser = serial.Serial('/dev/ttyACM0')
        #ser = serial.Serial(port='/dev/ttyACM0',timeout=1)
        connected = True
    except Exception:
        print("Procurando conexao usb ttyACM0...")
        connected = False
        if connected == False:
            try:
                ser = serial.Serial('/dev/ttyACM1')
                connected = True
            except Exception:
                print("Procurando conexao usb ttyACM1...")                
                connected = False
                #time.sleep(5)
while True:
    try:
        print("connected to: " + ser.name)

        while True:
            char = ser.read().decode('utf-8')
            string = ""

            while(char != 'C'):
                char = ser.read().decode('utf-8')

            string = string + char

            while(char != 'E'):
                char = ser.read().decode('utf-8')
                string = string + char

            #print(count)
            if count >= MAX_COUNT:
                print(string)
                count = 0
                i = 1
                if string[i] == '0' and string[i+1] == 'T':
                    electric_current = 0.0
                    i += 1            
                else:
                    while(string[i] != 'T'):
                        i += 1
                    electric_current = (float(string[1:i])-272)*0.0092

                j = i+1
                i = j
                if string[i] == '0' and string[i+1] == 'E':
                    electric_voltage = 0.0
                else:
                    while(string[j] != 'E'):
                        j += 1
                    electric_voltage = float(string[i:j])*0.5898
                
                mppt = electric_voltage * electric_current
                print('\nMaking a post request with data = {')
                print('\twind_speed: 0.00')
                print('\telectric_current: {0:.4f}'.format(electric_current)) 
                print('\telectric_voltage: {0:.4f}'.format(electric_voltage)) 
                print('\tmppt: {0:.4f}'.format(mppt))
                print('}')
                r = requests.post('http://127.0.0.1:8000/turbine-data/', json = { 'wind_speed':'0.000', 
                                                                'electric_voltage':'{0:.4f}'.format(electric_voltage), 
                                                                'electric_current':'{0:.4f}'.format(electric_current), 
                                                            'mppt':'{0:.4f}'.format(mppt) })
                print(r.json())
            else:
                count += 1

    except Exception:
        connected = False

        while(connected != True):
            try:
                ser = serial.Serial('/dev/ttyACM0')
                #ser = serial.Serial(port='/dev/ttyACM0',timeout=1)
                connected = True
            except Exception:
                print("Procurando conexao usb ttyACM0...")
                connected = False
                if connected == False:
                    try:
                        ser = serial.Serial('/dev/ttyACM1')
                        connected = True
                    except Exception:
                        print("Procurando conexao usb ttyACM1...")
                        connected = False
                        #time.sleep(5)
