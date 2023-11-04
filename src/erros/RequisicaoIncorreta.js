import ErroBase from "./erroBase.js";

class RequisicaoIncorretas extends ErroBase{
    constructor(mensagem = "Um ou mais dados estão incorretos"){
        super(mensagem,400);
    }
}
export default RequisicaoIncorretas;