// Mouse trail effect
document.addEventListener('mousemove', (e) => {
    createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    anime({
        targets: particle,
        translateX: anime.random(-50, 50),
        translateY: anime.random(-50, 50),
        scale: [1, 0],
        opacity: [0.5, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => {
            particle.remove();
        }
    });
}

// Parallax effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    anime({
        targets: '.floating-shapes .shape',
        translateX: moveX,
        translateY: moveY,
        duration: 1000,
        easing: 'easeOutExpo'
    });
});

// Card tilt effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
