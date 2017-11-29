#!/bin/bash

msp430-gcc -Os -Wall -g -mmcu=msp430g2553 -o send_string_by_usb.elf send_string_by_usb.c
sudo mspdebug rf2500 "prog send_string_by_usb.elf"
rm send_string_by_usb.elf
