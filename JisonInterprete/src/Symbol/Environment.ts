
import { Singleton } from "../Singleton/Singleton";
import { Type } from "./Type";
import { Symbol } from "./Symbol";


export class Environment {

    /*envGlobal
      envGlobal.anterior = null

        function X() {
            envFunction
            envFunction.anterior = envGlobal;
            if(1){
                envIf
                envIf.anterior = envFunction
                while(){
                    envWhile
                    envWhile.anterior = envIf
                }
            }
    }*/ 

    //int numero = 5;
    //char letra = 'a';
    //int numero = 8;
    
    /**
     * 
     *  < clave, valor  >
     *  < numero, Class ( 5, numero, int )
     *  < letra,  Class ( 'a', letra, char )
     * 
     * 
     */

    private variables: Map<string, Symbol>; //La clase simbolo tiene un id, valor y un tipo

    constructor(public anterior: Environment | null) {
        this.variables = new Map();
    }

    public saveVar(nombre: string, valor: any, type: Type): boolean {

        if (!this.searchVar(nombre)) {
            this.variables.set(nombre, new Symbol(valor, nombre, type));
            return true
        }
        return false
    }

    public searchVar(nombre: string): boolean {
        for (const entry of Array.from(this.variables.entries())) {
            if (entry[0] == nombre) return true;
        }
        return false
    }


    public getVar(id: string): Symbol | undefined | null {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }

    public actualizar_variable(nombre: string, new_valor: any) {

        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(nombre)) {

                for (let entry of Array.from(env.variables)) {
                    if (entry[0] === nombre) {
                        entry[1].valor = new_valor;
                    }
                }
            }
            env = env.anterior;
        }
        return null;
    }
}
