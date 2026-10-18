/**
 * PROJET: VISIT AFRIKA
 * FICHIER: tanzanie.js
 * DESCRIPTION: Script premium pour la Tanzanie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Tanzanie chargé.");

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
                    // Centrer sur la Tanzanie
                    map = L.map('tanzanie-map').setView([-6.369, 34.8888], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National du Serengeti", lat: -2.33, lng: 34.83 },
                        { name: "Cratère du Ngorongoro", lat: -3.24, lng: 35.48 },
                        { name: "Mont Kilimandjaro", lat: -3.06, lng: 37.35 },
                        { name: "Zanzibar (Stone Town)", lat: -6.16, lng: 39.20 },
                        { name: "Lac Manyara", lat: -3.58, lng: 35.80 },
                        { name: "Parc National de Tarangire", lat: -3.95, lng: 36.05 },
                        { name: "Réserve de Selous (Nyerere NP)", lat: -9.00, lng: 37.50 },
                        { name: "Parc National de Ruaha", lat: -7.50, lng: 34.50 },
                        { name: "Monts Mahale (Chimpanzés)", lat: -6.20, lng: 29.80 },
                        { name: "Gombe Stream", lat: -4.68, lng: 29.63 },
                        { name: "Lac Natron (Flamants)", lat: -2.41, lng: 36.00 },
                        { name: "Lac Eyasi (Hadzabe)", lat: -3.58, lng: 35.05 },
                        { name: "Mafia Island", lat: -7.85, lng: 39.80 },
                        { name: "Pemba Island", lat: -5.18, lng: 39.75 },
                        { name: "Dar es Salaam", lat: -6.79, lng: 39.27 }
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
        serengeti: {
            titre: "Parc National du Serengeti",
            localisation: "Nord de la Tanzanie",
            periode: "Juin à Juillet (Grande Migration) ou Janvier-Février (Naissance)",
            acces: "Vol charter vers Seronera ou 8h de route depuis Arusha",
            conseils: "Le théâtre de la vie sauvage. Assistez à la migration des gnous et admirez les prédateurs en pleine action dans les plaines sans fin",
            contact: "TANAPA (Tanzania National Parks)",
            hotel: "Four Seasons Safari Lodge Serengeti",
            hotelLoc: "Seronera",
            hotelFonct: "Luxe absolu avec piscine surplombant un point d'eau fréquenté par les éléphants",
            hotelContact: "+255 27 297 1000",
            hotelRestau: "Maji Bar and Grill",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        ngorongoro: {
            titre: "Zone de conservation du Ngorongoro",
            localisation: "Rift Valley (Nord)",
            periode: "Toute l'année",
            acces: "4x4 depuis Arusha (3-4h)",
            conseils: "Le 'Huitième Merveille du Monde'. Un écosystème unique dans une caldeira intacte abritant les 'Big Five' dans un espace restreint",
            contact: "NCAA (Ngorongoro Conservation Area Authority)",
            hotel: "andBeyond Ngorongoro Crater Lodge",
            hotelLoc: "Bordure du cratère",
            hotelFonct: "Architecture baroque-africaine spectaculaire avec la meilleure vue sur le cratère",
            hotelContact: "+255 27 253 7000",
            hotelRestau: "Gastronomie de haut vol",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        kilimandjaro: {
            titre: "Mont Kilimandjaro",
            localisation: "Moshi (Nord-Est)",
            periode: "Janvier-Mars ou Juin-Octobre",
            acces: "Aéroport international Kilimandjaro (JRO)",
            conseils: "Toit de l'Afrique (5895m). Choisissez une route plus longue (Lemosho ou Machame) pour une meilleure acclimatation",
            contact: "TANAPA Kilimanjaro",
            hotel: "Kilimanjaro Wonders Hotel",
            hotelLoc: "Moshi",
            hotelFonct: "Hôtel moderne, base idéale pour les randonneurs avant et après l'ascension",
            hotelContact: "+255 27 275 1111",
            hotelRestau: "Cuisine locale et internationale",
            guide: "Expert montagne TANAPA",
            guideContact: "Sur place"
        },
        zanzibar_stone_town: {
            titre: "Zanzibar (Stone Town)",
            localisation: "Archipel de Zanzibar (Unguja)",
            periode: "Toute l'année (Sauf Avril-Mai)",
            acces: "Vol international ou Ferry depuis Dar es Salaam",
            conseils: "Perdez-vous dans le labyrinthe de ruelles historiques. Visitez le palais du Sultan et profitez du marché nocturne de Forodhani",
            contact: "Zanzibar Tourism Commission",
            hotel: "Park Hyatt Zanzibar",
            hotelLoc: "Front de mer, Stone Town",
            hotelFonct: "Luxe historique dans un bâtiment classé UNESCO",
            hotelContact: "+255 24 550 1234",
            hotelRestau: "The Dining Room",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        lac_manyara: {
            titre: "Parc National du Lac Manyara",
            localisation: "Sur la route du Ngorongoro",
            periode: "Juillet à Octobre",
            acces: "Route (2h d'Arusha)",
            conseils: "Célèbre pour ses lions qui grimpent aux arbres et ses milliers de flamants roses sur le lac alcalin",
            contact: "TANAPA Manyara",
            hotel: "Lake Manyara Tree Lodge",
            hotelLoc: "Dans une forêt de mahogany",
            hotelFonct: "Seul lodge situé à l'intérieur du parc, suites perchées dans les arbres",
            hotelContact: "+255 27 250 8285",
            hotelRestau: "Dîners romantiques en brousse",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        tarangire: {
            titre: "Parc National de Tarangire",
            localisation: "Nord de la Tanzanie",
            periode: "Saison sèche (Juin à Octobre)",
            acces: "Route (2h d'Arusha)",
            conseils: "La terre des géants. D'immenses troupeaux d'éléphants et de majestueux baobabs le long de la rivière Tarangire",
            contact: "TANAPA Tarangire",
            hotel: "Tarangire Treetops",
            hotelLoc: "Concession privée limitrophe",
            hotelFonct: "Chambres spacieuses construites autour de baobabs millénaires",
            hotelContact: "+255 27 250 0630",
            hotelRestau: "Fine dining",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        selous: {
            titre: "Réserve de Selous (Nyerere National Park)",
            localisation: "Sud de la Tanzanie",
            periode: "Juin à Octobre",
            acces: "Vol charter depuis Dar es Salaam (45 min)",
            conseils: "Safari en bateau sur le fleuve Rufiji. Une expérience sauvage et moins fréquentée que le Nord",
            contact: "TAWA (Tanzania Wildlife Management Authority)",
            hotel: "Beho Beho",
            hotelLoc: "Collines de Beho Beho",
            hotelFonct: "Lodge de luxe pionnier, ambiance maison de brousse",
            hotelContact: "Via agence",
            hotelRestau: "Table d'hôte d'exception",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        ruaha: {
            titre: "Parc National de Ruaha",
            localisation: "Sud (Près d'Iringa)",
            periode: "Saison sèche",
            acces: "Vol charter",
            conseils: "Paysages spectaculaires et forte concentration de lions. Un joyau caché pour les puristes du safari",
            contact: "TANAPA Ruaha",
            hotel: "Jabali Ridge",
            hotelLoc: "Entre les kopjes de Ruaha",
            hotelFonct: "Lodge sophistiqué au design organique intégré dans les rochers",
            hotelContact: "+255 73 650 0015",
            hotelRestau: "Cuisine fusion moderne",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        mahale: {
            titre: "Monts Mahale",
            localisation: "Rives du Lac Tanganyika",
            periode: "Mai à Octobre",
            acces: "Vol charter puis bateau",
            conseils: "Le meilleur endroit au monde pour observer les chimpanzés sauvages. Plages de sable blanc au bord d'un lac cristallin",
            contact: "TANAPA Mahale",
            hotel: "Greystoke Mahale",
            hotelLoc: "Plage de Kangwena",
            hotelFonct: "Campement iconique aux structures de chaume exotiques, luxe sauvage",
            hotelContact: "Via Nomad Tanzania",
            hotelRestau: "Sashimi de poisson du lac",
            guide: "Expert primates TANAPA",
            guideContact: "Sur place"
        },
        gombe: {
            titre: "Gombe Stream National Park",
            localisation: "Nord du Lac Tanganyika",
            periode: "Toute l'année",
            acces: "Bateau depuis Kigoma",
            conseils: "Lieu des recherches pionnières de Jane Goodall sur les chimpanzés",
            contact: "Jane Goodall Institute",
            hotel: "Kigoma Hilltop Hotel",
            hotelLoc: "Kigoma",
            hotelFonct: "Hôtel avec vue sur le lac, base pour Gombe",
            hotelContact: "+255 28 280 4435",
            hotelRestau: "Poissons du lac",
            guide: "Guide naturaliste Gombe",
            guideContact: "Sur place"
        },
        lac_natron: {
            titre: "Lac Natron",
            localisation: "Près du volcan Ol Doinyo Lengai",
            periode: "Saison de reproduction des flamants",
            acces: "4x4 difficile",
            conseils: "Paysage volcanique surréaliste, lac rouge et sanctuaire de reproduction des flamants mineurs",
            contact: "N/A",
            hotel: "Lake Natron Camp",
            hotelLoc: "Bord du lac",
            hotelFonct: "Campement de tentes éco-luxe, base pour l'ascension du volcan",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine de camp soignée",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        lac_eyasi: {
            titre: "Lac Eyasi",
            localisation: "Sud du Ngorongoro",
            periode: "Toute l'année",
            acces: "4x4",
            conseils: "Rencontre culturelle unique avec les tribus Hadzabe (chasseurs-cueilleurs) et Datoga",
            contact: "N/A",
            hotel: "Kisima Ngeda Camp",
            hotelLoc: "Bord du lac Eyasi",
            hotelFonct: "Charmant campement familial géré par des locaux",
            hotelContact: "Sur place",
            hotelRestau: "Produits de la ferme",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        mafia_island: {
            titre: "Mafia Island",
            localisation: "Sud de Zanzibar",
            periode: "Octobre à Mars (Requins baleines)",
            acces: "Vol charter de Dar es Salaam",
            conseils: "Parc marin exceptionnel, idéal pour la plongée sous-marine loin du tourisme de masse",
            contact: "Mafia Island Marine Park",
            hotel: "Pole Pole Bungalows",
            hotelLoc: "Parc marin de Mafia",
            hotelFonct: "Lodge éco-luxe intimiste, détente absolue",
            hotelContact: "Sur place",
            hotelRestau: "Gastronomie italienne-mauricienne",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        pemba_island: {
            titre: "Pemba Island (L'île verte)",
            localisation: "Nord de Zanzibar",
            periode: "Juillet à Mars",
            acces: "Vol charter",
            conseils: "Célèbre pour ses plantations de clous de girofle et ses récifs coralliens intacts",
            contact: "N/A",
            hotel: "The Manta Resort",
            hotelLoc: "Pointe Nord de Pemba",
            hotelFonct: "Célèbre pour sa chambre sous-marine unique au monde",
            hotelContact: "+255 77 671 8852",
            hotelRestau: "Produits locaux frais",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
        },
        dar_es_salaam: {
            titre: "Dar es Salaam",
            localisation: "Côte Ouest (Capitale économique)",
            periode: "Toute l'année",
            acces: "Aéroport international Julius Nyerere (DAR)",
            conseils: "Visitez le marché aux poissons de Kivukoni et profitez de la vie nocturne à la péninsule de Msasani",
            contact: "Dar Tourism",
            hotel: "The Oyster Bay",
            hotelLoc: "Msasani Peninsula",
            hotelFonct: "Boutique hôtel de luxe, atmosphère familiale et chic",
            hotelContact: "+255 22 260 0352",
            hotelRestau: "Cuisine fusion",
            guide: "Zuberi Juma",
            guideContact: "zuberi@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon safari</h4>
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
                Demande envoyée ! Nos experts tanzaniens vous contacteront.
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
