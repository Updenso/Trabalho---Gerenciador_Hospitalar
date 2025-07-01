document.addEventListener('DOMContentLoaded', async () => {
    const formEditarPaciente = document.getElementById('FormEditarPaciente');
    const statusMessage = document.getElementById('statusMessage');
    const pacienteIdInput = document.getElementById('pacienteId');

    // Obter o ID do paciente da URL
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteIdFromUrl = urlParams.get('id');

    // Se houver um ID na URL, preencher o campo e carregar os dados
    if (pacienteIdFromUrl) {
        pacienteIdInput.value = pacienteIdFromUrl;
        fetchAndPopulatePatient(pacienteIdFromUrl);
    } else {
        // Caso não haja ID na URL, limpar o campo e a mensagem de status para que o usuário possa digitar
        pacienteIdInput.value = '';
        statusMessage.textContent = '';
        statusMessage.classList.add('hidden');
    }

    // Função para buscar e preencher os dados do paciente
    async function fetchAndPopulatePatient(id) {
        // Se o ID for inválido ou vazio, limpar o formulário e exibir mensagem de erro
        if (!id || isNaN(id)) {
            statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
            statusMessage.classList.add('bg-red-100', 'text-red-700');
            statusMessage.textContent = 'Por favor, insira um ID de paciente válido.';
            // Limpar todos os campos do formulário (exceto o ID)
            formEditarPaciente.reset();
            pacienteIdInput.value = id; // Manter o ID digitado no campo
            return;
        }

        try {
            const response = await fetch(`/api/pacientes/${id}`);
            if (!response.ok) {
                // Se a resposta não for OK (ex: 404), limpar o formulário e exibir mensagem de não encontrado
                formEditarPaciente.reset();
                pacienteIdInput.value = id; // Manter o ID digitado no campo
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Paciente não encontrado.';
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.paciente) {
                const patient = result.paciente;

                // Preencher o campo ID (já está sendo preenchido no bloco if/else acima, mas manter aqui para consistência)
                document.getElementById('pacienteId').value = patient.pacienteId;
                document.getElementById('name').value = patient.nomeCompleto;
                // Formatar a data de nascimento para o formato YYYY-MM-DD
                document.getElementById('dob').value = patient.dataNascimento ? patient.dataNascimento.split('T')[0] : '';
                // Selecionar o gênero
                document.querySelectorAll(`input[name="gender"][value="${patient.genero}"]`).forEach(radio => radio.checked = true);
                document.getElementById('cpf').value = patient.cpf;
                document.getElementById('email').value = patient.email;
                document.getElementById('phone').value = patient.telefone;

                // Preencher o campo de endereço (textarea)
                document.getElementById('address').value = patient.endereco || '';

                document.getElementById('medicalHistory').value = patient.historicoMedico;

            } else {
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = result.message || 'Paciente não encontrado.';
            }
        } catch (error) {
            console.error('Erro ao buscar dados do paciente:', error);
            statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
            statusMessage.classList.add('bg-red-100', 'text-red-700');
            statusMessage.textContent = 'Erro ao carregar dados do paciente.';
        }
    }

    // Adicionar um event listener para o campo ID, para buscar dados ao digitar/colar um ID
    pacienteIdInput.addEventListener('change', () => {
        const newPacienteId = pacienteIdInput.value;
        fetchAndPopulatePatient(newPacienteId);
    });

    // Lidar com o envio do formulário de edição
    if (formEditarPaciente) {
        formEditarPaciente.addEventListener('submit', async (event) => {
            event.preventDefault();

            statusMessage.textContent = '';
            statusMessage.classList.add('hidden');

            // Certificar-se de que o ID do paciente é obtido do campo de input, não da URL
            const idParaAtualizar = pacienteIdInput.value; 

            if (!idParaAtualizar || isNaN(idParaAtualizar)) {
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Não é possível salvar: ID do paciente inválido.';
                return;
            }

            const formData = new FormData(formEditarPaciente);
            const data = {
                nomeCompleto: formData.get('name'),
                dataNascimento: formData.get('dob'),
                genero: formData.get('gender'),
                cpf: formData.get('cpf'),
                email: formData.get('email'),
                telefone: formData.get('phone'),
                endereco: formData.get('address'),
                historicoMedico: formData.get('medicalHistory')
            };

            try {
                const response = await fetch(`/api/pacientes/${idParaAtualizar}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    statusMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
                    statusMessage.classList.add('bg-green-100', 'text-green-700');
                    statusMessage.textContent = result.message || 'Paciente atualizado com sucesso!';
                } else {
                    statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                    statusMessage.classList.add('bg-red-100', 'text-red-700');
                    statusMessage.textContent = result.message || 'Erro ao atualizar paciente.';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
            }
        });
    } else {
        console.error('Formulário com ID "FormEditarPaciente" não encontrado.');
    }
});
