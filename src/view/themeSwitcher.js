document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    const mainTitle = document.getElementById('mainTitle');
    const isDashboard = window.location.pathname.includes('dashboard.html');

    // Aplica o tema salvo ou define o padrão
    if (currentTheme === 'dark-theme') {
        body.style.setProperty('background-color', '#111827', 'important'); // Azul escuro
        if (isDashboard && mainTitle) {
            mainTitle.style.setProperty('color', '#FFFFFF', 'important'); // Branco para o título do dashboard
        }
    } else {
        body.style.setProperty('background-color', '#F3F4F6', 'important'); // Cinza claro padrão
        if (isDashboard && mainTitle) {
            mainTitle.style.setProperty('color', '#1F2937', 'important'); // Cinza original para o título do dashboard
        }
    }

    // Adiciona um listener ao botão de alternar tema, se ele existir
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (localStorage.getItem('theme') === 'dark-theme') {
                body.style.setProperty('background-color', '#F3F4F6', 'important'); // Cinza claro padrão
                localStorage.setItem('theme', 'light-theme');
                if (isDashboard && mainTitle) {
                    mainTitle.style.setProperty('color', '#1F2937', 'important'); // Cinza original para o título do dashboard
                }
            } else {
                body.style.setProperty('background-color', '#111827', 'important'); // Azul escuro
                localStorage.setItem('theme', 'dark-theme');
                if (isDashboard && mainTitle) {
                    mainTitle.style.setProperty('color', '#FFFFFF', 'important'); // Branco para o título do dashboard
                }
            }
        });
    }
}); 