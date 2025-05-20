 // Loader
 window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(function() {
        loader.classList.add('hidden');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navigation
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

// Sticky header
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal animations on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Stats counter animation
function animateStats() {
    const statsSection = document.getElementById('about');
    const statsTop = statsSection.offsetTop;
    const statsHeight = statsSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > statsTop - windowHeight + statsHeight / 2) {
        animateCounter('robotsDeployed', 500);
        animateCounter('teamMembers', 85);
        animateCounter('globalClients', 120);
        
        // Remove event listener after animation starts
        window.removeEventListener('scroll', animateStats);
    }
}

function animateCounter(id, target) {
    const counter = document.getElementById(id);
    let count = 0;
    const speed = 2000 / target; // Adjust for animation duration
    
    const updateCount = setInterval(() => {
        count++;
        counter.innerText = count;
        
        if (count === target) {
            clearInterval(updateCount);
        }
    }, speed);
}

window.addEventListener('scroll', animateStats);

// Sound toggle functionality
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');
let audioContext;
let isSoundOn = false;
let oscillator;

soundToggle.addEventListener('click', function() {
    if (!audioContext) {
        // Initialize audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (isSoundOn) {
        // Turn sound off
        if (oscillator) {
            oscillator.stop();
            oscillator = null;
        }
        soundIcon.className = 'fas fa-volume-mute';
    } else {
        // Turn sound on - creating a soft futuristic ambient sound
        soundIcon.className = 'fas fa-volume-up';
        
        // Create oscillator
        oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Configure oscillator
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        
        // Configure gain (volume)
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 1);
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Start oscillator
        oscillator.start();
        
        // Create a soft pulsing effect
        setInterval(() => {
            if (oscillator) {
                oscillator.frequency.linearRampToValueAtTime(
                    150 + Math.random() * 50, 
                    audioContext.currentTime + 2
                );
                gainNode.gain.linearRampToValueAtTime(
                    0.05 + Math.random() * 0.05, 
                    audioContext.currentTime + 2
                );
            }
        }, 2000);
    }
    
    isSoundOn = !isSoundOn;
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Create a parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroShapes = document.querySelectorAll('.hero-shape');
    
    if (scrollPosition < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
});

// Dynamic color effects for neon elements
function cycleNeonColors() {
    const neonElements = document.querySelectorAll('.feature-icon, .logo, .hero-title span, .section-title::after');
    const colors = [
        'linear-gradient(90deg, #00f3ff, #ff00aa)',
        'linear-gradient(90deg, #00ff8c, #00f3ff)',
        'linear-gradient(90deg, #ff00aa, #00ff8c)'
    ];
    let colorIndex = 0;
    
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        
        neonElements.forEach(el => {
            if (el.classList.contains('section-title')) {
                el.style.setProperty('--neon-gradient', colors[colorIndex]);
            } else {
                el.style.background = colors[colorIndex];
                el.style.webkitBackgroundClip = 'text';
                el.style.webkitTextFillColor = 'transparent';
            }
        });
    }, 5000);
}

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1)';
    });
});

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    reveal();
});