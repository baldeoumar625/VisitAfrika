/**
 * PROJET: VISIT AFRIKA
 * FICHIER: republique_centrafricaine.js
 * DESCRIPTION: Script premium pour la page République Centrafricaine.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script RCA chargé.");

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
                    // Centrer sur la RCA
                    map = L.map('rca-map').setView([6.6, 20.9], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Bangui (Musée Boganda)", lat: 4.36, lng: 18.58 },
                        { name: "Parc Dzanga-Ndoki", lat: 3.0, lng: 16.3 },
                        { name: "Chutes de Boali", lat: 4.8, lng: 18.1 },
                        { name: "Dzanga-Sangha", lat: 2.9, lng: 16.2 },
                        { name: "Bangassou", lat: 4.74, lng: 22.82 },
                        { name: "Cathédrale de Bangui", lat: 4.37, lng: 18.57 },
                        { name: "Fleuve Oubangui", lat: 4.3, lng: 18.6 },
                        { name: "M'Baïki", lat: 3.87, lng: 17.98 },
                        { name: "Gorges de Kotto", lat: 4.4, lng: 21.9 },
                        { name: "Parc d'André-Félix", lat: 9.5, lng: 23.3 },
                        { name: "Mégalithes de Bouar", lat: 5.95, lng: 15.6 },
                        { name: "Birao", lat: 10.28, lng: 22.78 },
                        { name: "Le Tata de N'Délé", lat: 8.41, lng: 20.65 },
                        { name: "Bria", lat: 6.54, lng: 21.99 },
                        { name: "Berberati", lat: 4.26, lng: 15.79 }
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
        boganda_museum: {
            titre: "Musée Barthélémy Boganda",
            localisation: "Bangui, Centre-ville",
            periode: "Toute l'année",
            acces: "Taxi ou marche depuis le centre",
            conseils: "Découvrez les instruments de musique et l'art pygmée",
            contact: "Direction des Musées Centrafricains",
            hotel: "Ledger Plaza Bangui",
            hotelLoc: "Bangui",
            hotelFonct: "Luxe, sécurité, piscine",
            hotelContact: "+236 21 61 00 11",
            hotelRestau: "Gastronomie internationale",
            guide: "Estelle Namngane",
            guideContact: "estelle@visitafrika.com"
        },
        dzanga_ndoki: {
            titre: "Parc National de Dzanga-Ndoki",
            localisation: "Extrême Sud-Ouest",
            periode: "Novembre à Mars (Saison sèche)",
            acces: "Petit avion depuis Bangui ou 4x4 (2 jours)",
            conseils: "Observation des gorilles de plaine et éléphants au baï",
            contact: "WWF Dzanga-Sangha",
            hotel: "Sangha Lodge",
            hotelLoc: "Bayanga",
            hotelFonct: "Ecolodge de classe mondiale en forêt",
            hotelContact: "info@sanghalodge.com",
            hotelRestau: "Cuisine locale et européenne",
            guide: "Jean-Pierre Ziba",
            guideContact: "jean@visitafrika.com"
        },
        boali: {
            titre: "Chutes de Boali",
            localisation: "90 km au nord-ouest de Bangui",
            periode: "Juillet à Octobre (débit maximum)",
            acces: "Route bitumée (1h30 depuis Bangui)",
            conseils: "Visitez le site un dimanche pour voir l'ouverture des vannes",
            contact: "Office du Tourisme de Boali",
            hotel: "Hôtel des Chutes",
            hotelLoc: "Face aux cascades",
            hotelFonct: "Chambres avec vue imprenable",
            hotelContact: "Sur place",
            hotelRestau: "Spécialité de poisson frais",
            guide: "Guide local sur site",
            guideContact: "Accueil du site"
        },
        sangha: {
            titre: "Réserve de Dzanga-Sangha",
            localisation: "Bayanga",
            periode: "Toute l'année",
            acces: "Avion ou route",
            conseils: "Participez à une chasse au filet avec les Baka",
            contact: "Doli Lodge",
            hotel: "Doli Lodge",
            hotelLoc: "Bord du fleuve Sangha",
            hotelFonct: "Charme rustique, immersion totale",
            hotelContact: "resa@dolilodge.com",
            hotelRestau: "Plats typiques de forêt",
            guide: "Michel M'Baï",
            guideContact: "michel@visitafrika.com"
        },
        bangassou: {
            titre: "Ville de Bangassou",
            localisation: "Sud-Est, sur l'Oubangui",
            periode: "Novembre à Mars",
            acces: "Avion (vols humanitaires/privés) ou route (difficile)",
            conseils: "Visitez la mission catholique historique",
            contact: "Préfecture du Mbomou",
            hotel: "Hôtel JM Residences",
            hotelLoc: "Bangui (Transit)",
            hotelFonct: "Base idéale avant le départ en province",
            hotelContact: "info@jmresidences.com",
            hotelRestau: "Buffet varié",
            guide: "N/A",
            guideContact: "N/A"
        },
        cathedrale_bangui: {
            titre: "Cathédrale Notre-Dame",
            localisation: "Bangui, Avenue Boganda",
            periode: "Toute l'année",
            acces: "Cœur de ville",
            conseils: "Admirez l'architecture en briques rouges apparentes",
            contact: "Diocèse de Bangui",
            hotel: "La Couronne",
            hotelLoc: "Bangui",
            hotelFonct: "Confortable et central",
            hotelContact: "+236 21 61 11 00",
            hotelRestau: "Cuisine africaine",
            guide: "N/A",
            guideContact: "N/A"
        },
        oubangui_river: {
            titre: "Croisière sur l'Oubangui",
            localisation: "Port de Bangui",
            periode: "Saison des pluies pour la navigation",
            acces: "Embarcadère de Bangui",
            conseils: "Prenez une pirogue motorisée au coucher du soleil",
            contact: "Compagnie fluviale locale",
            hotel: "Oubangui Hotel",
            hotelLoc: "Bord du fleuve",
            hotelFonct: "Vue imprenable sur le fleuve",
            hotelContact: "+236 21 61 10 00",
            hotelRestau: "Capitaine grillé (poisson)",
            guide: "Piroguier local",
            guideContact: "Sur place"
        },
        mbaiki: {
            titre: "Forêt de M'Baïki",
            localisation: "Préfecture de la Lobaye",
            periode: "Décembre à Février",
            acces: "Route goudronnée (2h depuis Bangui)",
            conseils: "Rencontrez les communautés Baka en forêt",
            contact: "Mairie de M'Baïki",
            hotel: "Auberge de M'Baïki",
            hotelLoc: "Centre M'Baïki",
            hotelFonct: "Simple et authentique",
            hotelContact: "Sur place",
            hotelRestau: "Plats locaux (Maboké)",
            guide: "Michel M'Baï",
            guideContact: "michel@visitafrika.com"
        },
        kotto_gorges: {
            titre: "Les Gorges de Kotto",
            localisation: "Près de Kembé, Est",
            periode: "Saison sèche (accès)",
            acces: "Route depuis Bangassou",
            conseils: "Prudence près des rapides, site sauvage",
            contact: "Office local du Mbomou",
            hotel: "Hôtel National",
            hotelLoc: "Bangui (Transit)",
            hotelFonct: "Hôtel classique",
            hotelContact: "+236 21 61 22 22",
            hotelRestau: "Brasserie",
            guide: "N/A",
            guideContact: "N/A"
        },
        andrefelix: {
            titre: "Parc d'André-Félix",
            localisation: "Nord-Est",
            periode: "Fermé temporairement (Sécurité)",
            acces: "Piste depuis Birao",
            conseils: "Vérifier la situation sécuritaire avant tout projet",
            contact: "Ministère Eaux et Forêts",
            hotel: "Galaxy Hotel",
            hotelLoc: "Bangui (Transit)",
            hotelFonct: "Confort moderne",
            hotelContact: "+236 21 61 33 33",
            hotelRestau: "Mixte",
            guide: "N/A",
            guideContact: "N/A"
        },
        bouar: {
            titre: "Mégalithes de Bouar",
            localisation: "Nana-Mambéré",
            periode: "Toute l'année",
            acces: "Route bitumée (RN1) depuis Bangui",
            conseils: "Site archéologique majeur, respectez les pierres",
            contact: "Centre Culturel de Bouar",
            hotel: "Missions Catholiques",
            hotelLoc: "Bouar",
            hotelFonct: "Accueil simple et propre",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine familiale",
            guide: "Guide local",
            guideContact: "Sur place"
        },
        birao: {
            titre: "Ville de Birao",
            localisation: "Extrême Nord",
            periode: "Novembre à Mars (Isolé en saison des pluies)",
            acces: "Avion (Piste Birao)",
            conseils: "Zone de transition vers le Sahara",
            contact: "Préfecture de la Vakaga",
            hotel: "Ledger Plaza",
            hotelLoc: "Bangui",
            hotelFonct: "Luxe",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        ndele: {
            titre: "Le Tata de N'Délé",
            localisation: "Nord",
            periode: "Novembre à Mai",
            acces: "Route (piste) ou petit avion",
            conseils: "Visitez le quartier du sultanat historique",
            contact: "Mairie de N'Délé",
            hotel: "Cases de passage",
            hotelLoc: "N'Délé",
            hotelFonct: "Rustique",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale",
            guide: "Sage du village",
            guideContact: "Via la mairie"
        },
        bria: {
            titre: "Ville de Bria",
            localisation: "Est",
            periode: "Saison sèche",
            acces: "Piste ou avion",
            conseils: "Cœur de la région diamantifère",
            contact: "Préfecture de la Haute-Kotto",
            hotel: "Galaxy Hotel",
            hotelLoc: "Bangui",
            hotelFonct: "Moderne",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        berberati: {
            titre: "Ville de Berberati",
            localisation: "Ouest",
            periode: "Toute l'année",
            acces: "Bonne route depuis Bangui ou avion",
            conseils: "Deuxième ville économique du pays",
            contact: "Mairie de Berberati",
            hotel: "Hôtel des Ambassadeurs",
            hotelLoc: "Berberati",
            hotelFonct: "Correct pour la province",
            hotelContact: "Sur place",
            hotelRestau: "Plats centrafricains",
            guide: "N/A",
            guideContact: "N/A"
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
                    <i class="fas fa-car"></i>
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
                    <h4><i class="fas fa-calendar-alt"></i> Planifier mon séjour</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="20" value="1" required>
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
                Demande envoyée ! Nos experts centrafricains vous contacteront.
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
