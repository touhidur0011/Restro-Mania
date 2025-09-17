// Enhanced Mouse Interaction for Particles.js
// This script adds advanced mouse interaction effects

class ParticleMouseInteraction {
    constructor() {
        this.mouse = { x: 0, y: 0, isActive: false };
        this.smoothMouse = { x: 0, y: 0 };
        this.particles = [];
        this.pJS = null;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        // Wait for particles.js to be ready
        const checkParticles = setInterval(() => {
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                this.pJS = window.pJSDom[0].pJS;
                this.particles = this.pJS.particles.array;
                this.setupEvents();
                this.startInteractionLoop();
                clearInterval(checkParticles);
                console.log('Enhanced mouse interaction initialized');
            }
        }, 100);
    }
    
    setupEvents() {
        // Mouse move with smooth interpolation - attach to document to not interfere with hovers
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.isActive = true;
        }, { passive: true });
        
        // Mouse enter/leave
        document.addEventListener('mouseenter', () => {
            this.mouse.isActive = true;
        });
        
        document.addEventListener('mouseleave', () => {
            this.mouse.isActive = false;
        });
        
        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.mouse.x = touch.clientX;
                this.mouse.y = touch.clientY;
                this.mouse.isActive = true;
            }
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            this.mouse.isActive = false;
        });
    }
    
    startInteractionLoop() {
        const animate = () => {
            this.updateInteraction();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    updateInteraction() {
        if (!this.pJS || !this.particles.length) return;
        
        // Smooth mouse movement interpolation
        const lerpFactor = 0.15;
        this.smoothMouse.x += (this.mouse.x - this.smoothMouse.x) * lerpFactor;
        this.smoothMouse.y += (this.mouse.y - this.smoothMouse.y) * lerpFactor;
        
        if (this.mouse.isActive) {
            this.particles.forEach((particle, index) => {
                this.applyMouseForces(particle, index);
            });
        } else {
            // Reset particles when mouse is inactive
            this.particles.forEach((particle) => {
                this.resetParticle(particle);
            });
        }
    }
    
    applyMouseForces(particle, index) {
        const dx = this.smoothMouse.x - particle.x;
        const dy = this.smoothMouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            
            // Initialize velocity if not exists
            if (!particle.mouseVx) particle.mouseVx = 0;
            if (!particle.mouseVy) particle.mouseVy = 0;
            
            // Simple attraction force - no bubble effects
            const attractionForce = force * 0.02;
            particle.mouseVx += Math.cos(angle) * attractionForce;
            particle.mouseVy += Math.sin(angle) * attractionForce;
            
            // Apply velocity with bounds checking
            const newX = particle.x + particle.mouseVx;
            const newY = particle.y + particle.mouseVy;
            
            // Keep particles within screen bounds
            if (newX > 0 && newX < window.innerWidth) {
                particle.x = newX;
            }
            if (newY > 0 && newY < window.innerHeight) {
                particle.y = newY;
            }
            
            // Apply friction
            particle.mouseVx *= 0.92;
            particle.mouseVy *= 0.92;
            
        } else {
            // Gradually return to normal state
            this.resetParticle(particle);
        }
    }
    
    resetParticle(particle) {
        if (particle.mouseVx) {
            particle.mouseVx *= 0.95;
            particle.mouseVy *= 0.95;
            
            // Apply remaining velocity
            particle.x += particle.mouseVx;
            particle.y += particle.mouseVy;
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for particles.js to initialize
        setTimeout(() => {
            new ParticleMouseInteraction();
        }, 300);
    });
} else {
    // DOM is already loaded
    setTimeout(() => {
        new ParticleMouseInteraction();
    }, 300);
}