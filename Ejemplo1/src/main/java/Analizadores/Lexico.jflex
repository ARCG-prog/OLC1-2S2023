

/* 1. Package e importaciones */
package Analizadores;
import java_cup.runtime.Symbol;

%%
/* 2. Configuraciones para el analisis (Opciones y Declaraciones) */
%{
    //Codigo de usuario en sintaxis java
    //Agregar clases, variables, arreglos, objetos etc...
%}

//Directivas
%class Lexico
%public 
%cup
%char
%column
%full
%line
%unicode
%ignorecase

//Inicializar el contador de columna y fila con 1
%init{ 
    yyline = 1; 
    yychar = 1; 
%init}

//Expresiones regulares
BLANCOS=[ \r\t]+
D=[0-9]+
DD=[0-9]+("."[  |0-9]+)?
ID = [a-zA-Z_][a-zA-Z0-9_]*
BOOL = "true"| "false"

LineTerminator = \r|\n|\r\n
InputCharacter = [^\r\n]

comentariosimple    = "//" {InputCharacter}* {LineTerminator}?

%%
/* 3. Reglas Semanticas */

"void" {  
    System.out.println("Reconocio PR: "+yytext()); 
    return new Symbol(sym.PR_VOID,yyline,yychar,yytext());
} 
"main" {  System.out.println("Reconocio PR: "+yytext()); return new Symbol(sym.PR_MAIN,yyline,yychar,yytext());} 
"int" {  System.out.println("Reconocio PR: "+yytext()); return new Symbol(sym.PR_INT,yyline,yychar,yytext());} 
"double" {  System.out.println("Reconocio PR: "+yytext()); return new Symbol(sym.PR_DOUBLE,yyline,yychar,yytext());} 
"bool" {  System.out.println("Reconocio PR: "+yytext()); return new Symbol(sym.PR_BOOL,yyline,yychar,yytext());} 
"console" {  System.out.println("Reconocio PR: "+yytext()); return new Symbol(sym.PR_CONSOLE,yyline,yychar,yytext());} 
"write" {  System.out.println("Reconocio PR: "+yytext()); return new Symbol(sym.PR_WRITE,yyline,yychar,yytext());} 

";" { System.out.println("Reconocio "+yytext()+" punto y coma"); return new Symbol(sym.PTCOMA,yyline,yychar, yytext());} 
"(" { System.out.println("Reconocio "+yytext()+" parentesis abre"); return new Symbol(sym.PARIZQ,yyline,yychar, yytext());} 
")" { System.out.println("Reconocio "+yytext()+" parentesis cierra"); return new Symbol(sym.PARDER,yyline,yychar, yytext());} 
"}" { System.out.println("Reconocio "+yytext()+" llave cierra"); return new Symbol(sym.LLAVDER,yyline,yychar, yytext());} 
"{" { System.out.println("Reconocio "+yytext()+" llave abre"); return new Symbol(sym.LLAVIZQ,yyline,yychar, yytext());} 
"=" { System.out.println("Reconocio "+yytext()+" igual"); return new Symbol(sym.IGUAL,yyline,yychar, yytext());} 
"." { System.out.println("Reconocio "+yytext()+" punto"); return new Symbol(sym.PUNTO,yyline,yychar, yytext());} 

"+" {return new Symbol(sym.MAS,yyline,yychar, yytext());} 
"-" {return new Symbol(sym.MENOS,yyline,yychar, yytext());} 
"*" {return new Symbol(sym.POR,yyline,yychar, yytext());} 
"/" {return new Symbol(sym.DIVIDIDO,yyline,yychar, yytext());} 

\n {yychar=1;}

{BLANCOS} {} 
{comentariosimple} {System.out.println("Comentario: "+yytext()); }
{BOOL} {System.out.println("Reconocio BOOL: "+yytext()); return new Symbol(sym.BOOLEANO,yyline,yychar, yytext());} 
{ID} {System.out.println("Reconocio ID: "+yytext()); return new Symbol(sym.ID,yyline,yychar, yytext());} 
{D} {return new Symbol(sym.ENTERO,yyline,yychar, yytext());} 
{DD} {return new Symbol(sym.DECIMAL,yyline,yychar, yytext());} 


. {
    //Aqui se debe guardar los valores (yytext(), yyline, yychar ) para posteriormente generar el reporte de errores Léxicos.
    System.out.println("Este es un error lexico: "+yytext()+ ", en la linea: "+yyline+", en la columna: "+yychar);
}