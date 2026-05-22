// FALCE e MACELLO - Main JavaScript File

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollAnimations();
    initNavigation();
    initTypewriter();
    initFormHandling();
    initVinylRotation();
    initGlitchEffects();
});

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#cc0000', '#ffd700', '#ffffff']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#cc0000',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Navigation Functionality
function initNavigation() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in, .reveal-text, .music-card, .chart-element');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.vinyl-container');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Per favore, compila tutti i campi.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Per favore, inserisci un indirizzo email valido.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Messaggio inviato con successo! Ti risponderemo presto.', 'success');
            form.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Vinyl Rotation Control
function initVinylRotation() {
    const vinyl = document.querySelector('.vinyl');
    const playButton = document.querySelector('.play-button');
    
    if (vinyl && playButton) {
        let isPlaying = false;
        
        playButton.addEventListener('click', function() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                vinyl.style.animationPlayState = 'running';
                playButton.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                `;
            } else {
                vinyl.style.animationPlayState = 'paused';
                playButton.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                `;
            }
        });
    }
}

// Glitch Effects
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Random glitch activation
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = 'glitch 0.3s ease-in-out';
            }
        }, 3000);
    });
    
    // Glitch overlay random activation
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance
                glitchOverlay.style.opacity = '0.3';
                setTimeout(() => {
                    glitchOverlay.style.opacity = '0.1';
                }, 200);
            }
        }, 5000);
    }
}

// Music Player Simulation
function initMusicPlayer() {
    const trackItems = document.querySelectorAll('.tracklist li');
    
    trackItems.forEach((track, index) => {
        track.addEventListener('click', function() {
            // Remove active class from all tracks
            trackItems.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked track
            this.classList.add('active');
            
            // Simulate playing
            showNotification(`Riproduzione: ${this.querySelector('.track-title').textContent}`, 'info');
        });
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = e.key === 'ArrowDown' ? 
            currentSection.nextElementSibling : 
            currentSection.previousElementSibling;
        
        if (nextSection && nextSection.tagName === 'SECTION') {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Get current section in viewport
function getCurrentSection() {
    let current = sections[0];
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
        }
    });
    return current;
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
    
    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                // Scroll performance logic here
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initMusicPlayer();
    initLazyLoading();
    initPerformanceMonitoring();
});

// Export functions for external use
window.FalceMacello = {
    showNotification,
    initParticles,
    initGlitchEffects
};

// Console Easter Egg
console.log(`
%c███████╗ █████╗ ██╗      ██████╗███████╗    ███████╗    ███╗   ███╗ █████╗  ██████╗███████╗██╗     ██╗      ██████╗ 
%c██╔════╝██╔══██╗██║     ██╔════╝██╔════╝    ██╔════╝    ████╗ ████║██╔══██╗██╔════╝██╔════╝██║     ██║     ██╔═══██╗
%c█████╗  ███████║██║     ██║     █████╗      █████╗      ██╔████╔██║███████║██║     █████╗  ██║     ██║     ██║   ██║
%c██╔══╝  ██╔══██║██║     ██║     ██╔══╝      ██╔══╝      ██║╚██╔╝██║██╔══██║██║     ██╔══╝  ██║     ██║     ██║   ██║
%c██║     ██║  ██║███████╗╚██████╗███████╗    ███████╗    ██║ ╚═╝ ██║██║  ██║╚██████╗███████╗███████╗███████╗╚██████╔╝
%c╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝╚══════╝    ╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝╚══════╝ ╚═════╝ 
%c
%cMusica AI • Ideologia Politica • Eredità del PCI
%cSito sviluppato con tecnologie moderne per una rivoluzione digitale
`,
'color: #cc0000; font-weight: bold;',
'color: #cc0000; font-weight: bold;',
'color: #ffd700; font-weight: bold;',
'color: #cc0000; font-weight: bold;',
'color: #cc0000; font-weight: bold;',
'color: #666666;',
'color: #ffd700; font-size: 16px; font-weight: bold;',
'color: #ffd700; font-size: 14px;',
'color: #666666; font-size: 12px;'
);