import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Error_ } from "../Error";
import { errores } from "../Errores";
import { Singleton } from "../Singleton/Singleton";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";

export class Round extends Instruction {

    constructor(private expression: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {

        const expression = this.expression.execute(environment);
        const sing = Singleton.getInstance()
        
        if (expression.type == Type.DECIMAL) {
            if (expression.value !== null) {
                sing.addConsole(Math.round(expression.value) + "\n")
            }
            
        } else {
            errores.push(new Error_(this.line, this.column, 'Semantico', `Round: No es de tipo '${Type[Type.DECIMAL]}'`))
        }
    }
}