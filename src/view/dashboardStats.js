document.addEventListener('DOMContentLoaded', async () => {
    const patientsCountElement = document.getElementById('patientsCount');
    const professionalsCountElement = document.getElementById('professionalsCount');
    const appointmentsCountElement = document.getElementById('appointmentsCount');

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

    if (professionalsCountElement) {
        try {
            const response = await fetch('/api/profissionais');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.profissionais && Array.isArray(result.profissionais)) {
                professionalsCountElement.textContent = result.profissionais.length;
            } else {
                professionalsCountElement.textContent = 'Erro';
                console.error('Formato de dados inesperado para profissionais:', result);
            }
        } catch (error) {
            console.error('Erro ao buscar a contagem de profissionais:', error);
            professionalsCountElement.textContent = 'Erro';
        }
    }

    if (appointmentsCountElement) {
        try {
            const response = await fetch('/api/agendamentos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.agendamentos && Array.isArray(result.agendamentos)) {
                appointmentsCountElement.textContent = result.agendamentos.length;
            } else {
                appointmentsCountElement.textContent = 'Erro';
                console.error('Formato de dados inesperado para agendamentos:', result);
            }
        } catch (error) {
            console.error('Erro ao buscar a contagem de agendamentos:', error);
            appointmentsCountElement.textContent = 'Erro';
        }
    }
}); 