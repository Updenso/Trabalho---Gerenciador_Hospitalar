// Importe o modelo de Profissional aqui quando ele for criado (ex: import profissional from "../models/Profissional.js";)
// Por enquanto, usaremos uma simulação.

import Profissional from "../model/profissional.js";

class ProfissionalController {

    static async visualizarProfissionais(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                Profissional.visualizarPorId(id, (error, profissional) => {
                    if (error) {
                        return res.status(500).json({ message: `${error.message} - falha na requisição de profissional` });
                    }
                    if (profissional) {
                        res.status(200).json({
                            message: "Profissional encontrado!",
                            profissional: profissional
                        });
                    } else {
                        res.status(404).json({ message: "Profissional não encontrado." });
                    }
                });
            } else {
                Profissional.visualizarTodos((error, profissionais) => {
                    if (error) {
                        return res.status(500).json({ message: `${error.message} - falha na requisição de profissionais` });
                    }
                    res.status(200).json({
                        message: "Lista de profissionais.",
                        profissionais: profissionais
                    });
                });
            }
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição de profissionais` });
        }
    };

    static async adicionarProfissional(req, res) {
        try {
            const novoProfissionalDados = req.body;
            const novoProfissional = new Profissional(
                novoProfissionalDados.nomeCompleto,
                novoProfissionalDados.email,
                novoProfissionalDados.dataNascimento,
                novoProfissionalDados.dataAdmissao,
                novoProfissionalDados.telefone,
                novoProfissionalDados.genero,
                novoProfissionalDados.especialidade,
                novoProfissionalDados.endereco,
                novoProfissionalDados.biografia
            );

            Profissional.adicionar(novoProfissional, (error, profissionalAdicionado) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha ao adicionar profissional` });
                }
                res.status(201).json({
                    message: "Profissional adicionado com sucesso!",
                    profissional: profissionalAdicionado
                });
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao adicionar profissional` });
        }
    }

    static async editarProfissional(req, res) {
        try {
            const id = req.params.id;
            const dadosAtualizados = req.body;

            Profissional.editar(id, dadosAtualizados, (error, sucesso) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha na atualização do profissional` });
                }
                if (sucesso) {
                    res.status(200).json({ message: `Profissional com ID ${id} atualizado com sucesso!` });
                } else {
                    res.status(404).json({ message: "Profissional não encontrado para edição." });
                }
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do profissional` });
        }
    };

    static async deletarProfissional(req, res) {
        try {
            const id = req.params.id;

            Profissional.deletar(id, (error, sucesso) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha na exclusão do profissional` });
                }
                if (sucesso) {
                    res.status(200).json({ message: `Profissional com ID ${id} deletado com sucesso!` });
                } else {
                    res.status(404).json({ message: "Profissional não encontrado para exclusão." });
                }
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão do profissional` });
        }
    };
}

export default ProfissionalController;
