// Criar estrelas no background
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 1}s`;
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

// Animação do Medidor de Força
function initForceMeter() {
    const meters = document.querySelectorAll('.force-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.level || '80%';
            }
        });
    });
    
    meters.forEach(meter => {
        meter.style.width = '0%';
        observer.observe(meter);
    });
}

// Som do Sabre de Luz (opcional - mudo por padrão)
function initLightsaberSound() {
    const cards = document.querySelectorAll('.projeto-card');
    const hum = new Audio('sounds/lightsaber-hum.mp3');
    hum.volume = 0.1;
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (localStorage.getItem('soundEnabled') === 'true') {
                hum.play();
            }
        });
        
        card.addEventListener('mouseleave', () => {
            hum.pause();
            hum.currentTime = 0;
        });
    });
}

// Adicionar estrelas no header
function createHeaderStars() {
    const header = document.querySelector('header');
    const starsContainer = document.createElement('div');
    starsContainer.className = 'header-stars';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.dataset.speed = (Math.random() * 0.5 + 0.5).toFixed(2);
        starsContainer.appendChild(star);
    }
    
    header.insertBefore(starsContainer, header.firstChild);
}

// Efeito parallax melhorado
function initParallax() {
    const header = document.querySelector('header');
    
    header.addEventListener('mousemove', (e) => {
        const stars = document.querySelectorAll('.header-stars .star');
        const rect = header.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        stars.forEach(star => {
            const speed = parseFloat(star.dataset.speed);
            const x = (mouseX - rect.width/2) * speed / 50;
            const y = (mouseY - rect.height/2) * speed / 50;
            
            star.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createHeaderStars();
    initForceMeter();
    initLightsaberSound();
    initParallax();
});

<script src="js/star-wars-effects.js"></script>