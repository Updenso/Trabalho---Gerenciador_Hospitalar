document.addEventListener('DOMContentLoaded', async () => {
    const formEditarProfissional = document.getElementById('FormEditarProfissional');
    const statusMessage = document.getElementById('statusMessage');
    const profissionalIdInput = document.getElementById('profissionalId');

    // Obter o ID do profissional da URL
    const urlParams = new URLSearchParams(window.location.search);
    const profissionalIdFromUrl = urlParams.get('id');

    // Se houver um ID na URL, preencher o campo e carregar os dados
    if (profissionalIdFromUrl) {
        profissionalIdInput.value = profissionalIdFromUrl;
        await fetchAndPopulateProfissional(profissionalIdFromUrl);
    } else {
        // Caso não haja ID na URL, limpar o campo e a mensagem de status para que o usuário possa digitar
        profissionalIdInput.value = '';
        statusMessage.textContent = '';
        statusMessage.classList.add('hidden');
    }

    // Função para buscar e preencher os dados do profissional
    async function fetchAndPopulateProfissional(id) {
        // Se o ID for inválido ou vazio, limpar o formulário e exibir mensagem de erro
        if (!id || isNaN(id)) {
            statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
            statusMessage.classList.add('bg-red-100', 'text-red-700');
            statusMessage.textContent = 'Por favor, insira um ID de profissional válido.';
            // Limpar todos os campos do formulário (exceto o ID)
            formEditarProfissional.reset();
            profissionalIdInput.value = id; // Manter o ID digitado no campo
            return;
        }

        try {
            const response = await fetch(`/api/profissionais/${id}`);
            if (!response.ok) {
                // Se a resposta não for OK (ex: 404), limpar o formulário e exibir mensagem de não encontrado
                formEditarProfissional.reset();
                profissionalIdInput.value = id; // Manter o ID digitado no campo
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Profissional não encontrado.';
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.profissional) {
                const profissional = result.profissional;

                // Preencher o campo ID
                document.getElementById('profissionalId').value = profissional.profissionalId;
                document.getElementById('name').value = profissional.nomeCompleto;
                document.getElementById('email').value = profissional.email;
                document.getElementById('crm').value = profissional.crm;
                document.getElementById('dob').value = profissional.dataNascimento;
                document.getElementById('joiningDate').value = profissional.dataAdmissao;
                document.getElementById('phone').value = profissional.telefone;
                // Selecionar o gênero
                document.querySelectorAll(`input[name="gender"][value="${profissional.genero}"]`).forEach(radio => radio.checked = true);
                document.getElementById('specialty').value = profissional.especialidade;

                // Preencher campos de endereço (se o endereco for uma string, você precisará parseá-lo)
                document.getElementById('address').value = profissional.endereco || '';

                document.getElementById('biography').value = profissional.biografia;

            } else {
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = result.message || 'Profissional não encontrado.';
            }
        } catch (error) {
            console.error('Erro ao buscar dados do profissional:', error);
            statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
            statusMessage.classList.add('bg-red-100', 'text-red-700');
            statusMessage.textContent = 'Erro ao carregar dados do profissional.';
        }
    }

    // Adicionar um event listener para o campo ID, para buscar dados ao digitar/colar um ID
    profissionalIdInput.addEventListener('change', () => {
        const newProfissionalId = profissionalIdInput.value;
        fetchAndPopulateProfissional(newProfissionalId);
    });

    // Lidar com o envio do formulário de edição
    if (formEditarProfissional) {
        formEditarProfissional.addEventListener('submit', async (event) => {
            event.preventDefault();

            statusMessage.textContent = '';
            statusMessage.classList.add('hidden');

            // Certificar-se de que o ID do profissional é obtido do campo de input, não da URL
            const idParaAtualizar = profissionalIdInput.value; 

            if (!idParaAtualizar || isNaN(idParaAtualizar)) {
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Não é possível salvar: ID do profissional inválido.';
                return;
            }

            const formData = new FormData(formEditarProfissional);
            const data = {
                nomeCompleto: formData.get('name'),
                email: formData.get('email'),
                crm: formData.get('crm'),
                dataNascimento: formData.get('dob'),
                dataAdmissao: formData.get('joiningDate'),
                telefone: formData.get('phone'),
                genero: formData.get('gender'),
                especialidade: formData.get('specialty'),
                endereco: formData.get('address'),
                biografia: formData.get('biography')
            };

            try {
                const response = await fetch(`/api/profissionais/${idParaAtualizar}`, {
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
                    statusMessage.textContent = result.message || 'Profissional atualizado com sucesso!';
                } else {
                    statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                    statusMessage.classList.add('bg-red-100', 'text-red-700');
                    statusMessage.textContent = result.message || 'Erro ao atualizar profissional.';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
            }
        });
    } else {
        console.error('Formulário com ID "FormEditarProfissional" não encontrado.');
    }
}); 