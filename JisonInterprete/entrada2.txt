--Instruccion DDL
CREATE TABLE Clientes ( ID_Cliente INT, Nombre VARCHAR, CorreoElectronico VARCHAR );

--Este es un error lexico
!

--Bloque de codigo
BEGIN
    DECLARE @cadena VARCHAR DEFAULT "OLC1";
    PRINT cadena;

    SET @cadena = "Hola mundo";
    prINT cadena;

    DECLARE @numero INT DEFAULT 5;

    --string cadena2 = "Mi numero es: " + numero;
    DECLARE @cadena2 VARCHAR DEFAULT "Mi numero es: " + numero;

    print cadena2;

	 --Bloque de codigo interno
		BEGIN
		    DECLARE @cadena VARCHAR DEFAULT "Bloque ";
		    print cadena;
		END;

END;