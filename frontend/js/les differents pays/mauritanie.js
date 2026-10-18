/**
 * PROJET: VISIT AFRIKA
 * FICHIER: mauritanie.js
 * DESCRIPTION: Script premium pour la page Mauritanie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Mauritanie chargé.");

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
                    // Centrer sur la Mauritanie
                    map = L.map('mauritanie-map').setView([21.0079, -10.9650], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Chinguetti (Cité Savante)", lat: 20.46, lng: -12.36 },
                        { name: "Banc d'Arguin (UNESCO)", lat: 20.24, lng: -16.29 },
                        { name: "Ouadane (Cité de Pierre)", lat: 20.93, lng: -11.62 },
                        { name: "Oasis de Terjit", lat: 20.25, lng: -13.10 },
                        { name: "Ben Amera (Monolithe)", lat: 21.25, lng: -13.68 },
                        { name: "Port de Pêche (Nouakchott)", lat: 18.10, lng: -16.03 },
                        { name: "Tichitt", lat: 18.44, lng: -9.49 },
                        { name: "Structure de Richat (Oeil du Sahara)", lat: 21.12, lng: -11.40 },
                        { name: "Nouadhibou", lat: 20.94, lng: -17.06 },
                        { name: "Atar (Capitale de l'Adrar)", lat: 20.51, lng: -13.05 },
                        { name: "Vallée Blanche", lat: 20.65, lng: -13.20 },
                        { name: "Parc du Diawling", lat: 16.45, lng: -16.35 },
                        { name: "Koumbi Saleh (Ruines)", lat: 15.77, lng: -7.97 },
                        { name: "Zouerate", lat: 22.74, lng: -12.47 },
                        { name: "Walata (Oualata)", lat: 17.30, lng: -7.02 }
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
        chinguetti: {
            titre: "Chinguetti",
            localisation: "Plateau de l'Adrar",
            periode: "Novembre à Mars (Saison fraîche)",
            acces: "Route bitumée puis piste depuis Atar (2h)",
            conseils: "Visitez les bibliothèques de manuscrits anciens et admirez le coucher de soleil sur les dunes",
            contact: "Office National du Tourisme Mauritanien",
            hotel: "Auberge Eden",
            hotelLoc: "Vieux Chinguetti",
            hotelFonct: "Style traditionnel en pierre, accueil chaleureux",
            hotelContact: "+222 46 41 12 12",
            hotelRestau: "Couscous mauritanien et thé traditionnel",
            guide: "Sidi Ould Ahmed",
            guideContact: "sidi@visitafrika.com"
        },
        banc_arguin: {
            titre: "Parc National du Banc d'Arguin",
            localisation: "Côte Atlantique",
            periode: "Décembre à Février (Oiseaux migrateurs)",
            acces: "4x4 obligatoire depuis Nouakchott ou Nouadhibou",
            conseils: "Faites une sortie en lanche (voilier traditionnel Imraguen) pour observer les oiseaux",
            contact: "PNBA (Parc National du Banc d'Arguin)",
            hotel: "Campement d'Iouik",
            hotelLoc: "Village d'Iouik",
            hotelFonct: "Hébergement basique en tentes traditionnelles",
            hotelContact: "Sur place",
            hotelRestau: "Poisson mulet frais fumé",
            guide: "Pêcheur Imraguen local",
            guideContact: "Via PNBA"
        },
        ouadane: {
            titre: "Ouadane",
            localisation: "Adrar",
            periode: "Novembre à Mars",
            acces: "Piste depuis Chinguetti (3h de 4x4)",
            conseils: "Ville fantôme inscrite à l'UNESCO, explorez les ruines de la cité de pierre",
            contact: "Mairie d'Ouadane",
            hotel: "Auberge Vasque",
            hotelLoc: "Ouadane",
            hotelFonct: "Architecture locale, vue sur l'oued",
            hotelContact: "Sur place",
            hotelRestau: "Plats nomades",
            guide: "Sidi Ould Ahmed",
            guideContact: "sidi@visitafrika.com"
        },
        terjit: {
            titre: "Oasis de Terjit",
            localisation: "Près d'Atar",
            periode: "Toute l'année (Un havre de fraîcheur)",
            acces: "Goudron puis courte piste",
            conseils: "Baignez-vous dans les sources d'eau chaude et froide sous les palmiers",
            contact: "N/A",
            hotel: "Campement Terjit",
            hotelLoc: "Dans l'oasis",
            hotelFonct: "Tentes mauritaniennes (Khaimas) sous les palmiers",
            hotelContact: "Sur place",
            hotelRestau: "Tajine de dromadaire",
            guide: "Sidi Ould Ahmed",
            guideContact: "sidi@visitafrika.com"
        },
        ben_amera: {
            titre: "Ben Amera",
            localisation: "Désert de l'Adrar (Près de la voie ferrée)",
            periode: "Hiver",
            acces: "4x4 uniquement ou par le train du minerai de fer",
            conseils: "Le deuxième plus grand monolithe du monde après l'Ayers Rock",
            contact: "Expéditions Adrar",
            hotel: "Bivouac nomade",
            hotelLoc: "Au pied du monolithe",
            hotelFonct: "Aventure pure sous les étoiles",
            hotelContact: "N/A",
            hotelRestau: "Pain de sable traditionnel",
            guide: "Guide nomade certifié",
            guideContact: "Obligatoire"
        },
        nouakchott_port: {
            titre: "Port de Pêche de Nouakchott",
            localisation: "Nouakchott (Littoral)",
            periode: "Toute l'année (Arrivée des pirogues vers 17h)",
            acces: "Taxi depuis le centre",
            conseils: "Spectacle incroyable de centaines de pirogues colorées revenant de la mer",
            contact: "Port Autonome de Nouakchott",
            hotel: "Hôtel Azalaï Marhaba",
            hotelLoc: "Centre-ville Nouakchott",
            hotelFonct: "Confort international, business et loisirs",
            hotelContact: "+222 45 29 50 50",
            hotelRestau: "Buffet international",
            guide: "N/A",
            guideContact: "N/A"
        },
        tichitt: {
            titre: "Tichitt",
            localisation: "Plateau du Tagant",
            periode: "Saison fraîche",
            acces: "Piste longue (4x4 obligatoire)",
            conseils: "Ville médiévale construite en pierre volcanique, isolée et magnifique",
            contact: "Office local Tichitt",
            hotel: "Maison d'hôtes traditionnelle",
            hotelLoc: "Tichitt Centre",
            hotelFonct: "Immersion culturelle",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale du désert",
            guide: "Guide Tagant",
            guideContact: "Sur place"
        },
        oeil_du_sahara: {
            titre: "Structure de Richat (Oeil du Sahara)",
            localisation: "Près d'Ouadane",
            periode: "Hiver",
            acces: "Expédition 4x4",
            conseils: "Formation géologique énigmatique visible depuis l'espace, impressionnante au sol",
            contact: "N/A",
            hotel: "Hôtels d'Ouadane",
            hotelLoc: "Ouadane (base)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Sidi Ould Ahmed",
            guideContact: "sidi@visitafrika.com"
        },
        nouadhibou: {
            titre: "Nouadhibou",
            localisation: "Péninsule du Cap Blanc",
            periode: "Toute l'année",
            acces: "Aéroport de Nouadhibou / Route",
            conseils: "Visitez le cimetière d'épaves de navires et observez les phoques moines",
            contact: "Autorité de la Zone Franche",
            hotel: "Hôtel Free Zone",
            hotelLoc: "Nouadhibou",
            hotelFonct: "Moderne et fonctionnel",
            hotelContact: "Sur place",
            hotelRestau: "Langoustes et crustacés",
            guide: "N/A",
            guideContact: "N/A"
        },
        atar: {
            titre: "Atar",
            localisation: "Région de l'Adrar",
            periode: "Toute l'année",
            acces: "Vols directs (en saison) ou route",
            conseils: "Point de départ de toutes les aventures dans l'Adrar, visitez le marché",
            contact: "Office Régional du Tourisme Atar",
            hotel: "Auberge des Caravanes",
            hotelLoc: "Atar",
            hotelFonct: "Lieu de rencontre historique des voyageurs",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine de l'Adrar",
            guide: "Sidi Ould Ahmed",
            guideContact: "sidi@visitafrika.com"
        },
        vallee_blanche: {
            titre: "Vallée Blanche",
            localisation: "Près d'Atar",
            periode: "Hiver",
            acces: "4x4 uniquement",
            conseils: "Dunes de sable blanc éclatant serpentant entre les montagnes noires",
            contact: "N/A",
            hotel: "Bivouac mobile",
            hotelLoc: "Vallée Blanche",
            hotelFonct: "Nuit magique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Sidi Ould Ahmed",
            guideContact: "sidi@visitafrika.com"
        },
        diawling: {
            titre: "Parc National du Diawling",
            localisation: "Sud, près de la frontière sénégalaise",
            periode: "Novembre à Mars",
            acces: "Route depuis Rosso",
            conseils: "Zone humide cruciale pour les oiseaux, paysages deltaïques",
            contact: "PND (Parc National du Diawling)",
            hotel: "Hébergements à Rosso",
            hotelLoc: "Rosso",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        koumbi_saleh: {
            titre: "Koumbi Saleh",
            localisation: "Sud-Est (Hodh Ech Chargui)",
            periode: "Saison fraîche",
            acces: "Expédition (Très éloigné)",
            conseils: "Ancienne capitale de l'Empire du Ghana, site archéologique majeur",
            contact: "Ministère de la Culture",
            hotel: "N/A (Campement expédition)",
            hotelLoc: "Site",
            hotelFonct: "Aventure",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Archéologue ou guide expert",
            guideContact: "Via Nouakchott"
        },
        zouerate: {
            titre: "Zouerate",
            localisation: "Nord",
            periode: "Toute l'année",
            acces: "Train du désert ou route longue",
            conseils: "Ville minière de fer, point de départ ou d'arrivée du train le plus long du monde",
            contact: "SNIM",
            hotel: "Hôtel SNIM",
            hotelLoc: "Zouerate",
            hotelFonct: "Standard industriel",
            hotelContact: "Sur place",
            hotelRestau: "International",
            guide: "N/A",
            guideContact: "N/A"
        },
        walata: {
            titre: "Oualata (Walata)",
            localisation: "Extrême Est",
            periode: "Hiver",
            acces: "4x4 depuis Néma",
            conseils: "La 'Cité rouge', célèbre pour ses façades décorées à la main par les femmes",
            contact: "Association de sauvegarde d'Oualata",
            hotel: "Auberge de Oualata",
            hotelLoc: "Vieux Walata",
            hotelFonct: "Magnifique maison restaurée",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités de l'Est mauritanien",
            guide: "Guide local Oualata",
            guideContact: "Sur place"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon expédition</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="10" value="1" required>
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
                Demande envoyée ! Nos experts mauritaniens vous contacteront.
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
