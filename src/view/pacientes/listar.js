import { deletePatient } from './deletar.js';

document.addEventListener('DOMContentLoaded', () => {
    const patientsTableBody = document.getElementById('patientsTableBody');

    async function fetchAndDisplayPatients() {
        try {
            const response = await fetch('/api/pacientes');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.pacientes && result.pacientes.length > 0) {
                patientsTableBody.innerHTML = ''; // Limpa qualquer linha de exemplo
                result.pacientes.forEach(patient => {
                    const row = patientsTableBody.insertRow();
                    // Ajuste para corresponder às colunas da tabela em visualizarPaciente.html
                    
                    let cell = row.insertCell();
                    cell.textContent = patient.pacienteId;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-l', 'border-r', 'border-gray-200');
                    
                    cell = row.insertCell();
                    cell.textContent = patient.nomeCompleto;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');
                    
                    // Formata a data de nascimento
                    const dataNascimento = new Date(patient.dataNascimento);
                    cell = row.insertCell();
                    cell.textContent = dataNascimento.toLocaleDateString('pt-BR');
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = patient.genero;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = patient.cpf;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = patient.email;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = patient.telefone;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = patient.endereco; // Endereço já é string
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = patient.historicoMedico;
                    cell.classList.add('px-6', 'py-4', 'text-sm', 'text-gray-700', 'max-w-xs', 'overflow-hidden', 'text-ellipsis', 'border-r', 'border-gray-200');

                    const actionsCell = row.insertCell();
                    actionsCell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'font-medium', 'border-r', 'border-gray-200');

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'p-3', 'rounded-md', 'mr-2');
                    editButton.onclick = () => {
                        window.location.href = `EditarPaciente.html?id=${patient.pacienteId}`;
                    };
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'p-3', 'rounded-md');
                    deleteButton.onclick = async () => {
                        if (await deletePatient(patient.pacienteId)) {
                            fetchAndDisplayPatients(); // Recarrega a lista após a exclusão
                        }
                    };
                    actionsCell.appendChild(deleteButton);
                });
            } else {
                patientsTableBody.innerHTML = '<tr><td colspan="9" class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Nenhum paciente encontrado.</td></tr>';
            }
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            patientsTableBody.innerHTML = '<tr><td colspan="9" class="px-6 py-4 whitespace-nowrap text-sm text-red-500 text-center">Erro ao carregar pacientes.</td></tr>';
        }
    }

    fetchAndDisplayPatients();
});
