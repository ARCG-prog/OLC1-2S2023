package Errores;

public class Excepcion {
    
    public String tipo; //Error Lexico o Sintactico
    public String descripcion; //Caracter no valido, o declaracion invalida
    public String linea; //Numero 1
    public String columna; //Columna 5
    
    public Excepcion (String tipo, String descripcion, String linea, String columna){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    
    
    @Override
    public String toString(){
        return this.tipo + ": " + this.descripcion + " en la linea " + this.linea + " y columna " + this.columna;
    }
    
}
