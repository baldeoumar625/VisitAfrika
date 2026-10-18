/**
 * PROJET: VISIT AFRIKA
 * FICHIER: ouganda.js
 * DESCRIPTION: Script premium pour la page Ouganda.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Ouganda chargé.");

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
                    // Centrer sur l'Ouganda
                    map = L.map('ouganda-map').setView([1.3733, 32.2903], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Forêt de Bwindi (Gorilles)", lat: -1.05, lng: 29.70 },
                        { name: "Parc Queen Elizabeth", lat: -0.20, lng: 30.00 },
                        { name: "Murchison Falls", lat: 2.25, lng: 31.75 },
                        { name: "Montagnes Rwenzori", lat: 0.38, lng: 29.90 },
                        { name: "Source du Nil (Jinja)", lat: 0.43, lng: 33.20 },
                        { name: "Forêt de Kibale (Chimpanzés)", lat: 0.45, lng: 30.40 },
                        { name: "Lac Bunyonyi", lat: -1.28, lng: 29.92 },
                        { name: "Vallée de Kidepo", lat: 3.90, lng: 33.75 },
                        { name: "Mont Elgon", lat: 1.14, lng: 34.55 },
                        { name: "Îles Ssese (Lac Victoria)", lat: -0.45, lng: 32.25 },
                        { name: "Kampala (Capitale)", lat: 0.32, lng: 32.58 },
                        { name: "Entebbe (Jardin Botanique)", lat: 0.05, lng: 32.47 },
                        { name: "Chutes de Sipi", lat: 1.34, lng: 34.38 },
                        { name: "Lac Mburo", lat: -0.60, lng: 30.95 },
                        { name: "Fort Portal", lat: 0.65, lng: 30.27 }
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
        bwindi: {
            titre: "Bwindi Impenetrable National Park",
            localisation: "Sud-Ouest de l'Ouganda",
            periode: "Saison sèche (Juin-Août et Décembre-Février)",
            acces: "Route depuis Kampala (8-10h) ou vol interne vers Kisoro",
            conseils: "Permis de trekking gorilles à réserver 6 mois à l'avance. Prévoyez de bonnes chaussures de marche",
            contact: "Uganda Wildlife Authority (UWA)",
            hotel: "Sanctuary Gorilla Forest Camp",
            hotelLoc: "Dans le parc Bwindi",
            hotelFonct: "Lodge de luxe exclusif, le seul situé à l'intérieur du parc",
            hotelContact: "+256 312 243 140",
            hotelRestau: "Gastronomie raffinée en pleine jungle",
            guide: "Amos Tunde",
            guideContact: "amos@visitafrika.com"
        },
        queen_elizabeth: {
            titre: "Queen Elizabeth National Park",
            localisation: "Ouest de l'Ouganda",
            periode: "Janvier à Mars",
            acces: "Route bitumée depuis Kampala (6h)",
            conseils: "Ne manquez pas le canal de Kazinga en bateau et les lions grimpant aux arbres d'Ishasha",
            contact: "Uganda Tourism Board",
            hotel: "Mweya Safari Lodge",
            hotelLoc: "Péninsule de Mweya",
            hotelFonct: "Lodge iconique surplombant le canal de Kazinga",
            hotelContact: "+256 312 260 260",
            hotelRestau: "Restaurant panoramique",
            guide: "Amos Tunde",
            guideContact: "amos@visitafrika.com"
        },
        murchison: {
            titre: "Murchison Falls National Park",
            localisation: "Nord-Ouest de l'Ouganda",
            periode: "Décembre à Février",
            acces: "Route bitumée ou avion",
            conseils: "Faites la randonnée jusqu'au sommet des chutes pour ressentir la puissance du Nil Blanc",
            contact: "UWA Murchison",
            hotel: "Paraa Safari Lodge",
            hotelLoc: "Rive Nord du Nil",
            hotelFonct: "Style classique, grande piscine, vue sur le Nil",
            hotelContact: "+256 312 260 260",
            hotelRestau: "Buffets internationaux",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        rwenzori: {
            titre: "Montagnes Rwenzori (Montagnes de la Lune)",
            localisation: "Frontière avec la RD Congo",
            periode: "Janvier, Février, Juillet, Août",
            acces: "Base à Kasese",
            conseils: "Sommets enneigés sur l'équateur. Trekking technique exigeant une bonne condition physique",
            contact: "Rwenzori Mountaineering Services",
            hotel: "Equator Snow Lodge",
            hotelLoc: "Pied des montagnes",
            hotelFonct: "Eco-lodge en pierre, feux de cheminée",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine nourrissante pour randonneurs",
            guide: "Guide de montagne certifié",
            guideContact: "Obligatoire"
        },
        source_nil: {
            titre: "Source du Nil (Jinja)",
            localisation: "Lac Victoria, Jinja",
            periode: "Toute l'année",
            acces: "Route depuis Kampala (2h)",
            conseils: "Capitale de l'aventure : rafting de classe mondiale et saut à l'élastique sur le Nil",
            contact: "Adrift Uganda",
            hotel: "Wildwaters Lodge",
            hotelLoc: "Île privée sur le Nil",
            hotelFonct: "Luxe absolu au milieu des rapides",
            hotelContact: "+256 772 502 313",
            hotelRestau: "Cuisine fine face au fleuve",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        kibale: {
            titre: "Kibale National Park",
            localisation: "Près de Fort Portal",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "La plus grande densité de primates en Afrique, parfait pour l'observation des chimpanzés",
            contact: "Kibale Chimpanzee Project",
            hotel: "Kyaninga Lodge",
            hotelLoc: "Fort Portal (sur un lac de cratère)",
            hotelFonct: "Lodge spectaculaire tout en bois",
            hotelContact: "+256 772 999 750",
            hotelRestau: "Chef européen et local",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        lake_bunyonyi: {
            titre: "Lac Bunyonyi",
            localisation: "Sud-Ouest (Kabale)",
            periode: "Toute l'année",
            acces: "Route depuis Kabale",
            conseils: "Le 'Lac aux oiseaux', baignade sans danger (pas d'hippos ni de crocos) et pirogues traditionnelles",
            contact: "Tourism Kabale",
            hotel: "Birdnest @ Bunyonyi Resort",
            hotelLoc: "Bord du lac",
            hotelFonct: "Charme et confort, vue imprenable",
            hotelContact: "+256 772 506 331",
            hotelRestau: "Cuisine à base d'écrevisses locales",
            guide: "Amos Tunde",
            guideContact: "amos@visitafrika.com"
        },
        kidepo: {
            titre: "Kidepo Valley National Park",
            localisation: "Extrême Nord-Est (Karamoja)",
            periode: "Saison sèche",
            acces: "Avion léger (fortement recommandé) ou 12h de route",
            conseils: "Le parc le plus sauvage et isolé d'Afrique, paysages de savane à couper le souffle",
            contact: "UWA Kidepo",
            hotel: "Apoka Safari Lodge",
            hotelLoc: "Au cœur de la vallée",
            hotelFonct: "Luxe sauvage, baignoires extérieures creusées dans la roche",
            hotelContact: "+256 414 251 149",
            hotelRestau: "Dîners sous les étoiles",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        mont_elgon: {
            titre: "Mont Elgon National Park",
            localisation: "Frontière Est avec le Kenya",
            periode: "Saison sèche",
            acces: "Via Mbale",
            conseils: "Immense volcan éteint avec la plus grande caldeira du monde, cascades magnifiques",
            contact: "UWA Mbale",
            hotel: "Sipi River Lodge",
            hotelLoc: "Près des chutes de Sipi",
            hotelFonct: "Chalet confortable en bord de rivière",
            hotelContact: "+256 772 464 685",
            hotelRestau: "Cuisine biologique locale",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        iles_ssese: {
            titre: "Îles Ssese",
            localisation: "Lac Victoria (Nord-Ouest)",
            periode: "Toute l'année",
            acces: "Ferry depuis Entebbe ou Bukakata",
            conseils: "84 îles pour une détente absolue, plages de sable blanc et forêts tropicales",
            contact: "Ssese Islands Tourism Association",
            hotel: "Brovad Sands Lodge",
            hotelLoc: "Île de Bugala",
            hotelFonct: "Resort de plage tropical",
            hotelContact: "+256 772 443 650",
            hotelRestau: "Buffet marin",
            guide: "N/A",
            guideContact: "N/A"
        },
        kampala: {
            titre: "Kampala",
            localisation: "Centre",
            periode: "Toute l'année",
            acces: "Capitale",
            conseils: "Visitez les Tombeaux des Rois du Buganda (Kasubi) et profitez de la vie nocturne",
            contact: "Kampala Capital City Authority",
            hotel: "Kampala Serena Hotel",
            hotelLoc: "Centre Kampala",
            hotelFonct: "Luxe 5 étoiles international, jardins tropicaux",
            hotelContact: "+256 414 309 000",
            hotelRestau: "The Pearl of Africa (Gastronomie)",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        entebbe: {
            titre: "Entebbe",
            localisation: "Péninsule du Lac Victoria",
            periode: "Toute l'année",
            acces: "Aéroport international d'Entebbe (EBB)",
            conseils: "Visitez le Jardin Botanique (lieu de tournage de Tarzan) et le sanctuaire des chimpanzés de Ngamba",
            contact: "Uganda Wildlife Education Centre",
            hotel: "The Boma Hotel",
            hotelLoc: "Entebbe",
            hotelFonct: "Hôtel de charme colonial",
            hotelContact: "+256 772 410 400",
            hotelRestau: "Restaurant de jardin",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        chutes_sipi: {
            titre: "Chutes de Sipi",
            localisation: "Contreforts du Mont Elgon",
            periode: "Toute l'année",
            acces: "Route (5h de Kampala)",
            conseils: "Série de trois chutes spectaculaires, visitez les plantations de café arabica locales",
            contact: "Sipi Falls Tourism",
            hotel: "Sipi River Lodge",
            hotelLoc: "Sipi",
            hotelFonct: "Lodge de charme",
            hotelContact: "+256 772 464 685",
            hotelRestau: "Produits locaux frais",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
        },
        lake_mburo: {
            titre: "Lake Mburo National Park",
            localisation: "Ouest (sur la route de Bwindi)",
            periode: "Saison sèche",
            acces: "Route bitumée (4h de Kampala)",
            conseils: "Le seul parc du Sud avec des zèbres, idéal pour les safaris à pied ou à cheval",
            contact: "UWA Mburo",
            hotel: "Mihingo Lodge",
            hotelLoc: "Sommet d'une colline rocheuse",
            hotelFonct: "Tentes de luxe incroyables, vue à 360 degrés",
            hotelContact: "+256 772 411 501",
            hotelRestau: "Cuisine internationale",
            guide: "Amos Tunde",
            guideContact: "amos@visitafrika.com"
        },
        fort_portal: {
            titre: "Fort Portal",
            localisation: "Ouest",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Porte d'entrée des Rwenzori et du Kibale, entourée de lacs de cratère",
            contact: "N/A",
            hotel: "Mountains of the Moon Hotel",
            hotelLoc: "Fort Portal",
            hotelFonct: "Classique et spacieux",
            hotelContact: "+256 483 422 251",
            hotelRestau: "Spécialités ougandaises",
            guide: "Sarah Namukasa",
            guideContact: "sarah@visitafrika.com"
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
                    <i class="fas fa-plane-departure"></i>
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon aventure</h4>
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
                Demande envoyée ! Nos experts ougandais vous contacteront.
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
