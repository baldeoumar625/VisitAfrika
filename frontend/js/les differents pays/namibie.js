/**
 * PROJET: VISIT AFRIKA
 * FICHIER: namibie.js
 * DESCRIPTION: Script premium pour la Namibie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Namibie chargé.");

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
                    // Centrer sur la Namibie
                    map = L.map('namibie-map').setView([-22.9576, 18.4904], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Sossusvlei (Dunes de sel)", lat: -24.72, lng: 15.34 },
                        { name: "Parc National d'Etosha", lat: -18.85, lng: 15.90 },
                        { name: "Fish River Canyon", lat: -27.61, lng: 17.58 },
                        { name: "Skeleton Coast", lat: -20.00, lng: 13.00 },
                        { name: "Swakopmund", lat: -22.67, lng: 14.53 },
                        { name: "Damaraland", lat: -20.50, lng: 14.50 },
                        { name: "Kaokoland (Himbas)", lat: -18.00, lng: 13.50 },
                        { name: "Lüderitz", lat: -26.65, lng: 15.15 },
                        { name: "Bande de Caprivi", lat: -17.80, lng: 23.30 },
                        { name: "Windhoek (Capitale)", lat: -22.56, lng: 17.08 },
                        { name: "Parc du Waterberg", lat: -20.42, lng: 17.24 },
                        { name: "Parc National Mudumu", lat: -18.15, lng: 23.40 },
                        { name: "Parc National Khaudum", lat: -18.40, lng: 20.80 },
                        { name: "Twyfelfontein (UNESCO)", lat: -20.59, lng: 14.37 },
                        { name: "Walvis Bay", lat: -22.95, lng: 14.50 }
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
        sossusvlei: {
            titre: "Sossusvlei & Deadvlei",
            localisation: "Désert du Namib",
            periode: "Mars à Mai (Températures clémentes)",
            acces: "4x4 depuis Sesriem",
            conseils: "Admirez le lever du soleil sur Big Daddy ou Dune 45. Visitez Deadvlei pour ses acacias morts vieux de 900 ans sur fond de dunes rouges",
            contact: "Namib-Naukluft National Park",
            hotel: "Little Kulala",
            hotelLoc: "Réserve Kulala, Sossusvlei",
            hotelFonct: "Lodge de luxe avec toit panoramique pour dormir sous les étoiles",
            hotelContact: "+264 61 274 500",
            hotelRestau: "Gastronomie du désert",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        etosha: {
            titre: "Parc National d'Etosha",
            localisation: "Nord de la Namibie",
            periode: "Mai à Septembre (Saison sèche pour l'observation)",
            acces: "Route bitumée depuis Windhoek (5-6h)",
            conseils: "Attendez près des points d'eau illuminés la nuit. C'est l'un des meilleurs endroits pour voir des rhinocéros noirs et des lions",
            contact: "Etosha Park Management",
            hotel: "Onguma The Fort",
            hotelLoc: "Bordure Est d'Etosha",
            hotelFonct: "Lodge inspiré des forts marocains avec vue sur le point d'eau Fischer's Pan",
            hotelContact: "+264 61 237 142",
            hotelRestau: "Cuisine internationale et gibier",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        fish_river_canyon: {
            titre: "Fish River Canyon",
            localisation: "Extrême Sud",
            periode: "Mai à Août (Randonnée autorisée)",
            acces: "Route via Keetmanshoop",
            conseils: "Deuxième plus grand canyon au monde. Profitez de la vue à Hobas et détendez-vous aux sources chaudes de Ai-Ais",
            contact: "N/A",
            hotel: "Fish River Lodge",
            hotelLoc: "Sur le bord du canyon",
            hotelFonct: "Seul lodge situé sur la lèvre même du canyon, vue spectaculaire",
            hotelContact: "+264 61 228 104",
            hotelRestau: "Repas panoramiques",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        skeleton_coast: {
            titre: "Skeleton Coast",
            localisation: "Côte Nord-Ouest",
            periode: "Octobre à Mars",
            acces: "Survol aérien recommandé ou 4x4",
            conseils: "Découvrez les épaves de navires et les immenses colonies d'otaries à Cape Cross. Un paysage de désolation magnifique",
            contact: "Skeleton Coast Park Admin",
            hotel: "Shipwreck Lodge",
            hotelLoc: "Möwe Bay",
            hotelFonct: "Cabines de luxe inspirées des épaves de bateaux, immersion totale",
            hotelContact: "+264 61 400 510",
            hotelRestau: "Spécialités marines",
            guide: "Expert safari côtier",
            guideContact: "Via agence"
        },
        swakopmund: {
            titre: "Swakopmund",
            localisation: "Côte Atlantique",
            periode: "Toute l'année",
            acces: "Route ou petit avion depuis Windhoek",
            conseils: "Ambiance coloniale allemande. Ville idéale pour les activités extrêmes : skydiving, sandboarding et kayak avec les otaries",
            contact: "Swakopmund Tourism",
            hotel: "Strand Hotel Swakopmund",
            hotelLoc: "Môle de Swakopmund",
            hotelFonct: "Hôtel haut de gamme sur la plage, centre de la vie sociale",
            hotelContact: "+264 64 411 4000",
            hotelRestau: "Ocean Cellar (Huîtres de Walvis Bay)",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        damaraland: {
            titre: "Damaraland",
            localisation: "Nord-Ouest",
            periode: "Toute l'année",
            acces: "4x4",
            conseils: "Partez à la recherche des éléphants du désert et visitez le massif du Brandberg (Peinture 'Dame Blanche')",
            contact: "N/A",
            hotel: "Mowani Mountain Camp",
            hotelLoc: "Entre d'immenses blocs de granit",
            hotelFonct: "Lodges en forme de dômes intégrés dans les rochers",
            hotelContact: "+264 61 232 009",
            hotelRestau: "Gastronomie raffinée",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        kaokoland: {
            titre: "Kaokoland",
            localisation: "Extrême Nord-Ouest",
            periode: "Mai à Septembre",
            acces: "Expédition 4x4 uniquement",
            conseils: "Terre ancestrale des Himbas. Visitez les chutes d'Epupa sur le fleuve Kunene à la frontière angolaise",
            contact: "N/A",
            hotel: "Okahirongo Elephant Lodge",
            hotelLoc: "Purros",
            hotelFonct: "Luxe minimaliste au milieu de nulle part",
            hotelContact: "+264 65 685 018",
            hotelRestau: "Cuisine italo-namibienne",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        luderitz: {
            titre: "Lüderitz & Kolmanskop",
            localisation: "Sud de la côte",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Visitez la ville fantôme ensablée de Kolmanskop, ancien joyau de l'industrie diamantaire",
            contact: "Kolmanskop Ghost Town Tour",
            hotel: "Lüderitz Nest Hotel",
            hotelLoc: "Bord de mer",
            hotelFonct: "Hôtel moderne face à l'Atlantique",
            hotelContact: "+264 63 204 000",
            hotelRestau: "Langoustes fraîches",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        caprivi: {
            titre: "Bande de Caprivi (Zambezi Region)",
            localisation: "Nord-Est",
            periode: "Juillet à Octobre",
            acces: "Route ou vol vers Katima Mulilo",
            conseils: "Le côté verdoyant de la Namibie. Safari en bateau sur les fleuves Okavango et Kwando pour voir hippos et crocos",
            contact: "N/A",
            hotel: "Chobe Water Villas",
            hotelLoc: "Face au Botswana",
            hotelFonct: "Luxe exclusif avec vue sur le parc Chobe",
            hotelContact: "+264 66 250 000",
            hotelRestau: "International",
            guide: "Expert rivière Zambèze",
            guideContact: "Sur place"
        },
        windhoek: {
            titre: "Windhoek",
            localisation: "Centre (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international Hosea Kutako (WDH)",
            conseils: "Découvrez la Christuskirche et dégustez une bière locale au Joe's Beerhouse",
            contact: "Windhoek Tourism Office",
            hotel: "The Olive Exclusive All-Suite Hotel",
            hotelLoc: "Windhoek",
            hotelFonct: "Boutique hôtel ultra-luxe, décoration inspirée des régions namibiennes",
            hotelContact: "+264 61 239 199",
            hotelRestau: "The Olive Restaurant",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        parc_waterberg: {
            titre: "Waterberg Plateau Park",
            localisation: "Nord de Windhoek",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Plateau de grès rouge offrant de superbes randonnées et refuge pour espèces menacées",
            contact: "N/A",
            hotel: "Waterberg Wilderness",
            hotelLoc: "Pied du plateau",
            hotelFonct: "Eco-lodge géré de façon durable",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        parc_mudumu: {
            titre: "Parc National Mudumu",
            localisation: "Caprivi",
            periode: "Saison sèche",
            acces: "4x4 recommandé",
            conseils: "Sanctuaire sauvage pour les éléphants et les buffles, loin des foules",
            contact: "N/A",
            hotel: "Namushasha River Lodge",
            hotelLoc: "Bord du fleuve Kwando",
            hotelFonct: "Vue magnifique, ambiance sereine",
            hotelContact: "+264 61 427 200",
            hotelRestau: "International",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        parc_khaudum: {
            titre: "Parc National Khaudum",
            localisation: "Nord-Est",
            periode: "Saison sèche",
            acces: "Expédition 4x4 uniquement (min 2 véhicules)",
            conseils: "Le parc le plus sauvage de Namibie. Pour les aventuriers en quête de solitude absolue",
            contact: "N/A",
            hotel: "Sijwa Lodge",
            hotelLoc: "Proximité Khaudum",
            hotelFonct: "Eco-lodge communautaire",
            hotelContact: "Via agence",
            hotelRestau: "N/A",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        twyfelfontein: {
            titre: "Twyfelfontein",
            localisation: "Damaraland",
            periode: "Toute l'année",
            acces: "Route/Piste",
            conseils: "Site UNESCO. L'une des plus grandes concentrations de gravures rupestres d'Afrique, vieilles de 2000 à 6000 ans",
            contact: "National Heritage Council of Namibia",
            hotel: "Twyfelfontein Country Lodge",
            hotelLoc: "Damaraland",
            hotelFonct: "Architecture en pierre intégrée au paysage",
            hotelContact: "+264 61 374 750",
            hotelRestau: "Buffet international",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
        },
        walvis_bay: {
            titre: "Walvis Bay",
            localisation: "Côte Ouest",
            periode: "Toute l'année",
            acces: "Route depuis Swakopmund (30 min)",
            conseils: "Lagune riche en flamants roses. Excursion indispensable vers Sandwich Harbour (dunes rencontrant l'océan)",
            contact: "Walvis Bay Tourism",
            hotel: "Pelican Point Lodge",
            hotelLoc: "Phare de Pelican Point",
            hotelFonct: "Hôtel unique dans un phare, entouré d'otaries et de chacals",
            hotelContact: "+264 81 204 4305",
            hotelRestau: "Fruits de mer",
            guide: "Hendrik Meyer",
            guideContact: "hendrik@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon expédition</h4>
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
                Demande envoyée ! Nos experts namibiens vous contacteront.
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
