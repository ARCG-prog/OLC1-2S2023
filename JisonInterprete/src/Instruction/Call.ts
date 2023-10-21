import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Error_ } from "../Error";
import { errores } from '../Errores';
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";
import { Params } from "./Params";

export class Call extends Instruction {

    constructor(private id: string, private expresiones: Array<Expression>, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        const func = environment.getFuncion(this.id);

        if (func != undefined) {
            const newEnv = new Environment(environment.getGlobal());

            if (func.parametros.length === this.expresiones.length) {

                for (let i = 0; i < this.expresiones.length; i++) {
                    const value = this.expresiones[i].execute(environment);

                    func.parametros.forEach((ele: Params) => {
                        const param = func.parametros[i].execute(environment)
                        
                        if (value.type == param.type) {
                            newEnv.guardar(param.name, value.value, value.type);
                        } else {
                            throw errores.push(new Error_(param.line, param.column, 'Semantico', `Call: En llamada del metodo '${this.id}' Se esperaba '${Type[param.type]}' y se obtubo '${Type[value.type]}' `))
                        }
                    })
                }
                func.instructions.execute(newEnv);
            } else {
                errores.push(new Error_(this.line, this.column, 'Semantico', `Llamada: Se esperaban ${func.parametros.length} parametros y se obtuvieron ${this.expresiones.length}.`))
            }

        } else {
            errores.push(new Error_(this.line, this.column, 'Semantico', `Llamada: Función '${this.id}' no esta declarada.`))
        }
    }
}
