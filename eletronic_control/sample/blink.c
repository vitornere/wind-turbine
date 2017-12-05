#include <msp430g2553.h>

#define LED1_MASK       0x01
#define LED2_MASK       0x40

int main(void)
{
    volatile int i = 0;

    /* stop watchdog timer */
    WDTCTL = WDTPW | WDTHOLD;

    /* set P1 direction */
    P1DIR = LED1_MASK | LED2_MASK;

    /* leds off */
    P1OUT = 0x00;

    for (;;) {

        /* toggle leds */
        P1OUT ^= (LED1_MASK | LED2_MASK);

        /* delay */
        for (i = 0; i < 10000; i++);
    }
}
