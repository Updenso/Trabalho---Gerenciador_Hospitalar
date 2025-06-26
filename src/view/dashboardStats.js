document.addEventListener('DOMContentLoaded', async () => {
    const patientsCountElement = document.getElementById('patientsCount');

    if (patientsCountElement) {
        try {
            const response = await fetch('/api/pacientes');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.pacientes && Array.isArray(result.pacientes)) {
                patientsCountElement.textContent = result.pacientes.length;
            } else {
                patientsCountElement.textContent = 'Erro';
                console.error('Formato de dados inesperado para pacientes:', result);
            }
        } catch (error) {
            console.error('Erro ao buscar a contagem de pacientes:', error);
            patientsCountElement.textContent = 'Erro';
        }
    }
}); 