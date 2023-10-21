import { Expression } from '../Abstract/Expression';
import { Instruction } from '../Abstract/Instruction';
import { Retorno } from '../Abstract/Retorno';
import { Error_ } from '../Error';
import { errores } from '../Errores';
import { Singleton } from '../Singleton/Singleton';
import { Environment } from '../Symbol/Environment';
import { Type } from '../Symbol/Type';

export class ToLowerUpper extends Instruction {

    constructor(private expression: Expression, private typeExp: number, line: number, column: number) {
        super(line, column)
    }

    public execute(environment: Environment) {

        const expression = this.expression.execute(environment);
        const sing = Singleton.getInstance()

        if (expression.type == Type.VARCHAR) {

            if (this.typeExp == 1) {
                if (expression.value !== null) {
                    sing.addConsole(expression.value.toLowerCase() + "\n")
                }

            } else if (this.typeExp == 2) {
                if (expression.value !== null) {
                    sing.addConsole(expression.value.toUpperCase() + "\n")
                }
            }

        } else {
            errores.push(new Error_(this.line, this.column, 'Semantico', `ToLowerUpper: No es de tipo '${Type[Type.VARCHAR]}'`))
        }
    }
}