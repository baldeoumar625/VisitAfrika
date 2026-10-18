/**
 * PROJET: VISIT AFRIKA
 * FICHIER: galerie.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

// Gallery data
const galleryImages = [
    // Pays - Afrique de l'Ouest
    { src: 'images/pays/Afrique_Ouest/senegal.jpg', title: 'Sénégal', category: 'pays', description: 'Pays de la Teranga' },
    { src: 'images/pays/Afrique_Ouest/guinee.jpg', title: 'Guinée', category: 'pays', description: 'République de Guinée' },
    { src: 'images/pays/Afrique_Ouest/mali.jpg', title: 'Mali', category: 'pays', description: 'Pays du Mandé' },
    { src: 'images/pays/Afrique_Ouest/cote_ivoire.jpg', title: 'Côte d\'Ivoire', category: 'pays', description: 'Pays de l\'hospitalité' },
    { src: 'images/pays/Afrique_Ouest/ghana.jpg', title: 'Ghana', category: 'pays', description: 'Terre d\'Or' },
    { src: 'images/pays/Afrique_Ouest/nigeria.jpg', title: 'Nigeria', category: 'pays', description: 'Géant de l\'Afrique' },
    { src: 'images/pays/Afrique_Ouest/benin.jpg', title: 'Bénin', category: 'pays', description: 'Berceau du Vaudou' },
    { src: 'images/pays/Afrique_Ouest/togo.jpg', title: 'Togo', category: 'pays', description: 'Pays du sourire' },

    // Pays - Afrique du Nord
    { src: 'images/pays/Afrique_Nord/maroc.jpg', title: 'Maroc', category: 'pays', description: 'Royaume du Maroc' },
    { src: 'images/pays/Afrique_Nord/algerie.jpg', title: 'Algérie', category: 'pays', description: 'Le plus grand pays d\'Afrique' },
    { src: 'images/pays/Afrique_Nord/tunisie.jpg', title: 'Tunisie', category: 'pays', description: 'Pays des mille saveurs' },
    { src: 'images/pays/Afrique_Nord/egypte.jpg', title: 'Égypte', category: 'pays', description: 'Terre des pharaons' },

    // Nouvelles images Algérie
    { src: 'images/sites des pays/algerie/djemila.png', title: 'Djemila', category: 'pays', description: 'Site romain UNESCO, Algérie' },
    { src: 'images/sites des pays/algerie/tassili.png', title: 'Tassili n\'Ajjer', category: 'pays', description: 'Parc national du Sahara, Algérie' },
    { src: 'images/sites des pays/algerie/ghardaia.png', title: 'Ghardaïa', category: 'pays', description: 'Vallée du M\'Zab, Algérie' },
    { src: 'images/sites des pays/algerie/djanet.png', title: 'Djanet', category: 'pays', description: 'Oasis saharienne, Algérie' },
    { src: 'images/sites des pays/algerie/cabash.png', title: 'Casbah d\'Alger', category: 'pays', description: 'Quartier historique, Alger' },
    { src: 'images/sites des pays/algerie/hoggar.png', title: 'Massif du Hoggar', category: 'pays', description: 'Massif montagneux, Algérie' },
    { src: 'images/sites des pays/algerie/oran.png', title: 'Oran', category: 'pays', description: 'Ville côtière, Algérie' },
    { src: 'images/sites des pays/algerie/timgad.png', title: 'Timgad', category: 'pays', description: 'Ruines romaines, Algérie' },

    // Nouvelles images Guinée
    { src: 'images/sites des pays/guinee/loura.png', title: 'Mont Loura', category: 'pays', description: 'Point culminant, Guinée' },
    { src: 'images/sites des pays/guinee/loos.png', title: 'Îles de Loos', category: 'pays', description: 'Archipel, Guinée' },
    { src: 'images/sites des pays/guinee/fouta.png', title: 'Fouta Djalon', category: 'pays', description: 'Région montagneuse, Guinée' },
    { src: 'images/sites des pays/guinee/parc_niger.png', title: 'Parc National du Haut Niger', category: 'pays', description: 'Réserve naturelle, Guinée' },
    { src: 'images/sites des pays/guinee/sandervalia.png', title: 'Musée Sandervalia', category: 'pays', description: 'Musée historique, Guinée' },
    { src: 'images/sites des pays/guinee/voile_de_la_mariee.png', title: 'Chute de la Voile de la Mariée', category: 'pays', description: 'Cascade, Guinée' },
    { src: 'images/sites des pays/guinee/kinkon.png', title: 'Chutes de Kinkon', category: 'pays', description: 'Chutes d\'eau, Guinée' },
    { src: 'images/sites des pays/guinee/chute_kambadaga.png', title: 'Chutes de Kambadaga', category: 'pays', description: 'Cascades, Guinée' },
    { src: 'images/sites des pays/guinee/foret_ziama.png', title: 'Forêt de Ziama', category: 'pays', description: 'Réserve UNESCO, Guinée' },
    { src: 'images/sites des pays/guinee/chute_ditin.png', title: 'Chutes de Ditinn', category: 'pays', description: 'Cascade, Guinée' },
    { src: 'images/sites des pays/guinee/soumba.png', title: 'Chutes de Soumba', category: 'pays', description: 'Lieu de détente, Guinée' },
    { src: 'images/sites des pays/guinee/bel_air.png', title: 'Plage de Bel Air', category: 'pays', description: 'Plage, Guinée' },
    { src: 'images/sites des pays/guinee/rogbane_conakry.png', title: 'Plage de Rogbané', category: 'pays', description: 'Plage animée, Guinée' },
    { src: 'images/sites des pays/guinee/marche_madina.png', title: 'Marché Madina', category: 'pays', description: 'Marché, Guinée' },
    { src: 'images/sites des pays/guinee/mosque_dinguiraye.png', title: 'Mosquée de Dinguiraye', category: 'pays', description: 'Mosquée, Guinée' },

    // Nouvelles images Nigeria
    { src: 'images/sites des pays/nigeria/abuja.png', title: 'Abuja', category: 'pays', description: 'Capitale, Nigeria' },
    { src: 'images/sites des pays/nigeria/ajaokuta.png', title: 'Ajaokuta', category: 'pays', description: 'Ville industrielle, Nigeria' },
    { src: 'images/sites des pays/nigeria/erin-ijesha.png', title: 'Erin-Ijesha', category: 'pays', description: 'Chutes d\'eau, Nigeria' },
    { src: 'images/sites des pays/nigeria/ibadan.png', title: 'Ibadan', category: 'pays', description: 'Grande ville, Nigeria' },
    { src: 'images/sites des pays/nigeria/idanre.png', title: 'Idanre', category: 'pays', description: 'Collines, Nigeria' },
    { src: 'images/sites des pays/nigeria/kainji.jpg', title: 'Kainji', category: 'pays', description: 'Lac, Nigeria' },
    { src: 'images/sites des pays/nigeria/lekki.jpg', title: 'Lekki', category: 'pays', description: 'Ville côtière, Nigeria' },
    { src: 'images/sites des pays/nigeria/obudu.jpg', title: 'Obudu', category: 'pays', description: 'Ranch, Nigeria' },
    { src: 'images/sites des pays/nigeria/ogbunike.jpg', title: 'Ogbunike', category: 'pays', description: 'Grottes, Nigeria' },
    { src: 'images/sites des pays/nigeria/olumo_rock.jpg', title: 'Olumo Rock', category: 'pays', description: 'Roche, Nigeria' },
    { src: 'images/sites des pays/nigeria/osun_oshogbo.jpg', title: 'Osun Oshogbo', category: 'pays', description: 'Forêt sacrée, Nigeria' },
    { src: 'images/sites des pays/nigeria/parc_yankari.jpg', title: 'Parc Yankari', category: 'pays', description: 'Réserve naturelle, Nigeria' },
    { src: 'images/sites des pays/nigeria/plage_de_lagos.jpg', title: 'Plage de Lagos', category: 'pays', description: 'Plage, Nigeria' },
    { src: 'images/sites des pays/nigeria/zuma_rock.jpg', title: 'Zuma Rock', category: 'pays', description: 'Roche emblématique, Nigeria' },

    // Nouvelles images Sénégal
    { src: 'images/sites des pays/senegal/bandia.jpg', title: 'Réserve de Bandia', category: 'pays', description: 'Réserve animalière, Sénégal' },
    { src: 'images/sites des pays/senegal/casamance.jpg', title: 'Casamance', category: 'pays', description: 'Région naturelle, Sénégal' },
    { src: 'images/sites des pays/senegal/delta_saloum.jpg', title: 'Delta du Saloum', category: 'pays', description: 'Delta, Sénégal' },
    { src: 'images/sites des pays/senegal/ile_de_gore.jpg', title: 'Île de Gorée', category: 'pays', description: 'Patrimoine historique, Sénégal' },
    { src: 'images/sites des pays/senegal/ile_ngor.jpg', title: 'Île de Ngor', category: 'pays', description: 'Île, Sénégal' },
    { src: 'images/sites des pays/senegal/lac_rose.jpg', title: 'Lac Rose', category: 'pays', description: 'Lac salé, Sénégal' },
    { src: 'images/sites des pays/senegal/lompoul.jpg', title: 'Désert de Lompoul', category: 'pays', description: 'Désert, Sénégal' },
    { src: 'images/sites des pays/senegal/mosque_divinite.jpg', title: 'Mosquée de la Divinité', category: 'pays', description: 'Mosquée, Sénégal' },
    { src: 'images/sites des pays/senegal/parc_djoudj.jpg', title: 'Parc du Djoudj', category: 'pays', description: 'Parc national, Sénégal' },
    { src: 'images/sites des pays/senegal/popenguine.jpg', title: 'Popenguine', category: 'pays', description: 'Village végétal, Sénégal' },
    { src: 'images/sites des pays/senegal/saint_louis.jpg', title: 'Saint-Louis', category: 'pays', description: 'Ville historique, Sénégal' },
    { src: 'images/sites des pays/senegal/saly.jpg', title: 'Saly', category: 'pays', description: 'Station balnéaire, Sénégal' },

    // Pays - Afrique de l'Est
    { src: 'images/pays/Afrique_Est/kenya.jpg', title: 'Kenya', category: 'pays', description: 'Safari et nature' },
    { src: 'images/pays/Afrique_Est/tanzanie.jpg', title: 'Tanzanie', category: 'pays', description: 'Kilimandjaro et Serengeti' },
    { src: 'images/pays/Afrique_Est/ethiopie.jpg', title: 'Éthiopie', category: 'pays', description: 'Pays des origines' },
    { src: 'images/pays/Afrique_Est/rwanda.jpg', title: 'Rwanda', category: 'pays', description: 'Pays des mille collines' },

    // Pays - Afrique Centrale
    { src: 'images/pays/Afrique_Centrale/cameroun.jpg', title: 'Cameroun', category: 'pays', description: 'Afrique en miniature' },
    { src: 'images/pays/Afrique_Centrale/rdc.jpg', title: 'RD Congo', category: 'pays', description: 'Cœur de l\'Afrique' },
    { src: 'images/pays/Afrique_Centrale/gabon.jpg', title: 'Gabon', category: 'pays', description: 'Pays de la biodiversité' },

    // Pays - Afrique Australe
    { src: 'images/pays/Afrique_Australe/afrique_du_sud.jpg', title: 'Afrique du Sud', category: 'pays', description: 'Nation arc-en-ciel' },
    { src: 'images/pays/Afrique_Australe/botswana.jpg', title: 'Botswana', category: 'pays', description: 'Destination safari' },
    { src: 'images/pays/Afrique_Australe/namibie.jpg', title: 'Namibie', category: 'pays', description: 'Paysages désertiques' },

    // Sites populaires
    { src: 'images/sites_populaires/kilimendjaro.jpg', title: 'Kilimandjaro', category: 'sites', description: 'Le toit de l\'Afrique' },
    { src: 'images/sites_populaires/serengeti.jpg', title: 'Serengeti', category: 'sites', description: 'Parc national emblématique' },
    { src: 'images/sites_populaires/chute_victoria.jpg', title: 'Chutes Victoria', category: 'sites', description: 'Merveille naturelle' },
    { src: 'images/sites_populaires/pyramides_de_gizeh.jpg', title: 'Pyramides de Gizeh', category: 'sites', description: 'Mervelle du monde antique' },
    { src: 'images/sites_populaires/ile_de_goree.jpg', title: 'Île de Gorée', category: 'sites', description: 'Patrimoine historique' },
    { src: 'images/sites_populaires/table_montain.jpg', title: 'Table Mountain', category: 'sites', description: 'Icône du Cap' },

    // Services
    { src: 'images/section-services/nature_parcs.jpg', title: 'Parcs Naturels', category: 'services', description: 'Découvrez la faune sauvage' },
    { src: 'images/section-services/visite_culturelle.jpg', title: 'Visites Culturelles', category: 'services', description: 'Immersion culturelle' },
    { src: 'images/section-services/gastronomie.jpg', title: 'Gastronomie', category: 'services', description: 'Saveurs authentiques' },
    { src: 'images/section-services/sejour.jpg', title: 'Séjours', category: 'services', description: 'Expériences mémorables' },
    { src: 'images/section-services/guides.jpg', title: 'Guides Experts', category: 'services', description: 'Accompagnement professionnel' },
    { src: 'images/section-services/artisanat.jpg', title: 'Artisanat', category: 'services', description: 'Art et traditions' },

    // Articles
    { src: 'images/articles/plages.jpg', title: 'Top Plages', category: 'articles', description: 'Les plus belles plages d\'Afrique' },
    { src: 'images/articles/pays_accueillants.jpg', title: 'Pays Accueillants', category: 'articles', description: 'Destination hospitalité' },
    { src: 'images/articles/gastronomie.jpg', title: 'Gastronomie Africaine', category: 'articles', description: 'Plats à découvrir' }
];

let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [];

// Initialize gallery
document.addEventListener('DOMContentLoaded', function () {
    initializeGallery();
    setupFilters();
    setupLightbox();
});

// Initialize gallery grid
// Fonction: initializeGallery
function initializeGallery() {
    const grid = document.getElementById('galerieGrid');
    filteredImages = galleryImages;
    renderGallery(filteredImages);
}

// Render gallery items
// Fonction: renderGallery
function renderGallery(images) {
    const grid = document.getElementById('galerieGrid');

    // Fade out existing items
    const existingItems = grid.querySelectorAll('.galerie-item');
    existingItems.forEach((item, index) => {
        item.classList.add('fade-out');
        setTimeout(() => {
            if (item.parentNode) {
                item.remove();
            }
        }, 300);
    });

    // Add new items after fade out completes
    setTimeout(() => {
        grid.innerHTML = '';

        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'galerie-item fade-in';
            item.setAttribute('data-category', image.category);
            item.setAttribute('data-index', index);

            // Stagger animation delay
            item.style.animationDelay = `${index * 0.05}s`;

            item.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="galerie-item-overlay">
                    <div class="galerie-item-title">${image.title}</div>
                    <div class="galerie-item-category">${image.description}</div>
                </div>
            `;

            item.addEventListener('click', () => openLightbox(index));
            grid.appendChild(item);
        });

        // Scroll to top smoothly if filtered
        if (currentFilter !== 'all') {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

// Setup filter buttons
// Fonction: setupFilters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Don't do anything if already active
            if (this.classList.contains('active')) {
                return;
            }

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            currentFilter = this.getAttribute('data-filter');

            // Filter images
            if (currentFilter === 'all') {
                filteredImages = galleryImages;
            } else {
                filteredImages = galleryImages.filter(img => img.category === currentFilter);
            }

            // Re-render gallery
            renderGallery(filteredImages);
        });
    });
}

// Setup lightbox
// Fonction: setupLightbox
function setupLightbox() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // Previous/Next buttons
    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigateLightbox(1);
    });
}

// Open lightbox
// Fonction: openLightbox
function openLightbox(index) {
    const modal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    currentImageIndex = index;
    const image = filteredImages[index];

    // Reset animation
    lightboxImage.style.opacity = '0';
    lightboxCaption.style.opacity = '0';
    lightboxCaption.style.transform = 'translateY(10px)';

    lightboxImage.src = image.src;
    lightboxCaption.textContent = `${image.title} - ${image.description}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Trigger animation after image loads
    lightboxImage.onload = function () {
        lightboxImage.style.animation = 'imageZoomIn 0.5s ease-out forwards';
        setTimeout(() => {
            lightboxCaption.style.animation = 'captionFadeIn 0.4s ease-out forwards';
        }, 200);
    };
}

// Close lightbox
// Fonction: closeLightbox
function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigate lightbox
// Fonction: navigateLightbox
function navigateLightbox(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = filteredImages.length - 1;
    } else if (currentImageIndex >= filteredImages.length) {
        currentImageIndex = 0;
    }

    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const image = filteredImages[currentImageIndex];

    // Fade out current image
    lightboxImage.style.opacity = '0';
    lightboxCaption.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = image.src;
        lightboxCaption.textContent = `${image.title} - ${image.description}`;

        // Fade in new image
        lightboxImage.onload = function () {
            lightboxImage.style.animation = 'imageZoomIn 0.5s ease-out forwards';
            setTimeout(() => {
                lightboxCaption.style.animation = 'captionFadeIn 0.4s ease-out forwards';
            }, 200);
        };
    }, 200);
}
