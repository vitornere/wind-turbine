#!/bin/bash

msp430-gcc -Os -Wall -g -mmcu=msp430g2553 -o msp_get_data_and_send_to_api.elf msp_get_data_and_send_to_api.c
sudo mspdebug rf2500 "prog msp_get_data_and_send_to_api.elf"
rm msp_get_data_and_send_to_api.elf
