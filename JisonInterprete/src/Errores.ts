import { Error_ } from "./Error";

export let errores : Array<Error_> = new Array();

export const cleanErrors = ()=>{
    errores = []
}