/**
 * PROJET: VISIT AFRIKA
 * FICHIER: centrafrique.js
 * DESCRIPTION: Script premium pour la République Centrafricaine.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Centrafrique chargé.");

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
                    // Centrer sur la Centrafrique
                    map = L.map('centrafrique-map').setView([6.6111, 20.9394], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Réserve de Dzanga-Sangha", lat: 2.92, lng: 16.20 },
                        { name: "Chutes de Boali", lat: 4.80, lng: 18.15 },
                        { name: "Bangui (Capitale)", lat: 4.36, lng: 18.58 },
                        { name: "Parc National de Manovo-Gounda St Floris", lat: 9.00, lng: 21.50 },
                        { name: "Parc National de Bamingui-Bangoran", lat: 8.00, lng: 20.00 },
                        { name: "Réserve de Zemongo", lat: 6.00, lng: 25.00 },
                        { name: "Chutes de la Mbi", lat: 5.00, lng: 17.50 },
                        { name: "Parc National de Dzanga-Ndoki", lat: 2.45, lng: 16.30 },
                        { name: "Rivière Sangha", lat: 3.50, lng: 16.20 },
                        { name: "Baie de Dzanga (Bai)", lat: 2.90, lng: 16.25 },
                        { name: "Parc National André-Félix", lat: 9.50, lng: 23.00 },
                        { name: "Grottes de Bimbo", lat: 4.25, lng: 18.41 },
                        { name: "Berbérati", lat: 4.26, lng: 15.79 },
                        { name: "Bouar (Mégalithes)", lat: 5.95, lng: 15.60 },
                        { name: "Mbaïki", lat: 3.87, lng: 17.98 }
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
        dzanga_sangha: {
            titre: "Réserve de Dzanga-Sangha",
            localisation: "Sud-Ouest de la RCA (Bayanga)",
            periode: "Décembre à Mars (Saison sèche)",
            acces: "Petit avion depuis Bangui ou route (Longue expédition)",
            conseils: "L'un des meilleurs endroits au monde pour observer les gorilles des plaines et les éléphants de forêt. Découvrez la culture des Pygmées BaAka",
            contact: "WWF Dzanga-Sangha Management",
            hotel: "Sangha Lodge",
            hotelLoc: "Bayanga",
            hotelFonct: "Eco-lodge de renommée mondiale, immersion totale dans la forêt tropicale",
            hotelContact: "Via agence spécialisée",
            hotelRestau: "Cuisine forestière créative",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        boali: {
            titre: "Chutes de Boali",
            localisation: "Préfecture de l'Ombella-M'Poko",
            periode: "Toute l'année (Spectaculaire en saison des pluies)",
            acces: "Route bitumée (1h30 de Bangui)",
            conseils: "Les plus belles chutes du pays (50m de haut). Idéal pour une excursion à la journée depuis la capitale",
            contact: "Office National du Tourisme de RCA",
            hotel: "Hôtel des Chutes de Boali",
            hotelLoc: "Surplombant les chutes",
            hotelFonct: "Hôtel panoramique offrant une vue exceptionnelle sur les cascades",
            hotelContact: "+236 75 50 00 00",
            hotelRestau: "Capitaine braisé (Poisson du fleuve)",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        bangui: {
            titre: "Bangui (La Coquette)",
            localisation: "Bord du fleuve Oubangui",
            periode: "Toute l'année",
            acces: "Aéroport international Bangui M'Poko (BGF)",
            conseils: "Visitez le Marché Central, la Cathédrale Notre-Dame et profitez d'un coucher de soleil sur les rives de l'Oubangui",
            contact: "Mairie de Bangui",
            hotel: "Ledger Plaza Bangui",
            hotelLoc: "Avenue de l'Indépendance",
            hotelFonct: "Hôtel 5 étoiles, le plus luxueux et sécurisé de la ville",
            hotelContact: "+236 21 61 00 00",
            hotelRestau: "Le Sommet (International)",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        manovo: {
            titre: "Parc Manovo-Gounda St Floris",
            localisation: "Nord du pays",
            periode: "Janvier à Mai",
            acces: "Avion privé uniquement (Accès limité)",
            conseils: "Classé UNESCO. Immense savane abritant hippopotames, lions et de nombreux oiseaux. En cours de réhabilitation",
            contact: "N/A",
            hotel: "Campements de safari (fermés temporairement)",
            hotelLoc: "Dans le parc",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert parcs nationaux",
            guideContact: "Via agence"
        },
        bamingui: {
            titre: "Parc National de Bamingui-Bangoran",
            localisation: "Nord-Centre",
            periode: "Saison sèche",
            acces: "4x4",
            conseils: "Réserve de biosphère riche en faune sauvage africaine, située dans une zone de transition savane-forêt",
            contact: "N/A",
            hotel: "Campements de chasse et vision",
            hotelLoc: "Zone tampon",
            hotelFonct: "Rustique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        zako: {
            titre: "Réserve de Zemongo",
            localisation: "Est de la RCA",
            periode: "Saison sèche",
            acces: "Expédition complexe",
            conseils: "Vaste zone de savane arborée peu explorée, refuge pour de nombreuses espèces protégées",
            contact: "N/A",
            hotel: "Bivouac expédition",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Aventure totale",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide local spécialisé",
            guideContact: "Via agence"
        },
        chutes_mbi: {
            titre: "Chutes de la Mbi",
            localisation: "Sud de la RCA",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Magnifiques cascades en pleine forêt équatoriale, lieu paisible et naturel",
            contact: "N/A",
            hotel: "Hébergements à Mbaïki (proximité)",
            hotelLoc: "Mbaïki",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        parc_dzanga_ndoki: {
            titre: "Parc National de Dzanga-Ndoki",
            localisation: "Extrême Sud-Ouest",
            periode: "Novembre à Mars",
            acces: "Bateau ou Avion",
            conseils: "Sanctuaire vierge pour les éléphants de forêt et les gorilles. Un joyau de la biodiversité mondiale",
            contact: "WWF RCA",
            hotel: "Doli Lodge",
            hotelLoc: "Bayanga",
            hotelFonct: "Lodge de bois magnifique au bord du fleuve Sangha",
            hotelContact: "+236 72 50 12 12",
            hotelRestau: "Cuisine locale et européenne",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        riviere_sangha: {
            titre: "Rivière Sangha",
            localisation: "Région de la Sangha-Mbaéré",
            periode: "Toute l'année",
            acces: "Pirogue motorisée",
            conseils: "Navigation paisible à travers la forêt primaire. Observez la vie sauvage sur les berges",
            contact: "N/A",
            hotel: "Nuitée sur pirogue aménagée",
            hotelLoc: "Sur le fleuve",
            hotelFonct: "Expérience unique",
            hotelContact: "Via Sangha Lodge",
            hotelRestau: "Repas à bord",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        baie_dzanga: {
            titre: "Baie de Dzanga (Dzanga Bai)",
            localisation: "Dzanga-Sangha",
            periode: "Toute l'année (Après-midi pour les éléphants)",
            acces: "Marche guidée (45 min)",
            conseils: "Clairière marécageuse où se rassemblent des dizaines d'éléphants de forêt. Spectacle naturel inoubliable depuis la plateforme d'observation",
            contact: "N/A",
            hotel: "Sangha Lodge",
            hotelLoc: "Bayanga",
            hotelFonct: "Luxe forestier",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        parc_andre_felix: {
            titre: "Parc National André-Félix",
            localisation: "Nord-Est",
            periode: "Saison sèche",
            acces: "4x4 difficile",
            conseils: "Vaste parc de savane soudanaise, très sauvage et peu visité",
            contact: "N/A",
            hotel: "N/A",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert RCA Nord",
            guideContact: "Sur place"
        },
        grottes_bimbo: {
            titre: "Grottes de Bimbo",
            localisation: "Près de Bangui",
            periode: "Toute l'année",
            acces: "Taxi",
            conseils: "Grottes naturelles à proximité de la capitale, site historique et spirituel local",
            contact: "N/A",
            hotel: "Hôtels de Bangui",
            hotelLoc: "Bangui",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        berberati: {
            titre: "Berbérati",
            localisation: "Ouest de la RCA",
            periode: "Toute l'année",
            acces: "Route ou vol charter",
            conseils: "Deuxième ville du pays, centre économique lié à l'industrie du diamant",
            contact: "N/A",
            hotel: "Hôtels de Berbérati",
            hotelLoc: "Berbérati",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        bouar: {
            titre: "Bouar (Mégalithes)",
            localisation: "Nana-Mambéré",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Découvrez les 'Tajunu', d'immenses mégalithes datant de plus de 2000 ans disposés en cercles mystérieux",
            contact: "N/A",
            hotel: "Hébergements de mission ou simples",
            hotelLoc: "Bouar",
            hotelFonct: "Sommaire",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
        },
        mbaiki: {
            titre: "Mbaïki",
            localisation: "Sud de Bangui (Lobaye)",
            periode: "Toute l'année",
            acces: "Route (2h de Bangui)",
            conseils: "Cœur de la région caféière et forestière. Point de départ pour rencontrer les communautés BaAka",
            contact: "N/A",
            hotel: "Gîtes locaux",
            hotelLoc: "Mbaïki",
            hotelFonct: "Authentique",
            hotelContact: "N/A",
            hotelRestau: "Produits de la forêt",
            guide: "Michel Ndokanda",
            guideContact: "michel@visitafrika.com"
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
                    <div><strong>Accès & Sécurité</strong><br>${data.acces}</div>
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
                        <input type="number" name="personnes" min="1" max="8" value="2" required>
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
                Demande envoyée ! Nos experts centrafricains vous contacteront pour valider les conditions d'accès.
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
