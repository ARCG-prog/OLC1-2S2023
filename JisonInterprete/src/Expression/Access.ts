import { Expression } from "../Abstract/Expression";
import { Retorno } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";

export class Access extends Expression {

    constructor(private id: string, private type: number, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {


        const value = environment.getVar(this.id); //Busco la variable en ambiente

        if (value === null || value === undefined) {
            return { value: null, type: this.type };
            // throw errores.push(new Error_(this.line, this.column, 'Semantico', `Acceso: La variable '${this.id}' no esta declarada.`));

        } else {

            if (this.type === 1) {

                environment.actualizar_variable(this.id, (value.valor) + 1)
                return { value: (value.valor) + 1, type: this.type };

            } else if (this.type === 2) {

                environment.actualizar_variable(this.id, (value.valor) - 1)
                return { value: (value.valor) + 1, type: this.type };

            } else if (this.type == 3) {

                //Codigo Incremental
                // environment.updateVarIncDec(this.id, (value.valor), true, false)
                return { value: (value.valor), type: this.type };

            } else if (this.type == 4) {

                //Codigo decremental
                // environment.updateVarIncDec(this.id, (value.valor), false, true)
                return { value: (value.valor), type: this.type };
            }

            return { value: value.valor, type: value.type };
        }
    }
}