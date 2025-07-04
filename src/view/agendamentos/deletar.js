async function deleteAgendamento(id) {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) {
        return false; // Usuário cancelou a exclusão
    }

    try {
        const response = await fetch(`/api/agendamentos/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Agendamento excluído com sucesso!');
            return true; // Exclusão bem-sucedida
        } else {
            alert(result.message || 'Erro ao excluir agendamento.');
            console.error('Erro ao excluir agendamento:', result.message);
            return false; // Falha na exclusão
        }
    } catch (error) {
        console.error('Erro na requisição de exclusão:', error);
        alert('Erro ao conectar com o servidor para excluir agendamento. Tente novamente.');
        return false; // Erro de conexão
    }
}

export { deleteAgendamento }; 