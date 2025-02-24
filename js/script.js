// DELETAR todo código de controle de menu
// Manter apenas o essencial do site

document.addEventListener('DOMContentLoaded', () => {
    // Função para abrir e fechar o popup de acessibilidade
    function toggleAccessibilityPopup() {
        const popup = document.getElementById('accessibility-popup');
        const isHidden = popup.getAttribute('aria-hidden') === 'true';
        console.log('Popup status:', isHidden ? 'Abrindo' : 'Fechando'); // Log para verificar o status do popup
        popup.setAttribute('aria-hidden', !isHidden);
        popup.style.display = isHidden ? 'block' : 'none';
        if (!isHidden) {
            document.getElementById('accessibility-button').focus(); // Foca no botão de acessibilidade ao fechar o popup
        } else {
            popup.querySelector('.close-popup').focus(); // Foca no botão de fechar ao abrir o popup
        }
    }

    // Adiciona evento de clique ao botão de acessibilidade
    const accessibilityButton = document.getElementById('accessibility-button');
    accessibilityButton.addEventListener('click', function() {
        console.log('Botão de acessibilidade clicado'); // Log para verificar o clique no botão
        toggleAccessibilityPopup();
    });

    // Adiciona evento de clique ao botão de fechar do popup
    const closePopupButton = document.getElementById('close-accessibility-popup');
    closePopupButton.addEventListener('click', function() {
        console.log('Botão de fechar popup clicado'); // Log para verificar o clique no botão de fechar
        toggleAccessibilityPopup();
    });

    // Adiciona evento de teclado para navegação
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const popup = document.getElementById('accessibility-popup');
            if (popup.getAttribute('aria-hidden') === 'false') {
                toggleAccessibilityPopup();
            }
        }
    });

    // Função para abrir e fechar o menu hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-button');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
});