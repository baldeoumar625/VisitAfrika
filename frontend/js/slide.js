/**
 * PROJET: VISIT AFRIKA
 * FICHIER: slide.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */


const slides = document.getElementById("slides");
const slideCount = slides.children.length;
let index = 0;

// Fonction: showSlide
function showSlide(i) {
index = (i + slideCount) % slideCount;
slides.style.transform = `translateX(-${index * 100}%)`;
}

// Fonction: nextSlide
function nextSlide() {
    showSlide(index + 1);
    }

// Fonction: prevSlide
function prevSlide() {
    showSlide(index - 1);
    }

// Auto-slide toutes les 5s
setInterval(() => {
    nextSlide();
    }, 5000);
