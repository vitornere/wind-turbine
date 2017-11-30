#!/bin/bash

msp430-gcc -Os -Wall -g -mmcu=msp430g2553 -o uart3.elf uart3.c
sudo mspdebug rf2500 "prog uart3.elf"
rm uart3.elf
