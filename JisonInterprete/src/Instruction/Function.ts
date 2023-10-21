import { Instruction } from '../Abstract/Instruction';
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";
import { Params } from './Params';

export enum TypeIns {
    /*0*/ VOID,
    /*1*/ FUNCTION,
}

export class Function extends Instruction {

    constructor(public typeFunction: Type, public typeIns: TypeIns, public id: string, 
        public instructions: Instruction, public parametros: Array<Params>, line: number, 
        column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        environment.guardarFuncion(this.id, this);
        //Falta codigo funcion
    }

}