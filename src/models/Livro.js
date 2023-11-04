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
            required: [true,"A editora é obritagória"]
        },
        numeroPaginas: {type: Number}
    }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;