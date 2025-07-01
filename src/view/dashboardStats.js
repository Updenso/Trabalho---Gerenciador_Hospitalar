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

                // Lógica para o gráfico de agendamentos por mês
                const ctx = document.getElementById('appointmentsChart').getContext('2d');
                const monthlyAppointments = {};

                result.agendamentos.forEach(appointment => {
                    const date = new Date(appointment.dataAgendamento);
                    const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Formato YYYY-MM
                    monthlyAppointments[month] = (monthlyAppointments[month] || 0) + 1;
                });

                // Ordenar os meses
                const sortedMonths = Object.keys(monthlyAppointments).sort();
                const chartData = sortedMonths.map(month => monthlyAppointments[month]);

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: sortedMonths,
                        datasets: [{
                            label: 'Número de Agendamentos',
                            data: chartData,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Evolução de Agendamentos Mensais'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Quantidade'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Mês'
                                }
                            }
                        }
                    }
                });

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