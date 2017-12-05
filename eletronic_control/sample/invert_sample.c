///****************** TE124 - Microcontroladores ****************************
// ****************** Acionamento do LED P1.6 com PWM **********************
//
//----------------------------------------------------------------------
#include <msp430.h> // Definições para o microcontrolador MSP430
#include "intrinsics.h"

float valor_Iinv;
float valor_Vdc;
float valor_Vca;
float kajuste;
float Vca;
float Ica;
int   Vpwm;
float Erro0;
float Erro1;
float Ic0;
float Ic1;
float Iref ;
float Irefpico;
//---------------------------------------------------------------------------
// Rotina de configuração do microcontrolador (WDT/DCO)
//---------------------------------------------------------------------------
void configurar_hardware()
{
  WDTCTL = WDTPW + WDTHOLD; // Desativar WDT
  BCSCTL1 = CALBC1_16MHZ; // freq. DCO = 16MHZ
  DCOCTL = CALDCO_16MHZ; // freq. DCO = 16MHZ
  P2DIR = BIT1 + BIT4 ; // P2.1, P2.3 e P2.4 como Saída
  P2SEL = BIT1 + BIT4 ; // P2.1 e P2.4 como Out1 e Out2 do Timer1_A
  // P2OUT = BIT3 + BIT5 ;
}
//---------------------------------------------------------------------
// Configuração do TIMER1_A
//---------------------------------------------------------------------
void configurar_timer1_A()
{
  TA1CTL = TASSEL_2 + ID_0 + MC_3; // SMCLK, Pre-scaler = 1, MODO UP-DOWN
  TA1CCTL1 = OUTMOD_6; // Modo Toogle Set
  TA1CCTL2 = OUTMOD_6; // Modo Toogle Set
}
//---------------------------------------------------------------------------
// Rotina de configuração do ADC
//---------------------------------------------------------------------------
void configurar_adc()
{
  ADC10CTL0 = SREF_0; // VR+ = Vcc, VR- = Vss
  ADC10CTL0 |= ADC10SHT_2; // Sample and Hold Time = 16*ADC10CLKs
  ADC10CTL0 &= ~MSC; // Início da conversão com ADC10SC
  ADC10CTL0 |= ADC10ON; // ADC10 ON
  ADC10CTL0 |= ADC10IE; // Habilita Interrupção do ADC
}
//---------------------------------------------------------------------
// Programa principal
//---------------------------------------------------------------------
void main(void)
{
  configurar_hardware(); // Executa função de configuração do hardware
  configurar_timer1_A(); // Executa função de configuração do Timer1A
  configurar_adc(); // Executa função de configuração do ADC10
  _BIS_SR(GIE); // Habilita Interrupções (GIE = 1)
  TA1CCR0 = 511; // Valor de comparação 0 do TIMER1_A
  TA1CCR1 = 256 ; // Valor inicial de comparação 1 do TIMER1_A
  TA1CCR2 = 256 ; // Valor inicial de comparação 2 do TIMER1_A
  // Valores iniciais para os compensadores
  Erro1 = 0;
  Ic1 = 0;
  Irefpico = 0.31489 ;
  kajuste = 20 ;
  while(1)
  {
    // Leitura dos AD's e armazenamento dos valores lidos nas variaveis
    // Leitura da corrente CA
    ADC10CTL1 = INCH_2; // Seleciona Canal 2 (A2)
    ADC10AE0 |= BIT2; // Habilita P1.2 para entrada analógica
    ADC10CTL0 |= ENC + ADC10SC; // Inicia conversão
    while (ADC10CTL1 & BUSY); // Aguarda fim da conversão
    ADC10CTL0 &= ~ENC; // Desabilita ADC10
    valor_Iinv = ADC10MEM ; // Armazena valor lido do ADC na variavel
    // Leitura de tensão CC
    ADC10CTL1 = INCH_3; // Seleciona Canal 3 (A3)
    ADC10AE0 |= BIT3; // Habilita P1.3 para entrada analógica
    ADC10CTL0 |= ENC + ADC10SC; // Inicia conversão
    while (ADC10CTL1 & BUSY); // Aguarda fim da conversão
    ADC10CTL0 &= ~ENC; // Desabilita ADC10
    valor_Vdc = ADC10MEM ; // Armazena valor lido do ADC na variavel
    // Leitura de tensão CA

    ADC10CTL1 = INCH_4; // Seleciona Canal 4 (A4)
    ADC10AE0 |= BIT4; // Habilita P1.4 para entrada analógica
    ADC10CTL0 |= ENC + ADC10SC; // Inicia conversão
    while (ADC10CTL1 & BUSY); // Aguarda fim da conversão
    ADC10CTL0 &= ~ENC; // Desabilita ADC10
    valor_Vca = ADC10MEM ; // Armazena valor lido do ADC na variavel
    // Cálculos dos compensadores
    // Processamento dos sinais - Retirar nivel DC de 1,5V da corrente e tensão CA
    Ica = valor_Iinv - 500 ;
    Vca = valor_Vca - 471 ;
    // Compensador de corrente
    Ic0 = Ic1 ;
    Erro0 = Erro1 ;
    Iref = Vca*kajuste*Irefpico ;
    Erro1 = Iref - Ica ;
    Ic1 = 0.98*Erro1 - 0.64386*Erro0 +0.0859*Ic0 ;
    // Ic1 = 129*Erro1 - 84.753*Erro0 + 0.0859*Ic0 ;
    // Gerar o PWM
    // Vpwm = (int)Ic1 ;
    if(Ic1>240)
    {
      Ic1 = 240 ;
    }if(Ic1<-240){
      Ic1 = -240;
    }
      Vpwm = (int)Ic1 ;
      TA1CCR1 = 256 + Vpwm ;
      TA1CCR2 = 256 - Vpwm ;
      // P2OUT ^= 0x20 ;
    }
  }
//---------------------------------------------------------------------------
// Rotina de Interrupção do ADC10
//---------------------------------------------------------------------------
#pragma vector = ADC10_VECTOR
__interrupt void interrupcao_ADC10(void)
{
  ADC10CTL0 &= ~ADC10IFG; // Reseta flag de interrupção
}
