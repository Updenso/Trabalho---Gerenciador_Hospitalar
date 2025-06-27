async function deleteProfessional(id) {
    if (!confirm('Tem certeza que deseja excluir este profissional?')) {
        return false; // Usuário cancelou a exclusão
    }

    try {
        const response = await fetch(`/api/profissional/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Profissional excluído com sucesso!');
            return true; // Exclusão bem-sucedida
        } else {
            alert(result.message || 'Erro ao excluir profissional.');
            console.error('Erro ao excluir profissional:', result.message);
            return false; // Falha na exclusão
        }
    } catch (error) {
        console.error('Erro na requisição de exclusão:', error);
        alert('Erro ao conectar com o servidor para excluir profissional. Tente novamente.');
        return false; // Erro de conexão
    }
}

export { deleteProfessional }; 