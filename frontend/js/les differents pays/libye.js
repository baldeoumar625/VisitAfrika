/**
 * PROJET: VISIT AFRIKA
 * FICHIER: libye.js
 * DESCRIPTION: Script premium pour la page Libye.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Libye chargé.");

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
                    // Centrer sur la Libye
                    map = L.map('libye-map').setView([26.3351, 17.2283], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Leptis Magna", lat: 32.63, lng: 14.29 },
                        { name: "Cyrène", lat: 32.82, lng: 21.85 },
                        { name: "Ghadamès (Perle du Désert)", lat: 30.13, lng: 9.48 },
                        { name: "Montagnes de l'Akakus", lat: 24.83, lng: 10.33 },
                        { name: "Vieille Ville de Tripoli", lat: 32.89, lng: 13.17 },
                        { name: "Sabratha", lat: 32.80, lng: 12.48 },
                        { name: "Benghazi", lat: 32.11, lng: 20.06 },
                        { name: "Apollonia", lat: 32.90, lng: 21.96 },
                        { name: "Ghirza", lat: 31.00, lng: 14.50 },
                        { name: "Waw an Namus", lat: 25.05, lng: 17.55 },
                        { name: "Ghat", lat: 24.96, lng: 10.17 },
                        { name: "Tobrouk", lat: 32.08, lng: 23.97 },
                        { name: "Ptolémaïs", lat: 32.63, lng: 20.94 },
                        { name: "Darnah", lat: 32.76, lng: 22.63 },
                        { name: "Lacs d'Ubari", lat: 26.55, lng: 12.78 }
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
        leptis_magna: {
            titre: "Leptis Magna",
            localisation: "Près de Al Khums",
            periode: "Printemps et Automne",
            acces: "Route (1h30 depuis Tripoli)",
            conseils: "L'une des plus belles cités romaines au monde, visitez le théâtre et les thermes d'Hadrien",
            contact: "Département des Antiquités de Libye",
            hotel: "Radisson Blu Al Mahary",
            hotelLoc: "Tripoli (base)",
            hotelFonct: "Hôtel de luxe moderne face à la mer",
            hotelContact: "+218 21 335 0850",
            hotelRestau: "Gastronomie internationale",
            guide: "Khalid Mansour",
            guideContact: "khalid@visitafrika.com"
        },
        cyrene: {
            titre: "Cyrène",
            localisation: "Shahat (Est de la Libye)",
            periode: "Mars à Mai (Floraison méditerranéenne)",
            acces: "Route depuis Benghazi",
            conseils: "Ancienne colonie grecque majeure, visitez le sanctuaire d'Apollon",
            contact: "Office du Tourisme de Cyrénaïque",
            hotel: "Tibesti Hotel",
            hotelLoc: "Benghazi (base)",
            hotelFonct: "Hôtel historique renommé",
            hotelContact: "+218 61 909 0000",
            hotelRestau: "Cuisine libyenne authentique",
            guide: "Amine Al-Hadi",
            guideContact: "amine@visitafrika.com"
        },
        ghadames: {
            titre: "Ghadamès",
            localisation: "Sud-Ouest, près de la frontière algérienne",
            periode: "Octobre à Avril",
            acces: "Route ou vol interne (quand disponible)",
            conseils: "La 'Perle du Désert', ville oasienne aux toits interconnectés réservés aux femmes",
            contact: "Communauté de Ghadamès",
            hotel: "Ayn al-Deban Hotel",
            hotelLoc: "Ghadamès",
            hotelFonct: "Hôtel de style traditionnel saharien",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités du désert (Couscous au lait)",
            guide: "Khalid Mansour",
            guideContact: "khalid@visitafrika.com"
        },
        akakus: {
            titre: "Montagnes de l'Akakus",
            localisation: "Désert du Sahara (Sud-Ouest)",
            periode: "Novembre à Février (Nuits froides)",
            acces: "4x4 d'expédition uniquement depuis Ghat",
            conseils: "Admirez les milliers de peintures et gravures rupestres datant de 12 000 ans",
            contact: "Agence Sahara Tours",
            hotel: "Camping en bivouac",
            hotelLoc: "Dans l'Akakus",
            hotelFonct: "Nuits magiques sous les étoiles du Sahara",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine Touareg au feu de bois",
            guide: "Guide Touareg certifié",
            guideContact: "Obligatoire"
        },
        tripoli_vieille_ville: {
            titre: "Vieille Ville de Tripoli",
            localisation: "Tripoli (Centre)",
            periode: "Toute l'année",
            acces: "Cœur de la capitale",
            conseils: "Perdez-vous dans les souks et visitez l'Arc de Marc Aurèle",
            contact: "Mairie de Tripoli",
            hotel: "Corinthia Hotel Tripoli",
            hotelLoc: "Tripoli, Front de mer",
            hotelFonct: "Le nec plus ultra du luxe en Libye",
            hotelContact: "+218 21 335 1990",
            hotelRestau: "Restaurant panoramique",
            guide: "Khalid Mansour",
            guideContact: "khalid@visitafrika.com"
        },
        sabratah: {
            titre: "Sabratha",
            localisation: "Côte Ouest",
            periode: "Printemps / Automne",
            acces: "Route (1h de Tripoli)",
            conseils: "Célèbre pour son magnifique théâtre romain face à la Méditerranée",
            contact: "N/A",
            hotel: "Hôtels de Tripoli",
            hotelLoc: "Tripoli",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Khalid Mansour",
            guideContact: "khalid@visitafrika.com"
        },
        benghazi: {
            titre: "Benghazi",
            localisation: "Cyrénaïque (Côte Est)",
            periode: "Toute l'année",
            acces: "Aéroport international de Benina",
            conseils: "Deuxième ville du pays, mélange d'histoire italienne et arabe",
            contact: "Municipalité de Benghazi",
            hotel: "Tibesti Hotel",
            hotelLoc: "Bord de lac",
            hotelFonct: "Grand hôtel iconique",
            hotelContact: "+218 61 909 0000",
            hotelRestau: "Cuisine méditerranéenne",
            guide: "Amine Al-Hadi",
            guideContact: "amine@visitafrika.com"
        },
        apollonia: {
            titre: "Apollonia",
            localisation: "Près de Shahat",
            periode: "Toute l'année",
            acces: "Route côtière",
            conseils: "Ancien port de Cyrène, dont une partie est aujourd'hui submergée",
            contact: "N/A",
            hotel: "Lodge de Cyrène",
            hotelLoc: "Shahat",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Amine Al-Hadi",
            guideContact: "amine@visitafrika.com"
        },
        ghirza: {
            titre: "Ghirza",
            localisation: "Sud de Leptis Magna",
            periode: "Hiver",
            acces: "4x4 recommandé",
            conseils: "Site exceptionnel de l'architecture 'Romano-Libyenne' en plein désert",
            contact: "N/A",
            hotel: "Hôtels de Tripoli",
            hotelLoc: "Tripoli",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Khalid Mansour",
            guideContact: "khalid@visitafrika.com"
        },
        waw_an_namus: {
            titre: "Waw an Namus",
            localisation: "Cœur du Sahara (Fezzan)",
            periode: "Hiver uniquement",
            acces: "Expédition 4x4 lourde (Plusieurs jours)",
            conseils: "Cratère volcanique entouré de sable noir et abritant trois lacs colorés",
            contact: "Expéditions Libye",
            hotel: "Bivouac d'expédition",
            hotelLoc: "Bord du cratère",
            hotelFonct: "Aventure extrême",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert désert Toubou",
            guideContact: "Obligatoire"
        },
        ghat: {
            titre: "Ghat",
            localisation: "Sud-Ouest (Fezzan)",
            periode: "Festival de Ghat (Décembre)",
            acces: "Route saharienne ou vol",
            conseils: "Cité forteresse Touareg au pied de l'Akakus",
            contact: "Tourisme Fezzan",
            hotel: "Ghat Palace",
            hotelLoc: "Ghat",
            hotelFonct: "Inspiré de l'architecture locale",
            hotelContact: "Sur place",
            hotelRestau: "Tajine libyen",
            guide: "Guide Touareg local",
            guideContact: "Sur place"
        },
        tobrouk: {
            titre: "Tobrouk",
            localisation: "Extrême Est (Près de l'Égypte)",
            periode: "Toute l'année",
            acces: "Route côtière ou port",
            conseils: "Visitez les mémoriaux de la Seconde Guerre Mondiale",
            contact: "Municipalité de Tobrouk",
            hotel: "Hôtel Dar-es-Salaam",
            hotelLoc: "Tobrouk",
            hotelFonct: "Confortable et central",
            hotelContact: "Sur place",
            hotelRestau: "Poisson et agneau grillé",
            guide: "N/A",
            guideContact: "N/A"
        },
        ptolémaïs: {
            titre: "Ptolémaïs",
            localisation: "Cyrénaïque",
            periode: "Printemps",
            acces: "Route",
            conseils: "Site gréco-romain majeur avec des citernes monumentales",
            contact: "N/A",
            hotel: "Hôtels de Benghazi",
            hotelLoc: "Benghazi",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Amine Al-Hadi",
            guideContact: "amine@visitafrika.com"
        },
        darnah: {
            titre: "Darnah",
            localisation: "Côte Est",
            periode: "Printemps",
            acces: "Route côtière",
            conseils: "La ville des cascades, entre montagnes vertes et mer",
            contact: "N/A",
            hotel: "Lodge de Darnah",
            hotelLoc: "Darnah",
            hotelFonct: "Basique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        ubari: {
            titre: "Lacs d'Ubari",
            localisation: "Désert d'Idehan Ubari",
            periode: "Novembre à Mars",
            acces: "4x4 dans les dunes",
            conseils: "Baignez-vous dans le lac Gaberoun, une oasis de sel entourée de dunes géantes",
            contact: "Sahara Experiences",
            hotel: "Campement de Gaberoun",
            hotelLoc: "Bord du lac",
            hotelFonct: "Eco-campement Touareg",
            hotelContact: "Via agence",
            hotelRestau: "Pain de sable traditionnel",
            guide: "Expert désert",
            guideContact: "Obligatoire"
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
                    <i class="fas fa-car-side"></i>
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
                Demande envoyée ! Nos experts libyens vous contacteront.
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
