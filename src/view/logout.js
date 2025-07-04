document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link/botão
            event.stopPropagation(); // Impede que o evento se propague para o documento

            // Limpar dados de sessão (ex: token de autenticação, informações de usuário)
            localStorage.removeItem('theme'); // Remover o tema salvo, se aplicável
            sessionStorage.removeItem('usuarioLogado'); // Remover o status de login
            // Adicione outras limpezas de localStorage ou sessionStorage aqui, se houver

            // Redirecionar para a página de login
            window.location.href = '/login.html';
        });
    }
}); 