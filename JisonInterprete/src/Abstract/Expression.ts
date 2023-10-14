
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";
import { tipos, types_pot_module } from '../Util/TablaTipos';
import { Retorno } from "./Retorno";

export abstract class Expression {

    public line: number;
    public column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(environment: Environment): Retorno;

    public tipoDominante(type_1: Type, type_2: Type, typeResult: number): Type {

        let type: any;

        if (typeResult === 1)
            type = tipos[type_1][type_2];
        else if (typeResult === 2)
            type = types_pot_module[type_1][type_2];
        return type;

    }


}

