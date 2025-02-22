class StarWarsAudio {
    constructor() {
        this.lightsaber = new Audio('sounds/lightsaber.mp3');
        this.imperialMarch = new Audio('sounds/imperial-march.mp3');
        this.initialized = false;
        this.setupAudio();
    }

    setupAudio() {
        // Configurações iniciais
        this.lightsaber.volume = 0.3;
        this.imperialMarch.volume = 0.2;
        this.imperialMarch.loop = true;

        // Botão de controle de som
        this.createSoundControl();
    }

    createSoundControl() {
        const soundButton = document.createElement('button');
        soundButton.className = 'sound-control';
        soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        document.body.appendChild(soundButton);

        soundButton.addEventListener('click', () => this.toggleSound());
    }

    async playIntro() {
        if (!this.initialized) {
            try {
                await this.lightsaber.play();
                // Espera o som do sabre de luz terminar
                setTimeout(() => {
                    this.imperialMarch.play();
                }, 1500);
                this.initialized = true;
            } catch (error) {
                console.log('Autoplay bloqueado pelo navegador');
            }
        }
    }

    toggleSound() {
        if (this.imperialMarch.paused) {
            this.imperialMarch.play();
            document.querySelector('.sound-control i').className = 'fas fa-volume-up';
        } else {
            this.imperialMarch.pause();
            document.querySelector('.sound-control i').className = 'fas fa-volume-mute';
        }
    }
}

// Estilos para o botão de controle de som
const style = document.createElement('style');
style.textContent = `
    .sound-control {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.7);
        border: 2px solid var(--lightsaber-blue);
        color: var(--jedi-white);
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .sound-control:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px var(--lightsaber-glow);
    }
`;
document.head.appendChild(style);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const audio = new StarWarsAudio();
    
    // Adiciona listener para primeiro clique/toque do usuário
    document.addEventListener('click', () => {
        audio.playIntro();
    }, { once: true });

    // Iniciar o áudio ativado
    audio.imperialMarch.play();
    document.querySelector('.sound-control i').className = 'fas fa-volume-up';
});

// Criar elemento de áudio
const imperialMarch = new Audio('audio/imperial-march.mp3');
const audioToggle = document.getElementById('audioToggle');
const volumeControl = document.getElementById('volumeControl');
let isPlaying = false;

// Configurações iniciais
imperialMarch.loop = true;
imperialMarch.volume = 0.5; // Volume inicial

// Função para fade in do áudio
function fadeIn(audio, duration = 3000) {
    audio.volume = 0;
    audio.play();
    
    const interval = 50;
    const steps = duration / interval;
    const volumeStep = volumeControl.value / 100 / steps;
    
    let currentStep = 0;
    
    const fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.min(volumeStep * currentStep, volumeControl.value / 100);
        
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
        }
    }, interval);
}

// Iniciar música quando a página carregar
window.addEventListener('load', () => {
    // Pequeno delay antes de iniciar
    setTimeout(() => {
        fadeIn(imperialMarch);
        isPlaying = true;
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }, 1000);
});

// Toggle play/pause
audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        imperialMarch.pause();
        audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        imperialMarch.play();
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isPlaying = !isPlaying;
});

// Controle de volume
volumeControl.addEventListener('input', () => {
    imperialMarch.volume = volumeControl.value / 100;
});

// Pausar áudio quando o usuário sair da página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        imperialMarch.pause();
        isPlaying = false;
        audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});