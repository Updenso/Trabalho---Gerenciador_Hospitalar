import Paciente from "../model/paciente.js";

class PacienteController {

    static async visualizarPacientes(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                Paciente.visualizarPorId(id, (error, paciente) => {
                    if (error) {
                        return res.status(500).json({ message: `${error.message} - falha na requisição de paciente` });
                    }
                    if (paciente) {
                        const pacienteCamelCase = {};
                        for (const key in paciente) {
                            const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
                            pacienteCamelCase[camelCaseKey] = paciente[key];
                        }
                        res.status(200).json({
                            message: "Paciente encontrado!",
                            paciente: pacienteCamelCase
                        });
                    } else {
                        res.status(404).json({ message: "Paciente não encontrado." });
                    }
                });
            } else {
                Paciente.visualizarTodos((error, pacientes) => {
                    if (error) {
                        return res.status(500).json({ message: `${error.message} - falha na requisição de pacientes` });
                    }
                    const pacientesCamelCase = pacientes.map(paciente => {
                        const pacienteObj = {};
                        for (const key in paciente) {
                            const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
                            pacienteObj[camelCaseKey] = paciente[key];
                        }
                        return pacienteObj;
                    });
                    res.status(200).json({
                        message: "Lista de pacientes.",
                        pacientes: pacientesCamelCase
                    });
                });
            }
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição de pacientes` });
        }
    };

    static async adicionarPaciente(req, res) {
        try {
            console.log('Dados recebidos no req.body:', req.body);
            const novoPacienteDados = req.body; 

            // Concatena os campos de endereço em uma única string
            const enderecoCompleto = `${novoPacienteDados.endereco.rua}, ${novoPacienteDados.endereco.numero}, ${novoPacienteDados.endereco.bairro}, ${novoPacienteDados.endereco.cidade}, ${novoPacienteDados.endereco.estado}`;

            const novoPaciente = new Paciente(
                novoPacienteDados.nomeCompleto,
                novoPacienteDados.dataNascimento,
                novoPacienteDados.genero,
                novoPacienteDados.cpf,
                novoPacienteDados.email,
                novoPacienteDados.telefone,
                enderecoCompleto, // Passa a string concatenada
                novoPacienteDados.historicoMedico
            );

            Paciente.adicionar(novoPaciente, (error, pacienteAdicionado) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha ao adicionar paciente` });
                }
                res.status(201).json({
                    message: "Paciente adicionado com sucesso!",
                    paciente: pacienteAdicionado
                });
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao adicionar paciente` });
        }
    }

    static async editarPaciente(req, res) {
        try {
            const id = req.params.id; 
            const dadosAtualizados = req.body; 

            // Se o endereço for um objeto, concatene os campos em uma string
            if (dadosAtualizados.endereco && typeof dadosAtualizados.endereco === 'object') {
                dadosAtualizados.endereco = `${dadosAtualizados.endereco.rua}, ${dadosAtualizados.endereco.numero}, ${dadosAtualizados.endereco.bairro}, ${dadosAtualizados.endereco.cidade}, ${dadosAtualizados.endereco.estado}`;
            }

            Paciente.editar(id, dadosAtualizados, (error, sucesso) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha na atualização do paciente` });
                }
                if (sucesso) {
                    res.status(200).json({ message: `Paciente com ID ${id} atualizado com sucesso!` });
                } else {
                    res.status(404).json({ message: "Paciente não encontrado para edição." });
                }
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do paciente` });
        }
    };

    static async deletarPaciente(req, res) {
        try {
            const id = req.params.id; 

            Paciente.deletar(id, (error, sucesso) => {
                if (error) {
                    return res.status(500).json({ message: `${error.message} - falha na exclusão do paciente` });
                }
                if (sucesso) {
                    res.status(200).json({ message: `Paciente com ID ${id} deletado com sucesso!` });
                } else {
                    res.status(404).json({ message: "Paciente não encontrado para exclusão." });
                }
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão do paciente` });
        }
    };
}

export default PacienteController;