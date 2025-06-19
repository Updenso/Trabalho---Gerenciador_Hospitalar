import connection from "../config/DBconfig.js";

class Paciente {
    constructor(nomeCompleto, dataNascimento, genero, cpf, email, telefone, endereco, historicoMedico) {
        this.nomeCompleto = nomeCompleto;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.historicoMedico = historicoMedico;
    }

    static adicionar(paciente, callback) {
        const sql = 'INSERT INTO paciente (nome_completo, data_nascimento, genero, cpf, email, telefone, endereco, historico_medico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sql, [paciente.nomeCompleto, paciente.dataNascimento, paciente.genero, paciente.cpf, paciente.email, paciente.telefone, paciente.endereco, paciente.historicoMedico], (error, results) => {
            if (error) {
                console.error("Erro ao adicionar paciente:", error);
                return callback(error, null);
            }
            callback(null, { paciente_id: results.insertId, ...paciente });
        });
    }

    static visualizarTodos(callback) {
        const sql = 'SELECT * FROM paciente';
        connection.query(sql, (error, results) => {
            if (error) {
                console.error("Erro ao buscar todos os pacientes:", error);
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    static visualizarPorId(id, callback) {
        const sql = 'SELECT * FROM paciente WHERE paciente_id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao buscar paciente por ID:", error);
                return callback(error, null);
            }
            callback(null, results[0]);
        });
    }

    static editar(id, dadosAtualizados, callback) {
        let sets = [];
        let values = [];

        for (const key in dadosAtualizados) {
            // Mapeia o nome do campo CamelCase para snake_case do banco de dados, se necessário
            let dbColumnName = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            // exceção para paciente_id, profissional_id, agendamento_id se eles forem passados (não deveriam ser atualizados assim)
            if (dbColumnName === 'paciente_id') continue; 
            
            sets.push(`${dbColumnName} = ?`);
            values.push(dadosAtualizados[key]);
        }

        if (sets.length === 0) {
            return callback(null, false); // Nada para atualizar
        }

        values.push(id); // Adiciona o ID ao final dos valores

        const sql = `UPDATE paciente SET ${sets.join(', ')} WHERE paciente_id = ?`;
        connection.query(sql, values, (error, results) => {
            if (error) {
                console.error("Erro ao editar paciente:", error);
                return callback(error, null);
            }
            callback(null, results.affectedRows > 0);
        });
    }

    static deletar(id, callback) {
        const sql = 'DELETE FROM paciente WHERE paciente_id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao deletar paciente:", error);
                return callback(error, null);
            }
            callback(null, results.affectedRows > 0);
        });
    }
}

export default Paciente;