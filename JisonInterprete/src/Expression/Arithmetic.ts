import { Expression } from "../Abstract/Expression";
import { Retorno } from "../Abstract/Retorno";
import { Error_ } from "../Error";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";


export enum ArithmeticOption {
    PLUS,
    MINUS,
    TIMES,
    DIV,
    MODULE,
    POT,
    DENIAL
}

export class Arithmetic extends Expression {

    constructor(private left: Expression, private right: Expression, private type: ArithmeticOption, line: number, column: number) {
        super(line, column);
    }
    // int numero = (4*2/2) + 5 ;
    public execute(environment : Environment): Retorno {

        const leftValue = this.left.execute(environment); //Asignar a cada variable su nodo correspondiente 
        const rightValue = this.right.execute(environment); 
        
        let result: Retorno; //Declaro variable result vacio de tipo Retorno.

        let tipoDominante = this.tipoDominante(leftValue.type, rightValue.type, 1); //Segun el enunciado del proyecto: (Ej: double + int = double)

        if (this.type === ArithmeticOption.POT || this.type === ArithmeticOption.MODULE) {
            tipoDominante = this.tipoDominante(leftValue.type, rightValue.type, 2);
        }
        
        if (this.type === ArithmeticOption.PLUS) {

            if (tipoDominante == Type.VARCHAR) {
                result = { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.VARCHAR }

            } else if (tipoDominante === Type.NUMBER) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (Number(leftValue.value) + Number(rightValue.value)), type: Type.NUMBER };

            } else if (tipoDominante === Type.DECIMAL) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (parseFloat(leftValue.value) + parseFloat(rightValue.value)).toFixed(2), type: Type.DECIMAL };

            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + Type[leftValue.type] + '' + Type[rightValue.type]);
            }

        } else if (this.type == ArithmeticOption.MINUS) {

            if (tipoDominante === Type.NUMBER) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (Number(leftValue.value) - Number(rightValue.value)), type: Type.NUMBER };

            } else if (tipoDominante === Type.DECIMAL) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (parseFloat(leftValue.value) - parseFloat(rightValue.value)), type: Type.DECIMAL };

            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + Type[leftValue.type] + '' + Type[rightValue.type]);
            }

        } else if (this.type == ArithmeticOption.TIMES) {

            if (tipoDominante === Type.NUMBER) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (Number(leftValue.value) * Number(rightValue.value)), type: Type.NUMBER };

            } else if (tipoDominante === Type.DECIMAL) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (parseFloat(leftValue.value) * parseFloat(rightValue.value)), type: Type.DECIMAL };

            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + Type[leftValue.type] + '' + Type[rightValue.type]);
            }

        } else if (this.type == ArithmeticOption.DIV) {

            if (rightValue.value == 0) {
                throw new Error_(this.line, this.column, "Semantico", "No se puede dividir entre 0");

            } else {

                if (tipoDominante === Type.NUMBER) {

                    if (rightValue.type === Type.CHAR) {
                        rightValue.value = rightValue.value.charCodeAt(0);
                    }

                    if (leftValue.type === Type.CHAR) {
                        leftValue.value = leftValue.value.charCodeAt(0);
                    }
                    result = { value: Math.trunc(Number(leftValue.value) / Number(rightValue.value)), type: Type.NUMBER };

                } else if (tipoDominante === Type.DECIMAL) {

                    if (rightValue.type === Type.CHAR) {
                        rightValue.value = rightValue.value.charCodeAt(0);
                    }

                    if (leftValue.type === Type.CHAR) {
                        leftValue.value = leftValue.value.charCodeAt(0);
                    }
                    result = { value: (parseFloat(leftValue.value) / parseFloat(rightValue.value)), type: Type.DECIMAL };

                } else {
                    throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + Type[leftValue.type] + '' + Type[rightValue.type]);
                }

            }
        } else if (this.type == ArithmeticOption.POT) {

            if (tipoDominante === Type.DECIMAL) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (Math.pow(parseFloat(leftValue.value), parseFloat(rightValue.value))).toFixed(2), type: Type.DECIMAL };

            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + Type[leftValue.type] + '' + Type[rightValue.type]);
            }

        } else if (this.type == ArithmeticOption.MODULE) {

            if (tipoDominante === Type.DECIMAL) {

                if (rightValue.type === Type.CHAR) {
                    rightValue.value = rightValue.value.charCodeAt(0);
                }

                if (leftValue.type === Type.CHAR) {
                    leftValue.value = leftValue.value.charCodeAt(0);
                }
                result = { value: (parseFloat(leftValue.value) % parseFloat(rightValue.value)), type: Type.DECIMAL };

            } else {
                throw new Error_(this.line, this.column, 'Semantico', `No se puede operar ${ArithmeticOption[this.type]} :  ${Type[leftValue.type]} CON ${Type[rightValue.type]}` );
            }

        }else {
            result = { value: '', type: Type.BOOLEAN }
        }
        
        return result;
    }
}