// Ya salio compi1 :)
void main (){
	int b = 4;
	double a = 4.5;
        bool c = True;
	int var1 = 5+8*a;
        
        Console.Write(a);
}

PR_VOID = 'void'
PR_MAIN = 'main'
PR_MAIN = 'int'
PR_DOUBLE = 'double'
PR_BOOL = 'bool'
PR_CONSOLE= 'console'
PR_WRITE = 'write'

//EXPRESIONES REGULARES
ID = [a-zA-Z][a-zA-Z0-9_]*  //diego, numero77

init : PR_VOID PR_MAIN '(' ')' '{' sentencias  '}'
;

sentencias : declaracion_variables
            |asignacion_variables
            |sentencia_if
            |sentencia_while
            |funcion_graficar_barras
;

asignacion_variables : tipo_dato ID '=' expresion ';'
;

tipo_dato : PR_INT
            |PR_DOUBLE
            |PR_BOOL
;

sentencia_print : PR_CONSOLE '.' PR_WRITE '(' expresion ')' ';'
                    
expresion : expresion + expresion
           |expresion * expresion
           | '(' expresion ')'
           |ID
           |ENTERO
           |DECIMAL
           |STRING
           |CHAR





