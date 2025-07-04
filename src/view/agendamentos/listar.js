import { deleteAgendamento } from './deletar.js';

document.addEventListener('DOMContentLoaded', () => {
    const appointmentsTableBody = document.getElementById('appointmentsTableBody');

    async function fetchAndDisplayAppointments() {
        try {
            const response = await fetch('/api/agendamentos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.agendamentos && result.agendamentos.length > 0) {
                appointmentsTableBody.innerHTML = ''; // Limpa qualquer linha de exemplo
                result.agendamentos.forEach(appointment => {
                    const row = appointmentsTableBody.insertRow();

                    let cell = row.insertCell();
                    cell.textContent = appointment.agendamentoId;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-l', 'border-r', 'border-gray-200');
                    
                    cell = row.insertCell();
                    cell.textContent = appointment.pacienteId;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');
                    
                    cell = row.insertCell();
                    cell.textContent = appointment.profissionalId;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = appointment.dataAgendamento;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = appointment.horaAgendamento;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = appointment.tipoAgendamento;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = appointment.observacoes;
                    cell.classList.add('px-6', 'py-4', 'text-sm', 'text-gray-700', 'max-w-xs', 'overflow-hidden', 'text-ellipsis', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = appointment.status;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    const actionsCell = row.insertCell();
                    actionsCell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'font-medium', 'border-r', 'border-gray-200');

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'p-3', 'rounded-md', 'mr-2');
                    editButton.onclick = () => {
                        window.location.href = `editarAgendamentos.html?id=${appointment.agendamentoId}`;
                    };
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'p-3', 'rounded-md');
                    deleteButton.onclick = async () => {
                        if (await deleteAgendamento(appointment.agendamentoId)) {
                            fetchAndDisplayAppointments(); // Recarrega a lista após a exclusão
                        }
                    };
                    actionsCell.appendChild(deleteButton);
                });
            } else {
                appointmentsTableBody.innerHTML = '<tr><td colspan="9" class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Nenhum agendamento encontrado.</td></tr>';
            }
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            appointmentsTableBody.innerHTML = '<tr><td colspan="9" class="px-6 py-4 whitespace-nowrap text-sm text-red-500 text-center">Erro ao carregar agendamentos.</td></tr>';
        }
    }

    fetchAndDisplayAppointments();
}); 