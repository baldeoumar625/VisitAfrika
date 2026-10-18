/**
 * PROJET: VISIT AFRIKA
 * FICHIER: zimbabwe.js
 * DESCRIPTION: Script premium pour le Zimbabwe.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Zimbabwe chargé.");

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
                    // Centrer sur le Zimbabwe
                    map = L.map('zimbabwe-map').setView([-19.0154, 29.1549], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Chutes Victoria (Mosi-oa-Tunya)", lat: -17.9244, lng: 25.8572 },
                        { name: "Parc National de Hwange", lat: -18.7300, lng: 26.9500 },
                        { name: "Mana Pools (UNESCO)", lat: -15.7500, lng: 29.3300 },
                        { name: "Grand Zimbabwe (Ruines)", lat: -20.2675, lng: 30.9333 },
                        { name: "Monts Matobo (UNESCO)", lat: -20.5000, lng: 28.5000 },
                        { name: "Lac Kariba", lat: -16.8600, lng: 28.1400 },
                        { name: "Parc National de Nyanga", lat: -18.2500, lng: 32.7500 },
                        { name: "Harare (Capitale)", lat: -17.8236, lng: 31.0492 },
                        { name: "Bulawayo", lat: -20.1500, lng: 28.5833 },
                        { name: "Parc National de Gonarezhou", lat: -21.6667, lng: 31.6667 },
                        { name: "Chutes de Mutarazi", lat: -18.2461, lng: 32.7936 },
                        { name: "Monts Chimanimani", lat: -19.7800, lng: 32.9700 },
                        { name: "Parc National de Matusadona", lat: -16.8333, lng: 28.5000 },
                        { name: "Grottes de Chinhoyi", lat: -17.3500, lng: 30.1333 },
                        { name: "Montagnes Vumba", lat: -19.1167, lng: 32.7833 }
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
        victoria_falls_zimbabwe: {
            titre: "Chutes Victoria",
            localisation: "Victoria Falls Town, Zimbabwe",
            periode: "Mars à Mai (Spectacle total) / Juin à Août (Vue claire)",
            acces: "Aéroport de Victoria Falls (VFA)",
            conseils: "Le côté Zimbabwe offre les meilleures vues panoramiques sur la face principale des chutes. Faites une marche guidée dans la forêt tropicale humide créée par les embruns",
            contact: "Zimbabwe Parks and Wildlife (ZimParks)",
            hotel: "Victoria Falls Hotel",
            hotelLoc: "Victoria Falls Town",
            hotelFonct: "Le 'Grand Old Lady', hôtel historique de luxe avec vue sur le pont des chutes",
            hotelContact: "+263 213 2844751",
            hotelRestau: "The Livingstone Room",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        hwange: {
            titre: "Parc National de Hwange",
            localisation: "Nord-Ouest du Zimbabwe",
            periode: "Juillet à Octobre (Observation exceptionnelle)",
            acces: "Route depuis Vic Falls (2h) ou vol charter",
            conseils: "Plus grand parc du Zimbabwe. Célèbre pour ses immenses troupeaux d'éléphants et ses nombreux prédateurs",
            contact: "Hwange National Park Office",
            hotel: "Somalisa Camp (African Bush Camps)",
            hotelLoc: "Concession privée, Hwange",
            hotelFonct: "Camp de tentes de luxe avec une piscine 'éléphant' iconique au bord d'un point d'eau",
            hotelContact: "+263 242 745311",
            hotelRestau: "Cuisine de safari créative",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        mana_pools: {
            titre: "Mana Pools",
            localisation: "Vallée du Zambèze (UNESCO)",
            periode: "Saison sèche",
            acces: "Vol charter ou bateau",
            conseils: "L'un des parcs les plus sauvages d'Afrique. Safari à pied guidé et canoë sur le Zambèze. Observez les éléphants se dresser sur leurs pattes arrière",
            contact: "ZimParks Mana Pools",
            hotel: "Nyamatusi Camp",
            hotelLoc: "Bord du fleuve Zambèze",
            hotelFonct: "Lodge de luxe éco-responsable offrant une immersion totale dans la nature",
            hotelContact: "Via agence",
            hotelRestau: "Gastronomie de brousse",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        great_zimbabwe: {
            titre: "Ruines du Grand Zimbabwe",
            localisation: "Masvingo",
            periode: "Toute l'année",
            acces: "Route (4h d'Harare)",
            conseils: "Plus grandes structures médiévales en pierre d'Afrique subsaharienne. Visitez la Grande Enceinte et l'Acropole pour comprendre l'histoire de l'empire Monomotapa",
            contact: "National Museums and Monuments of Zimbabwe",
            hotel: "Lodge at the Ancient City",
            hotelLoc: "Près des ruines",
            hotelFonct: "Architecture inspirée des ruines, décor unique et majestueux",
            hotelContact: "+263 39 262311",
            hotelRestau: "Spécialités zimbabwéennes",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        matobo: {
            titre: "Monts Matobo",
            localisation: "Près de Bulawayo",
            periode: "Toute l'année",
            acces: "Route (30 min de Bulawayo)",
            conseils: "Paysage de rochers granitiques en équilibre. Visitez la tombe de Cecil Rhodes et pistez les rhinocéros blancs à pied avec des guides experts",
            contact: "ZimParks Matobo",
            hotel: "Amalinda Lodge",
            hotelLoc: "Matobo Hills",
            hotelFonct: "Lodge luxueux intégré dans les grottes de granit",
            hotelContact: "+263 29 2243214",
            hotelRestau: "Cuisine locale raffinée",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        lake_kariba_zimbabwe: {
            titre: "Lac Kariba",
            localisation: "Nord du pays",
            periode: "Toute l'année",
            acces: "Vol charter ou route vers Kariba Town",
            conseils: "Le plus grand lac artificiel au monde. Admirez les couchers de soleil spectaculaires avec les silhouettes d'arbres morts émergeant de l'eau",
            contact: "N/A",
            hotel: "Bumi Hills Safari Lodge",
            hotelLoc: "Surplombant le lac",
            hotelFonct: "Vue panoramique époustouflante sur l'immensité du lac",
            hotelContact: "+263 77 212 6982",
            hotelRestau: "Terrasse panoramique",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        nyanga: {
            titre: "Parc National de Nyanga",
            localisation: "Eastern Highlands",
            periode: "Printemps / Été",
            acces: "Route depuis Mutare ou Harare",
            conseils: "Zone de montagnes fraîches et de cascades. Ascension du Mont Nyangani, le point culminant du Zimbabwe",
            contact: "N/A",
            hotel: "Troutbeck Resort",
            hotelLoc: "Nyanga",
            hotelFonct: "Style auberge de montagne, chaleureux et convivial",
            hotelContact: "+263 29 280 4435",
            hotelRestau: "Truites fraîches de la région",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        harare: {
            titre: "Harare",
            localisation: "Capitale",
            periode: "Septembre/Octobre (Jacarandas en fleurs)",
            acces: "Aéroport international Robert Gabriel Mugabe (HRE)",
            conseils: "Visitez le jardin botanique et profitez de la scène artistique contemporaine à la Galerie Nationale",
            contact: "Harare Tourism",
            hotel: "Meikles Hotel",
            hotelLoc: "Centre-ville, Harare",
            hotelFonct: "Hôtel 5 étoiles classique, symbole d'élégance au Zimbabwe",
            hotelContact: "+263 242 707721",
            hotelRestau: "La Fontaine Grill Room",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        bulawayo: {
            titre: "Bulawayo",
            localisation: "Sud-Ouest",
            periode: "Toute l'année",
            acces: "Aéroport Joshua Mqabuko Nkomo (BUQ)",
            conseils: "Ville au charme colonial préservé. Visitez le Natural History Museum, l'un des meilleurs du continent",
            contact: "N/A",
            hotel: "The Nesbitt Castle",
            hotelLoc: "Bulawayo",
            hotelFonct: "Un véritable château transformé en hôtel de charme",
            hotelContact: "+263 29 2282735",
            hotelRestau: "Dining Hall",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        gonarezhou: {
            titre: "Parc National de Gonarezhou",
            localisation: "Sud-Est (Frontière Mozambique/Afrique du Sud)",
            periode: "Saison sèche",
            acces: "4x4 uniquement ou vol charter",
            conseils: "Célèbre pour les falaises rouges de Chilojo. Un parc immense, sauvage et authentique",
            contact: "Gonarezhou Conservation Trust",
            hotel: "Singita Pamushana Lodge",
            hotelLoc: "Réserve de Malilangwe (proximité)",
            hotelFonct: "L'apogée du luxe en pleine brousse, architecture spectaculaire",
            hotelContact: "+27 21 683 3300",
            hotelRestau: "Fine dining",
            guide: "Expert safari Singita",
            guideContact: "Sur place"
        },
        chutes_mutarazi: {
            titre: "Chutes de Mutarazi",
            localisation: "Eastern Highlands",
            periode: "Toute l'année",
            acces: "Route via Nyanga",
            conseils: "Plus hautes chutes du Zimbabwe. Marchez sur le Skywalk ou faites du Skyline (tyrolienne) au-dessus du gouffre",
            contact: "Far and Wide Zimbabwe",
            hotel: "Skydeck Mountain Lodge",
            hotelLoc: "Sommet des chutes",
            hotelFonct: "Lodge exclusif avec une vue vertigineuse",
            hotelContact: "Sur place",
            hotelRestau: "N/A",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        parc_chimanimani: {
            titre: "Monts Chimanimani",
            localisation: "Sud de l'Eastern Highlands",
            periode: "Avril à Octobre",
            acces: "Route vers Chimanimani Village",
            conseils: "Paradis des randonneurs. Paysages de pics déchiquetés, de cascades et de piscines naturelles",
            contact: "N/A",
            hotel: "Frog & Fern Cottages",
            hotelLoc: "Chimanimani",
            hotelFonct: "Hébergement rustique et plein de charme",
            hotelContact: "+263 77 221 0055",
            hotelRestau: "Cuisine maison",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        parc_matusadona: {
            titre: "Parc National de Matusadona",
            localisation: "Rives sud du Lac Kariba",
            periode: "Saison sèche",
            acces: "Bateau depuis Kariba",
            conseils: "Observation unique de la faune sauvage depuis l'eau. Réputé pour ses lions et ses éléphants",
            contact: "African Parks Matusadona",
            hotel: "Changa Safari Camp",
            hotelLoc: "Péninsule de Matusadona",
            hotelFonct: "Campement de luxe alliant brousse et plage de lac",
            hotelContact: "+263 78 271 1522",
            hotelRestau: "Dîners de mer et terre",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        grottes_chinhoyi: {
            titre: "Grottes de Chinhoyi",
            localisation: "Sur la route d'Harare à Kariba",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Admirez le 'Sleeping Pool' aux eaux d'un bleu cobalt incroyable. Site de plongée technique réputé",
            contact: "N/A",
            hotel: "Chinhoyi Caves Motel",
            hotelLoc: "Chinhoyi",
            hotelFonct: "Simple et pratique pour une halte",
            hotelContact: "Sur place",
            hotelRestau: "International",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
        },
        vumba_mountains: {
            titre: "Montagnes Vumba",
            localisation: "Près de Mutare",
            periode: "Toute l'année",
            acces: "Route depuis Mutare",
            conseils: "Connues pour leurs jardins botaniques et leurs vues sur le Mozambique. Ambiance de forêt mystique",
            contact: "N/A",
            hotel: "Leopard Rock Hotel",
            hotelLoc: "Vumba",
            hotelFonct: "Hôtel historique avec l'un des plus beaux parcours de golf d'Afrique",
            hotelContact: "+263 20 60115",
            hotelRestau: "Gastronomie internationale",
            guide: "Lovemore Mpofu",
            guideContact: "lovemore@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon séjour</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="15" value="2" required>
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
                Demande envoyée ! Nos experts zimbabwéens vous contacteront.
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