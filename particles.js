class ParticleSystem {
    constructor() {
        this.init();
        this.createParticles();
        this.animate();
    }

    init() {
        this.particlesContainer = document.getElementById('particles');
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            this.particlesContainer.appendChild(particle);

            this.animateParticle(particle);
        }
    }

    animateParticle(particle) {
        anime({
            targets: particle,
            translateX: () => anime.random(-200, 200),
            translateY: () => anime.random(-200, 200),
            opacity: [0, 0.5, 0],
            duration: () => anime.random(3000, 5000),
            easing: 'easeInOutQuad',
            loop: true,
            delay: () => anime.random(0, 2000),
            complete: () => {
                // Reset particle position when animation completes
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                this.animateParticle(particle); // Restart animation
            }
        });
    }

    animate() {
        // Create additional particles occasionally
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            this.particlesContainer.appendChild(particle);

            this.animateParticle(particle);

            // Remove excess particles
            if (this.particlesContainer.children.length > 50) {
                this.particlesContainer.removeChild(this.particlesContainer.firstChild);
            }
        }, 3000);
    }
}

// Initialize when document loads
window.addEventListener('load', () => {
    new ParticleSystem();
});