//MSP430
#include <msp430.h>

#define IN_AD BIT1
#define IN_AD_CH INCH_1

int main(void) {

 //##########################################//
 //####  CONFIGURAÇÃO DO WATCHDOG TIMER  ####//
 //##########################################//

 WDTCTL = WDTPW | WDTHOLD; //WATCHDOG TIMER PARADO

 //##########################################//
 //#######  CONFIGURAÇÃO DO CLOCK  ##########//
 //##########################################//

 DCOCTL = 0;             //
 BCSCTL1 = CALBC1_1MHZ;   //CONFIGURA CLOCK EM 1 MHZ
 DCOCTL = CALDCO_1MHZ;   //

 //##########################################//
 //##########  DECLARAÇÃO DE I/Os  ##########//
 //##########################################//

 P1DIR |= 0x40; //P1.6 IMPLEMENTADO COMO SAÍDA
 P1SEL |= 0x40; //CONFIGURANDO P1.6 COMO PERIFÉRICO TA0.1

 //##########################################//
 //#######  CONFIGURAÇÃO DO TIMER0_A  #######//
 //##########################################//

 TACCR0 = 100; //PERÍODO DO PWM
 TACCTL1 = OUTMOD_7; //MODO DE SAÍDA DO TIMER0_A: RESET/SET
 TACCR1 = 0; //DUTY CYCLE DO PWM EM 10%
 TACTL = TASSEL_2 + MC_1; //TASSEL_2 -> CLOCK SOURCE: MCLK	MC_1 ->					 	                //TIMER COM CONTAGEM PROGRESSIVA DE 0 ATÉ TACCR1

 //_BIS_SR(CPUOFF); //DESLIGA A CPU PARA ECONOMIZAR CONSUMO (LPM0)

 ADC10CTL0 = SREF_0 + ADC10SHT_0 + ADC10ON;
 ADC10AE0 = IN_AD;
 // Com SHS_0, uma conversao sera requisitada
 // sempre que o bit ADC10SC for setado em ADC10CTL0
 ADC10CTL1 = IN_AD_CH + ADC10DIV_0 + ADC10SSEL_3 + CONSEQ_0 + SHS_0;

 while(1){
   ADC10CTL0 |= ENC + ADC10SC;
   // Espera a conversao ficar pronta
   while((ADC10CTL0 & ADC10IFG)==0);

   switch(ADC10MEM) {
     case 100:
         TACCR1 = 10;
         break;
     case 200:
         TACCR1 = 20;
         break;
     case 300:
         TACCR1 = 30;
         break;
     case 400:
         TACCR1 = 40;
         break;
     case 500:
         TACCR1 = 50;
         break;
     case 600:
         TACCR1 = 60;
         break;
     case 700:
         TACCR1 = 70;
         break;
     case 800:
         TACCR1 = 80;
         break;
     case 900:
         TACCR1 = 90;
         break;
     case 1000:
         TACCR1 = 100;
         break;
   }

 }

 return 0;

}
