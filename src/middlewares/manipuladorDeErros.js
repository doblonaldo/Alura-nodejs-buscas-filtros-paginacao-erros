import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next){ // middleware de erro
    if(error instanceof mongoose.Error.CastError){
        res.status(400).send({message:`Bad request - ${error}`});
    }else{
        res.status(500).send({message:`Erro interno do servidor - ${error}`});
    }
}


export default manipuladorDeErros;