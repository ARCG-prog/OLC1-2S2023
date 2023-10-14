import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Singleton } from "../Singleton/Singleton";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";

export class Print extends Instruction {

    constructor(private value: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {

        const value = this.value.execute(environment);
        const sing = Singleton.getInstance()

        if (value.value !== null) {
            sing.addConsole(value.value + "\n")
        }

    }

    getCharacterArray(type: number): string {

        let value: any;
        if (type == Type.CHAR)
            value = "\'"
        else if (type == Type.VARCHAR)
            value = '"'
        else
            value = ''

        return value
    }
}