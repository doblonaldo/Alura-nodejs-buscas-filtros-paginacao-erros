// import mongoose from "mongoose";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores}from "../models/Autor.js";

class AutorController {

    static listarAutores = async(req, res,next) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (error) {
            next(error);
            // res.status(500).json({message:"Erro interno no servidor"});
        }
        
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const autorResultado = await autores.findById(req.params.id);
            if(autorResultado !== null){
                res.status(200).send(autorResultado);
            }else{
                next(new NaoEncontrado("Id do Autor não localizado."));
            }
        } catch (error) {
            next(error); // envia o erro para o middleware no app.js
        }
    };

    static cadastrarAutor = async (req, res,next) => {
        try {
            console.log(req.body);
            const novoAutor = await autores.create(req.body);
            res.status(201).json({message : "Autor cadastrado", autor : novoAutor});
        } catch (error) {
            next(error);
        //    res.status(500).send({message: `${error.message} - falha ao cadastrar Autor.`});
        }
    };

    static atualizarAutor = async (req, res,next) => {
        
        try {
            const id = req.params.id;
            const atualizaAutor = req.body;
            // console.log(atualizaAutor);
            const autorEncontrado = await autores.findByIdAndUpdate(id,atualizaAutor);
            if(autorEncontrado!==null){
                res.status(200).send({message: "Autor atualizado com sucesso",autor:atualizaAutor});
            }else{
                next(new NaoEncontrado("Id do Autor não localizado."));
            }
        } catch (error) {
            next(error);
            // res.status(500).send({message: error.message});
        }

    };

    static excluirAutor = async (req, res, next) => {
        
        try {
            const id = req.params.id;
            console.log(id);
            const autorEncontrado = await autores.findByIdAndDelete(id);
            console.log(autorEncontrado);
            if(autorEncontrado!==null){
                res.status(200).send({message: "Autor removido com sucesso"});
            }else{
                next(new NaoEncontrado("Id do Autor não localizado."));
            }
        } catch (error) {
            next(error);
            // res.status(500).send({message: error.message});
        }        
       
    };

}

export default AutorController;