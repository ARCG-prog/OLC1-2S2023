import { Expression } from '../Abstract/Expression';
import { Instruction } from '../Abstract/Instruction';
import { Error_ } from '../Error';
import { errores } from '../Errores';
import { Environment } from '../Symbol/Environment';
import { Type } from '../Symbol/Type';

export class Assignment extends Instruction {
    constructor(private id: string, private value: Expression, line: number, column: number) {
        super(line, column)        
    }

    public execute(environment: Environment) {

        const searchVar: any = environment.getVar(this.id)

        if (searchVar) {
            const value = this.value.execute(environment);

            if (searchVar.type == value.type) {
                environment.actualizar_variable(this.id, value.value)
            } else {
                errores.push(new Error_(this.line, this.column, 'Semantico', `Asignacion: No se puede asignar la variable de tipo ${Type[searchVar.type]} a ${Type[value.type]}`))
            }


        } else {
            errores.push(new Error_(this.line, this.column, 'Semantico', `Asignacion: No se encuentra declarada la variable '${this.id}'`))
        }
    }

}
