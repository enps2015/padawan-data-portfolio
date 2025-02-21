document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = mobileNav.querySelectorAll('a'); // NOVO: Seleciona os links do menu mobile

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open'); // (Opcional, manter)
        });

        // NOVO: Adiciona event listener para CADA LINK do menu mobile
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active'); // **FECHA O MENU AO CLICAR NO LINK!**
                document.body.classList.remove('mobile-menu-open'); // (Opcional, manter)
            });
        });

    } else {
        console.error("Erro: Elementos do menu hambúrguer não encontrados. Verifique as classes 'hamburger-menu' e 'mobile-nav' no HTML.");
    }
});