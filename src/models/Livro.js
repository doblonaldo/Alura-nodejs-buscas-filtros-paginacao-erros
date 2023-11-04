import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {
            type: String, 
            required: [true, "O título do livro é Obrigatório!"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "autores", 
            required: [true,"O autor(a) é obrigatório"]
        },
        editora: {
            type: String, 
            required: [true,"A editora é obritagória"],
            //cria uma forma de valores permitidos
            enum: { //para tratar erros cria um objeto e dentro tem values e message
                values:["Casa do código","Alura"],
                message:"A editora {VALUE} não é um valor válido."
            }
        },
        numeroPaginas: {
            type: Number,
            //tipo de validação personalizada
            validate:{
                validator:(valor)=>{
                    return valor >= 10 && valor <= 5000;
                },
                message:"O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
            }
            // min:[10,"O número de página deve ser igual ou maior que 10."],
            // max:[5000,"O número de página deve ser igual ou menro que 5000."]
        }
    }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;