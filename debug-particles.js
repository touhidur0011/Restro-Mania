// Debug script to test mouse interactions
console.log('Debug script loaded');

// Check if particles.js loaded
setTimeout(() => {
    if (window.pJSDom) {
        console.log('✓ Particles.js loaded successfully');
        console.log('Particles count:', window.pJSDom[0]?.pJS?.particles?.array?.length || 'not found');
    } else {
        console.log('✗ Particles.js not loaded');
    }
    
    // Test mouse events
    let mouseEventCount = 0;
    document.addEventListener('mousemove', (e) => {
        mouseEventCount++;
        if (mouseEventCount % 60 === 0) { // Log every 60th event to avoid spam
            console.log(`Mouse position: ${e.clientX}, ${e.clientY}`);
            
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const mousePos = window.pJSDom[0].pJS.interactivity.mouse;
                console.log(`Particles mouse: ${mousePos.pos_x}, ${mousePos.pos_y}`);
            }
        }
    });
    
}, 2000);

// Test particle interaction modes
setTimeout(() => {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        const pJS = window.pJSDom[0].pJS;
        console.log('Interaction modes:', pJS.interactivity.modes);
        console.log('Hover enabled:', pJS.interactivity.events.onhover.enable);
        console.log('Click enabled:', pJS.interactivity.events.onclick.enable);
    }
}, 3000);