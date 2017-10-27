export class ElementTableModel {
    date: string;
    wind_speed: number;
    electric_voltage: number;
    electric_current: number;
    mppt: number;

    constructor(date: string, wind_speed: number, electric_voltage: number, electric_current: number, mppt: number) {
        date = this.date;
        wind_speed = this.wind_speed;
        electric_voltage = this.electric_voltage;
        electric_current = this.electric_current;
        mppt = this.mppt;
    }
}
