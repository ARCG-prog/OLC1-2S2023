
import { Expression } from '../Abstract/Expression';
import { Instruction } from '../Abstract/Instruction';
import { Retorno } from '../Abstract/Retorno';
import { Environment } from '../Symbol/Environment';
import { Field } from '../Expression/Field';

export class CreateTable extends Instruction {

  constructor(private name: String, private fields: Field[], line: number, column: number) {
    super(line, column);
  }

  public execute(environment: Environment) {
    
    //Se crea una tabla con el nombre:
    console.log("Se crea una tabla con el nombre: "+this.name);
    /* 
      Toda la logica para crear la tabla     
    */
    
    //Se crean los campos:
    console.log("Se crean los campos: ");
    for(let field of this.fields){

      //1. Buscar en mi estructura de Tablas y fiels
      //2. Si ya existe el fiel creado con el mismo nombre reportarlo como error
      //3. Guardar el id y el tipo de dato
      
      console.log(field.execute(environment));
    }
  }


}