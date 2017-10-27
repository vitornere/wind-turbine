export class ElementTableModel {
    position: number;
    data: string;
    velocidadeDoVento: number;
    tensao: number;
    corrente: number;
    potencia: number;

    constructor(position: number, data: string, velocidadeDoVento: number, tensao: number, corrente: number, potencia: number) {
        position = this.position;
        data = this.data;
        velocidadeDoVento = this.velocidadeDoVento;
        tensao = this.tensao;
        corrente = this.corrente;
        potencia = this.potencia;
    }
}
