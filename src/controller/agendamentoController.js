import Agendamento from "../model/agendamento.js";

class AgendamentoController {

    static _formatDateToDDMMYYYY(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        // Adiciona 1 dia para corrigir o fuso horário se necessário (apenas para exibição)
        date.setDate(date.getDate() + 1);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    static _formatTime(timeString) {
        if (!timeString) return null;
        // Supondo que timeString já esteja em um formato legível (HH:MM:SS ou HH:MM)
        // Se for um objeto Date, pode ser necessário formatar: new Date(`2000-01-01T${timeString}`).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        // Por simplicidade, assumindo que vem como string HH:MM ou HH:MM:SS
        return timeString.substring(0, 5); // Retorna HH:MM
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
                            observacoes: agendamento.observacoes
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
                        observacoes: agendamento.observacoes
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
            // Assumir que dataAgendamento e horaAgendamento já vêm formatados ou são strings válidas do frontend
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