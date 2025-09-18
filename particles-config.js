// Add this code to your particles-config.js file (replace the existing content)

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": ["#ffffff", "#00ff88", "#0088ff", "#ff0088"]
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 0.5,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": true,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 8,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 300,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

// Enhanced Custom mouse interaction
let mouseX = 0;
let mouseY = 0;
let particles = [];
let isMouseInside = false;

// Wait for particles.js to load and then enhance it
setTimeout(() => {
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    const pJS = window.pJSDom[0].pJS;
    particles = pJS.particles.array;
    
    // Enhanced mouse attraction and movement
    const originalMove = pJS.fn.particlesMoveUpdate;
    pJS.fn.particlesMoveUpdate = function() {
      // Call original move function
      originalMove.call(this);
      
      // Add enhanced mouse interaction
      if (isMouseInside && pJS.interactivity.mouse.pos_x !== null && pJS.interactivity.mouse.pos_y !== null) {
        particles.forEach(particle => {
          const dx = pJS.interactivity.mouse.pos_x - particle.x;
          const dy = pJS.interactivity.mouse.pos_y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Mouse attraction effect
          if (distance < 300) {
            const force = (300 - distance) / 300;
            const angle = Math.atan2(dy, dx);
            
            // Gentle attraction towards mouse
            particle.vx = (particle.vx || 0) + Math.cos(angle) * force * 0.03;
            particle.vy = (particle.vy || 0) + Math.sin(angle) * force * 0.03;
            
            // Apply velocity with smooth movement
            particle.x += particle.vx * 0.1;
            particle.y += particle.vy * 0.1;
            
            // Add friction for smooth deceleration
            particle.vx *= 0.95;
            particle.vy *= 0.95;
            
            // Enhanced visual effects near mouse
            if (distance < 100) {
              particle.opacity = Math.min(1, particle.opacity + 0.02);
            } else {
              particle.opacity = Math.max(0.3, particle.opacity - 0.01);
            }
          }
        });
      } else {
        // Return particles to normal state when mouse is away
        particles.forEach(particle => {
          if (particle.vx) particle.vx *= 0.98;
          if (particle.vy) particle.vy *= 0.98;
          particle.opacity = Math.min(0.6, particle.opacity + 0.005);
        });
      }
    };
  }
}, 200);

// Enhanced mouse tracking with smooth movement
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMouseInside = true;
  
  // Update particles.js mouse position with smooth interpolation
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    const pJS = window.pJSDom[0].pJS;
    
    // Smooth mouse position update
    const targetX = e.clientX;
    const targetY = e.clientY;
    const currentX = pJS.interactivity.mouse.pos_x || targetX;
    const currentY = pJS.interactivity.mouse.pos_y || targetY;
    
    pJS.interactivity.mouse.pos_x = currentX + (targetX - currentX) * 0.3;
    pJS.interactivity.mouse.pos_y = currentY + (targetY - currentY) * 0.3;
  }
});

// Mouse enter event
document.addEventListener('mouseenter', function() {
  isMouseInside = true;
});

// Mouse leave event to reset particles smoothly
document.addEventListener('mouseleave', function() {
  isMouseInside = false;
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    // Gradually fade out mouse interaction
    setTimeout(() => {
      if (!isMouseInside && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.interactivity.mouse.pos_x = null;
        window.pJSDom[0].pJS.interactivity.mouse.pos_y = null;
      }
    }, 500);
  }
});

// Touch events for mobile support
document.addEventListener('touchmove', function(e) {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    isMouseInside = true;
    
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
      window.pJSDom[0].pJS.interactivity.mouse.pos_x = touch.clientX;
      window.pJSDom[0].pJS.interactivity.mouse.pos_y = touch.clientY;
    }
  }
}, { passive: true });

document.addEventListener('touchend', function() {
  isMouseInside = false;
  setTimeout(() => {
    if (!isMouseInside && window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
      window.pJSDom[0].pJS.interactivity.mouse.pos_x = null;
      window.pJSDom[0].pJS.interactivity.mouse.pos_y = null;
    }
  }, 300);
});

// Responsive particle count for performance
function updateParticleCount() {
  const width = window.innerWidth;
  let particleCount = 80;
  
  if (width < 768) {
    particleCount = 30;
  } else if (width < 1024) {
    particleCount = 50;
  }
  
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    window.pJSDom[0].pJS.particles.number.value = particleCount;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
}

// Update on resize
window.addEventListener('resize', updateParticleCount);

// Initial update
setTimeout(updateParticleCount, 100);