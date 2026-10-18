/**
 * PROJET: VISIT AFRIKA
 * FICHIER: mozambique.js
 * DESCRIPTION: Script premium pour la page Mozambique.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Mozambique chargé.");

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
                    // Centrer sur le Mozambique
                    map = L.map('mozambique-map').setView([-18.6657, 35.5296], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Archipel de Bazaruto", lat: -21.65, lng: 35.46 },
                        { name: "Îles Quirimbas", lat: -12.20, lng: 40.60 },
                        { name: "Parc National de Gorongosa", lat: -18.83, lng: 34.33 },
                        { name: "Île de Mozambique (UNESCO)", lat: -15.04, lng: 40.73 },
                        { name: "Maputo (Capitale)", lat: -25.96, lng: 32.58 },
                        { name: "Plage de Tofo", lat: -23.85, lng: 35.54 },
                        { name: "Vilankulo", lat: -21.98, lng: 35.31 },
                        { name: "Ponta do Ouro", lat: -26.84, lng: 32.88 },
                        { name: "Parc National du Limpopo", lat: -23.40, lng: 32.00 },
                        { name: "Mont Chimanimani", lat: -19.78, lng: 33.10 },
                        { name: "Réserve de Niassa", lat: -12.18, lng: 37.55 },
                        { name: "Pemba", lat: -12.97, lng: 40.51 },
                        { name: "Beira", lat: -19.83, lng: 34.84 },
                        { name: "Inhambane", lat: -23.86, lng: 35.38 },
                        { name: "Bilene (Lagune)", lat: -25.26, lng: 33.24 }
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
        bazaruto: {
            titre: "Archipel de Bazaruto",
            localisation: "Au large de Vilankulo",
            periode: "Mai à Octobre (Saison sèche, eaux calmes)",
            acces: "Bateau rapide ou petit avion depuis Vilankulo",
            conseils: "Paradis marin protégé, observez les dugongs rares et plongez sur le récif de Two-Mile Reef",
            contact: "Parque Nacional do Arquipélago de Bazaruto",
            hotel: "andBeyond Benguerra Island",
            hotelLoc: "Île de Benguerra",
            hotelFonct: "Resort de luxe ultra-exclusif, bungalows sur la plage",
            hotelContact: "+258 84 300 0000",
            hotelRestau: "Haute gastronomie marine",
            guide: "Ricardo Santos",
            guideContact: "ricardo@visitafrika.com"
        },
        quirimbas: {
            titre: "Îles Quirimbas",
            localisation: "Nord du Mozambique (Cabo Delgado)",
            periode: "Juin à Septembre",
            acces: "Bateau depuis Pemba ou vol privé",
            conseils: "32 îles coralliennes, visitez l'île d'Ibo pour son histoire coloniale et son orfèvrerie",
            contact: "Ibo Island Lodge",
            hotel: "Ibo Island Lodge",
            hotelLoc: "Île d'Ibo",
            hotelFonct: "Boutique hôtel dans une ancienne demeure coloniale restaurée",
            hotelContact: "+27 21 785 5498",
            hotelRestau: "Spécialités de crabe et crevettes",
            guide: "Ricardo Santos",
            guideContact: "ricardo@visitafrika.com"
        },
        gorongosa: {
            titre: "Parc National de Gorongosa",
            localisation: "Centre du Mozambique (Province de Sofala)",
            periode: "Mai à Octobre",
            acces: "Route depuis Beira (3h) ou vol vers le parc",
            conseils: "Le 'Jardin d'Éden' de l'Afrique, un modèle mondial de restauration de la biodiversité",
            contact: "Gorongosa Restoration Project",
            hotel: "Montebelo Gorongosa Lodge",
            hotelLoc: "Chitengo, Gorongosa",
            hotelFonct: "Bungalows familiaux et camping de luxe",
            hotelContact: "+258 23 535 010",
            hotelRestau: "Restaurant de qualité avec produits du jardin",
            guide: "Ana Maria",
            guideContact: "ana@visitafrika.com"
        },
        ilha_de_mocambique: {
            titre: "Île de Mozambique",
            localisation: "Province de Nampula",
            periode: "Toute l'année",
            acces: "Pont depuis le continent (proche de Nampula)",
            conseils: "Ancienne capitale portugaise, mélange unique de cultures africaine, arabe et européenne",
            contact: "UNESCO Heritage Site Office",
            hotel: "Villa Sands",
            hotelLoc: "Front de mer, Ilha",
            hotelFonct: "Hôtel boutique chic dans un ancien entrepôt",
            hotelContact: "+258 84 353 5353",
            hotelRestau: "Cuisine fusion indo-portugaise",
            guide: "Ana Maria",
            guideContact: "ana@visitafrika.com"
        },
        maputo_ville: {
            titre: "Maputo",
            localisation: "Sud du pays (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international de Maputo (MPM)",
            conseils: "Visitez la gare centrale (Eiffel), le marché aux poissons et goûtez les crevettes à la 'Piri-Piri'",
            contact: "Office National du Tourisme (INATUR)",
            hotel: "Polana Serena Hotel",
            hotelLoc: "Avenida Julius Nyerere, Maputo",
            hotelFonct: "La 'Grande Dame' de Maputo, luxe historique",
            hotelContact: "+258 21 241 700",
            hotelRestau: "Brasserie Varanda (fruits de mer)",
            guide: "Ricardo Santos",
            guideContact: "ricardo@visitafrika.com"
        },
        tofo: {
            titre: "Plage de Tofo",
            localisation: "Près d'Inhambane",
            periode: "Toute l'année (Juin-Oct pour les baleines)",
            acces: "Route depuis Maputo (7h) ou vol vers Inhambane",
            conseils: "Capitale mondiale du snorkeling avec les requins-baleines et les raies mantas",
            contact: "Marine Megafauna Foundation",
            hotel: "Sentidos Beach Retreat",
            hotelLoc: "Barra / Tofo",
            hotelFonct: "Luxe pieds nus sur pilotis",
            hotelContact: "+258 84 300 0000",
            hotelRestau: "Gastronomie portugaise moderne",
            guide: "Expert plongée Tofo",
            guideContact: "Via agence"
        },
        vilankulo: {
            titre: "Vilankulo",
            localisation: "Province d'Inhambane",
            periode: "Mai à Décembre",
            acces: "Aéroport de Vilankulo (VNX)",
            conseils: "Porte d'entrée de Bazaruto, profitez de la vie locale et du dhow sailing",
            contact: "N/A",
            hotel: "Vilanculos Beach Lodge",
            hotelLoc: "Bord de plage",
            hotelFonct: "Convivial, vue sur l'archipel",
            hotelContact: "+258 29 382 301",
            hotelRestau: "Poissons grillés",
            guide: "Ricardo Santos",
            guideContact: "ricardo@visitafrika.com"
        },
        ponta_do_ouro: {
            titre: "Ponta do Ouro",
            localisation: "Extrême Sud (Frontière Afrique du Sud)",
            periode: "Surtout en été (Décembre-Février)",
            acces: "Route bitumée depuis Maputo (1h30)",
            conseils: "Réputé pour les dauphins sauvages et les dunes impressionnantes",
            contact: "Dolphin Encountours",
            hotel: "White Pearl Resorts",
            hotelLoc: "Ponta Mamoli",
            hotelFonct: "Luxe contemporain isolé",
            hotelContact: "+27 11 026 2674",
            hotelRestau: "Fine dining",
            guide: "N/A",
            guideContact: "N/A"
        },
        limpopo: {
            titre: "Parc National du Limpopo",
            localisation: "Frontière avec le Kruger (RSA)",
            periode: "Saison sèche",
            acces: "4x4 obligatoire",
            conseils: "Partie du grand parc transfrontalier, safari sauvage et authentique",
            contact: "Limpopo NP Office",
            hotel: "Machampane Wilderness Camp",
            hotelLoc: "Rivière Machampane",
            hotelFonct: "Camp de tentes de luxe en brousse",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine au feu de camp",
            guide: "Ranger du parc",
            guideContact: "Inclus"
        },
        chimanimani: {
            titre: "Mont Chimanimani",
            localisation: "Frontière avec le Zimbabwe",
            periode: "Saison sèche",
            acces: "4x4 puis trek",
            conseils: "Hautes terres magnifiques, peintures rupestres et biodiversité unique",
            contact: "Reserva de Chimanimani",
            hotel: "Lodges locaux à Sussundenga",
            hotelLoc: "Sussundenga",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "Local",
            guide: "Guide de montagne local",
            guideContact: "Sur place"
        },
        niassa: {
            titre: "Réserve de Niassa",
            localisation: "Extrême Nord (Frontière Tanzanie)",
            periode: "Juin à Octobre",
            acces: "Vols privés uniquement",
            conseils: "L'une des plus grandes zones protégées d'Afrique, nature sauvage intacte",
            contact: "Wildlife Conservation Society",
            hotel: "Lugenda Wildlife Camp",
            hotelLoc: "Rivière Lugenda",
            hotelFonct: "Tentes safari de luxe",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine de brousse raffinée",
            guide: "Expert Niassa",
            guideContact: "Via camp"
        },
        pemba: {
            titre: "Pemba",
            localisation: "Province de Cabo Delgado",
            periode: "Mai à Octobre",
            acces: "Aéroport de Pemba (POL)",
            conseils: "Ville construite autour de la troisième plus grande baie du monde",
            contact: "N/A",
            hotel: "The Avani Pemba Beach",
            hotelLoc: "Wimbe Beach",
            hotelFonct: "Grand complexe moderne, vue baie",
            hotelContact: "+258 27 221 770",
            hotelRestau: "Restaurant international et local",
            guide: "N/A",
            guideContact: "N/A"
        },
        beira: {
            titre: "Beira",
            localisation: "Province de Sofala",
            periode: "Toute l'année",
            acces: "Aéroport de Beira (BEW)",
            conseils: "Ville portuaire dynamique, visitez le Phare de Macuti",
            contact: "Municipalité de Beira",
            hotel: "Hotel Golden Peacock",
            hotelLoc: "Beira",
            hotelFonct: "Moderne, bord de mer",
            hotelContact: "+258 23 313 063",
            hotelRestau: "Cuisine chinoise et locale",
            guide: "Ana Maria",
            guideContact: "ana@visitafrika.com"
        },
        inhambane: {
            titre: "Inhambane (Terra de Boa Gente)",
            localisation: "Côte Sud-Est",
            periode: "Toute l'année",
            acces: "Aéroport d'Inhambane (INH) ou route",
            conseils: "Une des plus vieilles colonies, visitez la cathédrale du XVIIIe siècle",
            contact: "N/A",
            hotel: "Castelo do Mar",
            hotelLoc: "Lingua Lingua",
            hotelFonct: "Lodge de luxe face à la baie",
            hotelContact: "+258 84 313 3333",
            hotelRestau: "Gastronomie portugaise",
            guide: "Ana Maria",
            guideContact: "ana@visitafrika.com"
        },
        bilene: {
            titre: "Bilene (Praia do Bilene)",
            localisation: "Province de Gaza",
            periode: "Toute l'année",
            acces: "Route (2h de Maputo)",
            conseils: "Vaste lagune d'eau calme séparée de la mer par une dune de sable",
            contact: "N/A",
            hotel: "San Martinho Beach Club",
            hotelLoc: "Bilene",
            hotelFonct: "Resort familial haut de gamme",
            hotelContact: "Sur place",
            hotelRestau: "Pizzas et grillades",
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
                    <i class="fas fa-boat"></i>
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
                        <input type="number" name="personnes" min="1" max="20" value="2" required>
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
                Demande envoyée ! Nos experts mozambicains vous contacteront.
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