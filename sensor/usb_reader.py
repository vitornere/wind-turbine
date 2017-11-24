import serial
import time

ser = serial.Serial('/dev/ttyACM0')
#ser = serial.Serial(port='/dev/ttyACM0',timeout=1)

print("connected to: " + ser.name)

while True:
    char = ser.read()
    string = ""

    while(char != 'C'):
        char = ser.read()

    string = string + char

    while(char != 'E'):
        char = ser.read()
        string = string + char

    print(string)
    time.sleep(1)