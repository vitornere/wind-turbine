#include <msp430g2553.h>
#include <legacymsp430.h>
#define LED BIT0

void main(void)
{
  WDTCTL = WDTPW + WDTHOLD;// Stop WDT

  BCSCTL1 = CALBC1_1MHZ;//MCLK e SMCLK @ 1MHz

  DCOCTL = CALDCO_1MHZ;//MCLK e SMCLK @ 1MHz

  P1OUT &= ~LED;//Habilitar LED na porta P1.0 (Launchpad)

  P1DIR|=LED;//Ligar LED na porta P1.0
  //Timer_A em modo up, com 10000 contagens de 1us,
  //gerando uma interrupção a cada 10 ms (10000*(1/1MHz) = 10ms)
  TA0CCR0= 1000-1;

  TA0CTL = TASSEL_2 + ID_0 + MC_1 + TAIE;

  _BIS_SR(LPM0_bits+GIE); //Modo de baixo consumo com SMCLK ligado
}
//Função de interrupção do Timer_A
interrupt(TIMER0_A1_VECTOR) TA0_ISR(void){

  P1OUT ^= LED; //Inverte valor do LED

  TA0CTL &= ~TAIFG; //Apaga flag de interrupção
}
