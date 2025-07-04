import Agendamento from "../model/agendamento.js";

class AgendamentoController {

    static _formatDateToDDMMYYYY(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
      
        date.setDate(date.getDate() + 1);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    static _formatTime(timeString) {
        if (!timeString) return null;
    
        return timeString.substring(0, 5); 
    }

    static async visualizarAgendamentos(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                Agendamento.visualizarPorId(id, (error, agendamento) => {
                    if (error) {
                        return res.status(500).json({ message: `${error.message} - falha na requisição de agendamento` });
                    }
                    if (agendamento) {
                        // Formatar data e hora antes de enviar
                        const formattedAgendamento = {
                            agendamentoId: agendamento.agendamento_id,
                            pacienteId: agendamento.paciente_id,
                            profissionalId: agendamento.profissional_id,
                            dataAgendamento: agendamento.data_agendamento ? new Date(agendamento.data_agendamento).toISOString().split('T')[0] : null,
                            horaAgendamento: AgendamentoController._formatTime(agendamento.hora_agendamento),
                            tipoAgendamento: agendamento.tipo_agendamento,
                            observacoes: agendamento.observacoes,
                            status: agendamento.status
                        };
                        res.status(200).json({
                            message: "Agendamento encontrado!",
                            agendamento: formattedAgendamento
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
                    const formattedAgendamentos = agendamentos.map(agendamento => ({
                        agendamentoId: agendamento.agendamento_id,
                        pacienteId: agendamento.paciente_id,
                        profissionalId: agendamento.profissional_id,
                        dataAgendamento: AgendamentoController._formatDateToDDMMYYYY(agendamento.data_agendamento),
                        horaAgendamento: AgendamentoController._formatTime(agendamento.hora_agendamento),
                        tipoAgendamento: agendamento.tipo_agendamento,
                        observacoes: agendamento.observacoes,
                        status: agendamento.status
                    }));
                    res.status(200).json({
                        message: "Lista de agendamentos.",
                        agendamentos: formattedAgendamentos
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
                novoAgendamentoDados.observacoes,
                novoAgendamentoDados.status || 'Pendente'
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

            // Primeiro, verifique o status do agendamento
            Agendamento.visualizarPorId(id, (error, agendamento) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha ao buscar agendamento para exclusão` });
                }
                if (!agendamento) {
                    return res.status(404).json({ message: "Agendamento não encontrado para exclusão." });
                }

                // Verifique se o status permite a exclusão
                if (agendamento.status === 'Em Progresso') {
                    return res.status(400).json({ message: "Não é possível deletar um agendamento em progresso." });
                }

                // Se o status permitir, prossiga com a exclusão
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
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão do agendamento` });
        }
    };
}

export default AgendamentoController;