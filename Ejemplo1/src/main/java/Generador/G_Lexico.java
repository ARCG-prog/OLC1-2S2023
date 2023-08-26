
package Generador;

import java.io.File;

public class G_Lexico 
{
    public static void main(String[] args) 
    {
        String path="src/main/java/Analizadores/Lexico.jflex";
        generarLexer(path);
    } 
    
    public static void generarLexer(String path)
    {
        File file=new File(path);
        jflex.Main.generate(file);
    } 
}
