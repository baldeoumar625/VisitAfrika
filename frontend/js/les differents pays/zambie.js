/**
 * PROJET: VISIT AFRIKA
 * FICHIER: zambie.js
 * DESCRIPTION: Script premium pour la Zambie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Zambie chargé.");

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
                    // Centrer sur la Zambie
                    map = L.map('zambie-map').setView([-13.1339, 27.8493], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Chutes Victoria (Mosi-oa-Tunya)", lat: -17.9244, lng: 25.8572 },
                        { name: "Parc National de South Luangwa", lat: -13.1000, lng: 31.5000 },
                        { name: "Parc National de Lower Zambezi", lat: -15.5000, lng: 29.5000 },
                        { name: "Parc National de Kafue", lat: -15.0000, lng: 26.0000 },
                        { name: "Lac Kariba", lat: -16.5228, lng: 28.7692 },
                        { name: "Livingstone", lat: -17.8500, lng: 25.8500 },
                        { name: "Lusaka (Capitale)", lat: -15.4167, lng: 28.2833 },
                        { name: "Bangweulu Wetlands", lat: -11.6000, lng: 30.1000 },
                        { name: "Parc National de Kasanka", lat: -12.5500, lng: 30.2500 },
                        { name: "Liuwa Plain", lat: -14.6000, lng: 22.6000 },
                        { name: "Parc National Mosi-oa-Tunya", lat: -17.8700, lng: 25.8200 },
                        { name: "North Luangwa National Park", lat: -11.7500, lng: 32.2500 },
                        { name: "Parc National de Blue Lagoon", lat: -15.4500, lng: 27.3500 },
                        { name: "Chutes de Ngonye", lat: -16.6500, lng: 23.5700 },
                        { name: "Chimfunshi Wildlife Orphanage", lat: -12.3500, lng: 27.5000 }
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
        victoria_falls_zambia: {
            titre: "Chutes Victoria (Côté Zambie)",
            localisation: "Livingstone, Zambie",
            periode: "Mars à Mai (Débit maximum) / Octobre à Décembre (Piscine du Diable)",
            acces: "Aéroport de Livingstone (LVI)",
            conseils: "Traversez le pont Knife Edge pour une vue spectaculaire. En saison sèche, tentez l'expérience unique de la 'Devil's Pool' au bord du gouffre",
            contact: "Zambia Tourism Agency",
            hotel: "The Royal Livingstone Hotel by Anantara",
            hotelLoc: "Bord du Zambèze, Parc Mosi-oa-Tunya",
            hotelFonct: "Luxe colonial avec accès direct et illimité aux chutes pour les résidents",
            hotelContact: "+260 213 321122",
            hotelRestau: "The Old Drift Restaurant",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        south_luangwa: {
            titre: "Parc National de South Luangwa",
            localisation: "Est de la Zambie",
            periode: "Juin à Octobre (Safari à pied)",
            acces: "Vol de Lusaka vers Mfuwe",
            conseils: "Le sanctuaire du léopard. Pionnier du safari à pied. Une immersion totale et authentique dans la brousse africaine",
            contact: "Department of National Parks and Wildlife",
            hotel: "Chinzombo (Time + Tide)",
            hotelLoc: "Mfuwe",
            hotelFonct: "Design ultra-moderne et luxueux avec une vue imprenable sur la rivière Luangwa",
            hotelContact: "Via Time + Tide",
            hotelRestau: "Cuisine de brousse gastronomique",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        lower_zambezi: {
            titre: "Parc National de Lower Zambezi",
            localisation: "Opposé au parc Mana Pools (Zimbabwe)",
            periode: "Mai à Octobre",
            acces: "Petit avion de Lusaka ou bateau",
            conseils: "Combinez safari en 4x4 et canoë sur le fleuve. Observez les éléphants traverser le fleuve entre les deux pays",
            contact: "Lower Zambezi Conservation Trust",
            hotel: "Royal Zambezi Lodge",
            hotelLoc: "Bord du fleuve Zambèze",
            hotelFonct: "Lodge de luxe proposant des safaris terrestres et aquatiques d'exception",
            hotelContact: "+260 211 254480",
            hotelRestau: "Dîner sur un banc de sable",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        kafue: {
            titre: "Parc National de Kafue",
            localisation: "Ouest de la Zambie",
            periode: "Août à Octobre (Busanga Plains)",
            acces: "Route ou vol charter",
            conseils: "L'un des plus grands parcs d'Afrique. Visitez les plaines de Busanga pour une expérience de safari sauvage et exclusive",
            contact: "Kafue Park Admin",
            hotel: "Shumba Camp (Wilderness Safaris)",
            hotelLoc: "Busanga Plains",
            hotelFonct: "Luxe de brousse sur pilotis au milieu des plaines inondables",
            hotelContact: "+260 211 250504",
            hotelRestau: "Plats internationaux raffinés",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        lake_kariba_zambia: {
            titre: "Lac Kariba",
            localisation: "Frontière Zambie/Zimbabwe",
            periode: "Toute l'année",
            acces: "Route depuis Lusaka (3h)",
            conseils: "Profitez d'une croisière au coucher du soleil ou d'un séjour en houseboat. Idéal pour la pêche au poisson tigre",
            contact: "N/A",
            hotel: "Lake Kariba Inns",
            hotelLoc: "Siavonga",
            hotelFonct: "Hôtel avec vue panoramique sur l'immense lac artificiel",
            hotelContact: "+260 211 511148",
            hotelRestau: "Poissons du lac frais",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        livingstone: {
            titre: "Livingstone",
            localisation: "Sud de la Zambie",
            periode: "Toute l'année",
            acces: "Train, Route ou Avion",
            conseils: "Capitale de l'aventure : rafting sur le Zambèze, saut à l'élastique et survol des chutes en hélicoptère",
            contact: "Livingstone Tourism Association",
            hotel: "The River Club",
            hotelLoc: "Bord du Zambèze, en amont des chutes",
            hotelFonct: "Hôtel historique de charme avec une vue imprenable sur le fleuve",
            hotelContact: "+260 213 327451",
            hotelRestau: "Gastronomie zambienne",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        lusaka: {
            titre: "Lusaka",
            localisation: "Centre (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport Kenneth Kaunda (LUN)",
            conseils: "Visitez le marché de Lusaka City pour l'artisanat et l'orphelinat d'éléphants de Lilayi",
            contact: "Zambia Tourism Lusaka",
            hotel: "Latitude 15 Degrees",
            hotelLoc: "Quartier résidentiel, Lusaka",
            hotelFonct: "Boutique hôtel chic et artistique, rendez-vous de la jet-set locale",
            hotelContact: "+260 211 268802",
            hotelRestau: "The Other Side",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        bangweulu: {
            titre: "Bangweulu Wetlands",
            localisation: "Nord-Est",
            periode: "Mai à Juillet",
            acces: "Vol charter",
            conseils: "Cherchez le rare Bec-en-sabot du Nil dans ces marais immenses. Un paradis pour les ornithologues",
            contact: "African Parks Bangweulu",
            hotel: "Shoebill Island Camp",
            hotelLoc: "Bangweulu",
            hotelFonct: "Campement rustique et authentique pour une immersion totale",
            hotelContact: "Via African Parks",
            hotelRestau: "N/A",
            guide: "Guide spécialisé oiseaux",
            guideContact: "Sur place"
        },
        kasanka: {
            titre: "Parc National de Kasanka",
            localisation: "Province de Serenje",
            periode: "Octobre à Décembre (Migration des chauves-souris)",
            acces: "Route (6-7h de Lusaka)",
            conseils: "Assistez à la plus grande migration de mammifères au monde : 10 millions de chauves-souris frugivores",
            contact: "Kasanka Trust",
            hotel: "Wasa Lodge",
            hotelLoc: "Dans le parc",
            hotelFonct: "Lodge géré par le trust, revenus reversés à la conservation",
            hotelContact: "Via Kasanka Trust",
            hotelRestau: "Cuisine familiale",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        liuwa_plain: {
            titre: "Liuwa Plain",
            localisation: "Extrême Ouest (Barotseland)",
            periode: "Novembre (Migration des gnous)",
            acces: "Vol charter de Lusaka",
            conseils: "Vivez la deuxième plus grande migration de gnous d'Afrique dans un paysage de plaines infinies et sauvages",
            contact: "African Parks Liuwa",
            hotel: "King Lewanika Lodge (Time + Tide)",
            hotelLoc: "Liuwa Plain",
            hotelFonct: "Le seul lodge permanent du parc, luxe exceptionnel et exclusivité",
            hotelContact: "Via Time + Tide",
            hotelRestau: "Haute gastronomie de brousse",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        parc_mosi_oa_tunya: {
            titre: "Parc National Mosi-oa-Tunya",
            localisation: "Livingstone",
            periode: "Toute l'année",
            acces: "Taxi depuis Livingstone",
            conseils: "Petit parc abritant les seuls rhinocéros blancs de Zambie. Safari à pied avec rangers possible",
            contact: "DNPW Livingstone",
            hotel: "Avani Victoria Falls Resort",
            hotelLoc: "Livingstone",
            hotelFonct: "Style africain coloré, ambiance familiale et festive",
            hotelContact: "+260 213 321122",
            hotelRestau: "The Theatre",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        parc_north_luangwa: {
            titre: "North Luangwa National Park",
            localisation: "Nord du South Luangwa",
            periode: "Juin à Octobre",
            acces: "Vol charter uniquement",
            conseils: "Le summum de l'aventure. Pas de routes, uniquement des safaris à pied guidés dans une zone très protégée",
            contact: "Frankfurt Zoological Society",
            hotel: "Mwaleshi Camp",
            hotelLoc: "North Luangwa",
            hotelFonct: "Campement saisonnier rustique mais haut de gamme, axé sur la marche",
            hotelContact: "Via Remote Africa Safaris",
            hotelRestau: "Cuisine au feu de bois",
            guide: "Guide de marche expert",
            guideContact: "Sur place"
        },
        parc_blue_lagoon: {
            titre: "Parc National de Blue Lagoon",
            localisation: "Près de Lusaka",
            periode: "Saison des pluies",
            acces: "Route",
            conseils: "Magnifique plaine inondable abritant des milliers de cobes de Lechwe de Kafue",
            contact: "N/A",
            hotel: "Hôtels de Lusaka (excursion journée)",
            hotelLoc: "Lusaka",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        chutes_ngonye: {
            titre: "Chutes de Ngonye (Sioma)",
            localisation: "Ouest de la Zambie",
            periode: "Juin à Août",
            acces: "Route vers Senanga",
            conseils: "Moins hautes mais plus larges que les Victoria Falls, ces chutes sont un trésor caché du fleuve Zambèze",
            contact: "N/A",
            hotel: "Sioma Camp",
            hotelLoc: "Bord des chutes de Ngonye",
            hotelFonct: "Campement de tentes safari simple et convivial",
            hotelContact: "Sur place",
            hotelRestau: "Local",
            guide: "Banda Mwamba",
            guideContact: "banda@visitafrika.com"
        },
        chimfunshi: {
            titre: "Chimfunshi Wildlife Orphanage",
            localisation: "Près de Chingola",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "L'un des plus grands sanctuaires de chimpanzés au monde. Idéal pour une étape éducative",
            contact: "Chimfunshi Trust",
            hotel: "Protea Hotel by Marriott Chingola",
            hotelLoc: "Chingola",
            hotelFonct: "Hôtel standard de qualité pour la zone",
            hotelContact: "+260 212 312810",
            hotelRestau: "International",
            guide: "Expert sanctuaire",
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon expédition</h4>
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
                Demande envoyée ! Nos experts zambiens vous contacteront.
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