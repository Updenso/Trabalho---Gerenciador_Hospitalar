document.addEventListener('DOMContentLoaded', () => {
    const formAgendamento = document.getElementById('FormAgendamento');
    const statusMessage = document.getElementById('statusMessage');

    if (formAgendamento) {
        formAgendamento.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita o comportamento padrão de recarregar a página

            statusMessage.textContent = ''; // Limpa mensagens anteriores
            statusMessage.classList.add('hidden'); // Esconde a mensagem

            const formData = new FormData(formAgendamento);
            const data = {
                pacienteId: formData.get('pacienteId'),
                profissionalId: formData.get('profissionalId'),
                dataAgendamento: formData.get('dataAgendamento'),
                horaAgendamento: formData.get('horaAgendamento'),
                tipoAgendamento: formData.get('tipoAgendamento'),
                observacoes: formData.get('observacoes'),
                status: formData.get('status')
            };

            try {
                const response = await fetch('/api/agendamentos', {
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
                    statusMessage.textContent = result.message || 'Agendamento cadastrado com sucesso!';
                    formAgendamento.reset(); // Limpa o formulário após o sucesso
                } else {
                    statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                    statusMessage.classList.add('bg-red-100', 'text-red-700');
                    statusMessage.textContent = result.message || 'Erro ao cadastrar agendamento.';
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = 'Erro ao conectar com o servidor. Tente novamente.';
            }
        });
    } else {
        console.error('Formulário com ID "FormAgendamento" não encontrado.');
    }
}); 