import RequisicaoIncorretas from "./RequisicaoINcorreta.js";

class ErroValidacao extends RequisicaoIncorretas{
    constructor(error){
        const mensagensErro = Object.values(error.errors)
            .map(error => error.message)
            .join("; ");
        
        super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}

export default ErroValidacao;