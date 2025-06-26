async function deletePatient(id) {
    if (!confirm('Tem certeza que deseja excluir este paciente?')) {
        return false; // Usuário cancelou a exclusão
    }

    try {
        const response = await fetch(`/api/paciente/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Paciente excluído com sucesso!');
            return true; // Exclusão bem-sucedida
        } else {
            alert(result.message || 'Erro ao excluir paciente.');
            console.error('Erro ao excluir paciente:', result.message);
            return false; // Falha na exclusão
        }
    } catch (error) {
        console.error('Erro na requisição de exclusão:', error);
        alert('Erro ao conectar com o servidor para excluir paciente. Tente novamente.');
        return false; // Erro de conexão
    }
}

export { deletePatient }; 