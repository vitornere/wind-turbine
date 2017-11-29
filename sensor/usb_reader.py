import serial
import time

connected = False
ser = None

while(connected != True):
    try:
        ser = serial.Serial('/dev/ttyACM0')
        #ser = serial.Serial(port='/dev/ttyACM0',timeout=1)
        connected = True
    except Exception:
        print("Procurando conexão usb ttyACM0...")
        connected = False
        if connected == False:
            try:
                ser = serial.Serial('/dev/ttyACM1')
                connected = True
            except Exception:
                print("Procurando conexão usb ttyACM1...")                
                connected = False
        time.sleep(5)        
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

            print(string)
            time.sleep(1)
    except Exception:
        connected = False

        while(connected != True):
            try:
                ser = serial.Serial('/dev/ttyACM0')
                #ser = serial.Serial(port='/dev/ttyACM0',timeout=1)
                connected = True
            except Exception:
                print("Procurando conexão usb ttyACM0...")
                connected = False
                if connected == False:
                    try:
                        ser = serial.Serial('/dev/ttyACM1')
                        connected = True
                    except Exception:
                        print("Procurando conexão usb ttyACM1...")
                        connected = False
                time.sleep(5)
            