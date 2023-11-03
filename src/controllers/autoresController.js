import {autores}from "../models/Autor.js";

class AutorController {

    static listarAutores = async(req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (error) {
            res.status(500).json({message:"Erro interno no servidor"});
        }
        
    };

    static listarAutorPorId = async (req, res) => {
        try {
            const autorResultado = await autores.findById(req.params.id);
            res.status(200).send(autorResultado);
        } catch (error) {
            res.status(400).send({message: `${error} - Id do Autor não localizado.`});
        }
    };

    static cadastrarAutor = async (req, res) => {
        try {
            console.log(req.body);
            const novoAutor = await autores.create(req.body);
            res.status(201).json({message : "Autor cadastrado", autor : novoAutor});
        } catch (error) {
            res.status(500).send({message: `${error.message} - falha ao cadastrar Autor.`});
            
        }
    };

    static atualizarAutor = async (req, res) => {
        
        try {
            const id = req.params.id;
            const atualizaAutor = req.body;
            console.log(atualizaAutor);
            await autores.findByIdAndUpdate(id,atualizaAutor);
            res.status(200).send({message: "Autor atualizado com sucesso",autor:atualizaAutor});
        } catch (error) {
            res.status(500).send({message: error.message});
        }

    };

    static excluirAutor = async (req, res) => {
        
        try {
            const id = req.params.id;
            console.log(id);
            await autores.findByIdAndDelete(id);
            res.status(200).send({message: "Autor removido com sucesso"});
        } catch (error) {
            res.status(500).send({message: error.message});
        }        
       
    };

}

export default AutorController;