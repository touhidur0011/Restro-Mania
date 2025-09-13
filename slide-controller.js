class SlideController {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardControls();
        this.setupTouchControls();
    }

    setupEventListeners() {
        window.addEventListener('wheel', (e) => {
            if (this.isAnimating) return;
            
            if (e.deltaY > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        });
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.previousSlide();
            }
        });
    }

    setupTouchControls() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', (e) => {
            if (this.isAnimating) return;

            this.touchEndX = e.changedTouches[0].clientX;
            const diff = this.touchStartX - this.touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    nextSlide() {
        if (this.currentIndex >= this.slides.length - 1) return;
        
        this.isAnimating = true;
        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[this.currentIndex + 1];

        // Prepare next slide
        nextSlide.style.transform = 'translateX(100%)';
        nextSlide.style.display = 'block';

        // Animate both slides
        requestAnimationFrame(() => {
            gsap.to(currentSlide, {
                x: '-100%',
                duration: 1,
                ease: 'power2.inOut'
            });

            gsap.to(nextSlide, {
                x: '0%',
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    currentSlide.classList.remove('active');
                    nextSlide.classList.add('active');
                    this.currentIndex++;
                    this.isAnimating = false;
                }
            });
        });
    }

    previousSlide() {
        if (this.currentIndex <= 0) return;
        
        this.isAnimating = true;
        const currentSlide = this.slides[this.currentIndex];
        const previousSlide = this.slides[this.currentIndex - 1];

        // Prepare previous slide
        previousSlide.style.transform = 'translateX(-100%)';
        previousSlide.style.display = 'block';

        // Animate both slides
        requestAnimationFrame(() => {
            gsap.to(currentSlide, {
                x: '100%',
                duration: 1,
                ease: 'power2.inOut'
            });

            gsap.to(previousSlide, {
                x: '0%',
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    currentSlide.classList.remove('active');
                    previousSlide.classList.add('active');
                    this.currentIndex--;
                    this.isAnimating = false;
                }
            });
        });
    }
}

// Initialize the slider
window.addEventListener('load', () => {
    new SlideController();
});