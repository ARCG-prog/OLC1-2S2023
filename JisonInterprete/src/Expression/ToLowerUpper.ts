import { Expression } from '../Abstract/Expression';
import { Retorno } from '../Abstract/Retorno';
import { Error_ } from '../Error';
import { errores } from '../Errores';
import { Singleton } from '../Singleton/Singleton';
import { Environment } from '../Symbol/Environment';
import { Type } from '../Symbol/Type';

export class ToLowerUpper extends Expression {

    constructor(private expression: Expression, private typeExp: number, line: number, column: number) {
        super(line, column)
    }

    public execute(environment: Environment): Retorno {

        const expression = this.expression.execute(environment);
        const sing = Singleton.getInstance()

        if (expression.type == Type.VARCHAR) {

            if (this.typeExp == 1) {
                if (expression.value !== null) {
                    sing.addConsole(expression.value.toLowerCase() + "\n")
                }
                return { value: expression.value.toLowerCase(), type: Type.VARCHAR }

            } else if (this.typeExp == 2) {
                if (expression.value !== null) {
                    sing.addConsole(expression.value.toUpperCase() + "\n")
                }
                return { value: expression.value.toUpperCase(), type: Type.VARCHAR }
            }

        } else {
            errores.push(new Error_(this.line, this.column, 'Semantico', `ToLowerUpper: No es de tipo '${Type[Type.VARCHAR]}'`))
        }
        return { value: null, type: Type.NULL }

    }
}