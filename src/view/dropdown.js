document.addEventListener('DOMContentLoaded', function() {
    // Função para fechar todos os dropdowns abertos
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.add('hidden');
        });
    }

    // Adiciona um listener para cada botão de dropdown
    document.querySelectorAll('.dropdown-toggle').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Impede que o clique se propague para o document
            const dropdownMenu = this.nextElementSibling; // O menu é o próximo irmão do botão
            
            // Fecha outros dropdowns, a menos que seja o mesmo dropdown sendo clicado novamente
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.add('hidden');
                }
            });

            dropdownMenu.classList.toggle('hidden');
        });
    });

    // Fecha o dropdown se o clique for fora do menu ou de um botão de dropdown
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-container')) { // Verifica se o clique não foi dentro de um container de dropdown
            closeAllDropdowns();
        }
    });

    // Fecha o dropdown se uma opção for clicada
    document.querySelectorAll('.dropdown-menu a').forEach(item => {
        item.addEventListener('click', function() {
            closeAllDropdowns();
        });
    });
});
