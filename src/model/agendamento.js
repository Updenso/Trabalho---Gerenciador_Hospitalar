import connection from "../config/DBconfig.js";

class Agendamento {
    constructor(pacienteId, profissionalId, dataAgendamento, horaAgendamento, tipoAgendamento, observacoes) {
        this.pacienteId = pacienteId;
        this.profissionalId = profissionalId;
        this.dataAgendamento = dataAgendamento;
        this.horaAgendamento = horaAgendamento;
        this.tipoAgendamento = tipoAgendamento;
        this.observacoes = observacoes;
    }

    static adicionar(agendamento, callback) {
        const sql = 'INSERT INTO agendamento (paciente_id, profissional_id, data_agendamento, hora_agendamento, tipo_agendamento, observacoes) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [agendamento.pacienteId, agendamento.profissionalId, agendamento.dataAgendamento, agendamento.horaAgendamento, agendamento.tipoAgendamento, agendamento.observacoes], (error, results) => {
            if (error) {
                console.error("Erro ao adicionar agendamento:", error);
                return callback(error, null);
            }
            callback(null, { agendamento_id: results.insertId, ...agendamento });
        });
    }

    static visualizarTodos(callback) {
        const sql = 'SELECT * FROM agendamento';
        connection.query(sql, (error, results) => {
            if (error) {
                console.error("Erro ao buscar todos os agendamentos:", error);
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    static visualizarPorId(id, callback) {
        const sql = 'SELECT * FROM agendamento WHERE agendamento_id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao buscar agendamento por ID:", error);
                return callback(error, null);
            }
            callback(null, results[0]);
        });
    }

    static editar(id, dadosAtualizados, callback) {
        let sets = [];
        let values = [];

        for (const key in dadosAtualizados) {
            let dbColumnName = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            // exceção para paciente_id, profissional_id, agendamento_id se eles forem passados (não deveriam ser atualizados assim)
            if (dbColumnName === 'agendamento_id' || dbColumnName === 'paciente_id' || dbColumnName === 'profissional_id') continue;
            
            sets.push(`${dbColumnName} = ?`);
            values.push(dadosAtualizados[key]);
        }

        if (sets.length === 0) {
            return callback(null, false); // Nada para atualizar
        }

        values.push(id); 

        const sql = `UPDATE agendamento SET ${sets.join(', ')} WHERE agendamento_id = ?`;
        connection.query(sql, values, (error, results) => {
            if (error) {
                console.error("Erro ao editar agendamento:", error);
                return callback(error, null);
            }
            callback(null, results.affectedRows > 0);
        });
    }

    static deletar(id, callback) {
        const sql = 'DELETE FROM agendamento WHERE agendamento_id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao deletar agendamento:", error);
                return callback(error, null);
            }
            callback(null, results.affectedRows > 0);
        });
    }
}

export default Agendamento;
