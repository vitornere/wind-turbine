//MSP430
#include <msp430.h>



void configUart(){
    UCA0CTL1 |= UCSSEL_2;       
    UCA0BR0   = 104;            
    UCA0BR1   = 0;              
    UCA0MCTL  = UCBRS_1;        
    UCA0CTL1 &= ~UCSWRST; 
}//end configUart

void print(char *text)
{
    unsigned int i = 0;
    while(text[i] != '\0'){
        while (!(IFG2&UCA0TXIFG)); 
        UCA0TXBUF = text[i];       
        i++;
    }
}//print

void printUart(unsigned int num){
    char buf[6];
    char *str = &buf[5];
    *str = '\0';
    do
    {
        unsigned long m = num;
        num /= 10;
        char c = (m - 10 * num) + '0';
        *--str = c;
    } while(num);

    print(str);
}//end printNumber






int main(void) {

    //whatchdog
    WDTCTL = WDTPW | WDTHOLD;

    //Clock Config
    CALBC1_1MHZ==0xFF;
    DCOCTL = 0;             
    BCSCTL1 = CALBC1_1MHZ;  
    DCOCTL = CALDCO_1MHZ;   
    
    //interruption
    _BIS_SR(GIE);

    //Uart Configuration
    configUart();

    //Uart Pin (1.1 | 1.2)
    P1SEL = BIT1 + BIT2 ;    
    P1SEL2 = BIT1 + BIT2;

    //I/O
    P1DIR |= BIT6; // PWM Out
    P1SEL |= BIT6; 

    //Timer A
    TACCR0  = 100;      //period
    TACCTL1 = OUTMOD_7; 
    TACCR1  = 0;        // duty cycle
    TACTL   = TASSEL_2 + MC_1; 

    //Config Timer A
    ADC10CTL0 = SREF_0 + ADC10SHT_3 + ADC10ON + ADC10IE + MSC;

    unsigned int aux = 0;
    //Loop
    while(1){
        //ADC 1
        ADC10AE0  |= BIT4;                           
        ADC10CTL1  = INCH_4;
        ADC10CTL0 |= ENC + ADC10SC;  
        //Wait for the value           
        while(ADC10CTL1 & ADC10BUSY);
        //read and print the value
        ADC10CTL0 &= ~ENC;
        aux     = ADC10MEM/10;


        //ADC 2
        ADC10AE0  |= BIT5;                           
        ADC10CTL1  = INCH_5;
        ADC10CTL0 |= ENC + ADC10SC;  
        //Wait for the value           
        while(ADC10CTL1 & ADC10BUSY);
        //read and print the value
        ADC10CTL0 &= ~ENC;
        TACCR1     = aux + ADC10MEM/10;

        printUart(TACCR1);
        print("\n\n");

       
    }//end while

    return 0;
