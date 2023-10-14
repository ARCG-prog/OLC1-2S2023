import { Expression } from '../Abstract/Expression';
import { Retorno } from '../Abstract/Retorno';
import { Environment } from '../Symbol/Environment';
import { Type } from '../Symbol/Type';

export class Field extends Expression {

  constructor(private name: String,private type: Type, line: number, column: number) {
    super(line, column);
  }

  public execute(environment: Environment): Retorno {
    return {value: this.name, type: this.type};
  }

}