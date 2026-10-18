/**
 * PROJET: VISIT AFRIKA
 * FICHIER: main.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

$(document).ready(// Fonction: 
function () {

  // NavBar Slide Toggle
  $('i.icon').click(// Fonction: 
function () {
    $('.nav-list').slideToggle()
  });

  // Sticky NavBar
  $(window).scroll(// Fonction: 
function () {
    var sc = $(this).scrollTop();
    if (sc > 50) {
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }
  });
});

const slides = document.getElementById("slides");
const slideCount = slides ? slides.children.length : 0;
let index = 0;

// Fonction: showSlide
function showSlide(i) {
  if (!slides) return;
  index = (i + slideCount) % slideCount;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Fonction: nextSlide
function nextSlide() {
  if (!slides) return;
  showSlide(index + 1);
}

// Fonction: prevSlide
function prevSlide() {
  if (!slides) return;
  showSlide(index - 1);
}

// Auto-slide toutes les 5s
if (slides) {
  setInterval(() => {
    nextSlide();
  }, 5000);
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (menuToggle && navbarMenu) {
  menuToggle.addEventListener('click', // Fonction: 
function () {
    this.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', // Fonction: 
function () {
      menuToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
}
// Typewriter for home title and coordinated fade-slide for description
document.addEventListener('DOMContentLoaded', // Fonction: 
function () {
  const el = document.querySelector('.typewriter');
  if (el) {
    const text = el.getAttribute('data-text') || el.textContent.trim();
    el.textContent = '';
    el.classList.add('typing');
    el.style.opacity = 1;
    let i = 0;
    const speed = 80; // ms per character
    // Fonction: type
function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        el.classList.remove('typing');
        el.classList.add('finished');
        // trigger description animation (if not already)
        const desc = document.querySelector('.fade-slide');
        if (desc) {
          desc.style.opacity = '';
          desc.style.transform = '';
        }
      }
    }
    // small initial delay
    setTimeout(type, 400);
  }

  // --- SCROLL ANIMATIONS (IntersectionObserver) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // Trigger a bit before the bottom
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  // Automatically select relevant elements in country pages (and others) to animate
  // We target elements inside .content mainly
  const elementsToAnimate = document.querySelectorAll('.content h2, .content p, .content ul, .attraction, .footer-section');

  elementsToAnimate.forEach((el, index) => {
    el.classList.add('reveal');
    // Add a slight delay to grid items for a staggered effect
    if (el.classList.contains('attraction')) {
      el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    }
    observer.observe(el);
  });

    // --- GESTION DU PROMPT DE CONNEXION (STYLE GOOGLE ONE TAP) ---
  const token = localStorage.getItem('access_token');
  const promptDismissed = sessionStorage.getItem('auth_prompt_dismissed');

  if (!token && !promptDismissed) {
    setTimeout(() => {
      // Détection du chemin pour gérer les sous-dossiers (ex: /les differents pays/)
      const pathDepth = window.location.pathname.includes('/les differents pays/') ? '../' : '';
      
      const promptHtml = `
        <div id="authPrompt" class="auth-prompt-container">
          <div class="auth-prompt-header">
            <div class="auth-prompt-logo">
              <img src="${pathDepth}images/logo/logo.png" alt="Logo">
              <span>Visit Afrika</span>
            </div>
            <button class="auth-prompt-close" id="closeAuthPrompt">&times;</button>
          </div>
          <div class="auth-prompt-body">
            <h3>Commencez votre exploration</h3>
            <p>Connectez-vous pour gérer vos réservations, vos favoris et recevoir des recommandations personnalisées.</p>
          </div>
          <div class="auth-prompt-btns">
            <a href="${pathDepth}formulaires/connection.html" class="btn-auth-main">Se connecter</a>
            <a href="${pathDepth}formulaires/inscription.html" class="btn-auth-sub">Créer un compte</a>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', promptHtml);
      
      const prompt = document.getElementById('authPrompt');
      if (prompt) {
        prompt.style.display = 'block';

        document.getElementById('closeAuthPrompt').addEventListener('click', () => {
          prompt.style.display = 'none';
          sessionStorage.setItem('auth_prompt_dismissed', 'true');
        });
      }
    }, 3000); // Apparaît après 3 secondes
  }
});
