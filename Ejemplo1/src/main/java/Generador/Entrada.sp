// Ya salio compi1 :)

void main( ){
	int b = 2;
	double a = 4.55;
	int var1 = 5+8*9;
        bool var2 = true;
        Console.write(a);
}

// Ya salio compi1 :)

void main( ){
        Console.write(a);
        Console.write(5.58);
Console.write(99);
Console.write(True);
Console.write(a+5);
Console.write(b+b);
}

PAR_ABRE = '('
PR_INT = 'int'
PR_DOUBLE = 'double'
PR_BOOL = 'bool'
IGUAL  = '='
ID = [a-zA-Z_][a-zA-Z0-9_]* //_variable, variable99



ini : PR_VOID PR_MAIN '{' ')' '{' SENTENCIAS '}'

SENTENCIAS : SENTENCIAS SENTENCIA
            | SENTENCIA

SENTENCIA : SENT_DECLARACION
            |SENT_ASIGNACION
            |SENTENCIA_IF
            |SENTENCIA_WHILE
            |SENTENCIA_PRINT


SENT_DECLARACION : TIPO_DATO ID '=' EXPRESION ';'

SENTENCIA_PRINT : PR_CONSOLE '.' PR_WRITE '(' EXPRESION ')' ';'

EXPRESION : EXPRESION + EXPRESION
           |EXPRESION * EXPRESION
           |F:a {:RESULT=a;:}

F : INT:a {:RESULT=a;:}
    |ID:a {:RESULT=a;:}
    |DOUBLE:a {:RESULT=a;:}
    |BOOL:a {:RESULT=a;:}

TIPO_DATO : PR_INT
            |PR_DOUBLE
            |PR_BOOOL


