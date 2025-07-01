document.addEventListener('DOMContentLoaded', () => {
    const formProfissional = document.getElementById('FormProfissional');
    const statusMessage = document.getElementById('statusMessage');

    if (formProfissional) {
        formProfissional.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita o comportamento padrão de recarregar a página

            statusMessage.textContent = ''; // Limpa mensagens anteriores
            statusMessage.classList.add('hidden'); // Esconde a mensagem

            const formData = new FormData(formProfissional);
            const data = {
                nomeCompleto: formData.get('name'),
                email: formData.get('email'),
                dataNascimento: formData.get('dob'),
                dataAdmissao: formData.get('admissionDate'),
                telefone: formData.get('phone'),
                genero: formData.get('gender'),
                especialidade: formData.get('specialty'),
                endereco: {
                    rua: formData.get('Rua'),
                    numero: formData.get('Numero'),
                    bairro: formData.get('Bairro'),
                    cidade: formData.get('Cidade'),
                    estado: formData.get('Estado')
                },
                biografia: formData.get('biography')
            };

            try {
                const response = await fetch('/api/profissionais', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    statusMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
                    statusMessage.classList.add('bg-green-100', 'text-green-700');
                    statusMessage.textContent = result.message || 'Profissional cadastrado com sucesso!';
                    formProfissional.reset(); // Limpa o formulário após o sucesso
                } else {
                    statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                    statusMessage.classList.add('bg-red-100', 'text-red-700');
                    statusMessage.textContent = result.message || 'Erro ao cadastrar profissional.';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
            }
        });
    } else {
        console.error('Formulário com ID "FormProfissional" não encontrado.');
    }
}); 