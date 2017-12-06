//MSP430
#include <msp430.h>

#define IN_AD BIT1
#define IN_AD_CH INCH_1

int v1;
int v2;


void configurar_adc()
{
  ADC10CTL0 = SREF_0; // VR+ = Vcc, VR- = Vss
  ADC10CTL0 |= ADC10SHT_2; // Sample and Hold Time = 16*ADC10CLKs
  ADC10CTL0 &= ~MSC; // Início da conversão com ADC10SC
  ADC10CTL0 |= ADC10ON; // ADC10 ON
  ADC10CTL0 |= ADC10IE; // Habilita Interrupção do ADC
}

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

 P1DIR |= BIT6; //P1.6 IMPLEMENTADO COMO SAÍDA
 P1SEL |= BIT6; //CONFIGURANDO P1.6 COMO PERIFÉRICO TA0.1

 P2DIR |= BIT2; //P1.6 IMPLEMENTADO COMO SAÍDA
 P2SEL |= BIT2; //CONFIGURANDO P1.6 COMO PERIFÉRICO TA0.1

 //##########################################//
 //#######  CONFIGURAÇÃO DO TIMER0_A  #######//
 //##########################################//

 TACCR0  = 100; //PERÍODO DO PWM
 TACCTL1 = OUTMOD_7; //MODO DE SAÍDA DO TIMER0_A: RESET/SET
 TACCR1  = 0; //DUTY CYCLE DO PWM EM 10%
 TACTL   = TASSEL_2 + MC_1; //TASSEL_2 -> CLOCK SOURCE: MCLK	MC_1 ->	 //TIMER COM CONTAGEM PROGRESSIVA DE 0 ATÉ TACCR1

 TA1CCR0 = 100; //PERÍODO DO PWM
 TA1CCTL1 = OUTMOD_7; //MODO DE SAÍDA DO TIMER0_A: RESET/SET
 TA1CCR1 = 0; //DUTY CYCLE DO PWM EM 10%
 TA1CTL = TASSEL_2 + MC_1; //TASSEL_2 -> CLOCK SOURCE: MCLK	MC_1 ->

configurar_adc();

 while(1){
   ADC10CTL0 |= ENC + ADC10SC;
   // Espera a conversao ficar pronta
   while((ADC10CTL0 & ADC10IFG)==0);

   //_BIS_SR(CPUOFF); //DESLIGA A CPU PARA ECONOMIZAR CONSUMO (LPM0)
   ADC10CTL1 = INCH_2; // Seleciona Canal 2 (A2)
   ADC10AE0 |= BIT2; // Habilita P1.2 para entrada analógica
   ADC10CTL0 |= ENC + ADC10SC; // Inicia conversão
   while (ADC10CTL1 & BUSY); // Aguarda fim da conversão
   ADC10CTL0 &= ~ENC; // Desabilita ADC10
   v1 = ADC10MEM ; // Armazena valor lido do ADC na variavel

   // Leitura de ADC2
   ADC10CTL1 = INCH_3; // Seleciona Canal 3 (A3)
   ADC10AE0 |= BIT3; // Habilita P1.3 para entrada analógica
   ADC10CTL0 |= ENC + ADC10SC; // Inicia conversão
   while (ADC10CTL1 & BUSY); // Aguarda fim da conversão
   ADC10CTL0 &= ~ENC; // Desabilita ADC10
   v2 = ADC10MEM ; // Armazena valor lido do ADC na variavel

   TACCR1 = v1/10;

   TA1CCR1 = v2/10;


 }//end while

 return 0;

}//end main
