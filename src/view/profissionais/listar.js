import { deleteProfessional } from './deletar.js';

document.addEventListener('DOMContentLoaded', () => {
    const professionalsTableBody = document.getElementById('professionalsTableBody');

    async function fetchAndDisplayProfessionals() {
        try {
            const response = await fetch('/api/profissionais');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.profissionais && result.profissionais.length > 0) {
                professionalsTableBody.innerHTML = ''; 
                result.profissionais.forEach(professional => {
                    const row = professionalsTableBody.insertRow();

                    let cell = row.insertCell();
                    cell.textContent = professional.profissionalId;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-l', 'border-r', 'border-gray-200');
                    
                    cell = row.insertCell();
                    cell.textContent = professional.nomeCompleto;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');
                    
                    cell = row.insertCell();
                    cell.textContent = professional.email;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = professional.dataNascimento;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = professional.dataAdmissao;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = professional.telefone;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = professional.genero;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = professional.especialidade;
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = professional.endereco; 
                    cell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'text-gray-700', 'border-r', 'border-gray-200');

                    cell = row.insertCell();
                    cell.textContent = professional.biografia;
                    cell.classList.add('px-6', 'py-4', 'text-sm', 'text-gray-700', 'max-w-xs', 'overflow-hidden', 'text-ellipsis', 'border-r', 'border-gray-200');

                    const actionsCell = row.insertCell();
                    actionsCell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'font-medium', 'border-r', 'border-gray-200');

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'p-3', 'rounded-md', 'mr-2');
                    editButton.onclick = () => {
                        window.location.href = `editarProfissional.html?id=${professional.profissionalId}`;
                    };
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'p-3', 'rounded-md');
                    deleteButton.onclick = async () => {
                        if (await deleteProfessional(professional.profissionalId)) {
                            fetchAndDisplayProfessionals(); // Recarrega a lista após a exclusão
                        }
                    };
                    actionsCell.appendChild(deleteButton);
                });
            } else {
                professionalsTableBody.innerHTML = '<tr><td colspan="10" class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Nenhum profissional encontrado.</td></tr>';
            }
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            professionalsTableBody.innerHTML = '<tr><td colspan="10" class="px-6 py-4 whitespace-nowrap text-sm text-red-500 text-center">Erro ao carregar profissionais.</td></tr>';
        }
    }

    fetchAndDisplayProfessionals();
}); 