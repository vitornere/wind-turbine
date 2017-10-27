export class ElementTableModel {
    date: string;
    wind_speed: number;
    electric_voltage: number;
    corrente: number;
    potencia: number;

    constructor(date: string, wind_speed: number, electric_voltage: number, corrente: number, potencia: number) {
        date = this.date;
        wind_speed = this.wind_speed;
        electric_voltage = this.electric_voltage;
        corrente = this.corrente;
        potencia = this.potencia;
    }
}
