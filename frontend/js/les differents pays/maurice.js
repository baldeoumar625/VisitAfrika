/**
 * PROJET: VISIT AFRIKA
 * FICHIER: maurice.js
 * DESCRIPTION: Script premium pour l'Île Maurice.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Maurice chargé.");

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
                    // Centrer sur Maurice
                    map = L.map('maurice-map').setView([-20.3484, 57.5522], 10);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Le Morne Brabant (UNESCO)", lat: -20.45, lng: 57.32 },
                        { name: "Chamarel (Terre des 7 couleurs)", lat: -20.43, lng: 57.38 },
                        { name: "Jardin de Pamplemousses", lat: -20.11, lng: 57.58 },
                        { name: "Grand Bassin (Ganga Talao)", lat: -20.41, lng: 57.49 },
                        { name: "Île aux Cerfs", lat: -20.27, lng: 57.80 },
                        { name: "Flic-en-Flac", lat: -20.28, lng: 57.36 },
                        { name: "Le Pouce (Montagne)", lat: -20.19, lng: 57.53 },
                        { name: "Parc des Gorges de la Rivière Noire", lat: -20.41, lng: 57.41 },
                        { name: "Port-Louis (Capitale)", lat: -20.16, lng: 57.50 },
                        { name: "Cap Malheureux", lat: -19.98, lng: 57.61 },
                        { name: "Trou aux Biches", lat: -20.03, lng: 57.55 },
                        { name: "Blue Bay (Parc marin)", lat: -20.44, lng: 57.71 },
                        { name: "Mahébourg", lat: -20.41, lng: 57.70 },
                        { name: "Grand Baie", lat: -20.01, lng: 57.58 },
                        { name: "Tamarin", lat: -20.32, lng: 57.37 }
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
        morne_brabant: {
            titre: "Le Morne Brabant",
            localisation: "Péninsule du Sud-Ouest",
            periode: "Mai à Décembre",
            acces: "Route vers le village du Morne",
            conseils: "Montagne sacrée classée UNESCO. L'ascension offre une vue imprenable sur la forêt et le lagon (cascade sous-marine). Accompagnement recommandé",
            contact: "Le Morne Heritage Trust Fund",
            hotel: "JW Marriott Mauritius Resort",
            hotelLoc: "Plage du Morne",
            hotelFonct: "Luxe colonial au pied du Morne, idéal pour le kitesurf et la détente",
            hotelContact: "+230 403 9000",
            hotelRestau: "Le Manoir Dining Room",
            guide: "Vikash Ramloll",
            guideContact: "vikash@visitafrika.com"
        },
        chamarel: {
            titre: "Chamarel (Terres des 7 couleurs)",
            localisation: "Sud-Ouest",
            periode: "Journée ensoleillée pour les couleurs",
            acces: "Route sinueuse panoramique",
            conseils: "Découvrez les dunes de terre colorée, la cascade de Chamarel (100m) et visitez la Rhumerie de Chamarel à proximité",
            contact: "Ebony Forest Reserve",
            hotel: "Lakaz Chamarel Exclusive Lodge",
            hotelLoc: "Hauteurs de Chamarel",
            hotelFonct: "Boutique hôtel éco-chic entouré de montagnes et de nature",
            hotelContact: "+230 483 4240",
            hotelRestau: "Cuisine de terroir mauricienne",
            guide: "Vikash Ramloll",
            guideContact: "vikash@visitafrika.com"
        },
        pamplemousses: {
            titre: "Jardin de Pamplemousses",
            localisation: "Nord de l'île",
            periode: "Toute l'année",
            acces: "Bus ou Taxi depuis Port-Louis ou le Nord",
            conseils: "L'un des plus anciens jardins botaniques de l'hémisphère Sud. Ne manquez pas les nénuphars géants et les palmiers talipots",
            contact: "SSR Botanic Garden",
            hotel: "Trou aux Biches Beachcomber",
            hotelLoc: "Trou aux Biches (proximité)",
            hotelFonct: "Resort mythique avec suites et villas en bord de mer",
            hotelContact: "+230 204 6800",
            hotelRestau: "L'Oasis",
            guide: "Vikash Ramloll",
            guideContact: "vikash@visitafrika.com"
        },
        grand_bassin: {
            titre: "Grand Bassin (Ganga Talao)",
            localisation: "Savanne (Plateau Central)",
            periode: "Maha Shivaratree (Février/Mars)",
            acces: "Route",
            conseils: "Lac sacré hindou entouré de temples. Lieu de pèlerinage paisible. Couvrez vos épaules lors de la visite des temples",
            contact: "Mauritius Sanatan Dharma Temples Federation",
            hotel: "Shanti Maurice Resort & Spa",
            hotelLoc: "Chemin Grenier (Sud)",
            hotelFonct: "Luxe discret et bien-être face à l'océan",
            hotelContact: "+230 603 7200",
            hotelRestau: "Stars (Cuisine de l'océan Indien)",
            guide: "Vikash Ramloll",
            guideContact: "vikash@visitafrika.com"
        },
        ile_aux_cerfs: {
            titre: "Île aux Cerfs",
            localisation: "Lagon de Trou d'Eau Douce (Est)",
            periode: "Toute l'année",
            acces: "Navette bateau ou catamaran depuis Trou d'Eau Douce",
            conseils: "Paradis tropical pour les sports nautiques et le farniente. Dispose de l'un des plus beaux parcours de golf au monde",
            contact: "Sun Resorts",
            hotel: "Shangri-La Le Touessrok",
            hotelLoc: "Trou d'Eau Douce",
            hotelFonct: "Luxe iconique avec accès exclusif à l'îlot Mangénie",
            hotelContact: "+233 402 7400",
            hotelRestau: "Safran (Cuisine indienne raffinée)",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        flic_en_flac: {
            titre: "Flic-en-Flac",
            localisation: "Côte Ouest",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Longue plage de sable blanc protégée par le récif. Idéal pour admirer le coucher du soleil et profiter des restaurants",
            contact: "N/A",
            hotel: "Sugar Beach Mauritius",
            hotelLoc: "Flic-en-Flac",
            hotelFonct: "Style plantation classique, chic et animé",
            hotelContact: "+230 403 3300",
            hotelRestau: "Buddha-Bar Beach",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        le_pouce: {
            titre: "Le Pouce",
            localisation: "Moka (Centre)",
            periode: "Saison sèche",
            acces: "Point de départ à Saint-Pierre",
            conseils: "Ascension de 2h offrant la meilleure vue à 360° sur l'île, incluant Port-Louis et les îles du Nord",
            contact: "N/A",
            hotel: "Hôtels de Port-Louis",
            hotelLoc: "Port-Louis",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Vikash Ramloll",
            guideContact: "vikash@visitafrika.com"
        },
        parc_black_river: {
            titre: "Black River Gorges",
            localisation: "Sud-Ouest",
            periode: "Juin à Octobre",
            acces: "Route via Pétrin ou Rivière Noire",
            conseils: "Le poumon vert de Maurice. Plus de 60km de sentiers de randonnée à travers la forêt endémique",
            contact: "National Parks and Conservation Service",
            hotel: "Heritage Le Telfair Golf & Wellness",
            hotelLoc: "Bel Ombre (Sud)",
            hotelFonct: "Inspiration architecturale du 19ème siècle, domaine magnifique",
            hotelContact: "+230 601 5500",
            hotelRestau: "Le Château de Bel Ombre",
            guide: "Vikash Ramloll",
            guideContact: "vikash@visitafrika.com"
        },
        port_louis: {
            titre: "Port-Louis",
            localisation: "Nord-Ouest (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international SSR (MRU)",
            conseils: "Visitez le marché central pour les saveurs locales et le front de mer Caudan Waterfront pour le shopping",
            contact: "City Council of Port Louis",
            hotel: "Labordonnais Waterfront Hotel",
            hotelLoc: "Caudan Waterfront, Port-Louis",
            hotelFonct: "Hôtel d'affaires et de luxe au cœur du port",
            hotelContact: "+230 202 4000",
            hotelRestau: "La Rose des Vents",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        cap_malheureux: {
            titre: "Cap Malheureux",
            localisation: "Extrême Nord",
            periode: "Toute l'année",
            acces: "Route côtière",
            conseils: "Célèbre pour son église au toit rouge (Notre-Dame Auxiliatrice) face à l'île du Coin de Mire",
            contact: "N/A",
            hotel: "Paradise Cove Boutique Hotel",
            hotelLoc: "Anse la Raie (Cap Malheureux)",
            hotelFonct: "Hôtel intime et romantique 'Adults Only'",
            hotelContact: "+230 204 4000",
            hotelRestau: "The Dining Room",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        trou_aux_biches: {
            titre: "Trou aux Biches",
            localisation: "Nord",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "L'une des plus belles plages pour la baignade et le snorkeling avec les tortues",
            contact: "N/A",
            hotel: "Trou aux Biches Beachcomber",
            hotelLoc: "Trou aux Biches",
            hotelFonct: "Luxe tropical et élégance",
            hotelContact: "+230 204 6800",
            hotelRestau: "La Caravelle",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        blue_bay: {
            titre: "Blue Bay",
            localisation: "Sud-Est",
            periode: "Toute l'année",
            acces: "Proche de l'aéroport",
            conseils: "Parc marin protégé. Faites une excursion en bateau à fond de verre pour admirer les coraux géants",
            contact: "Marine Park Centre",
            hotel: "Anantara Iko Mauritius Resort",
            hotelLoc: "Le Chaland, Blue Bay",
            hotelFonct: "Nouveau resort de luxe intégré dans la nature côtière",
            hotelContact: "+230 651 5000",
            hotelRestau: "Sea.Fire.Salt",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        mahebourg: {
            titre: "Mahébourg",
            localisation: "Sud-Est",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Village historique au charme authentique. Visitez le musée naval et profitez du marché le lundi",
            contact: "Mahébourg Museum",
            hotel: "Preskil Island Resort",
            hotelLoc: "Pointe Jêrome, Mahébourg",
            hotelFonct: "Ambiance insulaire chic sur une presqu'île privée",
            hotelContact: "+230 604 1000",
            hotelRestau: "Medley",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        grand_baie: {
            titre: "Grand Baie",
            localisation: "Nord",
            periode: "Toute l'année",
            acces: "Route principale du Nord",
            conseils: "Le centre touristique par excellence. Shopping, vie nocturne et point de départ des croisières vers les îles",
            contact: "N/A",
            hotel: "Royal Palm Beachcomber Luxury",
            hotelLoc: "Grand Baie",
            hotelFonct: "L'adresse la plus prestigieuse de l'île Maurice",
            hotelContact: "+230 209 8300",
            hotelRestau: "La Goélette",
            guide: "Sophie Laval",
            guideContact: "sophie@visitafrika.com"
        },
        tamarin: {
            titre: "Tamarin",
            localisation: "Côte Ouest",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Célèbre pour ses salines et son spot de surf. Possibilité d'observer les dauphins dans la baie tôt le matin",
            contact: "N/A",
            hotel: "Dinarobin Beachcomber",
            hotelLoc: "Péninsule du Morne / Tamarin",
            hotelFonct: "Hôtel de luxe au pied de la montagne, suites magnifiques",
            hotelContact: "+230 401 4900",
            hotelRestau: "Umami",
            guide: "Vikash Ramloll",
            guideContact: "vikash@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon séjour</h4>
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
                Demande envoyée ! Nos experts mauriciens vous contacteront.
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
