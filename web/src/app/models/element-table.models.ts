export class ElementTableModel {
    data: string;
    velocidadeDoVento: number;
    tensao: number;
    corrente: number;
    potencia: number;

    constructor(data: string, velocidadeDoVento: number, tensao: number, corrente: number, potencia: number) {
        data = this.data;
        velocidadeDoVento = this.velocidadeDoVento;
        tensao = this.tensao;
        corrente = this.corrente;
        potencia = this.potencia;
    }
}
