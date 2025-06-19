import connection from "../config/DBconfig.js";

class Profissional {
    constructor(nomeCompleto, nomeUsuario, email, senha, dataNascimento, dataAdmissao, telefone, genero, especialidade, endereco, biografia) {
        this.nomeCompleto = nomeCompleto;
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.senha = senha; // Lembre-se de sempre hashear senhas antes de salvar em um ambiente de produção!
        this.dataNascimento = dataNascimento;
        this.dataAdmissao = dataAdmissao;
        this.telefone = telefone;
        this.genero = genero;
        this.especialidade = especialidade;
        this.endereco = endereco;
        this.biografia = biografia;
    }

    static adicionar(profissional, callback) {
        const sql = 'INSERT INTO profissional (nome_completo, nome_usuario, email, senha, data_nascimento, data_admissao, telefone, genero, especialidade, endereco, biografia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sql, [profissional.nomeCompleto, profissional.nomeUsuario, profissional.email, profissional.senha, profissional.dataNascimento, profissional.dataAdmissao, profissional.telefone, profissional.genero, profissional.especialidade, profissional.endereco, profissional.biografia], (error, results) => {
            if (error) {
                console.error("Erro ao adicionar profissional:", error);
                return callback(error, null);
            }
            callback(null, { profissional_id: results.insertId, ...profissional });
        });
    }

    static visualizarTodos(callback) {
        const sql = 'SELECT * FROM profissional';
        connection.query(sql, (error, results) => {
            if (error) {
                console.error("Erro ao buscar todos os profissionais:", error);
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    static visualizarPorId(id, callback) {
        const sql = 'SELECT * FROM profissional WHERE profissional_id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao buscar profissional por ID:", error);
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
            if (dbColumnName === 'profissional_id') continue; 
            
            sets.push(`${dbColumnName} = ?`);
            values.push(dadosAtualizados[key]);
        }

        if (sets.length === 0) {
            return callback(null, false); // Nada para atualizar
        }

        values.push(id); 

        const sql = `UPDATE profissional SET ${sets.join(', ')} WHERE profissional_id = ?`;
        connection.query(sql, values, (error, results) => {
            if (error) {
                console.error("Erro ao editar profissional:", error);
                return callback(error, null);
            }
            callback(null, results.affectedRows > 0);
        });
    }

    static deletar(id, callback) {
        const sql = 'DELETE FROM profissional WHERE profissional_id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao deletar profissional:", error);
                return callback(error, null);
            }
            callback(null, results.affectedRows > 0);
        });
    }
}

export default Profissional;
