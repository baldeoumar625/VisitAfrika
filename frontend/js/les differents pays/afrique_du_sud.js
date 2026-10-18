/**
 * PROJET: VISIT AFRIKA
 * FICHIER: afrique_du_sud.js
 * DESCRIPTION: Script pour la page Afrique du Sud - Gestion des interactions, cartes et réservations.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script afrique_sud loaded.");

    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (menuToggle && navbarMenu) {
        menuToggle.onclick = function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        };
    }

    // 2. ANIMATIONS
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

    // 3. INTERACTIVE MAP (LEAFLET)
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
                    map = L.map('afrique-sud-map').setView([-29, 24], 5);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                    // Ajout de quelques marqueurs
                    const markers = [
                        { name: "Parc Kruger", pos: [-24.0, 31.5] },
                        { name: "Le Cap (Table Mountain)", pos: [-33.92, 18.42] },
                        { name: "Johannesburg", pos: [-26.20, 28.04] },
                        { name: "Durban", pos: [-29.85, 31.02] },
                        { name: "Blyde River Canyon", pos: [-24.56, 30.77] },
                        { name: "Drakensberg", pos: [-29.00, 29.33] },
                        { name: "Stellenbosch", pos: [-33.93, 18.86] },
                        { name: "Addo Elephant Park", pos: [-33.48, 25.75] }
                    ];
                    markers.forEach(m => L.marker(m.pos).addTo(map).bindPopup(`<b>${m.name}</b>`));
                }
                setTimeout(() => map.invalidateSize(), 100);
            } else {
                mapContainer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-map"></i> <span class="btn-text">Afficher la carte</span>';
                this.style.background = '';
            }
        };
    }

    // 4. DONNÉES DÉTAILLÉES DES SITES
    const infos = {
        kruger: {
            titre: "Parc National Kruger",
            localisation: "Mpumalanga & Limpopo",
            periode: "Mai à Septembre (Saison sèche)",
            acces: "Vols vers Skukuza ou Nelspruit, puis transfert en 4x4",
            conseils: "Réserver les game drives à l'aube pour voir les fauves",
            contact: "SANParks Kruger",
            hotel: "Royal Malewane",
            hotelLoc: "Réserve Privée de Thornybush",
            hotelFonct: "Lodge de luxe ultra-exclusif, spa de classe mondiale",
            hotelContact: "+27 15 793 0150",
            hotelRestau: "Gastronomie de brousse raffinée",
            guide: "Thabo Zulu",
            guideContact: "+27 82 123 4567"
        },
        table_mountain: {
            titre: "Table Mountain",
            localisation: "Cape Town, Western Cape",
            periode: "Novembre à Mars",
            acces: "Téléphérique (Cableway) ou randonnée pédestre",
            conseils: "Vérifier la météo (la 'nappe' de nuages) avant de monter",
            contact: "Table Mountain Aerial Cableway",
            hotel: "The Silo Hotel",
            hotelLoc: "V&A Waterfront, Le Cap",
            hotelFonct: "Hôtel design dans un ancien silo à grains, vue panoramique",
            hotelContact: "+27 21 670 0500",
            hotelRestau: "The Willaston Bar & Granary Café",
            guide: "Sarah Cape",
            guideContact: "+27 71 987 6543"
        },
        garden_route: {
            titre: "Garden Route",
            localisation: "Côte Sud de l'Afrique du Sud",
            periode: "Septembre à Avril",
            acces: "Location de voiture depuis Cape Town ou George",
            conseils: "S'arrêter à Knysna pour les huîtres et à Tsitsikamma pour le pont suspendu",
            contact: "Garden Route Tourism",
            hotel: "Pezula Nature Hotel & Spa",
            hotelLoc: "Knysna",
            hotelFonct: "Resort de luxe niché entre forêt et lagon",
            hotelContact: "+27 44 302 3333",
            hotelRestau: "Zachary's Bistro",
            guide: "Mark Forest",
            guideContact: "+27 61 555 4433"
        },
        robben_island: {
            titre: "Robben Island",
            localisation: "Baie de la Table, Le Cap",
            periode: "Toute l'année (selon l'état de la mer)",
            acces: "Ferry depuis le Nelson Mandela Gateway (V&A Waterfront)",
            conseils: "Réserver plusieurs semaines à l'avance, les billets s'épuisent vite",
            contact: "Robben Island Museum",
            hotel: "Cape Grace Hotel",
            hotelLoc: "V&A Waterfront",
            hotelFonct: "Élégance classique, service personnalisé, quai privé",
            hotelContact: "+27 21 410 7100",
            hotelRestau: "Signal Restaurant",
            guide: "Nelson Guide",
            guideContact: "+27 21 413 4200"
        },
        blyde_river: {
            titre: "Blyde River Canyon",
            localisation: "Mpumalanga, Panorama Route",
            periode: "Avril à Août",
            acces: "Voiture depuis Graskop ou Hoedspruit",
            conseils: "Ne pas manquer le point de vue 'Three Rondavels'",
            contact: "Mpumalanga Tourism Authority",
            hotel: "Mount Sheba Rainforest Hotel",
            hotelLoc: "Près de Pilgrim's Rest",
            hotelFonct: "Atmosphère de manoir anglais en pleine forêt tropicale",
            hotelContact: "+27 13 768 1241",
            hotelRestau: "The Chandelier Restaurant",
            guide: "Petrus Canyon",
            guideContact: "+27 72 444 3322"
        },
        cape_hope: {
            titre: "Cap de Bonne-Espérance",
            localisation: "Péninsule du Cap",
            periode: "Toute l'année",
            acces: "Voiture par la route Chapman's Peak Drive (spectaculaire)",
            conseils: "Attention aux babouins, ne pas les nourrir !",
            contact: "Cape Point Nature Reserve",
            hotel: "Twelve Apostles Hotel",
            hotelLoc: "Camps Bay / Llandudno",
            hotelFonct: "Situé entre les montagnes et l'Atlantique, spa de grotte",
            hotelContact: "+27 21 437 9000",
            hotelRestau: "Azure Restaurant",
            guide: "Jacques Ocean",
            guideContact: "+27 63 111 2222"
        },
        boulders: {
            titre: "Boulders Beach",
            localisation: "Simon's Town, Péninsule du Cap",
            periode: "Toute l'année",
            acces: "Train de banlieue ou voiture depuis Cape Town",
            conseils: "Respectez l'espace des pingouins, ils peuvent mordre !",
            contact: "SANParks Boulders",
            hotel: "Tintswalo at Boulders",
            hotelLoc: "Simon's Town",
            hotelFonct: "Maison d'hôtes de luxe surplombant la colonie de manchots",
            hotelContact: "+27 21 773 0240",
            hotelRestau: "Cuisine de bord de mer raffinée",
            guide: "Amy Penguin",
            guideContact: "+27 73 222 3344"
        },
        drakensberg: {
            titre: "Monts Drakensberg",
            localisation: "KwaZulu-Natal",
            periode: "Mars à Mai (Automne)",
            acces: "Voiture depuis Durban ou Johannesburg",
            conseils: "Prévoyez des vêtements chauds, le temps change vite en montagne",
            contact: "KZN Wildlife",
            hotel: "Cathedral Peak Hotel",
            hotelLoc: "Drakensberg Central",
            hotelFonct: "Hôtel historique de montagne avec golf et spa",
            hotelContact: "+27 36 488 1888",
            hotelRestau: "Dîners buffet montagnards",
            guide: "Simon Peak",
            guideContact: "+27 82 555 6677"
        },
        stellenbosch: {
            titre: "Stellenbosch",
            localisation: "Route des Vins, Cap-Occidental",
            periode: "Septembre à Avril",
            acces: "Voiture ou train depuis Cape Town (45 min)",
            conseils: "Faites un circuit 'Vine Hopper' pour déguster sans conduire",
            contact: "Stellenbosch Tourism",
            hotel: "Lanzerac Wine Estate",
            hotelLoc: "Stellenbosch",
            hotelFonct: "Domaine viticole historique fondé en 1692",
            hotelContact: "+27 21 887 1132",
            hotelRestau: "Tulp Kitchen & Manor Kitchen",
            guide: "Paul Wine",
            guideContact: "+27 71 888 9900"
        },
        apartheid_museum: {
            titre: "Apartheid Museum",
            localisation: "Johannesburg, Gauteng",
            periode: "Toute l'année",
            acces: "Taxi ou bus touristique rouge (Red Bus)",
            conseils: "Prévoyez au moins 3 heures pour une visite complète",
            contact: "Apartheid Museum Office",
            hotel: "The Saxon Hotel",
            hotelLoc: "Sandton, Johannesburg",
            hotelFonct: "Hôtel où Nelson Mandela a finalisé son autobiographie",
            hotelContact: "+27 11 292 6000",
            hotelRestau: "Qunu Restaurant",
            guide: "Joe Joburg",
            guideContact: "+27 11 555 0101"
        },
        addo: {
            titre: "Addo Elephant Park",
            localisation: "Eastern Cape, près de Port Elizabeth",
            periode: "Toute l'année",
            acces: "Voiture depuis Port Elizabeth (45 min)",
            conseils: "Le parc abrite les 'Big Seven' (Big Five + baleine et grand blanc)",
            contact: "SANParks Addo",
            hotel: "Gorah Elephant Camp",
            hotelLoc: "Addo National Park",
            hotelFonct: "Lodge sous tente de style colonial 1900",
            hotelContact: "+27 41 404 9300",
            hotelRestau: "Dîner aux chandelles dans le manoir",
            guide: "Elephant Eddie",
            guideContact: "+27 83 444 5566"
        },
        hermanus: {
            titre: "Hermanus",
            localisation: "Walker Bay, Cap-Occidental",
            periode: "Juin à Novembre (Baleines)",
            acces: "Voiture depuis Cape Town par la côte (R44)",
            conseils: "Écoutez le 'Whale Crier' qui souffle dans sa corne",
            contact: "Hermanus Tourism",
            hotel: "The Marine Hermanus",
            hotelLoc: "Hermanus",
            hotelFonct: "Hôtel iconique surplombant la mer et les baleines",
            hotelContact: "+27 28 313 1000",
            hotelRestau: "Origins Restaurant",
            guide: "Whale Walter",
            guideContact: "+27 72 666 7788"
        },
        pilanesberg: {
            titre: "Pilanesberg",
            localisation: "Nord-Ouest, près de Sun City",
            periode: "Toute l'année",
            acces: "2h30 de route depuis Johannesburg",
            conseils: "Situé dans un ancien cratère volcanique, paysages uniques",
            contact: "Pilanesberg Game Reserve",
            hotel: "Bakubung Bush Lodge",
            hotelLoc: "Pilanesberg",
            hotelFonct: "Lodge familial avec vue sur le point d'eau",
            hotelContact: "+27 14 552 6000",
            hotelRestau: "Buffet africain traditionnel",
            guide: "Volcano Victor",
            guideContact: "+27 84 777 8899"
        },
        tsitsikamma: {
            titre: "Tsitsikamma",
            localisation: "Garden Route, Cap-Oriental",
            periode: "Toute l'année",
            acces: "Sur la N2 entre Plettenberg Bay et Port Elizabeth",
            conseils: "Traversez le pont suspendu de la Storms River",
            contact: "SANParks Tsitsikamma",
            hotel: "The Tsitsikamma Village Inn",
            hotelLoc: "Storms River Village",
            hotelFonct: "Auberge historique pleine de charme",
            hotelContact: "+27 42 281 1711",
            hotelRestau: "Village Inn Restaurant",
            guide: "Forest Frank",
            guideContact: "+27 61 999 0011"
        },
        hole_wall: {
            titre: "Hole in the Wall",
            localisation: "Coffee Bay, Wild Coast",
            periode: "Mai à Juillet (Saison des sardines)",
            acces: "4x4 fortement recommandé, routes escarpées",
            conseils: "Randonnée spectaculaire le long des falaises sauvages",
            contact: "Wild Coast Tourism",
            hotel: "Hole in the Wall Resort",
            hotelLoc: "Coffee Bay",
            hotelFonct: "Appartements et chalets avec vue imprenable sur l'arche",
            hotelContact: "+27 47 575 0009",
            hotelRestau: "Sea Food Platters",
            guide: "Wild Willie",
            guideContact: "+27 79 111 2233"
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

        // Image de fond dynamique basée sur la carte cliquée
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
                        <strong>Guide local certifié :</strong> ${data.guide}<br>
                        <span class="guide-tel">${data.guideContact}</span>
                    </div>
                </div>
            </div>

            <hr>
            <form id="visit-form" class="visit-form-styled">
                <div class="form-header">
                    <h4><i class="fas fa-paper-plane"></i> Demande de réservation</h4>
                    <p style="font-size: 13px; color: #636e72;">Réservez votre expérience sud-africaine</p>
                </div>
                
                <div class="form-group">
                    <label>Nom complet</label>
                    <input type="text" name="nom" placeholder="Votre nom" required>
                    <i class="fas fa-user input-icon"></i>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="20" value="2" required>
                        <i class="fas fa-users input-icon"></i>
                    </div>
                </div>

                <div class="form-group">
                    <label>Type de séjour</label>
                    <select name="type">
                        <option value="safari">Aventure Safari</option>
                        <option value="luxury">Luxe & Gastronomie</option>
                        <option value="culture">Culture & Histoire</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Contact (WhatsApp / Email)</label>
                    <input type="text" name="contact" placeholder="Email ou Tel" required>
                    <i class="fas fa-envelope input-icon"></i>
                </div>

                <button type="submit" class="btn-submit">
                    <span>Envoyer la demande</span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </form>
            <div id="visit-confirm" style="display:none;" class="alert-success-styled">
                <i class="fas fa-check-circle"></i> Félicitations ! Votre demande pour ${data.titre} a été envoyée. Un expert local vous recontactera très vite.
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
            form.onsubmit = async function (e) {
                e.preventDefault();
                const formData = new FormData(form);
                const payload = {
                    site_name: data.titre,
                    full_name: formData.get('nom'),
                    email: formData.get('contact'),
                    phone: formData.get('contact'),
                    date_visit: formData.get('date'),
                    guests: parseInt(formData.get('personnes')),
                    details: `Type: ${formData.get('type')} | Pays: Afrique du Sud`
                };

                try {
                    const res = await fetch('/api/reservations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                        form.style.display = 'none';
                        document.getElementById('visit-confirm').style.display = 'block';
                    }
                } catch (err) { alert("Erreur lors de l'envoi."); }
            };
        }
    }

    const boutonsDecouvrir = document.querySelectorAll('.btn-decouvrir, .visit-btn');
    boutonsDecouvrir.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const siteKey = this.getAttribute('data-site');
            openModal(siteKey);
        };
    });

    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };

    // --- GESTION DU FORMULAIRE D'HÔTEL ---
    const bookingForm = document.getElementById('hotel-booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const hotel = document.getElementById('hotel-select').options[document.getElementById('hotel-select').selectedIndex].text;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const userName = document.getElementById('user-name').value;
            const userContact = document.getElementById('user-contact').value;

            if (new Date(checkIn) >= new Date(checkOut)) {
                alert("La date de départ doit être après la date d'arrivée.");
                return;
            }

            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;

            const data = {
                hotel_name: hotel,
                full_name: userName,
                email: userContact,
                check_in: checkIn,
                check_out: checkOut,
                guests: document.getElementById('guests').value + " Personne(s)",
                country: "Afrique du Sud"
            };

            try {
                const response = await fetch('/api/hotel_reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert(`Félicitations ${userName} ! Votre demande pour l'hôtel ${hotel} en Afrique du Sud a été enregistrée.`);
                    bookingForm.reset();
                }
            } catch (error) { alert("Erreur de connexion."); }
            finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- RECHERCHE ET FILTRES ---
    const searchInput = document.querySelector('.search-input-wrapper input');
    const filterTags = document.querySelectorAll('.filter-tag');
    const attractions = document.querySelectorAll('.attraction');

    function filterAttractions() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeFilter = document.querySelector('.filter-tag.active').textContent.trim();

        attractions.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.getAttribute('data-category') || '';
            
            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = activeFilter.startsWith('Tous') || activeFilter === category;

            if (matchesSearch && matchesFilter) {
                card.style.setProperty('display', 'block', 'important');
            } else {
                card.style.setProperty('display', 'none', 'important');
            }
        });
    }

    if (searchInput) searchInput.oninput = filterAttractions;
    filterTags.forEach(tag => {
        tag.onclick = function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterAttractions();
        };
    });
});
