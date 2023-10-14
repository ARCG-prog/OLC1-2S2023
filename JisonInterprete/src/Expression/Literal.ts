import { Expression } from "../Abstract/Expression";
import { Retorno } from "../Abstract/Retorno";
// import { Error_ } from "..";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";


export class Literal extends Expression {

    constructor(private value: any, private type: number, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {

        if (this.type == Type.NUMBER)
            return { value: Number(this.value), type: Type.NUMBER };
        else if (this.type == Type.DECIMAL)
            return { value: parseFloat(this.value), type: Type.DECIMAL };
        else if (this.type === Type.VARCHAR) {

            const regex = /^\"/g;
            const regex2 = /\"$/g;

            //Quitar comillas al inicio y al final
            this.value = this.value.replace(regex, "").replace(regex2, "")

            //Quitar caracteres de escape /n /t // /"
            let string = this.value.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, "\"").replace(/\\/g, "\\");

            return { value: string, type: Type.VARCHAR };

        } else if (this.type === Type.BOOLEAN)
            return { value: this.value === 'true' ? Boolean(true) : Boolean(false), type: Type.BOOLEAN };
        else if (this.type === Type.CHAR)
            return { value: this.value.replace(/\'/g, ''), type: Type.CHAR };
        else if (this.type === Type.NEGATIVE) {

            if (this.value.type === Type.NUMBER) {
                this.value.value = Number(this.value.value) * -1
            } else if (this.value.type === Type.DECIMAL) {
                this.value.value = parseFloat(this.value.value) * -1
            } else {
                // throw new Error_(this.line, this.column, 'Semantico', `No se puede negar el tipo: ${Type[this.value.type]}`);
            }
            return { value: this.value.value, type: this.value.type };

        } else if (this.type === Type.NEGATIVE) {

            const value = environment.getVar(this.value)
            return { value: null, type: Type.NULL };

        } else if (this.type === Type.NEGATIVE) {
            return { value: null, type: Type.NULL };
        } else {
            return { value: null, type: Type.NULL };
        }

    }
}