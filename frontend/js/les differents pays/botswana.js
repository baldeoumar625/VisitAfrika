/**
 * PROJET: VISIT AFRIKA
 * FICHIER: botswana.js
 * DESCRIPTION: Script premium pour la page Botswana.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Botswana chargé.");

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
                    // Centrer sur le Botswana
                    map = L.map('botswana-map').setView([-22.3285, 24.6849], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Delta de l'Okavango", lat: -19.28, lng: 22.82 },
                        { name: "Parc National de Chobe", lat: -18.67, lng: 24.50 },
                        { name: "Makgadikgadi Pans", lat: -20.50, lng: 25.10 },
                        { name: "Réserve du Kalahari Central", lat: -21.88, lng: 23.75 },
                        { name: "Nxai Pan National Park", lat: -19.92, lng: 24.78 },
                        { name: "Tsodilo Hills (UNESCO)", lat: -18.75, lng: 21.75 },
                        { name: "Réserve de Moremi", lat: -19.17, lng: 23.40 },
                        { name: "Khama Rhino Sanctuary", lat: -22.25, lng: 26.70 },
                        { name: "Gaborone (Capitale)", lat: -24.63, lng: 25.92 },
                        { name: "Kubu Island", lat: -20.89, lng: 25.82 },
                        { name: "Tuli Block", lat: -22.40, lng: 28.50 },
                        { name: "Kgalagadi Transfrontier Park", lat: -25.75, lng: 21.00 },
                        { name: "Maun (Porte du Delta)", lat: -19.98, lng: 23.42 },
                        { name: "Francistown", lat: -21.17, lng: 27.50 },
                        { name: "Réserve de Mokolodi", lat: -24.75, lng: 25.82 }
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
        okavango: {
            titre: "Delta de l'Okavango",
            localisation: "Nord-Ouest du Botswana",
            periode: "Mai à Octobre (Eaux hautes et saison sèche)",
            acces: "Petit avion depuis Maun (Saut de puce)",
            conseils: "Le plus grand delta intérieur du monde. Privilégiez les balades en mokoro (pirogue) pour une immersion silencieuse",
            contact: "Botswana Tourism Organisation (BTO)",
            hotel: "Eagle Island Lodge",
            hotelLoc: "Île de Xaxaba, Delta",
            hotelFonct: "Lodge de luxe sur pilotis avec vue panoramique",
            hotelContact: "+267 686 0601",
            hotelRestau: "Gastronomie de brousse étoilée",
            guide: "Kabelo Motsumi",
            guideContact: "kabelo@visitafrika.com"
        },
        chobe: {
            titre: "Parc National de Chobe",
            localisation: "Nord du Botswana (Kasane)",
            periode: "Juillet à Octobre (Concentration animale au bord du fleuve)",
            acces: "Aéroport de Kasane ou route depuis Victoria Falls",
            conseils: "Faites une croisière safari au coucher du soleil pour voir des centaines d'éléphants traverser le fleuve",
            contact: "DWNP Botswana",
            hotel: "Chobe Game Lodge",
            hotelLoc: "À l'intérieur du parc Chobe",
            hotelFonct: "Resort de luxe éco-responsable, flotte de bateaux électriques",
            hotelContact: "+267 625 0340",
            hotelRestau: "Terrasse surplombant le fleuve Chobe",
            guide: "Kabelo Motsumi",
            guideContact: "kabelo@visitafrika.com"
        },
        makgadikgadi: {
            titre: "Makgadikgadi Pans",
            localisation: "Centre-Nord",
            periode: "Janvier à Mars (Migration des zèbres) ou Saison sèche pour le quad",
            acces: "4x4 obligatoire",
            conseils: "Immense étendue de sel, visitez les colonies de suricates et dormez à la belle étoile",
            contact: "N/A",
            hotel: "Jack's Camp",
            hotelLoc: "Bord des Makgadikgadi Pans",
            hotelFonct: "Lodge iconique style expédition des années 40",
            hotelContact: "+267 686 1260",
            hotelRestau: "Tente mess élégante",
            guide: "Tshepo Modise",
            guideContact: "tshepo@visitafrika.com"
        },
        central_kalahari: {
            titre: "Réserve du Kalahari Central",
            localisation: "Centre du pays",
            periode: "Décembre à Avril (Saison des pluies - vie abondante)",
            acces: "4x4 uniquement, expédition autonome ou lodge",
            conseils: "L'une des plus grandes réserves au monde. Rencontrez les San et découvrez les lions du Kalahari à crinière noire",
            contact: "Central Kalahari Game Reserve Office",
            hotel: "Tau Pan Camp",
            hotelLoc: "Sur une crête surplombant Tau Pan",
            hotelFonct: "Eco-camp solaire avec vue imprenable sur le désert",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine inspirée du désert",
            guide: "Tshepo Modise",
            guideContact: "tshepo@visitafrika.com"
        },
        nxai_pan: {
            titre: "Nxai Pan National Park",
            localisation: "Nord des Makgadikgadi",
            periode: "Décembre à Mars",
            acces: "4x4",
            conseils: "Admirez les 'Baobabs de Baines', immortalisés par le peintre Thomas Baines en 1862",
            contact: "N/A",
            hotel: "Nxai Pan Camp",
            hotelLoc: "Nxai Pan",
            hotelFonct: "Lodge permanent face au point d'eau",
            hotelContact: "Via agence",
            hotelRestau: "Plats internationaux",
            guide: "Tshepo Modise",
            guideContact: "tshepo@visitafrika.com"
        },
        tsodilo: {
            titre: "Tsodilo Hills",
            localisation: "Extrême Nord-Ouest",
            periode: "Saison fraîche (Mai-Août)",
            acces: "Route bitumée puis piste",
            conseils: "Site sacré des San avec plus de 4500 peintures rupestres, le 'Louvre du désert'",
            contact: "National Museum of Botswana",
            hotel: "Hôtels de Shakawe (base)",
            hotelLoc: "Shakawe",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide San local",
            guideContact: "Obligatoire sur place"
        },
        moremi: {
            titre: "Réserve de Moremi",
            localisation: "Partie Est du Delta de l'Okavango",
            periode: "Juillet à Octobre",
            acces: "4x4 ou petit avion",
            conseils: "Considérée comme l'une des plus belles réserves d'Afrique pour sa diversité d'écosystèmes",
            contact: "N/A",
            hotel: "Chief's Camp",
            hotelLoc: "Île de Chief, Moremi",
            hotelFonct: "Luxe ultime au cœur de la faune",
            hotelContact: "+267 686 0601",
            hotelRestau: "Fine dining safari",
            guide: "Kabelo Motsumi",
            guideContact: "kabelo@visitafrika.com"
        },
        khama_rhino: {
            titre: "Khama Rhino Sanctuary",
            localisation: "Près de Serowe",
            periode: "Toute l'année",
            acces: "Route bitumée facile",
            conseils: "Projet communautaire exemplaire pour la sauvegarde des rhinocéros blancs et noirs",
            contact: "Khama Rhino Sanctuary Trust",
            hotel: "Chalets du Sanctuaire",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Chalets confortables et calmes",
            hotelContact: "Sur place",
            hotelRestau: "Restaurant simple et bon",
            guide: "N/A",
            guideContact: "N/A"
        },
        gaborone: {
            titre: "Gaborone",
            localisation: "Sud-Est (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international Sir Seretse Khama (GBE)",
            conseils: "Visitez le monument des Trois Chefs et grimpez au sommet de Kgale Hill pour la vue",
            contact: "BTO Gaborone",
            hotel: "The Grand Palm Hotel Resort",
            hotelLoc: "Molepolole Rd, Gaborone",
            hotelFonct: "Complexe de luxe avec casino et spa",
            hotelContact: "+267 363 7777",
            hotelRestau: "Beef Baron (Grill réputé)",
            guide: "Tshepo Modise",
            guideContact: "tshepo@visitafrika.com"
        },
        kubu_island: {
            titre: "Kubu Island",
            localisation: "Sua Pan",
            periode: "Saison sèche (Mai-Septembre)",
            acces: "4x4 uniquement (Sable profond)",
            conseils: "Île de granit entourée d'un océan de sel, peuplée de baobabs millénaires. Lieu spirituel",
            contact: "Gaing-O Community Trust",
            hotel: "Camping rustique",
            hotelLoc: "Sur l'île de Kubu",
            hotelFonct: "Expérience sauvage absolue, pas d'eau courante",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        tuli_block: {
            titre: "Tuli Block",
            localisation: "Sud-Est (Frontière RSA/Zimbabwe)",
            periode: "Saison sèche",
            acces: "Route",
            conseils: "La 'Terre des Géants', paysages de collines rocheuses et de baobabs, safari à vélo possible",
            contact: "Mashatu Game Reserve",
            hotel: "Mashatu Lodge",
            hotelLoc: "Réserve de Mashatu",
            hotelFonct: "Luxe de brousse, spécialisé dans la photographie",
            hotelContact: "+27 11 442 2267",
            hotelRestau: "Cuisine gourmet",
            guide: "Tshepo Modise",
            guideContact: "tshepo@visitafrika.com"
        },
        khalagadi: {
            titre: "Kgalagadi Transfrontier Park",
            localisation: "Sud-Ouest (Frontière RSA)",
            periode: "Printemps / Automne",
            acces: "4x4 obligatoire",
            conseils: "Parc immense entre Botswana et Afrique du Sud, idéal pour voir les prédateurs et les dunes rouges",
            contact: "SANParks / DWNP",
            hotel: "Mabuasehube Campsite",
            hotelLoc: "Section Botswana",
            hotelFonct: "Camping sauvage non clôturé",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        maun: {
            titre: "Maun",
            localisation: "Porte du Delta de l'Okavango",
            periode: "Toute l'année",
            acces: "Aéroport de Maun (MUB)",
            conseils: "Capitale mondiale du safari, point de départ de toutes les expéditions vers le Delta",
            contact: "N/A",
            hotel: "Cresta Riley's Hotel",
            hotelLoc: "Bord de la rivière Thamalakane",
            hotelFonct: "Hôtel historique de Maun",
            hotelContact: "+267 686 0204",
            hotelRestau: "Restaurant convivial",
            guide: "Kabelo Motsumi",
            guideContact: "kabelo@visitafrika.com"
        },
        francistown: {
            titre: "Francistown",
            localisation: "Est (Deuxième ville)",
            periode: "Toute l'année",
            acces: "Route / Rail / Air",
            conseils: "Ancienne ville minière (ruée vers l'or), étape pratique vers le nord",
            contact: "N/A",
            hotel: "Cresta Marang Gardens",
            hotelLoc: "Bord de rivière, Francistown",
            hotelFonct: "Cadre verdoyant et calme",
            hotelContact: "+267 241 3991",
            hotelRestau: "International",
            guide: "N/A",
            guideContact: "N/A"
        },
        mokolodi: {
            titre: "Réserve de Mokolodi",
            localisation: "Près de Gaborone (15km)",
            periode: "Toute l'année",
            acces: "Route facile",
            conseils: "Parfait pour une excursion d'une journée depuis la capitale, programme d'éducation à l'environnement",
            contact: "Mokolodi Nature Reserve",
            hotel: "Mokolodi Chalets",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Cottages isolés en pleine nature",
            hotelContact: "+267 316 1955",
            hotelRestau: "Restaurant panoramique",
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
                Demande envoyée ! Nos experts botswanais vous contacteront.
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
