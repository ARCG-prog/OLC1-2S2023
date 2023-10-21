import { Instruction } from "../Abstract/Instruction";
import { Environment } from '../Symbol/Environment';

export class Params extends Instruction {

    constructor(private type: number, private name: string, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        return { type: this.type, name: this.name, line: this.line, column: this.column };
    }

}