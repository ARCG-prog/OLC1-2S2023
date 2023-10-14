import { Type } from "./Type";


export class Symbol {
    public valor: any;
    public id: string;
    public type: Type;

    constructor(valor: any, id: string, type: Type) {
        this.valor = valor; //"HOLA"
        this.id = id; //cadena
        this.type = type; //string
    }
}