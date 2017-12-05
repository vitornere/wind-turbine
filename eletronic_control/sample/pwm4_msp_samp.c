#include <msp430g2553.h>
#include <legacymsp430.h>

#define CAP_IN BIT1
#define LED    BIT0

int main(void){
WDTCTL = WDTPW + WDTHOLD;
// Stop WDT

BCSCTL1 = CALBC1_1MHZ; //MCLK e SMCLK @ 1MHz

DCOCTL = CALDCO_1MHZ;
//MCLK e SMCLK @ 1MHz

P1OUT &= ~LED;
//Habilitar LED na porta P1.0 (Launchpad)

P1DIR |= LED;
//Ligar LED na porta P1.0

P1DIR &= ~CAP_IN;
//Habilitar captura de sinal externo via Timer_A

P1SEL|=CAP_IN;
//Habilitar captura de sinal externo via Timer_A

P1SEL2&=~CAP_IN;
//Habilitar captura de sinal externo via Timer_A
//Modo de captura do canal 0: pino externo CCI0A,
//captura de ambas as bordas, gerando interrupção

TACCTL0= CCIS_0 + CM_3 + CAP + CCIE + SCS;

//Timer_A em modo contínuo, com SMCLK @ 1MHz

TACTL = TASSEL_2 + ID_0 + MC_2;

//Modo de baixo consumo com SMCLK ligado

_BIS_SR(LPM0_bits+GIE);

return 0;
}

interrupt(TIMER0_A0_VECTOR) TA0_ISR(void)
{
  P1OUT ^= LED;
  //Inverte valor do LED

  TACCTL0 &= ~CCIFG;
  //Apaga flag de interrupção
}
