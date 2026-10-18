/**
 * PROJET: VISIT AFRIKA
 * FICHIER: comores.js
 * DESCRIPTION: Script premium pour la page Comores.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Comores chargé.");

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
                    // Centrer sur l'archipel des Comores
                    map = L.map('comores-map').setView([-11.6455, 43.3333], 8);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Mont Karthala (Grande Comore)", lat: -11.75, lng: 43.38 },
                        { name: "Parc Marin de Mohéli", lat: -12.35, lng: 43.70 },
                        { name: "Plages de Nioumachoua", lat: -12.37, lng: 43.72 },
                        { name: "Ancienne Mosquée du Vendredi (Moroni)", lat: -11.70, lng: 43.25 },
                        { name: "Plage d'Itsandra", lat: -11.67, lng: 43.25 },
                        { name: "Mitsamiouli", lat: -11.39, lng: 43.29 },
                        { name: "Lac Salé", lat: -11.38, lng: 43.32 },
                        { name: "Trou du Prophète", lat: -11.37, lng: 43.31 },
                        { name: "Moya (Anjouan)", lat: -12.30, lng: 44.43 },
                        { name: "Iconi (Grande Comore)", lat: -11.73, lng: 43.24 },
                        { name: "Chomoni", lat: -11.64, lng: 43.48 },
                        { name: "Fomboni (Mohéli)", lat: -12.28, lng: 43.74 },
                        { name: "Chute de Muri", lat: -12.25, lng: 44.40 },
                        { name: "Bambao (Anjouan)", lat: -12.18, lng: 44.51 },
                        { name: "Mutsamudu (Anjouan)", lat: -12.16, lng: 44.40 }
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
        karthala: {
            titre: "Mont Karthala",
            localisation: "Grande Comore (Ngazidja)",
            periode: "Saison sèche (Mai à Octobre)",
            acces: "Trekking de 2 jours (Guide obligatoire)",
            conseils: "L'un des plus grands cratères actifs au monde, prévoyez des vêtements chauds pour la nuit au sommet",
            contact: "Office National du Tourisme",
            hotel: "Retaj Moroni",
            hotelLoc: "Moroni (base)",
            hotelFonct: "Hôtel moderne avec vue sur mer",
            hotelContact: "+269 773 24 24",
            hotelRestau: "Cuisine comorienne et internationale",
            guide: "Saïd Montagne",
            guideContact: "said@visitafrika.com"
        },
        moheli: {
            titre: "Parc National de Mohéli",
            localisation: "Île de Mohéli (Mwali)",
            periode: "Toute l'année (Ponte des tortues d'Avril à Août)",
            acces: "Vol interne ou bateau depuis Moroni",
            conseils: "Observation respectueuse des tortues vertes en train de pondre la nuit",
            contact: "Association de Protection de Mohéli",
            hotel: "Laka Lodge",
            hotelLoc: "Nioumachoua",
            hotelFonct: "Ecolodge les pieds dans l'eau",
            hotelContact: "+269 333 45 67",
            hotelRestau: "Produits de la mer frais",
            guide: "Bakari Tortue",
            guideContact: "bakari@visitafrika.com"
        },
        nioumachoua: {
            titre: "Îlots de Nioumachoua",
            localisation: "Sud de Mohéli",
            periode: "Toute l'année",
            acces: "Bateau traditionnel (Pirogue)",
            conseils: "Parfait pour le snorkeling et la découverte de plages désertes",
            contact: "Mairie de Nioumachoua",
            hotel: "Laka Lodge",
            hotelLoc: "Plage de Nioumachoua",
            hotelFonct: "Immersion nature",
            hotelContact: "Via site web",
            hotelRestau: "Gastronomie locale",
            guide: "Guide local du village",
            guideContact: "Sur place"
        },
        moroni: {
            titre: "Ancienne Mosquée de Moroni",
            localisation: "Moroni, Quartier du Port",
            periode: "Toute l'année",
            acces: "Cœur de la capitale",
            conseils: "Visitez le port aux boutres juste à côté au coucher du soleil",
            contact: "Mairie de Moroni",
            hotel: "Golden Tulip Grande Comore",
            hotelLoc: "Moroni",
            hotelFonct: "Resort avec plage privée et casino",
            hotelContact: "+269 773 00 11",
            hotelRestau: "Restaurant Le Corail",
            guide: "N/A",
            guideContact: "N/A"
        },
        itsandra: {
            titre: "Plage d'Itsandra",
            localisation: "Nord de Moroni",
            periode: "Toute l'année",
            acces: "Taxi depuis Moroni (10 min)",
            conseils: "La plage la plus animée, idéale pour goûter à la vie locale",
            contact: "Village d'Itsandra",
            hotel: "Itsandra Beach Hotel",
            hotelLoc: "Bord de plage",
            hotelFonct: "Historique et chic",
            hotelContact: "+269 773 33 33",
            hotelRestau: "Poissons grillés",
            guide: "N/A",
            guideContact: "N/A"
        },
        mitsamiouli: {
            titre: "Mitsamiouli",
            localisation: "Extrême Nord de la Grande Comore",
            periode: "Toute l'année",
            acces: "Route du Nord",
            conseils: "Explorez les criques de basalte noir contrastant avec le sable blanc",
            contact: "Commune de Mitsamiouli",
            hotel: "Le Galawa (Site historique)",
            hotelLoc: "Mitsamiouli",
            hotelFonct: "Nombreux bungalows à proximité",
            hotelContact: "N/A",
            hotelRestau: "Cuisine de plage",
            guide: "N/A",
            guideContact: "N/A"
        },
        lac_sale: {
            titre: "Lac Salé",
            localisation: "Mitsamiouli (Nord)",
            periode: "Toute l'année",
            acces: "Marche courte depuis la route",
            conseils: "Lac dans un cratère, couleur changeante selon la lumière",
            contact: "Guide local",
            hotel: "Bungalows du Nord",
            hotelLoc: "Mitsamiouli",
            hotelFonct: "Simple",
            hotelContact: "Sur place",
            hotelRestau: "Poisson coco",
            guide: "N/A",
            guideContact: "N/A"
        },
        palanche: {
            titre: "Trou du Prophète",
            localisation: "Mitsamiouli",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Lieu de légende, idéal pour la baignade à marée haute",
            contact: "N/A",
            hotel: "Hôtels de Moroni",
            hotelLoc: "Moroni (base)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        moya: {
            titre: "Plage de Moya",
            localisation: "Anjouan (Ndzuwani)",
            periode: "Toute l'année",
            acces: "Route du Sud d'Anjouan",
            conseils: "La plus belle plage d'Anjouan, parfaite pour se ressourcer",
            contact: "Office Tourisme Anjouan",
            hotel: "Hôtel Al-Amal",
            hotelLoc: "Mutsamudu (Transit)",
            hotelFonct: "Le meilleur confort d'Anjouan",
            hotelContact: "+269 771 12 12",
            hotelRestau: "Gastronomie locale parfumée",
            guide: "Ahmed Anjouan",
            guideContact: "ahmed@visitafrika.com"
        },
        iconi: {
            titre: "Iconi",
            localisation: "Sud de Moroni",
            periode: "Toute l'année",
            acces: "Taxi (5 min)",
            conseils: "Ancienne cité royale, visitez les falaises des femmes d'Iconi",
            contact: "Sages du village",
            hotel: "Hôtels de Moroni",
            hotelLoc: "Moroni",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        chomoni: {
            titre: "Chomoni",
            localisation: "Côte Est de la Grande Comore",
            periode: "Toute l'année",
            acces: "Route côtière",
            conseils: "Sable blanc éclatant sur roche volcanique noire, très photogénique",
            contact: "N/A",
            hotel: "Pensions de famille",
            hotelLoc: "Chomoni",
            hotelFonct: "Authentique",
            hotelContact: "N/A",
            hotelRestau: "Plats typiques",
            guide: "N/A",
            guideContact: "N/A"
        },
        fomboni: {
            titre: "Fomboni",
            localisation: "Capitale de Mohéli",
            periode: "Toute l'année",
            acces: "Arrivée des vols/bateaux",
            conseils: "Ville paisible, découvrez le marché local et le calme ambiant",
            contact: "Gouvernorat de Mohéli",
            hotel: "Moili Hotel",
            hotelLoc: "Fomboni",
            hotelFonct: "Simple et central",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine mohélienne",
            guide: "Bakari Tortue",
            guideContact: "bakari@visitafrika.com"
        },
        muri: {
            titre: "Chute de Muri",
            localisation: "Hauts d'Anjouan",
            periode: "Après la saison des pluies",
            acces: "Randonnée (Guide nécessaire)",
            conseils: "Cascade nichée dans une végétation luxuriante",
            contact: "Guides de Ndzuwani",
            hotel: "Hôtel Al-Amal",
            hotelLoc: "Mutsamudu",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Anjouan",
            guideContact: "ahmed@visitafrika.com"
        },
        bambao: {
            titre: "Bambao",
            localisation: "Anjouan",
            periode: "Toute l'année",
            acces: "Route côtière",
            conseils: "Région fertile célèbre pour ses plantations de Ylang-Ylang",
            contact: "Distilleries locales",
            hotel: "N/A",
            hotelLoc: "Mutsamudu (base)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        mutsamudu: {
            titre: "Mutsamudu",
            localisation: "Capitale d'Anjouan",
            periode: "Toute l'année",
            acces: "Port principal d'Anjouan",
            conseils: "Perdez-vous dans la Médina (vieille ville) et visitez la Citadelle",
            contact: "Mairie de Mutsamudu",
            hotel: "Hôtel Al-Amal",
            hotelLoc: "Bord de mer",
            hotelFonct: "Surplombe le port",
            hotelContact: "+269 771 12 12",
            hotelRestau: "Restaurant panoramique",
            guide: "Ahmed Anjouan",
            guideContact: "ahmed@visitafrika.com"
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
                    <i class="fas fa-plane"></i>
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser ma visite</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="15" value="2" required>
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
                Demande envoyée ! Nos experts comoriens vous contacteront.
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
