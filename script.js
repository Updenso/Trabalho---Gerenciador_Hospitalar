 // JavaScript para lidar com a responsividade da barra lateral
        document.addEventListener('DOMContentLoaded', () => {
            const sidebar = document.getElementById('sidebar');
            const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
            const sidebarOverlay = document.getElementById('sidebarOverlay');

            // Função para abrir a barra lateral em mobile
            const openSidebar = () => {
                sidebar.classList.remove('-translate-x-full');
                sidebarOverlay.classList.remove('hidden');
            };

            // Função para fechar a barra lateral em mobile
            const closeSidebar = () => {
                sidebar.classList.add('-translate-x-full');
                sidebarOverlay.classList.add('hidden');
            };

            // Adiciona listener para o botão de alternar sidebar em mobile
            mobileSidebarToggle.addEventListener('click', openSidebar);

            // Adiciona listener para o overlay (clicar fora da sidebar fecha ela)
            sidebarOverlay.addEventListener('click', closeSidebar);

            // Adiciona ou remove a classe 'hidden' na barra lateral para telas menores que md
            const handleResize = () => {
                if (window.innerWidth >= 768) { // md breakpoint em Tailwind é 768px
                    sidebar.classList.remove('-translate-x-full'); // Garante que a sidebar esteja visível em desktop
                    sidebarOverlay.classList.add('hidden'); // Garante que o overlay esteja oculto em desktop
                } else {
                    sidebar.classList.add('-translate-x-full'); // Esconde por padrão em mobile
                    sidebarOverlay.classList.add('hidden'); // Garante que o overlay esteja oculto inicialmente em mobile
                }
            };

            // Listener para redimensionamento da janela
            window.addEventListener('resize', handleResize);

            // Chama a função handleResize na carga inicial para definir o estado correto da barra lateral
            handleResize();
        });