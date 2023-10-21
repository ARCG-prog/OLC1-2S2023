%{
 /* Declaraciones y importaciones JS*/
    
    // const {errores} = require('./Errores');
    const {Type} = require('../Symbol/Type');
    
    //Expressions
    const {Literal} = require('../Expression/Literal');
    const {Access} = require('../Expression/Access');
    const {Arithmetic,ArithmeticOption} = require('../Expression/Arithmetic');
    const {Field} = require('../Expression/Field');

    //Instructions
    const {Declaration} = require('../Instruction/Declaration');
    const {Print} = require('../Instruction/Print');
    const {Assignment} = require('../Instruction/Assignment');
    const {Statement} = require('../Instruction/Statement');
    const {CreateTable} = require('../Instruction/CreateTable');

    const {TypeIns} = require('../Instruction/Function');
    const {Function} = require('../Instruction/Function');
    const {Call} = require('../Instruction/Call');
    const {Params} = require('../Instruction/Params');

    const {ToLowerUpper} = require('../Instruction/ToLowerUpper');
    const {Round} = require('../Instruction/Round');

%}



//Innit Lexical Analysis
%lex
%options case-insensitive


//Regular Expressions
number [0-9]+
decimal ([0-9]+)"."([0-9]+)
varchar  (\"(\\.|[^\\"])*\")
char  (\'[^']\')
bool "true"| "false"
id ([a-zA-Z_])[a-zA-Z0-9_ñÑ]*

%%
\s+                   /* skip whitespace */
"--".*                // comment a line
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comment multiple lines


{decimal}               return 'DECIMAL'
{number}                return 'NUMBER'
{varchar}               return 'VARCHAR'
{bool}                  return 'BOOL'
{char}                  return 'CHAR'

"*"                     return '*'
"/"                     return '/'
";"                     return ';'
":"                     return ':'
"."                     return '.'
","                     return ','
"--"                    return '--'
"-"                     return '-'
"++"                    return '++'
"+"                     return '+'
"%"                     return '%'
"^"                     return '^'
"@"                     return '@'

"="                     return '='

"("                     return '('
")"                     return ')' 
"["                     return '['
"]"                     return ']'


//Regular Expressions
"int"                   return "INT"
"double"                return "DOUBLE"
"char"                  return "CHAR"
"boolean"               return "BOOLEAN"
"varchar"               return "VARCHAR"

"declare"               return "DECLARE"
"default"               return "DEFAULT"
"set"                   return "SET"
"print"                 return 'PRINT'
"begin"                 return 'BEGIN'
"end"                   return 'END'
"create"                return 'CREATE'
"table"                 return 'TABLE'
"function"              return 'FUNCTION'
"returns"               return 'RETURNS'
"select"                return 'SELECT'
"lower"                 return 'LOWER'
"upper"                 return 'UPPER'
"round"                 return 'ROUND'

{id}	                return 'ID';


<<EOF>>		            return 'EOF'

.                       {  
    console.log({ line: yylloc.first_line, column: yylloc.first_column+1, type: 'Lexico', message: `Error léxico, caracter '${yytext}' no esperado.`})
}

/lex /* End lexical analysis */

//Carrier Priority
%left '||'
%left '&&'
%left '^'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/','%'
%left '!'
%left '.' '[' ']'
%left '++' '--'
%left '?' ':'

%start Init

%%

Init    
    : Instructions EOF 
    {
        return $1;
    } 
;


Instructions
    : Instructions Instruction
     {
        $1.push($2); 
        $$ = $1;
    }
    | Instruction{   $$ = [$1]; }
;

Instruction
    : FunctionIns ';'       { $$ = $1 }   
    | Declaration           { $$ = $1 }
    | Statement  ';'        { $$ = $1 } 
    | Assignment  ';'       { $$ = $1 }
    | Print ';'             { $$ = $1 }
    | Call  ';'             { $$=  $1 }
    | DDL ';'               { $$ = $1 }
    | ToLowerUpperExp ';'   { $$ = $1 }
    | RoundIns ';'          { $$ = $1 }
    | error  {   
        console.log({ line: this._$.first_line, column: this._$.first_column, type: 'Sintáctico', message: `Error sintáctico, token no esperado '${yytext}' .`})
    }
;


//DECLARE @mivariable varchar default = 5*5/5-687-2;
Declaration
    : 'DECLARE' '@' ID DataType 'DEFAULT' Expr ';' 
    { 
        $$ = new Declaration($4, $3, $6 , @1.first_line, @1.first_column); 
    }
;

Assignment
    : 'SET' '@' ID '=' Expr 
    {

        $$ = new Assignment($3, $5, @1.first_line, @1.first_column)
    }
;


Print 
    : 'PRINT' Expr
    {
        $$ = new Print($2, @1.first_line, @1.first_column);
    }
;

//Bloque de instrucciones pueden
Statement
    : 'BEGIN' Instructions 'END' 
    {
        $$ = new Statement($2, @1.first_line, @1.first_column);
    }
;


DataType
    : 'INT'     { $$ = 0; }
    | 'DOUBLE'  { $$ = 1; }
    | 'CHAR'    { $$ = 2; }
    | 'VARCHAR' { $$ = 3; }
    | 'BOOLEAN' { $$ = 4; }
;

Expr
    : Expr '+' Expr     { $$ = new Arithmetic($1, $3, ArithmeticOption.PLUS, @1.first_line, @1.first_column ) }
    | Expr '-' Expr     { $$ = new Arithmetic($1, $3, ArithmeticOption.MINUS, @1.first_line, @1.first_column ) }
    | Expr '*' Expr     { $$ = new Arithmetic($1, $3, ArithmeticOption.TIMES, @1.first_line, @1.first_column ) }
    | Expr '*''*' Expr  { $$ = new Arithmetic($1, $4, ArithmeticOption.POT, @1.first_line, @1.first_column ) }
    | Expr '/' Expr     { $$ = new Arithmetic($1, $3, ArithmeticOption.DIV, @1.first_line, @1.first_column ) }
    | Expr '%' Expr     { $$ = new Arithmetic($1, $3, ArithmeticOption.MODULE, @1.first_line, @1.first_column ) }
    | '-' F             { $$ = new Literal($2, Type.NEGATIVE, @1.first_line, @1.first_column) }
    | F                 { $$ = $1; }
;


F :  '(' Expr ')' 
    { 
        $$ = $2
    }
    | DECIMAL   { 
        $$ = new Literal($1, Type.DECIMAL, @1.first_line, @1.first_column) }
    | NUMBER    { 
        $$ = new Literal($1, Type.NUMBER, @1.first_line, @1.first_column) }
    | VARCHAR    { 
        $$ = new Literal($1, Type.VARCHAR, @1.first_line, @1.first_column) }
    | BOOL      { 
        $$ = new Literal($1, Type.BOOLEAN, @1.first_line, @1.first_column) }
    | CHAR      { 
        $$ = new Literal($1, Type.CHAR, @1.first_line, @1.first_column) }
    | ID        { 
        $$ = new Access($1, null, @1.first_line, @1.first_column); }
;

Call
    : SELECT ID '(' ')'
    {
        $$ = new Call($2, [], @1.first_line, @1.first_column);
    }
    | SELECT ID '(' ListaExpr ')'
    {
        $$ = new Call($2, $4, @1.first_line, @1.first_column);
    }
;

ListaExpr 
    : ListaExpr ',' Expr {
        $1.push($3);
        $$ = $1;
    }
    | Expr {
        $$ = [$1];
    }
;    


FunctionIns
    : CREATE FUNCTION ID '(' ')' RETURNS DataType Statement
    {
        $$ = new Function($7, TypeIns.FUNCTION, $3, $8, [], @1.first_line, @1.first_column);
    }
    | CREATE FUNCTION ID '(' Params ')' RETURNS DataType Statement
    {
        $$ = new Function($8, TypeIns.FUNCTION, $3, $9, $5, @1.first_line, @1.first_column);
    }
;

Params
    : Params ',' Param {
        $1.push($3);
        $$ = $1;
    }
    | Param
    {
        $$ = [$1];
    }
;

Param
    : '@' ID DataType
    {
        $$ = new Params($3, $2, @1.first_line, @1.first_column)
    }
;


//DDL

DDL 
    :CreateTable { $$ = $1; }
;

CreateTable
    : CREATE TABLE ID '(' AttributeList ')'
    { 
        $$ = new CreateTable($3, $5, @1.first_line, @1.first_column); 
    }
;

AttributeList
	: AttributeList ',' Attribute 
    { 
        $1.push($3); $$ = $1;  
    }
  	| Attribute 
    { 
        $$ = [$1]; 
    }
;

Attribute
  : ID DataType 
    { 
        $$ = new Field($1, $2, @1.first_line, @1.first_column); 
    }
;

ToLowerUpperExp
    : SELECT LOWER '(' Expr ')'
    {
        $$ = new ToLowerUpper($4,1,@1.first_line, @1.first_column);   
    }
    | SELECT UPPER '(' Expr ')'
    {
        $$ = new ToLowerUpper($4,2,@1.first_line, @1.first_column);
    }
; 

RoundIns
    : SELECT ROUND '(' Expr ')'
    {
        $$ = new Round($4, @1.first_line, @1.first_column);
    }
;