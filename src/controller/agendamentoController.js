import Agendamento from "../model/agendamento.js";

class AgendamentoController {

    static async visualizarAgendamentos(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                Agendamento.visualizarPorId(id, (error, agendamento) => {
                    if (error) {
                        return res.status(500).json({ message: `${error.message} - falha na requisição de agendamento` });
                    }
                    if (agendamento) {
                        res.status(200).json({
                            message: "Agendamento encontrado!",
                            agendamento: agendamento
                        });
                    } else {
                        res.status(404).json({ message: "Agendamento não encontrado." });
                    }
                });
            } else {
                Agendamento.visualizarTodos((error, agendamentos) => {
                    if (error) {
                        return res.status(500).json({ message: `${error.message} - falha na requisição de agendamentos` });
                    }
                    res.status(200).json({
                        message: "Lista de agendamentos.",
                        agendamentos: agendamentos
                    });
                });
            }
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição de agendamentos` });
        }
    };

    static async adicionarAgendamento(req, res) {
        try {
            const novoAgendamentoDados = req.body;
            const novoAgendamento = new Agendamento(
                novoAgendamentoDados.pacienteId,
                novoAgendamentoDados.profissionalId,
                novoAgendamentoDados.dataAgendamento,
                novoAgendamentoDados.horaAgendamento,
                novoAgendamentoDados.tipoAgendamento,
                novoAgendamentoDados.observacoes
            );

            Agendamento.adicionar(novoAgendamento, (error, agendamentoAdicionado) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha ao adicionar agendamento` });
                }
                res.status(201).json({
                    message: "Agendamento adicionado com sucesso!",
                    agendamento: agendamentoAdicionado
                });
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao adicionar agendamento` });
        }
    }

    static async editarAgendamento(req, res) {
        try {
            const id = req.params.id;
            const dadosAtualizados = req.body;

            Agendamento.editar(id, dadosAtualizados, (error, sucesso) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha na atualização do agendamento` });
                }
                if (sucesso) {
                    res.status(200).json({ message: `Agendamento com ID ${id} atualizado com sucesso!` });
                } else {
                    res.status(404).json({ message: "Agendamento não encontrado para edição." });
                }
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do agendamento` });
        }
    };

    static async deletarAgendamento(req, res) {
        try {
            const id = req.params.id;

            Agendamento.deletar(id, (error, sucesso) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha na exclusão do agendamento` });
                }
                if (sucesso) {
                    res.status(200).json({ message: `Agendamento com ID ${id} deletado com sucesso!` });
                } else {
                    res.status(404).json({ message: "Agendamento não encontrado para exclusão." });
                }
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão do agendamento` });
        }
    };
}

export default AgendamentoController;