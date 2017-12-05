/************* Include Headers *******
****************/
#include "msp430.h"      // Definitions, constants, etc for msp430F449
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <in430.h>
/****************************************************/
unsigned int timer = 0;
unsigned int leap_cnt = 0;
#pragma vector = TIMERA0_VECTOR
__interrupt void Timer_B0(void)
{
if (timer==243){
  timer = 0;
  timer++;
  leap_cnt++;
}else{
  leap_cnt = 0;
}
}
void LEDOff(void);   // sets up green LED port and turns LEDs off
void LEDdisplayHex(unsigned char num);  // displays hex code for digit num
void init_sys(void);      // MSP430 Initialization routine
void main(void)
{
  int         pos = 1;
  unsigned char   lastKey=0;
  WDTCTL = WDTPW + WDTHOLD;   // Stop watchdog timer
  init_sys();                 // Initialize the MSP430
  int output[4] = {0x33, 0xC3, 0xCC, 0x3C};
  short int pointers[244] =
  {0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,
  1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1
  ,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,0,1,0
  ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1
  ,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1
  ,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,0,1,0
  ,0,0,0,0,0};
  int i;
  for (i=0;i<122;i++){
    pointers[122+i] = pointers[i]+2;
  }
  TACTL   = 0x0200 + CNTL_0 + ID_0 + MC_1;
  TACCR0  = (70);
  TACCTL0 = CCIE;
  _BIS_SR(GIE);
  while (1){
    P2DIR |= 0xFF;     // Set P2.7 - 2.4 to output direction
    P2SEL &= 0x00;
    //if (timer%2 < 1)LEDdisplayHex(0xCC);
    //else if (timer %2 >=1)LEDdisplayHex(0x33);
    LEDdisplayHex(output[pointers[timer]]);
  }
}
void LEDOff(void)
{
  P2DIR |= (BIT7|BIT6|BIT5|BIT4);     // Set P2.7-2.4 to output direction
  P2SEL &= ~(BIT7|BIT6|BIT5|BIT4);    // P2.7-2.4 I/O option
  P2OUT |= (BIT7|BIT6|BIT5|BIT4);     // P2.7-2.4 output = 1 (LEDs off)
}
void LEDdisplayHex(unsigned char num)
{
  unsigned char   tmp_num;
  tmp_num = (~num);
  P2OUT = tmp_num & 0xFF;
}
void init_sys(void)
{
//initLCD();                  // Setup LCD for work
//clearLCD();
// Clear LCD display
//setupKeypad();              // Setup Keypad ports
  LEDOff();
}
