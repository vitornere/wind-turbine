//MSP430
#include <msp430.h>

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

    //I/O
    P1DIR |= BIT6; // PWM Out
    P1SEL |= BIT6; 

    //Timer A
    TACCR0  = 1000;      //period
    TACCTL1 = OUTMOD_7; 
    TACCR1  = 0;        // duty cycle
    TACTL   = TASSEL_2 + MC_1; 

    //Config Timer A
    ADC10CTL0 = SREF_0 + ADC10SHT_3 + ADC10ON + ADC10IE + MSC;

    float voltage = 0;
    float current = 0;
    float power   = 0;

    float lastPower   = 0;
    float lastVoltage = 0;
    float lastCurrent = 0;
    int conversion = 3.6/1024;

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
        voltage     = ADC10MEM;
        //convert Voltage
        voltage = voltage*0.00596;
        voltage = voltage*conversion;

        //ADC 2
        ADC10AE0  |= BIT5;                           
        ADC10CTL1  = INCH_5;
        ADC10CTL0 |= ENC + ADC10SC;  
        //Wait for the value           
        while(ADC10CTL1 & ADC10BUSY);
        //read and print the value
        ADC10CTL0 &= ~ENC;
        current     = ADC10MEM;
        //convert current
        current = (current*2.5468 + 0.955);
        current = current*conversion;


        //MPPT
        //low current condition <<<<-------------------------
        if (current < 1){
            current = 0.01;
        }

        //Power
        power = voltage*current;

        if (power > lastPower){
            TACCR1 = TACCR1 + 1;
        }else{
            TACCR1 = TACCR1 - 1;
        }

        //update
        lastCurrent = current;
        lastPower = power;
        lastVoltage = voltage;


    }//end while

    return 0;

}//end main