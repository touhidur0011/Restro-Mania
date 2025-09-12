// Initialize section animations
function initSectionAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all animated sections
    document.querySelectorAll('.section-animated').forEach(section => {
        observer.observe(section);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Initialize product card animations
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const features = card.querySelectorAll('.product-features li');
            features.forEach((feature, index) => {
                feature.style.transitionDelay = `${index * 0.1}s`;
            });
        });

        card.addEventListener('mouseleave', () => {
            const features = card.querySelectorAll('.product-features li');
            features.forEach(feature => {
                feature.style.transitionDelay = '0s';
            });
        });
    });
}

// Add section animation classes
function addAnimationClasses() {
    // Add section-animated class to main sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-animated');
    });

    // Add specific animation classes to elements
    document.querySelectorAll('.product-card, .feature-card').forEach(card => {
        card.classList.add('section-animated');
    });

    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.add('section-animated');
    });
}

// Initialize when document loads
window.addEventListener('load', () => {
    addAnimationClasses();
    initSectionAnimations();
});
