#include <msp430.h>

int main(void) {

	//##########################################//
	//####  CONFIGURAÇÃO DO WATCHDOG TIMER  ####//
	//##########################################//

	WDTCTL = WDTPW | WDTHOLD;		//WATCHDOG TIMER PARADO

	//##########################################//
	//#######  CONFIGURAÇÃO DO CLOCK  ##########//
	//##########################################//

	DCOCTL = 0;             		//
	BCSCTL1 = CALBC1_1MHZ;  		//CONFIGURA CLOCK EM 1 MHZ
	DCOCTL = CALDCO_1MHZ;   		//

	//##########################################//
	//##########  DECLARAÇÃO DE I/Os  ##########//
	//##########################################//

	P1DIR |= 0x40;			//P1.6 IMPLEMENTADO COMO SAÍDA
	P1SEL |= 0x40;			//CONFIGURANDO P1.6 COMO PERIFÉRICO TA0.1
	P1DIR &= ~0x08;			//P1.3 IMPLEMENTADO COMO ENTRADA
	P1IE  |= 0X08; 			//HABILITA INTERRUPÇÃO EM P1.3
	P1IFG &= ~0X08; 		//LIMPA FLAG DE INTERRUPÇÃO DO PINO P1.3
	P1REN |= 0X08;			//HABILITA RESISTOR INTERNO EM P1.3
	P1OUT |= 0X08;			//RESISTOR DE PULL-UP EM P1.3
	P1IES ^= 0x08;                  //BORDA DE SUBIDA/DESCIDA DO PINO P1.3


	//##########################################//
	//#######  CONFIGURAÇÃO DO TIMER0_A  #######//
	//##########################################//

	TACCR0 = 1000;			//PERÍODO DO PWM
	TACCTL1 = OUTMOD_7;		//MODO DE SAÍDA DO TIMER0_A: RESET/SET
	TACCR1 = -100;			//DUTY CYCLE DO PWM EM 10%
	TACTL = TASSEL_2 + MC_1;        //TASSEL_2 -> CLOCK SOURCE: MCLK	MC_1 ->					                        //TIMER COM CONTAGEM PROGRESSIVA DE 0 ATÉ TACCR1

	//_BIS_SR(CPUOFF);	        //DESLIGA A CPU PARA ECONOMIZAR CONSUMO (LPM0)


	__enable_interrupt();	       //HABILITA INTERRUPÇÕES

	while(1);
}


//##########################################//
//############  INTERRUPÇÕES  ##############//
//##########################################//

#pragma vector = TIMER0_A0_VECTOR
__interrupt void timer_int(void){

	TACCTL1 &= ~CCIFG;

}

#pragma vector = PORT1_VECTOR
__interrupt void port_int(void){

	if (P1IN & 0x08) {
		TACCR1 = (TACCR1 + 100)%1000;	//AUMENTA EM 10% O DUTY CYCLE DO PWM
	}

	P1IFG &= ~0x08;		//LIMPA FLAG DE INTERRUPÇÃO DO PINO P1.3

}
