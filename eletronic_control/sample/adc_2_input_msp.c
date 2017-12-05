///****************** TE124 - Microcontroladores ****************************
// ****************** Acionamento do LED P1.6 com PWM **********************
//
//----------------------------------------------------------------------
#include <msp430.h> // Definições para o microcontrolador MSP430
#include "intrinsics.h"

int var1;
int var2;
//---------------------------------------------------------------------------
// Rotina de configuração do microcontrolador (WDT/DCO)
//---------------------------------------------------------------------------
void configurar_hardware()
{
  WDTCTL = WDTPW + WDTHOLD; // Desativar WDT
  BCSCTL1 = CALBC1_16MHZ; // freq. DCO = 16MHZ
  DCOCTL = CALDCO_16MHZ; // freq. DCO = 16MHZ
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

  configurar_adc(); // Executa função de configuração do ADC10
  _BIS_SR(GIE); // Habilita Interrupções (GIE = 1)
  while(1)
  {
    // Leitura dos AD's e armazenamento dos valores lidos nas variaveis
    // Leitura da ADC1
    ADC10CTL1 = INCH_2; // Seleciona Canal 2 (A2)
    ADC10AE0 |= BIT2; // Habilita P1.2 para entrada analógica
    ADC10CTL0 |= ENC + ADC10SC; // Inicia conversão
    while (ADC10CTL1 & BUSY); // Aguarda fim da conversão
    ADC10CTL0 &= ~ENC; // Desabilita ADC10
    var1 = ADC10MEM ; // Armazena valor lido do ADC na variavel

    // Leitura de ADC2
    ADC10CTL1 = INCH_3; // Seleciona Canal 3 (A3)
    ADC10AE0 |= BIT3; // Habilita P1.3 para entrada analógica
    ADC10CTL0 |= ENC + ADC10SC; // Inicia conversão
    while (ADC10CTL1 & BUSY); // Aguarda fim da conversão
    ADC10CTL0 &= ~ENC; // Desabilita ADC10
    var2 = ADC10MEM ; // Armazena valor lido do ADC na variavel

  }
//---------------------------------------------------------------------------
// Rotina de Interrupção do ADC10
//---------------------------------------------------------------------------
#pragma vector = ADC10_VECTOR
__interrupt void interrupcao_ADC10(void)
{
  ADC10CTL0 &= ~ADC10IFG; // Reseta flag de interrupção
}
