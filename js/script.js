document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburgerMenu.addEventListener('click', function() {
        mobileNav.classList.toggle('active'); // Adiciona/Remove a classe 'active'
    });
});