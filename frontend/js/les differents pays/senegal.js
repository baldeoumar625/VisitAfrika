/**
 * PROJET: VISIT AFRIKA
 * FICHIER: senegal.js
 * DESCRIPTION: Script premium pour le Sénégal.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Sénégal chargé.");

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
                    // Centrer sur le Sénégal
                    map = L.map('senegal-map').setView([14.4974, -14.4524], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Île de Gorée (UNESCO)", lat: 14.6682, lng: -17.4000 },
                        { name: "Lac Rose (Retba)", lat: 14.8385, lng: -17.2285 },
                        { name: "Saint-Louis (Vieille ville)", lat: 16.0245, lng: -16.5047 },
                        { name: "Casamance (Ziguinchor)", lat: 12.5833, lng: -16.2719 },
                        { name: "Delta du Saloum", lat: 13.9167, lng: -16.5000 },
                        { name: "Réserve de Fathala", lat: 13.6288, lng: -16.4867 },
                        { name: "Réserve de Bandia", lat: 14.5833, lng: -17.0167 },
                        { name: "Désert de Lompoul", lat: 15.4500, lng: -16.6667 },
                        { name: "Monument de la Renaissance (Dakar)", lat: 14.7219, lng: -17.4950 },
                        { name: "Touba (Grande Mosquée)", lat: 14.8631, lng: -15.8864 },
                        { name: "Joal-Fadiouth (Île aux coquillages)", lat: 14.1625, lng: -16.8125 },
                        { name: "Parc du Niokolo-Koba", lat: 13.0667, lng: -12.7167 },
                        { name: "Mbour (Port de pêche)", lat: 14.4100, lng: -16.9600 },
                        { name: "Saly Portudal", lat: 14.4400, lng: -16.9800 },
                        { name: "Cap Skirring", lat: 12.3500, lng: -16.7333 }
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
        "gore-e": {
            titre: "Île de Gorée",
            localisation: "Baie de Dakar",
            periode: "Toute l'année (Eviter les week-ends pour plus de calme)",
            acces: "Chaloupe depuis le port de Dakar (20 min)",
            conseils: "Lieu de mémoire bouleversant. Visitez la Maison des Esclaves et flânez dans les ruelles fleuries sans voitures",
            contact: "Syndicat d'initiative de Gorée",
            hotel: "Hôtel Chevalier de Boufflers",
            hotelLoc: "Face au port de Gorée",
            hotelFonct: "Hôtel historique de charme avec une terrasse surplombant la mer",
            hotelContact: "+221 33 822 53 64",
            hotelRestau: "Poissons braisés et spécialités locales",
            guide: "Moussa Diop",
            guideContact: "moussa@visitafrika.com"
        },
        lac_rose: {
            titre: "Lac Rose (Lac Retba)",
            localisation: "Nord-Est de Dakar",
            periode: "Saison sèche (Novembre à Mai) pour les teintes les plus roses",
            acces: "Route (1h de Dakar)",
            conseils: "Faites une balade en pirogue avec les ramasseurs de sel et explorez les dunes en 4x4",
            contact: "Office du Tourisme de Sangalkam",
            hotel: "Le Triskell",
            hotelLoc: "Bord du Lac Rose",
            hotelFonct: "Hébergement éco-responsable, calme et authentique",
            hotelContact: "+221 77 645 10 32",
            hotelRestau: "Cuisine familiale sénégalaise",
            guide: "Moussa Diop",
            guideContact: "moussa@visitafrika.com"
        },
        saint_louis: {
            titre: "Saint-Louis (Ndar)",
            localisation: "Nord du Sénégal",
            periode: "Mai (Festival de Jazz)",
            acces: "Route nationale (4h de Dakar) ou vol interne",
            conseils: "Ancienne capitale de l'AOF. Faites un tour en calèche pour admirer l'architecture coloniale et le pont Faidherbe",
            contact: "Syndicat d'Initiative de Saint-Louis",
            hotel: "Hôtel de la Poste",
            hotelLoc: "Place Faidherbe, Saint-Louis",
            hotelFonct: "Hôtel mythique de l'Aéropostale (Mermoz y séjournait)",
            hotelContact: "+221 33 961 11 18",
            hotelRestau: "Thieboudienne royal (Le meilleur du pays)",
            guide: "Moussa Diop",
            guideContact: "moussa@visitafrika.com"
        },
        casamance: {
            titre: "Casamance",
            localisation: "Sud du Sénégal",
            periode: "Octobre à Mai",
            acces: "Bateau ferry (Dakar-Ziguinchor) ou avion (45 min)",
            conseils: "Le jardin d'Éden du Sénégal. Explorez les bolongs en pirogue et découvrez la culture Diola",
            contact: "Office Régional du Tourisme de Casamance",
            hotel: "Lodge de la Source aux Lamantins",
            hotelLoc: "Djilapao, près de Ziguinchor",
            hotelFonct: "Ecolodge artistique et spirituel au bord de l'eau",
            hotelContact: "+221 77 553 43 12",
            hotelRestau: "Cuisine à base de produits de la mangrove",
            guide: "Babacar Sy",
            guideContact: "babacar@visitafrika.com"
        },
        delta_saloum: {
            titre: "Delta du Saloum",
            localisation: "Région de Fatick",
            periode: "Toute l'année",
            acces: "Route puis pirogue",
            conseils: "Classé UNESCO. Paradis des oiseaux. Visitez les amas coquilliers de Joal et dormez dans un lodge sur pilotis",
            contact: "Réserve de Biosphère du Delta du Saloum",
            hotel: "Les Collines de Niassam",
            hotelLoc: "Palmarin",
            hotelFonct: "Lodges d'exception construits dans des baobabs ou sur le lagon",
            hotelContact: "+221 33 948 01 24",
            hotelRestau: "Gastronomie éco-responsable",
            guide: "Babacar Sy",
            guideContact: "babacar@visitafrika.com"
        },
        fathala: {
            titre: "Réserve de Fathala",
            localisation: "Près de la frontière gambienne (Karang)",
            periode: "Saison sèche",
            acces: "Route via Toubacouta",
            conseils: "Vivez l'expérience unique de marcher avec les lions et faites un safari pour voir les rhinocéros blancs",
            contact: "Fathala Wildlife Reserve",
            hotel: "Fathala Luxury Tented Lodge",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Tentes safari de grand luxe dans une forêt de baobabs",
            hotelContact: "+221 78 637 13 33",
            hotelRestau: "Dîners sous les étoiles",
            guide: "Expert safari Fathala",
            guideContact: "Via réserve"
        },
        bandia: {
            titre: "Réserve de Bandia",
            localisation: "Près de Saly / Mbour",
            periode: "Toute l'année",
            acces: "Route (1h de Dakar, 20 min de Saly)",
            conseils: "Safari accessible idéal pour les familles. Girafe, rhinocéros, zèbres et crocodiles",
            contact: "Bandia Reserve Office",
            hotel: "Hôtels de Saly",
            hotelLoc: "Saly Portudal",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Restaurant de la réserve face aux points d'eau",
            guide: "Moussa Diop",
            guideContact: "moussa@visitafrika.com"
        },
        lompoul: {
            titre: "Désert de Lompoul",
            localisation: "Entre Dakar et Saint-Louis",
            periode: "Toute l'année (Nuits fraîches en hiver)",
            acces: "4x4 depuis le village de Lompoul",
            conseils: "Petit désert de dunes orange. Balade à dos de dromadaire et soirée folklorique sous tente maure",
            contact: "Ecolodge de Lompoul",
            hotel: "Horizon Lompoul",
            hotelLoc: "Au cœur des dunes",
            hotelFonct: "Campement de charme sous tentes traditionnelles tout confort",
            hotelContact: "+221 77 638 31 15",
            hotelRestau: "Couscous et grillades au feu de bois",
            guide: "Moussa Diop",
            guideContact: "moussa@visitafrika.com"
        },
        dakar_monument: {
            titre: "Monument de la Renaissance Africaine",
            localisation: "Ouakam, Dakar",
            periode: "Toute l'année",
            acces: "Taxi",
            conseils: "Plus haute statue d'Afrique. Montez dans la tête du colosse pour une vue panoramique sur toute la presqu'île du Cap-Vert",
            contact: "Administration du Monument",
            hotel: "Radisson Blu Hotel, Dakar Sea Plaza",
            hotelLoc: "Corniche Ouest, Dakar",
            hotelFonct: "Hôtel ultra-moderne avec piscine à débordement face à l'Atlantique",
            hotelContact: "+221 33 869 33 33",
            hotelRestau: "L'Avenue",
            guide: "Moussa Diop",
            guideContact: "moussa@visitafrika.com"
        },
        touba: {
            titre: "Touba",
            localisation: "Région de Diourbel",
            periode: "Grand Magal (Pèlerinage annuel)",
            acces: "Autoroute 'Ila Touba' depuis Dakar (2h)",
            conseils: "Ville sainte de la confrérie Mouride. Visitez la Grande Mosquée (l'une des plus grandes d'Afrique). Tenue très décente obligatoire",
            contact: "Dahira Mouride",
            hotel: "Résidences privées à Touba",
            hotelLoc: "Touba",
            hotelFonct: "Accueil traditionnel",
            hotelContact: "Via guide local",
            hotelRestau: "Repas partagés traditionnels",
            guide: "Babacar Sy",
            guideContact: "babacar@visitafrika.com"
        },
        joal_fadiouth: {
            titre: "Joal-Fadiouth",
            localisation: "Petite Côte",
            periode: "Toute l'année",
            acces: "Route depuis Mbour",
            conseils: "Visitez l'île de Fadiouth construite sur des coquillages et son cimetière mixte (chrétien/musulman) unique",
            contact: "Syndicat d'Initiative de Joal",
            hotel: "Le Djidiack",
            hotelLoc: "Ngazobil (proximité)",
            hotelFonct: "Hôtel authentique et reposant",
            hotelContact: "+221 33 957 61 14",
            hotelRestau: "Poissons fumés",
            guide: "Babacar Sy",
            guideContact: "babacar@visitafrika.com"
        },
        parc_niokolo_koba: {
            titre: "Parc National du Niokolo-Koba",
            localisation: "Sénégal Oriental",
            periode: "Janvier à Mai",
            acces: "4x4 depuis Tambacounda",
            conseils: "Le plus grand parc du pays. Tentez d'apercevoir les derniers lions et éléphants du Sénégal dans un décor de savane sauvage",
            contact: "Direction des Parcs Nationaux",
            hotel: "Hôtel Simenti",
            hotelLoc: "Au cœur du Niokolo-Koba",
            hotelFonct: "Hôtel historique surplombant le fleuve Gambie",
            hotelContact: "+221 33 981 11 21",
            hotelRestau: "Cuisine de brousse",
            guide: "Expert parc Niokolo",
            guideContact: "Via DPN"
        },
        mbour: {
            titre: "Mbour (Port de pêche)",
            localisation: "Petite Côte",
            periode: "Fin d'après-midi",
            acces: "Route",
            conseils: "Assistez au retour spectaculaire des centaines de pirogues colorées sur la plage. Ambiance électrique garantie",
            contact: "N/A",
            hotel: "Blue Africa",
            hotelLoc: "Mbour Plage",
            hotelFonct: "Petit hôtel convivial les pieds dans l'eau",
            hotelContact: "+221 33 957 11 45",
            hotelRestau: "Dîner sur la plage",
            guide: "Babacar Sy",
            guideContact: "babacar@visitafrika.com"
        },
        saly: {
            titre: "Saly Portudal",
            localisation: "Petite Côte",
            periode: "Novembre à Juin",
            acces: "Autoroute depuis l'aéroport DSS (15 min)",
            conseils: "La principale station balnéaire du pays. Shopping, discothèques, golf et sports nautiques",
            contact: "SAPCO Sénégal",
            hotel: "The Rhino Resort Hotel & Spa",
            hotelLoc: "Saly",
            hotelFonct: "Hôtel 5 étoiles de luxe avec spa et piscines magnifiques",
            hotelContact: "+221 33 957 37 45",
            hotelRestau: "Gastronomie internationale",
            guide: "Babacar Sy",
            guideContact: "babacar@visitafrika.com"
        },
        cap_skirring: {
            titre: "Cap Skirring",
            localisation: "Basse Casamance",
            periode: "Novembre à Mai",
            acces: "Aéroport international (CSK) ou route de Ziguinchor",
            conseils: "L'une des plus belles plages d'Afrique de l'Ouest. Ambiance relaxante sous les filaos et les palmiers",
            contact: "Office du Tourisme de Cap Skirring",
            hotel: "La Somone / Club Med",
            hotelLoc: "Cap Skirring Plage",
            hotelFonct: "Resorts de renommée mondiale pour le farniente absolu",
            hotelContact: "Via agence",
            hotelRestau: "Grillades de mer et fruits tropicaux",
            guide: "Babacar Sy",
            guideContact: "babacar@visitafrika.com"
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
                Demande envoyée ! Nos experts sénégalais vous contacteront.
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
