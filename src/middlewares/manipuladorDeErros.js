import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorretas from "../erros/RequisicaoINcorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next){ // middleware de erro

    if(error instanceof mongoose.Error.CastError){
        new RequisicaoIncorretas().enviarResposta(res);
    }else if (error instanceof mongoose.Error.ValidationError){ //erro de require
        new ErroValidacao(error).enviarResposta(res);
    } else if (error instanceof NaoEncontrado){
        error.enviarResposta(res);
    }else{
        new ErroBase().enviarResposta(res);
    }
}


export default manipuladorDeErros;