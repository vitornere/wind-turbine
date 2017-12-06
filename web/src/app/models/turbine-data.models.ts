export class TurbineDataModel {
    id: number;
    date: string;
    wind_speed: string;
    electric_voltage: string;
    electric_current: string;
    mppt: string;

    constructor(id: number, date: string, wind_speed: string, electric_voltage: string, electric_current: string, mppt: string) {
        id = this.id;
        date = this.date;
        wind_speed = this.wind_speed;
        electric_voltage = this.electric_voltage;
        electric_current = this.electric_current;
        mppt = this.mppt;
    }

    public setDate(date: string): void {
        this.date = date;
    }
}
