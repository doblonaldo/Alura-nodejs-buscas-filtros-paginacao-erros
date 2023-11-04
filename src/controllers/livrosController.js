//import { autores } from "../models/Autor.js";
import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res,next) => {

        try {
            const livrosResultados = await livros.find().populate("autor").exec();
            console.log(livrosResultados);
            res.status(200).json(livrosResultados);
        } catch (error) {
            next(error);
            // res.status(400).json({message: "Não tem livros cadastrados",erro:error.message});
        }
    };

    static listarLivroPorId = async (req, res,next) => {
        try {
            const id = req.params.id;
            const livroResultado = await livros.findById(id).populate("autor","nome").exec();
            res.status(200).json(livroResultado);
        } catch (error) {
            next(error);
            // res.status(400).send({message: `${error.message} - Id do livro não localizado.`});
        }
    };

    static cadastrarLivro = async (req, res,next) => {
        try {
            let livro = new livros(req.body);
    
            const livroResultado = await livro.save();
    
            res.status(201).send(livroResultado.toJSON());
        } catch (error) {
            next(error);
            // res.status(500).send({message: `${error.message} - falha ao cadastrar livro.`});
        }
    };

    static atualizarLivro = async (req, res,next) => {
        try {
            const id = req.params.id;
    
            await livros.findByIdAndUpdate(id, {$set: req.body});
    
            res.status(200).send({message: "Livro atualizado com sucesso"});
        } catch (error) {
            next(error);
            // res.status(500).send({message: error.message});
        }
    };

    static excluirLivro = async (req, res,next) => {
        try {
            const id = req.params.id;
    
            await livros.findByIdAndDelete(id);
    
            res.status(200).send({message: "Livro removido com sucesso"});
        } catch (error) {
            next(error);
            // res.status(500).send({message: error.message});
        }
    };
    static listarLivroPorEditora = async (req, res,next) => {
        try {
            const editora = req.query.editora;
    
            const livrosResultado = await livros.find({"editora": editora});
    
            res.status(200).send(livrosResultado);
        } catch (error) {
            next(error);
            // res.status(500).json({ message: "Erro interno no servidor" });
        }
    };

}

export default LivroController;