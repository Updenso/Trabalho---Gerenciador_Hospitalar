document.addEventListener('DOMContentLoaded', async () => {
    const formEditarAgendamento = document.getElementById('FormEditarAgendamento');
    const statusMessage = document.getElementById('statusMessage');
    const agendamentoIdInput = document.getElementById('agendamentoId');

    // Obter o ID do agendamento da URL
    const urlParams = new URLSearchParams(window.location.search);
    const agendamentoIdFromUrl = urlParams.get('id');

    // Se houver um ID na URL, preencher o campo e carregar os dados
    if (agendamentoIdFromUrl) {
        agendamentoIdInput.value = agendamentoIdFromUrl;
        fetchAndPopulateAgendamento(agendamentoIdFromUrl);
    } else {
        // Caso não haja ID na URL, limpar o campo e a mensagem de status para que o usuário possa digitar
        agendamentoIdInput.value = '';
        statusMessage.textContent = '';
        statusMessage.classList.add('hidden');
    }

    // Função para buscar e preencher os dados do agendamento
    async function fetchAndPopulateAgendamento(id) {
        // Se o ID for inválido ou vazio, limpar o formulário e exibir mensagem de erro
        if (!id || isNaN(id)) {
            statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
            statusMessage.classList.add('bg-red-100', 'text-red-700');
            statusMessage.textContent = 'Por favor, insira um ID de agendamento válido.';
            // Limpar todos os campos do formulário (exceto o ID)
            formEditarAgendamento.reset();
            agendamentoIdInput.value = id; // Manter o ID digitado no campo
            return;
        }

        try {
            const response = await fetch(`/api/agendamentos/${id}`);
            if (!response.ok) {
                // Se a resposta não for OK (ex: 404), limpar o formulário e exibir mensagem de não encontrado
                formEditarAgendamento.reset();
                agendamentoIdInput.value = id; // Manter o ID digitado no campo
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Agendamento não encontrado.';
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.agendamento) {
                const agendamento = result.agendamento;

                // Preencher o campo ID
                document.getElementById('agendamentoId').value = agendamento.agendamentoId;
                document.getElementById('pacienteId').value = agendamento.pacienteId;
                document.getElementById('profissionalId').value = agendamento.profissionalId;
                document.getElementById('dataAgendamento').value = agendamento.dataAgendamento;
                document.getElementById('horaAgendamento').value = agendamento.horaAgendamento;
                document.getElementById('tipoAgendamento').value = agendamento.tipoAgendamento;
                document.getElementById('observacoes').value = agendamento.observacoes;

            } else {
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = result.message || 'Agendamento não encontrado.';
            }
        } catch (error) {
            console.error('Erro ao buscar dados do agendamento:', error);
            statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
            statusMessage.classList.add('bg-red-100', 'text-red-700');
            statusMessage.textContent = 'Erro ao carregar dados do agendamento.';
        }
    }

    // Adicionar um event listener para o campo ID, para buscar dados ao digitar/colar um ID
    agendamentoIdInput.addEventListener('change', () => {
        const newAgendamentoId = agendamentoIdInput.value;
        fetchAndPopulateAgendamento(newAgendamentoId);
    });

    // Lidar com o envio do formulário de edição
    if (formEditarAgendamento) {
        formEditarAgendamento.addEventListener('submit', async (event) => {
            event.preventDefault();

            statusMessage.textContent = '';
            statusMessage.classList.add('hidden');

            // Certificar-se de que o ID do agendamento é obtido do campo de input, não da URL
            const idParaAtualizar = agendamentoIdInput.value; 

            if (!idParaAtualizar || isNaN(idParaAtualizar)) {
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Não é possível salvar: ID do agendamento inválido.';
                return;
            }

            const formData = new FormData(formEditarAgendamento);
            const data = {
                pacienteId: formData.get('pacienteId'),
                profissionalId: formData.get('profissionalId'),
                dataAgendamento: formData.get('dataAgendamento'),
                horaAgendamento: formData.get('horaAgendamento'),
                tipoAgendamento: formData.get('tipoAgendamento'),
                observacoes: formData.get('observacoes')
            };

            try {
                const response = await fetch(`/api/agendamentos/${idParaAtualizar}`, {
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
                    statusMessage.textContent = result.message || 'Agendamento atualizado com sucesso!';
                } else {
                    statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                    statusMessage.classList.add('bg-red-100', 'text-red-700');
                    statusMessage.textContent = result.message || 'Erro ao atualizar agendamento.';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
            }
        });
    } else {
        console.error('Formulário com ID "FormEditarAgendamento" não encontrado.');
    }
}); 