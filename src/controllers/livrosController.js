//import { autores } from "../models/Autor.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

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

    static listarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
    
            const livroResultado = await livros.findById(id)
                .populate("autor", "nome")
                .exec();
    
            if (livroResultado !== null) {
                res.status(200).send(livroResultado);
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
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

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
    
            const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});
    
            if (livroResultado !== null) {
                res.status(200).send({message: "Livro atualizado com sucesso"});
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
    
            const livroResultado = await livros.findByIdAndDelete(id);
    
            if (livroResultado !== null) {
                res.status(200).send({message: "Livro removido com sucesso"});
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (erro) {
            next(erro);
        }
    };
    static listarLivroPorFiltro = async (req, res,next) => {
        try {
            const {editora,titulo} = req.query;
            //dessa forma deixa mais dinamico, só usa no filtro caso realmente ele exista
            const busca = {};
            if(editora) busca.editora = editora;
            if(titulo) busca.titulo =  titulo;

            const livrosResultado = await livros.find(busca);
    
            res.status(200).send(livrosResultado);
        } catch (error) {
            next(error);
            // res.status(500).json({ message: "Erro interno no servidor" });
        }
    };

}

export default LivroController;