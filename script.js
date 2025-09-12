// Initialize animations when page loads
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const loaderOverlay = document.getElementById('loaderOverlay');
    const letters = document.querySelectorAll('.loader-text-inner');
    const progressBar = document.querySelector('.loader-progress-bar');
    const counter = document.querySelector('.loader-counter');
    
    // Initial loading animation
    const loadingAnimation = anime.timeline({
        easing: 'easeOutExpo'
    });

    // Animate letters one by one
    letters.forEach((letter, index) => {
        loadingAnimation.add({
            targets: letter,
            rotateY: [90, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: index * 60,
            easing: 'easeOutExpo'
        }, index * 60);
    });

    // Progress bar and counter animation
    let progress = { value: 0 };
    anime({
        targets: progress,
        value: 100,
        duration: 2000,
        easing: 'easeInOutQuart',
        update: function() {
            progressBar.style.width = progress.value + '%';
            counter.textContent = Math.round(progress.value) + '%';
        },
        complete: function() {
            // Exit animation after loading completes
            setTimeout(() => {
                loader.classList.add('exit');
                loaderOverlay.classList.add('exit');
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    loaderOverlay.style.display = 'none';
                    initAnimations();
                }, 1200);
            }, 400);
        }
    });

    loaderAnimation
        .add({
            targets: '.loader-logo',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        })
        .add({
            targets: '.circle-container .circle',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(150),
            easing: 'easeOutExpo'
        }, '-=400')
        .add({
            targets: '.loading-text',
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutExpo'
        }, '-=400')
        .add({
            targets: '.progress-bar',
            width: ['0%', '100%'],
            duration: 1500,
            easing: 'easeInOutQuart'
        }, '-=400');

    // Create particles
    createParticles();
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particlesContainer.appendChild(particle);

        anime({
            targets: particle,
            translateX: () => anime.random(-200, 200),
            translateY: () => anime.random(-200, 200),
            opacity: [0, 0.5, 0],
            duration: anime.random(3000, 5000),
            easing: 'easeInOutQuad',
            loop: true,
            delay: anime.random(0, 2000)
        });
    }
}

// Initialize all animations
function initAnimations() {
    // Hero animations with glitch effect
    const heroTimeline = anime.timeline();
    
    heroTimeline
        .add({
            targets: '.hero h1',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutExpo'
        })
        .add({
            targets: '.hero h1',
            textShadow: [
                { value: '2px 0 var(--neon-green), -2px 0 var(--primary)', duration: 100 },
                { value: '-2px 0 var(--neon-green), 2px 0 var(--primary)', duration: 100 },
                { value: '2px 0 var(--neon-green), -2px 0 var(--primary)', duration: 100 }
            ],
            translateX: [
                { value: 2, duration: 100 },
                { value: -2, duration: 100 },
                { value: 0, duration: 100 }
            ],
            delay: 1000,
            loop: true
        });

    anime({
        targets: '.hero .tagline',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.cta-buttons',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 400,
        easing: 'easeOutExpo'
    });

    // Floating shapes animation
    anime({
        targets: '.shape',
        translateY: [-20, 20],
        translateX: [-10, 10],
        duration: 4000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: anime.stagger(200)
    });

    // Initialize scroll animations
    initScrollAnimations();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('feature-card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(100)
                    });
                } else if (entry.target.classList.contains('form-group')) {
                     anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(100)
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    document.querySelectorAll('.form-group').forEach(group => {
        observer.observe(group);
    });
}

// Product slider functionality
let currentSlide = 0;
const productCards = document.querySelectorAll('.product-card');
const sliderDots = document.querySelectorAll('.slider-dot');
const productContainer = document.getElementById('productContainer');

function showSlide(index) {
    currentSlide = index;
    productContainer.style.transform = `translateX(-${index * 100}%)`;
    
    // Update active states
    productCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    sliderDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Animate the active card
    anime({
        targets: productCards[index],
        opacity: [0.8, 1],
        scale: [0.95, 1],
        duration: 500,
        easing: 'easeOutExpo'
    });
}

// Slider controls
document.getElementById('prevArrow').addEventListener('click', () => {
    const newIndex = currentSlide > 0 ? currentSlide - 1 : productCards.length - 1;
    showSlide(newIndex);
});

document.getElementById('nextArrow').addEventListener('click', () => {
    const newIndex = currentSlide < productCards.length - 1 ? currentSlide + 1 : 0;
    showSlide(newIndex);
});

// Slider dots
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-play slider
setInterval(() => {
    const newIndex = currentSlide < productCards.length - 1 ? currentSlide + 1 : 0;
    showSlide(newIndex);
}, 5000);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate menu button
    const spans = mobileMenu.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        anime({
            targets: spans[0],
            rotate: '45deg',
            translateY: 7,
            duration: 300
        });
        anime({
            targets: spans[1],
            opacity: 0,
            duration: 300
        });
        anime({
            targets: spans[2],
            rotate: '-45deg',
            translateY: -7,
            duration: 300
        });
    } else {
        anime({
            targets: spans,
            rotate: '0deg',
            translateY: 0,
            opacity: 1,
            duration: 300
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Form submission animation
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button
    const button = e.target.querySelector('.btn');
    anime({
        targets: button,
        scale: [1, 0.95, 1.05, 1],
        duration: 600,
        easing: 'easeInOutQuad'
    });

    // Show success message (you can replace this with actual form submission)
    button.textContent = 'Thank you! We\'ll contact you soon.';
    button.style.pointerEvents = 'none';
    
    // Reset form
    setTimeout(() => {
        e.target.reset();
        button.textContent = 'Request Demo';
        button.style.pointerEvents = 'auto';
    }, 3000);
});

// Hover effects for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        anime({
            targets: button,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });

    button.addEventListener('mouseleave', () => {
        anime({
            targets: button,
            scale: 1,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
});

// Download button hover effects
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        anime({
            targets: btn,
            scale: 1.1,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });

    btn.addEventListener('mouseleave', () => {
        anime({
            targets: btn,
            scale: 1,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
});

// Social link animations
document.querySelectorAll('.social-link').forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        anime({
            targets: link,
            rotate: '360deg',
            scale: 1.2,
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });

    link.addEventListener('mouseleave', () => {
        anime({
            targets: link,
            rotate: '0deg',
            scale: 1,
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });
});

// Feature card hover animations
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        anime({
            targets: card.querySelector('.feature-icon'),
            rotate: [0, 360],
            scale: [1, 1.2],
            duration: 600,
            easing: 'easeInOutQuad'
        });
    });

    card.addEventListener('mouseleave', () => {
        anime({
            targets: card.querySelector('.feature-icon'),
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Product visual animation
document.querySelectorAll('.demo-screen').forEach(screen => {
    anime({
        targets: screen,
        translateY: [-10, 10],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });
});

// Logo animation on click
document.querySelector('.logo').addEventListener('click', () => {
    anime({
        targets: '.logo',
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        duration: 1000,
        easing: 'easeInOutExpo'
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    // Ensure hero exists before trying to style it
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const newIndex = currentSlide > 0 ? currentSlide - 1 : productCards.length - 1;
        showSlide(newIndex);
    } else if (e.key === 'ArrowRight') {
        const newIndex = currentSlide < productCards.length - 1 ? currentSlide + 1 : 0;
        showSlide(newIndex);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (productContainer) {
    productContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    productContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}


function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        const newIndex = currentSlide < productCards.length - 1 ? currentSlide + 1 : 0;
        showSlide(newIndex);
    } else if (touchEndX > touchStartX + 50) {
        // Swipe right
        const newIndex = currentSlide > 0 ? currentSlide - 1 : productCards.length - 1;
        showSlide(newIndex);
    }
}