//Codigo para controle do conversor CC-CC Boost de MPPT baseado no Algoritmo P&O (Pertuba e Observa)

unsigned int ADC1=0;
unsigned int ADC2=0;
unsigned int power1=0;
unsigned int power2=0;
unsigned int cont=0;

#include <msp430.h>

int main(void) {

   //Desliga o whatchdog timer
   WDTCTL = WDTPW | WDTHOLD;

  //Clock configuration
   CALBC1_1MHZ==0xFF;
   DCOCTL = 0;            
   BCSCTL1 = CALBC1_1MHZ;  
   DCOCTL = CALDCO_1MHZ;   

   //interruption
   _BIS_SR(GIE);

   //Output
   P1DIR |= BIT6; // PWM Out
   P1SEL |= BIT6;

   //Timer A
   TACCR0  = 100;      //period 
   TACCTL1 = OUTMOD_7;
   TACCR1  = 50;        // duty cycle
   TACTL   = TASSEL_2 + MC_1;

   //Config Timer A
   ADC10CTL0 = SREF_0 + ADC10SHT_0 + ADC10ON;
   ADC10AE0  = BIT5;
   ADC10CTL1 = INCH_5 + ADC10DIV_0 + ADC10SSEL_3 + CONSEQ_0 + SHS_0;

while(1){

    //ADC Configuration - Channel 4 - BIT4 - current sensor
    ADC10AE0  |= BIT4;                          
    ADC10CTL1  = INCH_4;
    ADC10CTL0 |= ENC + ADC10SC;  
    //Wait for the value          
    while(ADC10CTL1 & ADC10BUSY);
    //read the value
    ADC10CTL0 &= ~ENC;
    ADC1 = ADC10MEM/25;     

    //ADC Configuration - Channel 5 - BIT5 - voltage sensor
    ADC10AE0  |= BIT5;                          
    ADC10CTL1  = INCH_5;
    ADC10CTL0 |= ENC + ADC10SC;  
    //Wait for the value          
    while(ADC10CTL1 & ADC10BUSY);
    //read and print the value
    ADC10CTL0 &= ~ENC;
    ADC2 = ADC10MEM/25;

    power1=ADC2*ADC1;

    if(power1==0)
    {
      cont=0;
    }
    else if(power1>power2){
      cont++; 
    }

    else if(power2>power1){
      cont--;
    }
    else{
      cont = cont;
    }

    if(cont>=90)
    {
      cont=90;
    }

    TACCR1 = cont;
    power2 = power1;
    
}//end while

return 0;

}//end main
