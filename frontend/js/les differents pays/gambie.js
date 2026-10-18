/**
 * PROJET: VISIT AFRIKA
 * FICHIER: gambie.js
 * DESCRIPTION: Script premium pour la Gambie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Gambie chargé.");

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
                    // Centrer sur la Gambie
                    map = L.map('gambie-map').setView([13.4432, -15.3101], 8);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Kuntaur (River Trips)", lat: 13.67, lng: -14.88 },
                        { name: "Wasu Stone Circles (UNESCO)", lat: 13.69, lng: -14.87 },
                        { name: "Réserve d'Abuko", lat: 13.40, lng: -16.65 },
                        { name: "Kunta Kinteh Island", lat: 13.31, lng: -16.36 },
                        { name: "Banjul (Capitale)", lat: 13.45, lng: -16.58 },
                        { name: "Bijilo Monkey Park", lat: 13.44, lng: -16.73 },
                        { name: "Makasutu Cultural Forest", lat: 13.31, lng: -16.59 },
                        { name: "Kachikally Crocodile Pool", lat: 13.48, lng: -16.67 },
                        { name: "Tanji (Village de pêche)", lat: 13.36, lng: -16.79 },
                        { name: "River Gambia National Park", lat: 13.61, lng: -14.95 },
                        { name: "Bakau", lat: 13.48, lng: -16.68 },
                        { name: "Serrekunda", lat: 13.44, lng: -16.68 },
                        { name: "Brufut Heights", lat: 13.38, lng: -16.75 },
                        { name: "Gunjur", lat: 13.18, lng: -16.76 },
                        { name: "Kartong", lat: 13.08, lng: -16.76 }
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
        "kunat-ur": {
            titre: "Kuntaur",
            localisation: "Central River Division",
            periode: "Novembre à Mars",
            acces: "Route depuis Banjul (4h) ou bateau",
            conseils: "Point de départ idéal pour explorer le fleuve Gambie et observer les hippopotames et les chimpanzés sur l'île Baboon",
            contact: "Gambia Tourism Board",
            hotel: "Kuntaur River Camp",
            hotelLoc: "Bord du fleuve, Kuntaur",
            hotelFonct: "Campement écologique, immersion totale dans la nature",
            hotelContact: "+220 77 66 55 44",
            hotelRestau: "Cuisine locale (Benachin)",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        wasu_circles: {
            titre: "Cercles de pierres de Wasu",
            localisation: "Près de Kuntaur",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Site mégalithique UNESCO mystérieux, témoignage d'une civilisation ancienne de l'Afrique de l'Ouest",
            contact: "NCAC (National Centre for Arts and Culture)",
            hotel: "Hébergements à Kuntaur",
            hotelLoc: "Kuntaur",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        abuko_nature_reserve: {
            titre: "Réserve d'Abuko",
            localisation: "Serekunda / Kanifing",
            periode: "Toute l'année",
            acces: "Facile, taxi depuis la côte",
            conseils: "La plus ancienne réserve de Gambie. Parfait pour les ornithologues et pour voir des singes et des antilopes",
            contact: "Department of Parks and Wildlife",
            hotel: "Hôtels de la côte (Senegambia)",
            hotelLoc: "Senegambia Area",
            hotelFonct: "Large choix de resorts",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        kunta_kinteh_island: {
            titre: "Île Kunta Kinteh (James Island)",
            localisation: "Fleuve Gambie (Près de Juffureh)",
            periode: "Toute l'année",
            acces: "Bateau depuis Albreda/Juffureh",
            conseils: "Site historique UNESCO lié à la traite transatlantique et au célèbre roman 'Roots'",
            contact: "Museum of Albreda",
            hotel: "Albreda Lodge",
            hotelLoc: "Albreda",
            hotelFonct: "Charmant et historique",
            hotelContact: "+220 33 22 11 00",
            hotelRestau: "Cuisine traditionnelle",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        banjul_city: {
            titre: "Banjul",
            localisation: "Île Sainte-Marie (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international de Banjul (BJL)",
            conseils: "Visitez l'Arc 22 pour une vue panoramique et perdez-vous dans le marché Albert",
            contact: "Gambia Tourism Board Banjul",
            hotel: "Atlantic Hotel",
            hotelLoc: "Marina Parade, Banjul",
            hotelFonct: "Hôtel classique en front de mer avec jardins tropicaux",
            hotelContact: "+220 422 8601",
            hotelRestau: "International et Local",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        bijilo_monkey_park: {
            titre: "Bijilo Monkey Park",
            localisation: "Kololi / Senegambia",
            periode: "Toute l'année",
            acces: "À pied depuis la zone hôtelière de Senegambia",
            conseils: "Réserve forestière côtière. Apportez des cacahuètes pour nourrir les colobes rouges et les vervets",
            contact: "N/A",
            hotel: "Senegambia Beach Hotel",
            hotelLoc: "Kololi",
            hotelFonct: "Le plus grand et célèbre hôtel de Gambie",
            hotelContact: "+220 446 2717",
            hotelRestau: "Multiple restaurants",
            guide: "N/A",
            guideContact: "N/A"
        },
        makasutu_culture_forest: {
            titre: "Makasutu Cultural Forest",
            localisation: "Près de Brikama",
            periode: "Toute l'année",
            acces: "Route puis piste",
            conseils: "Forêt sacrée aux multiples écosystèmes. Balade en pirogue dans les mangroves recommandée",
            contact: "Makasutu Management",
            hotel: "Mandina Lodges",
            hotelLoc: "Makasutu",
            hotelFonct: "Lodges flottants ou sur pilotis, luxe absolu et sérénité",
            hotelContact: "+220 99 64 321",
            hotelRestau: "Gastronomie bio",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        kachikally_crocodile_pool: {
            titre: "Kachikally Crocodile Pool",
            localisation: "Bakau",
            periode: "Toute l'année",
            acces: "Taxi depuis la côte",
            conseils: "Lieu sacré où les crocodiles sont si dociles qu'on peut les toucher. Site lié à la fertilité",
            contact: "N/A",
            hotel: "Ocean Bay Resort",
            hotelLoc: "Cape Point, Bakau",
            hotelFonct: "Luxueux resort en bord de mer",
            hotelContact: "+220 449 5426",
            hotelRestau: "Spécialités de poissons",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        tanji_fishing_village: {
            titre: "Tanji (Village de pêche)",
            localisation: "Côte Atlantique",
            periode: "Fin d'après-midi (Retour des bateaux)",
            acces: "Route côtière",
            conseils: "Spectacle coloré et animé de l'arrivée des pirogues de pêche. Visitez le musée du village",
            contact: "Tanji Village Museum",
            hotel: "Tanji Bird Reserve Lodge",
            hotelLoc: "Tanji",
            hotelFonct: "Eco-lodge tourné vers l'ornithologie",
            hotelContact: "Sur place",
            hotelRestau: "Poissons frais du jour",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        river_gambia_national_park: {
            titre: "River Gambia National Park",
            localisation: "Central River Division (Baboon Islands)",
            periode: "Novembre à Mai",
            acces: "Bateau uniquement",
            conseils: "Découvrez le projet de réhabilitation des chimpanzés. Navigation au milieu des îles vierges",
            contact: "Wildlife Conservation Project",
            hotel: "Chimpanzee Rehabilitation Camp",
            hotelLoc: "Dans le parc",
            hotelFonct: "Campement de recherche ouvert aux visiteurs, très exclusif",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine commune conviviale",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        bakau: {
            titre: "Bakau",
            localisation: "Côte Ouest",
            periode: "Toute l'année",
            acces: "Taxi",
            conseils: "Quartier résidentiel et touristique, célèbre pour son marché artisanal et son jardin botanique",
            contact: "N/A",
            hotel: "African Village Hotel",
            hotelLoc: "Bakau Cliffs",
            hotelFonct: "Charme traditionnel sur les falaises",
            hotelContact: "+220 449 5034",
            hotelRestau: "Cuisine gambienne",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        serrekunda: {
            titre: "Serrekunda",
            localisation: "Plus grande ville du pays",
            periode: "Toute l'année",
            acces: "Cœur urbain",
            conseils: "Immersion dans la vie locale trépidante au marché de Serekunda",
            contact: "N/A",
            hotel: "Hôtels de Kololi (proximité)",
            hotelLoc: "Kololi",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Street food locale savoureuse",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        brufut_heights: {
            titre: "Brufut Heights",
            localisation: "Côte Sud-Ouest",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Plages plus calmes et falaises offrant une vue magnifique sur l'océan. Idéal pour le birdwatching",
            contact: "N/A",
            hotel: "Leo's Beach Hotel",
            hotelLoc: "Brufut",
            hotelFonct: "Boutique hôtel de luxe, moderne et réservé aux adultes",
            hotelContact: "+220 721 1133",
            hotelRestau: "Gastronomie fusion européenne",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        gunjur: {
            titre: "Gunjur",
            localisation: "Côte Sud",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Village de pêcheurs traditionnel et centre de conservation des tortues",
            contact: "Gunjur Conservation Group",
            hotel: "The Gunjur Project Lodge",
            hotelLoc: "Gunjur",
            hotelFonct: "Eco-lodge tourné vers la communauté",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale bio",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
        },
        kartong: {
            titre: "Kartong",
            localisation: "Extrême Sud (Frontière Sénégal)",
            periode: "Toute l'année",
            acces: "Dernier village de la côte",
            conseils: "Ambiance paisible de bout du monde. Visitez la mine de sable réhabilitée en sanctuaire d'oiseaux",
            contact: "Kartong Ecotourism",
            hotel: "Sandele Eco-Retreat",
            hotelLoc: "Kartong Beach",
            hotelFonct: "Retraite écologique primée, primauté au durable",
            hotelContact: "+220 706 7254",
            hotelRestau: "Alimentation saine et locale",
            guide: "Lamin Touray",
            guideContact: "lamin@visitafrika.com"
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
                        <input type="number" name="personnes" min="1" max="12" value="2" required>
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
                Demande envoyée ! Nos experts gambiens vous contacteront.
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
