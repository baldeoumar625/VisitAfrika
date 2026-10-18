/**
 * PROJET: VISIT AFRIKA
 * FICHIER: somalie.js
 * DESCRIPTION: Script premium pour la Somalie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Somalie chargé.");

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
                    // Centrer sur la Somalie
                    map = L.map('somalie-map').setView([5.1521, 46.1996], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Laas Geel (Art rupestre)", lat: 9.60, lng: 44.45 },
                        { name: "Plage de Lido (Mogadiscio)", lat: 2.04, lng: 45.36 },
                        { name: "Berbera (Côte Nord)", lat: 10.43, lng: 45.01 },
                        { name: "Hargeisa", lat: 9.56, lng: 44.06 },
                        { name: "Côte du Puntland", lat: 8.40, lng: 48.50 },
                        { name: "Parc National de Kismayo", lat: -0.36, lng: 42.55 },
                        { name: "Parc National de Lag Badana", lat: -1.25, lng: 41.50 },
                        { name: "Parc National de Daallo", lat: 10.75, lng: 47.30 },
                        { name: "Monts Cal Madow", lat: 10.70, lng: 47.20 },
                        { name: "Chutes de Lamadaya", lat: 10.72, lng: 47.25 },
                        { name: "Bosaso", lat: 11.28, lng: 49.18 },
                        { name: "Garowe", lat: 8.40, lng: 48.48 },
                        { name: "Baidoa", lat: 3.11, lng: 43.65 },
                        { name: "Merca", lat: 1.71, lng: 44.77 },
                        { name: "Hobyo", lat: 5.35, lng: 48.52 }
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
        las_geel: {
            titre: "Laas Geel",
            localisation: "Périphérie d'Hargeisa (Somaliland)",
            periode: "Saison sèche (Octobre à Mars)",
            acces: "Route depuis Hargeisa (Escorte obligatoire)",
            conseils: "L'un des sites d'art rupestre les plus importants d'Afrique. Peintures néolithiques parfaitement conservées représentant des vaches, des chiens et des girafes",
            contact: "Somaliland Ministry of Tourism",
            hotel: "Ambassador Hotel Hargeisa",
            hotelLoc: "Près de l'aéroport, Hargeisa",
            hotelFonct: "Hôtel de référence, sécurisé et confortable pour les voyageurs internationaux",
            hotelContact: "+252 2 566666",
            hotelRestau: "Cuisine internationale et somalienne",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        mogadiscio_plage: {
            titre: "Plage de Lido",
            localisation: "Mogadiscio (District d'Abdiaziz)",
            periode: "Week-end (Vendredi)",
            acces: "Taxi sécurisé",
            conseils: "Symbole de la renaissance de la ville. Profitez de l'ambiance animée, des restaurants de fruits de mer et du football sur le sable",
            contact: "Mogadishu Municipality",
            hotel: "Decale Hotel",
            hotelLoc: "Zone aéroportuaire sécurisée",
            hotelFonct: "Hôtel moderne haut de gamme, prisé par les diplomates et les officiels",
            hotelContact: "+252 61 3330000",
            hotelRestau: "Terrasse panoramique sur l'océan",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        berbera: {
            titre: "Berbera",
            localisation: "Côte du Golfe d'Aden",
            periode: "Hiver (Chaleur extrême en été)",
            acces: "Route depuis Hargeisa ou vol charter",
            conseils: "Ancienne cité portuaire au charme ottoman. Idéal pour la plongée et les plages de sable blanc désertes",
            contact: "Berbera Tourism Board",
            hotel: "Damal Hotel Berbera",
            hotelLoc: "Bord de mer",
            hotelFonct: "Hôtel moderne avec vue sur le port et la mer",
            hotelContact: "+252 2 4444444",
            hotelRestau: "Poissons frais grillés",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        hargeisa: {
            titre: "Hargeisa",
            localisation: "Capitale du Somaliland",
            periode: "Toute l'année",
            acces: "Aéroport d'Egal (HGA)",
            conseils: "Visitez le marché aux chameaux tôt le matin et le mémorial de la guerre civile au centre-ville",
            contact: "Hargeisa City Admin",
            hotel: "Grand Haddrawi Hotel",
            hotelLoc: "Centre-ville",
            hotelFonct: "Hôtel spacieux avec jardins et service de qualité",
            hotelContact: "+252 63 4422222",
            hotelRestau: "Spécialités de chèvre somalienne",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        pount: {
            titre: "Côte du Puntland",
            localisation: "Nord-Est de la Somalie",
            periode: "Hiver",
            acces: "Vol vers Garowe ou Bosaso",
            conseils: "Découvrez les paysages sauvages de la corne de l'Afrique et les villages de pêcheurs traditionnels",
            contact: "Puntland Ministry of Wildlife and Tourism",
            hotel: "Juba Hotel Bosaso",
            hotelLoc: "Bosaso",
            hotelFonct: "Hôtel d'affaires confortable",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine arabe et somalienne",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        parc_kismayo: {
            titre: "Parc National de Kismayo",
            localisation: "Sud (Bas-Juba)",
            periode: "Saison sèche",
            acces: "Vol vers Kismayo (Accès limité)",
            conseils: "Ancien refuge de la faune sauvage d'Afrique de l'Est. En cours de réhabilitation",
            contact: "N/A",
            hotel: "Hôtels de Kismayo",
            hotelLoc: "Kismayo",
            hotelFonct: "Sommaire",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert local Jubaland",
            guideContact: "Via agence"
        },
        parc_lag_badana: {
            titre: "Parc National de Lag Badana",
            localisation: "Extrême Sud",
            periode: "Saison sèche",
            acces: "Expédition organisée (Sécurité à vérifier)",
            conseils: "Le premier parc national de Somalie. Paysages de brousse et côte vierge magnifique",
            contact: "N/A",
            hotel: "Bivouac expédition",
            hotelLoc: "Dans le parc",
            hotelFonct: "Rudimentaire",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide local obligatoire",
            guideContact: "Sur place"
        },
        parc_daallo: {
            titre: "Parc National de Daallo",
            localisation: "Monts Golis (Erigavo)",
            periode: "Toute l'année",
            acces: "4x4 depuis Erigavo",
            conseils: "Forêt de nuages abritant des espèces endémiques de genévriers et d'oiseaux rares. Vue plongeante sur le golfe d'Aden",
            contact: "N/A",
            hotel: "Erigavo Guesthouses",
            hotelLoc: "Erigavo",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        monts_cal_madow: {
            titre: "Monts Cal Madow",
            localisation: "Nord de la Somalie",
            periode: "Printemps",
            acces: "Randonnée expédition",
            conseils: "Massif montagneux calcaire riche en encens et en myrrhe sauvage",
            contact: "N/A",
            hotel: "Campement de montagne",
            hotelLoc: "Sur les hauteurs",
            hotelFonct: "Nature",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        chutes_lamadaya: {
            titre: "Chutes de Lamadaya",
            localisation: "Monts Cal Madow",
            periode: "Après la saison des pluies",
            acces: "Marche d'approche difficile",
            conseils: "Splendides cascades cachées dans les montagnes, offrant une fraîcheur inattendue",
            contact: "N/A",
            hotel: "N/A",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        bosaso: {
            titre: "Bosaso",
            localisation: "Puntland (Golfe d'Aden)",
            periode: "Hiver",
            acces: "Aéroport de Bosaso (BSA)",
            conseils: "Grande ville commerçante et portuaire, entourée de montagnes spectaculaires",
            contact: "N/A",
            hotel: "Gashaan Hotel",
            hotelLoc: "Bosaso",
            hotelFonct: "Moderne et fonctionnel",
            hotelContact: "Sur place",
            hotelRestau: "Plats de riz et poissons",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        garowe: {
            titre: "Garowe",
            localisation: "Centre (Capitale du Puntland)",
            periode: "Toute l'année",
            acces: "Aéroport de Garowe (GGR)",
            conseils: "Ville paisible et bien organisée, cœur administratif de la région",
            contact: "Garowe Municipality",
            hotel: "Grand Hotel Garowe",
            hotelLoc: "Garowe",
            hotelFonct: "Standard de qualité pour la région",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine somalienne",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        baidoa: {
            titre: "Baidoa",
            localisation: "Sud-Ouest",
            periode: "Saison sèche",
            acces: "Vol charter",
            conseils: "La 'Cité des Eaux'. Importante ville agricole et historique",
            contact: "N/A",
            hotel: "Hôtels locaux sécurisés",
            hotelLoc: "Baidoa",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "Produits de l'agriculture locale",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        merca: {
            titre: "Merca",
            localisation: "Bas-Shabelle",
            periode: "Toute l'année",
            acces: "Route depuis Mogadiscio (60km - Sécurité à vérifier)",
            conseils: "Ville côtière historique aux maisons blanches de style arabe, célèbre pour ses plages",
            contact: "N/A",
            hotel: "Hôtels de plage (proximité)",
            hotelLoc: "Merca",
            hotelFonct: "Sommaire",
            hotelContact: "N/A",
            hotelRestau: "Poissons de mer",
            guide: "Ahmed Warsame",
            guideContact: "ahmed@visitafrika.com"
        },
        hobyo: {
            titre: "Hobyo",
            localisation: "Mudug (Côte Centrale)",
            periode: "Saison sèche",
            acces: "Route ou bateau",
            conseils: "Ancien port historique du Sultanat d'Hobyo. Dépaysement garanti sur cette côte sauvage",
            contact: "N/A",
            hotel: "Hébergements traditionnels",
            hotelLoc: "Hobyo",
            hotelFonct: "Authentique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Warsame",
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
                    <i class="fas fa-shield-alt"></i>
                    <div><strong>Sécurité & Accès</strong><br>${data.acces}</div>
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon séjour</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="10" value="2" required>
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
                Demande envoyée ! Nos experts somaliens vous contacteront pour valider les conditions d'accès.
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
