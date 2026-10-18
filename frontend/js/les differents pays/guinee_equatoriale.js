/**
 * PROJET: VISIT AFRIKA
 * FICHIER: guinee_equatoriale.js
 * DESCRIPTION: Script premium pour la page Guinée Équatoriale.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Guinée Équatoriale chargé.");

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
                    // Centrer sur la Guinée Équatoriale (Bioko et Continent)
                    map = L.map('guineeequatoriale-map').setView([1.6508, 10.2679], 8);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Basilique de Mongomo", lat: 1.63, lng: 11.33 },
                        { name: "Malabo (Cathédrale & Centre)", lat: 3.75, lng: 8.78 },
                        { name: "Pico Basile", lat: 3.63, lng: 8.76 },
                        { name: "Parc National de Monte Alén", lat: 1.65, lng: 10.30 },
                        { name: "Île d'Annobón", lat: -1.43, lng: 5.63 },
                        { name: "Île de Corisco", lat: 0.92, lng: 9.32 },
                        { name: "Luba (Bioko)", lat: 3.45, lng: 8.55 },
                        { name: "Moca (Vallée & Lacs)", lat: 3.35, lng: 8.67 },
                        { name: "Bata (Front de mer)", lat: 1.86, lng: 9.76 },
                        { name: "Mongomo (Ville)", lat: 1.62, lng: 11.31 },
                        { name: "Djibloho (Ville nouvelle)", lat: 1.59, lng: 10.85 },
                        { name: "Evayong (Culture)", lat: 1.45, lng: 10.55 },
                        { name: "Ebo-Yey", lat: 1.75, lng: 11.10 },
                        { name: "Mbini (Estuaire)", lat: 1.58, lng: 9.61 },
                        { name: "Cocobeach (Frontière)", lat: 1.00, lng: 9.60 }
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
        basilique_mongomo: {
            titre: "Basilique de Mongomo",
            localisation: "Mongomo, Province de Wele-Nzas",
            periode: "Toute l'année",
            acces: "Route bitumée moderne depuis Bata",
            conseils: "La deuxième plus grande église d'Afrique, architecture néo-gothique impressionnante",
            contact: "Diocèse de Mongomo",
            hotel: "Grand Hotel Mongomo",
            hotelLoc: "Centre-ville Mongomo",
            hotelFonct: "Hôtel de luxe, confort international",
            hotelContact: "+240 333 091 000",
            hotelRestau: "Gastronomie espagnole et équato-guinéenne",
            guide: "Teodoro Obiang Jr",
            guideContact: "teodoro@visitafrika.com"
        },
        malabo: {
            titre: "Malabo (Centre Historique)",
            localisation: "Île de Bioko",
            periode: "Toute l'année",
            acces: "Aéroport international de Malabo",
            conseils: "Visitez la cathédrale Santa Isabel et promenez-vous sur le Paseo Marítimo",
            contact: "Office du Tourisme de Malabo",
            hotel: "Sofitel Malabo Sipopo Le Golf",
            hotelLoc: "Sipopo, Malabo",
            hotelFonct: "Resort de luxe avec plage privée et golf",
            hotelContact: "+240 333 090 000",
            hotelRestau: "Cuisine française et locale",
            guide: "Rosa Nchama",
            guideContact: "rosa@visitafrika.com"
        },
        pico_basile: {
            titre: "Pico Basile",
            localisation: "Île de Bioko (Nord)",
            periode: "Saison sèche (Décembre à Février)",
            acces: "Route de montagne escarpée (Autorisation requise)",
            conseils: "Sommet de 3011m avec vue sur le Mont Cameroun par temps clair",
            contact: "Garde du Parc Pico Basile",
            hotel: "Hôtels de Malabo",
            hotelLoc: "Malabo (base)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide spécialisé montagne",
            guideContact: "Via agence à Malabo"
        },
        parc_monte_alen: {
            titre: "Parc National de Monte Alén",
            localisation: "Continent (Centre-Sud)",
            periode: "Novembre à Mars",
            acces: "Route depuis Bata",
            conseils: "Observation des gorilles, chimpanzés et éléphants de forêt. Trekking exigeant",
            contact: "ECOFAC / IBAP",
            hotel: "Hotel Monte Alén",
            hotelLoc: "Dans le parc",
            hotelFonct: "Lodge rustique en pleine forêt tropicale",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine de brousse locale",
            guide: "Ranger du parc Monte Alén",
            guideContact: "Obligatoire"
        },
        annobon: {
            titre: "Île d'Annobón",
            localisation: "Océan Atlantique (Sud)",
            periode: "Toute l'année",
            acces: "Vol interne (rare) ou bateau",
            conseils: "Île isolée d'origine volcanique, culture unique et baleines en saison (juillet-sept)",
            contact: "Gouvernorat d'Annobón",
            hotel: "N/A (Logement chez l'habitant)",
            hotelLoc: "San Antonio de Palé",
            hotelFonct: "Authentique et simple",
            hotelContact: "Sur place",
            hotelRestau: "Poissons d'exception",
            guide: "N/A",
            guideContact: "N/A"
        },
        corisco: {
            titre: "Île de Corisco",
            localisation: "Sud du pays (Estuaire du Muni)",
            periode: "Toute l'année",
            acces: "Bateau depuis Cogo ou vol privé",
            conseils: "Plages de sable blanc immaculé, eaux cristallines et calme absolu",
            contact: "N/A",
            hotel: "Campement de Corisco",
            hotelLoc: "Plage principale",
            hotelFonct: "Hébergement de plage basique",
            hotelContact: "N/A",
            hotelRestau: "Barbecue de mer",
            guide: "N/A",
            guideContact: "N/A"
        },
        luba: {
            titre: "Luba",
            localisation: "Bioko (Ouest)",
            periode: "Toute l'année",
            acces: "Route côtière depuis Malabo (1h)",
            conseils: "Deuxième ville de l'île, point de départ vers les cascades de Moca",
            contact: "Mairie de Luba",
            hotel: "Hôtels de Malabo",
            hotelLoc: "Malabo (base)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Cuisine de port",
            guide: "Rosa Nchama",
            guideContact: "rosa@visitafrika.com"
        },
        moca: {
            titre: "Vallée de Moca",
            localisation: "Hauts plateaux de Bioko",
            periode: "Saison sèche",
            acces: "Route de montagne",
            conseils: "Visitez le lac Biao et le lac Loreto dans des cratères volcaniques",
            contact: "N/A",
            hotel: "Hébergements de Luba",
            hotelLoc: "Luba",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Rosa Nchama",
            guideContact: "rosa@visitafrika.com"
        },
        bata: {
            titre: "Bata",
            localisation: "Continent (Littoral)",
            periode: "Toute l'année",
            acces: "Aéroport de Bata / Port",
            conseils: "Plus grande ville du pays, profitez de la longue promenade en bord de mer",
            contact: "Bureau du Tourisme Continental",
            hotel: "Hotel Panafrica",
            hotelLoc: "Bata, Front de mer",
            hotelFonct: "Hôtel historique avec piscine olympique",
            hotelContact: "+240 333 082 000",
            hotelRestau: "Restaurant panoramique",
            guide: "Teodoro Obiang Jr",
            guideContact: "teodoro@visitafrika.com"
        },
        mongomo: {
            titre: "Mongomo (Ville)",
            localisation: "Est continental",
            periode: "Toute l'année",
            acces: "Autoroute depuis Bata",
            conseils: "Ville moderne en pleine jungle, centre politique important",
            contact: "Mairie de Mongomo",
            hotel: "Grand Hotel Mongomo",
            hotelLoc: "Centre",
            hotelFonct: "Luxe",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Teodoro Obiang Jr",
            guideContact: "teodoro@visitafrika.com"
        },
        djibloho: {
            titre: "Djibloho (Ciudad de la Paz)",
            localisation: "Cœur du continent",
            periode: "Toute l'année",
            acces: "Autoroute Bata-Mongomo",
            conseils: "La future capitale administrative construite au milieu de la forêt",
            contact: "N/A",
            hotel: "Grand Hotel Djibloho",
            hotelLoc: "Djibloho",
            hotelFonct: "Le nec plus ultra du luxe au cœur de la jungle",
            hotelContact: "+240 333 200 000",
            hotelRestau: "Haute gastronomie",
            guide: "Teodoro Obiang Jr",
            guideContact: "teodoro@visitafrika.com"
        },
        evayong: {
            titre: "Evayong",
            localisation: "Centre continental",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Point stratégique pour découvrir la culture Fang",
            contact: "N/A",
            hotel: "N/A",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        ebo_yey: {
            titre: "Ebo-Yey",
            localisation: "Proche Mongomo",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Petite ville dynamique montrant le développement rural",
            contact: "N/A",
            hotel: "Hébergements de Mongomo",
            hotelLoc: "Mongomo",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        mbini: {
            titre: "Mbini",
            localisation: "Sud de Bata (Embouchure du fleuve Wele)",
            periode: "Toute l'année",
            acces: "Route côtière Sud",
            conseils: "Admirez le pont suspendu géant au-dessus de l'estuaire",
            contact: "N/A",
            hotel: "Hôtel Playa de Mbini",
            hotelLoc: "Bord de mer",
            hotelFonct: "Simple, vue imprenable sur l'embouchure",
            hotelContact: "Sur place",
            hotelRestau: "Poisson et crevettes de rivière",
            guide: "N/A",
            guideContact: "N/A"
        },
        cocobeach: {
            titre: "Cocobeach",
            localisation: "Frontière Sud avec le Gabon",
            periode: "Toute l'année",
            acces: "Route / Bateau",
            conseils: "Point de transit animé, atmosphère de frontière tropicale",
            contact: "N/A",
            hotel: "N/A",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser ma visite</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="15" value="1" required>
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
                Demande envoyée ! Nos experts équato-guinéens vous contacteront.
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
