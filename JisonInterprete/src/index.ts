

const http = require('http')
const express = require('express');
const fs = require('fs');

const app = express();
const parser = require('./Grammar/Grammar');

//Importaciones
import { Request, Response } from 'express';
import { Environment } from './Symbol/Environment';
import { Singleton } from './Singleton/Singleton';
import { cleanErrors, errores } from './Errores';
import { Function } from './Instruction/Function';

const server = http.createServer(app)
const port = 3000;
const host = 'localhost';


server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: "Hola mundo!" })
})

app.get('/analizar', (req: Request, res: Response) => {
     
    //const entrada = req.body.code //Desde el body
    const entrada = fs.readFileSync('./entrada.txt')
    
    try {

        const singleton = Singleton.getInstance()
        singleton.cleanErrors()

        const ast = parser.parse(entrada.toString());
        const env = new Environment(null);

        //Se hace una primer pasada para gardar las funciones y metodos
        for (const instr of ast) {
            try {
                if (instr instanceof Function) {
                    instr.execute(env);
                }
            } catch (error) {
                console.log('OCURRIO UN ERROR EN RECONOCER FUNCION: ', error);
            }
        }
        
        //Segunda pasada para instrucciones, expresiones etc, sin incluir funciones
        for (const instr of ast) {

            if (instr instanceof Function)
                continue;
            try {
                instr.execute(env);
            } catch (error) {
                console.log('OCURRIO UN ERROR EN RECONOCER INSTRUCCIONES: ', error);
            }
        }

        console.log('__________________INICIO CONSOLA____________________________');
        console.log(singleton.getConsole());
        console.log('____________________FIN CONSOLA______________________________');

        console.log('Errores: ', errores);
        console.log('Errores: ', singleton.get_errores());

    } catch (error) {
        console.log(error);
    }

    res.status(200).send({ message: "Estoy analizando el archivo de entrada..." })
})