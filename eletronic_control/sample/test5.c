#include  <msp430g2553.h>

#define pwmPeriod 100               // carrier of 2.5kHz and reference of 50Hz. PWM period is 0.4 ms.

const unsigned int phalfcycle[25] = {200, 223, 245, 266, 287, 306, 323, 339, 352, 363, 371, 377, 380, 380, 377, 371, 363, 352, 339, 323, 306, 287, 266, 245, 223};

unsigned int pulsecounterA0 = 0;
unsigned int pulsecounterA1 = 0;

void main(void)
{
  WDTCTL = WDTPW + WDTHOLD;                 // Stop WDT

 //Calibrate DCO for 1MHz operation
  BCSCTL1 = CALBC1_1MHZ;
  DCOCTL = CALDCO_1MHZ;

 P1OUT &= 0x00;                                // Setting all pins as low
 P2OUT &= 0x00;

 P1DIR |= BIT2 + BIT6;                         // PWM Outputs
 P2DIR |= BIT1 + BIT2;

 P1SEL |= BIT2;
 P2SEL |= BIT1;

 TACCR0  = pwmPeriod - 1;                       // setting PWM period to 0.4 ms, 400-1 clock ticks of SMCLK
 TA1CCR0 = pwmPeriod - 1;

 TACCTL0  = CCIE;                               // Enable Timer A0 Interrupt for CCR0
 TA1CCTL0 = CCIE;

 TACCTL1 = OUTMOD_2;                           // RESET/SET for Timer A0 CCR1
 TA1CCTL1 = OUTMOD_6;


 TACTL = TASSEL_2 +  MC_1 + TACLR;             // Timer_A0 control register with SMCLK = 1 MHz, Upmode. Starting the timer
 TA1CTL = TASSEL_2 + MC_1 + TACLR;

 _BIS_SR(LPM0_bits + GIE);                 // Enter LPM0 w/ interrupt
}

// Timer A0 interrupt service routine
// #pragma is a catch-all preprocessor directive that is used to extend the functionality of the compiler that is not already covered by predefined directives.
//In this code, the compiler (and the linker) is being told that we are going to create an ISR for TIMER0_A0_VECTOR.
#pragma vector=TIMER0_A0_VECTOR
__interrupt void Timer_A0 (void)
{
    //TACCTL1 = OUTMOD_7;

   if (pulsecounterA0 < 25)
    {

       TACCR1 = phalfcycle[pulsecounterA0];
        pulsecounterA0 = pulsecounterA0 + 1;
    }
    else
    {
        P1SEL ^= (BIT2 + BIT6);
        pulsecounterA0 = 0;
    }

}


// Timer A1 interrupt service routine
// #pragma is a catch-all preprocessor directive that is used to extend the functionality of the compiler that is not already covered by predefined directives.
//In this code, the compiler (and the linker) is being told that we are going to create an ISR for TIMER1_A0_VECTOR.
#pragma vector=TIMER1_A0_VECTOR
__interrupt void Timer_A1 (void)
{

   if (pulsecounterA1 < 25)
    {

       TA1CCR1 = phalfcycle[pulsecounterA1];
        pulsecounterA1 = pulsecounterA1 + 1;
    }
    else
    {
        P2SEL ^= (BIT1 + BIT2);
        pulsecounterA1 = 0;
    }

}
