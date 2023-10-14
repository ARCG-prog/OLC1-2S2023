import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Error_ } from "../Error";
import { errores } from "../Errores";
import { Environment } from '../Symbol/Environment';
import { Type } from "../Symbol/Type";

export class Declaration extends Instruction {

    private type: number;
    private name: string;
    private value: Expression;

    constructor(type: number, name: string, value: Expression, line: number, column: number) {
        super(line, column);

        this.type = type;
        this.name = name;
        this.value = value;
    }

    public execute(environment: Environment) {

        const val = this.value.execute(environment)

        if (val.type == this.type) {
            let ss = environment.saveVar(this.name, val.value, val.type)
            if (!ss) {
                throw errores.push(new Error_(this.line, this.column, 'Semantico', `Declaracion: Variable '${this.name}' ya esta declarada.`));
            }

        } else {
            errores.push(new Error_(this.line, this.column, 'Semantico', `Declaracion: El tipo '${Type[val.type]}' no se puede asignar al tipo '${Type[this.type]}'`));
        }

    }
}