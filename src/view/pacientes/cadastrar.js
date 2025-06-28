document.addEventListener('DOMContentLoaded', () => {
    const formPaciente = document.getElementById('FormPaciente');
    const statusMessage = document.getElementById('statusMessage');

    if (formPaciente) {
        formPaciente.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita o comportamento padrão de recarregar a página

            statusMessage.textContent = ''; // Limpa mensagens anteriores
            statusMessage.classList.add('hidden'); // Esconde a mensagem

            const formData = new FormData(formPaciente);
            const data = {
                nomeCompleto: formData.get('name'),
                dataNascimento: formData.get('dob'),
                genero: formData.get('gender'),
                cpf: formData.get('cpf'),
                email: formData.get('email'),
                telefone: formData.get('phone'),
                endereco: {
                    rua: formData.get('Rua'),
                    numero: formData.get('Numero'),
                    bairro: formData.get('Bairro'),
                    cidade: formData.get('Cidade'),
                    estado: formData.get('Estado')
                },
                historicoMedico: formData.get('medicalHistory')
            };

            try {
                const response = await fetch('/api/pacientes', {
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
                    statusMessage.textContent = result.message || 'Paciente cadastrado com sucesso!';
                    formPaciente.reset(); // Limpa o formulário após o sucesso
                } else {
                    statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                    statusMessage.classList.add('bg-red-100', 'text-red-700');
                    statusMessage.textContent = result.message || 'Erro ao cadastrar paciente.';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
            }
        });
    } else {
        console.error('Formulário com ID "FormPaciente" não encontrado.');
    }
});
