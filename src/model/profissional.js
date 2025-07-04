import connection from "../config/DBconfig.js";

class Profissional {
    constructor(nomeCompleto, email, crm, dataNascimento, dataAdmissao, telefone, genero, especialidade, endereco, biografia) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.crm = crm;
        this.dataNascimento = dataNascimento;
        this.dataAdmissao = dataAdmissao;
        this.telefone = telefone;
        this.genero = genero;
        this.especialidade = especialidade;
        this.endereco = endereco; // Isso será uma string do cliente ou do DB
        this.biografia = biografia;
    }

    // Helper para formatar datas para YYYY-MM-DD
    static _formatDateToYYYYMMDD(dateValue) {
        if (!dateValue) return null;

        let date;
        // If it's already a Date object, use it directly
        if (dateValue instanceof Date) {
            date = dateValue;
        } else {
            // Try to parse it as a string. If it's a number (timestamp), convert to string.
            // This is safer than directly passing non-string/non-Date objects to new Date().
            const stringValue = typeof dateValue === 'number' ? new Date(dateValue).toISOString() : String(dateValue);
            date = new Date(stringValue);
        }

        if (isNaN(date.getTime())) {
            // If parsing failed, try to handle common MySQL date formats directly as strings
            // This is a fallback if new Date() struggles with the raw DB string format
            const potentialDateString = String(dateValue).split('T')[0]; // Handles ISO format like "YYYY-MM-DDTHH:MM:SS.sssZ"
            date = new Date(potentialDateString);
            if (isNaN(date.getTime())) {
                return null; // Still invalid, return null
            }
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static adicionar(profissional, callback) {
        // Garantir que o endereço seja uma string se for um objeto do frontend
        let enderecoString = profissional.endereco;
        if (typeof profissional.endereco === 'object' && profissional.endereco !== null) {
            enderecoString = `${profissional.endereco.rua}, ${profissional.endereco.numero}, ${profissional.endereco.bairro}, ${profissional.endereco.cidade}, ${profissional.endereco.estado}`;
        }

        const sql = 'INSERT INTO profissional (nome_completo, email, crm, data_nascimento, data_admissao, telefone, genero, especialidade, endereco, biografia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sql, [
            profissional.nomeCompleto,
            profissional.email,
            profissional.crm,
            profissional.dataNascimento,
            profissional.dataAdmissao,
            profissional.telefone,
            profissional.genero,
            profissional.especialidade,
            enderecoString, // Usar a string de endereço formatada
            profissional.biografia
        ], (error, results) => {
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
            // Formatar datas e garantir camelCase para consistência do frontend
            const formattedProfessionals = results.map(prof => ({
                profissionalId: prof.profissional_id,
                nomeCompleto: prof.nome_completo,
                email: prof.email,
                crm: prof.crm,
                dataNascimento: Profissional._formatDateToYYYYMMDD(prof.data_nascimento),
                dataAdmissao: Profissional._formatDateToYYYYMMDD(prof.data_admissao),
                telefone: prof.telefone,
                genero: prof.genero,
                especialidade: prof.especialidade,
                endereco: prof.endereco,
                biografia: prof.biografia
            }));
            callback(null, formattedProfessionals);
        });
    }

    static visualizarPorId(id, callback) {
        const sql = 'SELECT * FROM profissional WHERE profissional_id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Erro ao buscar profissional por ID:", error);
                return callback(error, null);
            }
            if (results[0]) {
                const prof = results[0];
                const formattedProf = {
                    profissionalId: prof.profissional_id,
                    nomeCompleto: prof.nome_completo,
                    email: prof.email,
                    crm: prof.crm,
                    dataNascimento: Profissional._formatDateToYYYYMMDD(prof.data_nascimento),
                    dataAdmissao: Profissional._formatDateToYYYYMMDD(prof.data_admissao),
                    telefone: prof.telefone,
                    genero: prof.genero,
                    especialidade: prof.especialidade,
                    endereco: prof.endereco,
                    biografia: prof.biografia
                };
                callback(null, formattedProf);
            } else {
                callback(null, null);
            }
        });
    }

    static editar(id, dadosAtualizados, callback) {
        let sets = [];
        let values = [];

        for (const key in dadosAtualizados) {
            let dbColumnName;
            let valueToStore = dadosAtualizados[key];

            // Lidar com o mapeamento de camelCase para snake_case para colunas do banco de dados
            if (key === 'nomeCompleto') dbColumnName = 'nome_completo';
            else if (key === 'dataNascimento') dbColumnName = 'data_nascimento';
            else if (key === 'dataAdmissao') dbColumnName = 'data_admissao';
            else if (key === 'crm') dbColumnName = 'crm';
            else if (key === 'profissionalId') continue; // Ignorar ID
            else if (key === 'endereco' && typeof dadosAtualizados[key] === 'object' && dadosAtualizados[key] !== null) {
                // Se o endereço for um objeto, convertê-lo para uma string para armazenamento
                valueToStore = `${dadosAtualizados[key].rua}, ${dadosAtualizados[key].numero}, ${dadosAtualizados[key].bairro}, ${dadosAtualizados[key].cidade}, ${dadosAtualizados[key].estado}`;
                dbColumnName = 'endereco';
            }
            else {
                dbColumnName = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            }

            if (dbColumnName) { // Garantir que dbColumnName não seja indefinido para chaves ignoradas
                sets.push(`${dbColumnName} = ?`);
                values.push(valueToStore);
            }
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
