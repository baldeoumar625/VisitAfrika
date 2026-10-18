/**
 * PROJET: VISIT AFRIKA
 * FICHIER: soudan_du_sud.js
 * DESCRIPTION: Script premium pour la page Soudan du Sud.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Soudan du Sud chargé.");

    // 1. MENU MOBILE
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (menuToggle && navbarMenu) {
        menuToggle.onclick = function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        };
    }

    // 2. ANIMATIONS D'ENTRÉE
    const attractionCards = document.querySelectorAll('.attraction');
    attractionCards.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + i * 100);
    });

    // 3. CARTE INTERACTIVE (LEAFLET)
    const toggleMapBtn = document.getElementById('toggleMap');
    const mapContainer = document.getElementById('map-container');
    let map = null;

    if (toggleMapBtn && mapContainer) {
        toggleMapBtn.onclick = function(e) {
            e.preventDefault();
            const isHidden = (mapContainer.style.display === 'none' || mapContainer.style.display === '');
            
            if (isHidden) {
                mapContainer.style.display = 'block';
                this.innerHTML = '<i class="fas fa-times"></i> <span class="btn-text">Fermer la carte</span>';
                this.style.background = '#e74c3c';
                
                if (!map) {
                    // Centrer sur le Soudan du Sud
                    map = L.map('soudandusud-map').setView([7.8627, 29.6949], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National de Boma", lat: 6.33, lng: 34.42 },
                        { name: "Parc de Bandigilo", lat: 5.80, lng: 32.25 },
                        { name: "Parc de Nimule", lat: 3.61, lng: 32.05 },
                        { name: "Marais du Sudd", lat: 8.50, lng: 30.50 },
                        { name: "Juba (Capitale)", lat: 4.85, lng: 31.58 },
                        { name: "Bor", lat: 6.22, lng: 31.55 },
                        { name: "Torit", lat: 4.41, lng: 32.57 },
                        { name: "Kapoeta", lat: 4.77, lng: 33.58 },
                        { name: "Wau", lat: 7.70, lng: 27.99 },
                        { name: "Malakal", lat: 9.53, lng: 31.65 },
                        { name: "Yambio", lat: 4.57, lng: 28.39 },
                        { name: "Yei", lat: 4.09, lng: 30.67 },
                        { name: "Terres Mondari", lat: 5.25, lng: 31.30 },
                        { name: "Villages Dingka", lat: 7.00, lng: 31.00 },
                        { name: "Montagnes Lotuko", lat: 4.30, lng: 32.80 }
                    ];

                    sites.forEach(site => {
                        L.marker([site.lat, site.lng]).addTo(map).bindPopup(`<b>${site.name}</b>`);
                    });
                }
                setTimeout(() => map.invalidateSize(), 100);
            } else {
                mapContainer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-map"></i> <span class="btn-text">Carte</span>';
                this.style.background = '';
            }
        };
    }

    // 4. DONNÉES DÉTAILLÉES POUR LES MODALES
    const infos = {
        boma: {
            titre: "Parc National de Boma",
            localisation: "Près de la frontière éthiopienne",
            periode: "Saison sèche (Décembre à Mars)",
            acces: "Charter aérien depuis Juba (Fortement recommandé)",
            conseils: "Assistez à l'une des plus grandes migrations de mammifères au monde (antilopes Kob de l'Ouganda)",
            contact: "Ministry of Wildlife Conservation",
            hotel: "Safari Camp Temporaire",
            hotelLoc: "Dans le parc",
            hotelFonct: "Immersion totale, tentes de brousse",
            hotelContact: "Via agence Juba",
            hotelRestau: "Cuisine de brousse",
            guide: "John Akot",
            guideContact: "john@visitafrika.com"
        },
        bandigilo: {
            titre: "Parc National de Bandigilo",
            localisation: "Centre du pays",
            periode: "Saison sèche",
            acces: "4x4 depuis Juba",
            conseils: "Extension de l'écosystème de Boma, paysages de savane vierge et faune sauvage abondante",
            contact: "N/A",
            hotel: "Hôtels de Juba",
            hotelLoc: "Juba (base)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "John Akot",
            guideContact: "john@visitafrika.com"
        },
        nimule: {
            titre: "Parc National de Nimule",
            localisation: "Frontière Sud (Ouganda)",
            periode: "Toute l'année",
            acces: "Route Juba-Nimule",
            conseils: "Le parc le plus accessible, faites un safari à pied pour voir les éléphants près du Nil",
            contact: "Nimule Park Office",
            hotel: "Nimule Resort",
            hotelLoc: "Bord du Nil, Nimule",
            hotelFonct: "Confortable, vue sur les rapides",
            hotelContact: "Sur place",
            hotelRestau: "Poisson du Nil grillé",
            guide: "John Akot",
            guideContact: "john@visitafrika.com"
        },
        sudd: {
            titre: "Marais du Sudd",
            localisation: "Bassin du Nil Blanc",
            periode: "Saison sèche (pour les accès)",
            acces: "Bateau depuis Bor ou vol survol",
            conseils: "Plus grand marais d'eau douce au monde, paradis ornithologique et culturel (Dinka/Nuer)",
            contact: "N/A",
            hotel: "N/A (Vie sur bateau ou campement)",
            hotelLoc: "Sudd",
            hotelFonct: "Aventure extrême",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert local Sudd",
            guideContact: "Obligatoire"
        },
        juba: {
            titre: "Juba",
            localisation: "Bord du Nil (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international de Juba (JUB)",
            conseils: "Visitez le mémorial du Dr John Garang et profitez des restaurants au bord du Nil",
            contact: "South Sudan Tourism Board",
            hotel: "Pyramid Continental Hotel",
            hotelLoc: "Juba Centre",
            hotelFonct: "Luxe 5 étoiles, piscine et business center",
            hotelContact: "+211 922 000 000",
            hotelRestau: "Cuisine internationale et libanaise",
            guide: "John Akot",
            guideContact: "john@visitafrika.com"
        },
        bor: {
            titre: "Bor",
            localisation: "État de Jonglei",
            periode: "Saison sèche",
            acces: "Route Juba-Bor ou bateau",
            conseils: "Ville historique en bord de Nil, porte d'entrée vers les terres Dinka",
            contact: "N/A",
            hotel: "Bor Riverside Hotel",
            hotelLoc: "Bor",
            hotelFonct: "Simple, vue Nil",
            hotelContact: "Sur place",
            hotelRestau: "Plats locaux",
            guide: "N/A",
            guideContact: "N/A"
        },
        torit: {
            titre: "Torit",
            localisation: "État de l'Équatoria-Oriental",
            periode: "Saison sèche",
            acces: "Route depuis Juba",
            conseils: "Région montagneuse magnifique, berceau de la résistance historique",
            contact: "N/A",
            hotel: "Torit Guesthouse",
            hotelLoc: "Torit",
            hotelFonct: "Basique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        kapoeta: {
            titre: "Kapoeta",
            localisation: "Est (État de l'Équatoria-Oriental)",
            periode: "Toute l'année",
            acces: "Vol interne ou route (aventureuse)",
            conseils: "Idéal pour rencontrer les Toposa, connus pour leur culture et leur architecture uniques",
            contact: "N/A",
            hotel: "Mango Camp",
            hotelLoc: "Kapoeta",
            hotelFonct: "Campement de safari simple et convivial",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine familiale",
            guide: "Guide culturel Toposa",
            guideContact: "Sur place"
        },
        wau: {
            titre: "Wau",
            localisation: "Nord-Ouest",
            periode: "Toute l'année",
            acces: "Vol interne ou route",
            conseils: "Deuxième ville du pays, visitez la cathédrale Ste Marie, la plus grande du pays",
            contact: "Mairie de Wau",
            hotel: "Wau Riverside Hotel",
            hotelLoc: "Wau",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale",
            guide: "N/A",
            guideContact: "N/A"
        },
        malakal: {
            titre: "Malakal",
            localisation: "État du Haut-Nil",
            periode: "Saison sèche",
            acces: "Vol interne",
            conseils: "Point stratégique sur le Nil, région riche en pétrole et en diversité ethnique",
            contact: "N/A",
            hotel: "Hébergements limités",
            hotelLoc: "Malakal",
            hotelFonct: "Basique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        yambio: {
            titre: "Yambio",
            localisation: "Sud-Ouest (Équatoria-Occidental)",
            periode: "Toute l'année",
            acces: "Vol interne ou route",
            conseils: "Région de forêts tropicales et de culture Azande (Royaume historique)",
            contact: "Sultanat Azande",
            hotel: "Yambio Guesthouse",
            hotelLoc: "Yambio",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "Plats à base de manioc et gibier",
            guide: "N/A",
            guideContact: "N/A"
        },
        yei: {
            titre: "Yei",
            localisation: "Sud-Ouest",
            periode: "Toute l'année",
            acces: "Route depuis Juba",
            conseils: "Ville verdoyante autrefois surnommée 'La Petite Londres' pour son climat et son agriculture",
            contact: "N/A",
            hotel: "Yei River Hotel",
            hotelLoc: "Yei",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        mondari: {
            titre: "Terres Mondari",
            localisation: "Terekeka (Nord de Juba)",
            periode: "Octobre à Avril (Saison sèche)",
            acces: "4x4 depuis Juba (2h)",
            conseils: "Expérience culturelle ultime : vivez avec les éleveurs Mondari et leurs vaches Ankole-Watusi",
            contact: "Terekeka Tourism",
            hotel: "Camping en bivouac",
            hotelLoc: "Campements de bétail",
            hotelFonct: "Vraie immersion, nuit sous tente",
            hotelContact: "Via agence Juba",
            hotelRestau: "Cuisine au feu de camp",
            guide: "John Akot",
            guideContact: "john@visitafrika.com"
        },
        dingka: {
            titre: "Villages Dingka",
            localisation: "Région des lacs",
            periode: "Saison sèche",
            acces: "Route ou vol vers Rumbek",
            conseils: "Découvrez la culture ancestrale des Dinka, géants du Nil et maîtres éleveurs",
            contact: "N/A",
            hotel: "Rumbek Guesthouse",
            hotelLoc: "Rumbek",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide Dinka local",
            guideContact: "Sur place"
        },
        lotuko: {
            titre: "Montagnes Lotuko",
            localisation: "Est de Torit",
            periode: "Saison fraîche",
            acces: "Expédition 4x4",
            conseils: "Visitez le village d'Iliu, architecture traditionnelle en pierre sur les collines",
            contact: "N/A",
            hotel: "N/A (Bivouac)",
            hotelLoc: "Iliu",
            hotelFonct: "Expédition",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "John Akot",
            guideContact: "john@visitafrika.com"
        }
    };

    // --- GESTION MODALE ---
    const modal = document.getElementById('visit-modal');
    const modalBody = document.getElementById('visit-modal-body');
    const closeBtn = document.querySelector('.visit-modal-close');

    function openModal(siteKey) {
        if (!modal || !modalBody) return;
        const data = infos[siteKey];
        if (!data) return;

        // Récupération de l'image
        const cards = document.querySelectorAll('.attraction');
        let imgSrc = '';
        cards.forEach(card => {
            const btn = card.querySelector('[data-site="' + siteKey + '"]');
            if (btn) {
                const img = card.querySelector('img');
                if (img) imgSrc = img.src;
            }
        });

        modalBody.innerHTML = `
            <div class="modal-premium-header">
                <h3>${data.titre}</h3>
                <p class="modal-subtitle"><i class="fas fa-map-marker-alt"></i> ${data.localisation}</p>
            </div>
            <div class="modal-info-grid">
                <div class="info-item">
                    <i class="fas fa-calendar-check"></i>
                    <div><strong>Meilleure période</strong><br>${data.periode}</div>
                </div>
                <div class="info-item">
                    <i class="fas fa-truck-pickup"></i>
                    <div><strong>Accès</strong><br>${data.acces}</div>
                </div>
                <div class="info-item">
                    <i class="fas fa-lightbulb"></i>
                    <div><strong>Conseils</strong><br>${data.conseils}</div>
                </div>
                <div class="info-item">
                    <i class="fas fa-headset"></i>
                    <div><strong>Contact local</strong><br>${data.contact}</div>
                </div>
            </div>

            <div class="modal-hotel-section">
                <h4><i class="fas fa-hotel"></i> Hébergement Recommandé</h4>
                <div class="hotel-card-simple">
                    <h5>${data.hotel}</h5>
                    <p><i class="fas fa-map-pin"></i> ${data.hotelLoc}</p>
                    <p class="hotel-desc">${data.hotelFonct}</p>
                    <div class="hotel-meta">
                        <span><i class="fas fa-utensils"></i> ${data.hotelRestau}</span>
                        <span class="hotel-contact-badge"><i class="fas fa-phone"></i> ${data.hotelContact}</span>
                    </div>
                </div>
            </div>

            <div class="modal-guide-section">
                <div class="guide-mini-card">
                    <i class="fas fa-user-tie"></i>
                    <div>
                        <strong>Expert local :</strong> ${data.guide}<br>
                        <span class="guide-tel">${data.guideContact}</span>
                    </div>
                </div>
            </div>

            <hr>
            <form id="visit-form" class="visit-form-styled">
                <div class="form-header">
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon expédition</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="8" value="1" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Votre contact (Email/WhatsApp)</label>
                    <input type="text" name="contact" placeholder="Email ou téléphone" required>
                </div>
                <button type="submit" class="btn-submit">Envoyer la demande</button>
            </form>
            <div id="visit-confirm" style="display:none; text-align:center; padding: 20px; color: #27ae60;">
                <i class="fas fa-check-circle fa-2x mb-2"></i><br>
                Demande envoyée ! Nos experts du Soudan du Sud vous contacteront.
            </div>
        `;

        if (imgSrc) {
            const modalContentEl = document.querySelector('.visit-modal-content');
            if (modalContentEl) {
                modalContentEl.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)), url("' + imgSrc + '")';
                modalContentEl.style.backgroundSize = 'cover';
                modalContentEl.style.backgroundPosition = 'center';
            }
        }

        modal.style.display = 'block';

        const form = document.getElementById('visit-form');
        if (form) {
            form.onsubmit = function (e) {
                e.preventDefault();
                form.style.display = 'none';
                document.getElementById('visit-confirm').style.display = 'block';
            };
        }
    }

    // Événements
    document.querySelectorAll('.visit-btn, .btn-decouvrir').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const key = this.getAttribute('data-site');
            openModal(key);
        };
    });

    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    // 5. FILTRES
    const searchInput = document.getElementById('attractionSearch');
    const filterTags = document.querySelectorAll('.filter-tag');

    function filter() {
        const q = searchInput ? searchInput.value.toLowerCase() : '';
        const activeTag = document.querySelector('.filter-tag.active');
        const f = activeTag ? activeTag.getAttribute('data-filter') : 'all';

        attractionCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const cat = card.getAttribute('data-category');
            const matchSearch = title.includes(q);
            const matchFilter = (f === 'all' || cat === f);
            if (matchSearch && matchFilter) {
                card.style.setProperty('display', 'block', 'important');
            } else {
                card.style.setProperty('display', 'none', 'important');
            }
        });
    }

    if (searchInput) searchInput.oninput = filter;
    filterTags.forEach(tag => {
        tag.onclick = function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filter();
        };
    });
});
