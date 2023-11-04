//validador global, usado para setar validação para todos os parametros que for configurado.
//Deve ser importando antes de tudo

import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate",{
    validator: (valor)=>{
        return valor !== "";
    },
    message: ({path})=> `O campo ${path} foi fornecido em branco!`
});