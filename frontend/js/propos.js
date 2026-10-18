/**
 * PROJET: VISIT AFRIKA
 * FICHIER: propos.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

// propos.js - Scripts pour la page À Propos

document.addEventListener('DOMContentLoaded', function() {
    initStatsCounter();
    initScrollAnimations();
});

// Initialize stats counter animation
// Fonction: initStatsCounter
function initStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    if (!statsNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statsNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Animate counter
// Fonction: animateCounter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

// Format number with + if needed
// Fonction: formatNumber
function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('fr-FR');
    }
    return num.toString();
}

// Initialize scroll animations for cards
// Fonction: initScrollAnimations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.mission-card, .vision-card, .valeur-card, .equipe-card, .pourquoi-item'
    );

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

