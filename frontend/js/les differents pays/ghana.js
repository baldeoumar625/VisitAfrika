/**
 * PROJET: VISIT AFRIKA
 * FICHIER: ghana.js
 * DESCRIPTION: Script premium pour le Ghana.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Ghana chargé.");

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
                    // Centrer sur le Ghana
                    map = L.map('ghana-map').setView([7.9465, -1.0232], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Château de Cape Coast (UNESCO)", lat: 5.10, lng: -1.24 },
                        { name: "Château d'Elmina", lat: 5.08, lng: -1.35 },
                        { name: "Parc National de Kakum (Canopy walk)", lat: 5.35, lng: -1.38 },
                        { name: "Parc National de Mole", lat: 9.25, lng: -1.85 },
                        { name: "Accra (Capitale)", lat: 5.60, lng: -0.19 },
                        { name: "Kumasi (Capitale Ashanti)", lat: 6.67, lng: -1.62 },
                        { name: "Lac Bosumtwi", lat: 6.50, lng: -1.41 },
                        { name: "Chutes de Wli", lat: 7.12, lng: 0.60 },
                        { name: "Nzulezo (Village sur pilotis)", lat: 5.02, lng: -2.60 },
                        { name: "Chutes de Boti", lat: 6.17, lng: -0.21 },
                        { name: "Mosquée de Larabanga", lat: 9.22, lng: -1.86 },
                        { name: "Parc National de Bia", lat: 6.61, lng: -3.06 },
                        { name: "Parc National de Kyabobo", lat: 8.35, lng: 0.59 },
                        { name: "Parc National de Bui", lat: 8.30, lng: -2.25 },
                        { name: "Takoradi", lat: 4.88, lng: -1.75 }
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
        cape_coast: {
            titre: "Château de Cape Coast",
            localisation: "Cape Coast (Région Centrale)",
            periode: "Toute l'année",
            acces: "Route bitumée (3h d'Accra)",
            conseils: "Visite chargée d'émotion, symbole de la porte du non-retour. Portez des vêtements respectueux",
            contact: "Ghana Museums and Monuments Board",
            hotel: "Ridge Royal Hotel",
            hotelLoc: "Surplombant Cape Coast",
            hotelFonct: "Hôtel moderne de luxe, grand confort et piscine",
            hotelContact: "+233 33 213 1415",
            hotelRestau: "Cuisine internationale et ghanéenne",
            guide: "Kwame Mensah",
            guideContact: "kwame@visitafrika.com"
        },
        elmina: {
            titre: "Château d'Elmina (St. George's)",
            localisation: "Elmina (Région Centrale)",
            periode: "Toute l'année (Festival Edina Bakatue en Juillet)",
            acces: "Route côtière (15 min de Cape Coast)",
            conseils: "Le plus ancien bâtiment européen d'Afrique subsaharienne. Explorez aussi le fort de Coenraadsburg sur la colline d'en face",
            contact: "N/A",
            hotel: "Coconut Grove Beach Resort",
            hotelLoc: "Plage d'Elmina",
            hotelFonct: "Resort familial haut de gamme, jardins tropicaux",
            hotelContact: "+233 24 433 3000",
            hotelRestau: "Buffets généreux",
            guide: "Kwame Mensah",
            guideContact: "kwame@visitafrika.com"
        },
        kakum: {
            titre: "Parc National de Kakum",
            localisation: "Près de Cape Coast",
            periode: "Toute l'année (Privilégiez le matin pour les oiseaux)",
            acces: "Route facile",
            conseils: "Vivez l'expérience unique du Canopy Walk (ponts suspendus à 40m de haut). Sensations fortes garanties",
            contact: "Wildlife Division of the Forestry Commission",
            hotel: "Hans Cottage Botel",
            hotelLoc: "Périphérie de Cape Coast",
            hotelFonct: "Hôtel sur pilotis entouré de crocodiles apprivoisés",
            hotelContact: "+233 33 213 3621",
            hotelRestau: "Cuisine locale (Fufu, Jollof)",
            guide: "Kwame Mensah",
            guideContact: "kwame@visitafrika.com"
        },
        mole: {
            titre: "Parc National de Mole",
            localisation: "Nord du Ghana (Damongo)",
            periode: "Décembre à Avril (Observation des éléphants garantie)",
            acces: "Bus ou vol vers Tamale puis 2h30 de route",
            conseils: "Safari à pied possible. La rencontre avec les éléphants au bord du point d'eau est inoubliable",
            contact: "Mole National Park Headquarters",
            hotel: "Zaina Lodge",
            hotelLoc: "Dans le parc Mole",
            hotelFonct: "Premier lodge safari de luxe en Afrique de l'Ouest",
            hotelContact: "+233 50 152 4118",
            hotelRestau: "Fine dining avec vue sur la savane",
            guide: "Kwame Mensah",
            guideContact: "kwame@visitafrika.com"
        },
        accra: {
            titre: "Accra",
            localisation: "Capitale",
            periode: "Toute l'année (Surtout en Décembre pour les festivals)",
            acces: "Aéroport international Kotoka (ACC)",
            conseils: "Ville dynamique. Visitez le mémorial Kwame Nkrumah et faites du shopping à Jamestown ou au marché de Makola",
            contact: "Ghana Tourism Authority",
            hotel: "Kempinski Hotel Gold Coast City",
            hotelLoc: "Ministries Area, Accra",
            hotelFonct: "Luxe 5 étoiles, le plus prestigieux d'Accra",
            hotelContact: "+233 24 243 0000",
            hotelRestau: "Papillon (Gastronomie mondiale)",
            guide: "Akosua Addo",
            guideContact: "akosua@visitafrika.com"
        },
        kumasi: {
            titre: "Kumasi (Le Jardin de l'Afrique)",
            localisation: "Région Ashanti",
            periode: "Festival Akwasidae (tous les 42 jours)",
            acces: "Vol interne (45 min) ou route (5-6h)",
            conseils: "Cœur de la culture Ashanti. Visitez le palais Manhyia et le marché Kejetia, l'un des plus grands d'Afrique",
            contact: "Manhyia Palace Museum",
            hotel: "Golden Tulip Kumasi City",
            hotelLoc: "Centre-ville, Kumasi",
            hotelFonct: "Hôtel de luxe avec casino et ambiance internationale",
            hotelContact: "+233 32 208 3777",
            hotelRestau: "Spécialités Ashanti",
            guide: "Akosua Addo",
            guideContact: "akosua@visitafrika.com"
        },
        lac_bosumtwi: {
            titre: "Lac Bosumtwi",
            localisation: "Près de Kumasi",
            periode: "Toute l'année",
            acces: "Route depuis Kumasi (1h)",
            conseils: "Seul lac naturel du Ghana, formé par l'impact d'une météorite. Sacré pour les Ashantis (pêche uniquement en pirogue plate)",
            contact: "N/A",
            hotel: "Wildwin Resort",
            hotelLoc: "Bord du lac Bosumtwi",
            hotelFonct: "Calme et ressourçant, activités nautiques",
            hotelContact: "+233 20 811 8769",
            hotelRestau: "Poissons frais",
            guide: "Akosua Addo",
            guideContact: "akosua@visitafrika.com"
        },
        wli_waterfalls: {
            titre: "Chutes de Wli",
            localisation: "Région de la Volta (Hohoe)",
            periode: "Mai à Octobre",
            acces: "Route panoramique",
            conseils: "Les plus hautes chutes d'Afrique de l'Ouest. Une randonnée facile à travers la forêt pour atteindre la chute inférieure",
            contact: "Wli Tourism Office",
            hotel: "Wli Water Heights Hotel",
            hotelLoc: "Wli",
            hotelFonct: "Vue sur les montagnes et les chutes",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale",
            guide: "Akosua Addo",
            guideContact: "akosua@visitafrika.com"
        },
        nzulezo: {
            titre: "Nzulezo (Le village sur l'eau)",
            localisation: "Près de Beyin (Ouest)",
            periode: "Saison humide pour l'accès en pirogue facile",
            acces: "Traversée en pirogue à travers les marais depuis Beyin",
            conseils: "Village construit entièrement sur pilotis sur le lac Tadane. Expérience culturelle unique au Ghana",
            contact: "Nzulezo Management Committee",
            hotel: "Beyin Beach Resort",
            hotelLoc: "Plage de Beyin",
            hotelFonct: "Confortable, face à l'Atlantique",
            hotelContact: "+233 54 840 0341",
            hotelRestau: "Produits de la mer",
            guide: "Guide local du village",
            guideContact: "Obligatoire"
        },
        boti_falls: {
            titre: "Chutes de Boti",
            localisation: "Eastern Region (Manya Krobo)",
            periode: "Juin à Août",
            acces: "Route (2h d'Accra)",
            conseils: "Chutes jumelles (mâle et femelle). Visitez aussi le 'Umbrella Rock' à proximité pour une vue incroyable",
            contact: "N/A",
            hotel: "Lodges à Koforidua",
            hotelLoc: "Koforidua",
            hotelFonct: "Base pratique pour l'Est",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Akosua Addo",
            guideContact: "akosua@visitafrika.com"
        },
        larabanga: {
            titre: "Mosquée de Larabanga",
            localisation: "Près de l'entrée du Parc Mole",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Plus ancienne mosquée du Ghana (15ème siècle), chef-d'œuvre architectural en banco et bois de karité",
            contact: "Larabanga Community Tourism",
            hotel: "Mole Motel",
            hotelLoc: "Parc Mole",
            hotelFonct: "Surplombe les points d'eau des éléphants",
            hotelContact: "+233 24 431 3332",
            hotelRestau: "International",
            guide: "Guide local de Larabanga",
            guideContact: "Sur place"
        },
        parc_bia: {
            titre: "Parc National de Bia",
            localisation: "Ouest du Ghana",
            periode: "Saison sèche",
            acces: "4x4 uniquement",
            conseils: "Forêt primaire abritant certains des plus grands arbres du monde et des éléphants de forêt rares",
            contact: "Wildlife Division",
            hotel: "Guesthouse du parc",
            hotelLoc: "Bia",
            hotelFonct: "Sommaire mais authentique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Kwame Mensah",
            guideContact: "kwame@visitafrika.com"
        },
        parc_kyabobo: {
            titre: "Parc National de Kyabobo",
            localisation: "Frontière Togo (Nkwanta)",
            periode: "Harmattan",
            acces: "Route longue (Nord Volta)",
            conseils: "Paysages montagneux et cascades, idéal pour le trekking vers le Mont Kyabobo",
            contact: "N/A",
            hotel: "Nkwanta Guesthouse",
            hotelLoc: "Nkwanta",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Kwame Mensah",
            guideContact: "kwame@visitafrika.com"
        },
        parc_bui: {
            titre: "Parc National de Bui",
            localisation: "Région de Brong-Ahafo",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Célèbre pour sa population d'hippopotames sur le fleuve Black Volta",
            contact: "Bui Power Authority / Wildlife",
            hotel: "Camps de brousse",
            hotelLoc: "Bui",
            hotelFonct: "Aventure",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Kwame Mensah",
            guideContact: "kwame@visitafrika.com"
        },
        takoradi: {
            titre: "Takoradi",
            localisation: "Western Region",
            periode: "Décembre (Masquerade Festival)",
            acces: "Aéroport de Takoradi / Route",
            conseils: "Ville jumelée Sekondi-Takoradi. Visitez le port et profitez des plages immaculées de Busua à proximité",
            contact: "Takoradi City Admin",
            hotel: "Atlantic Hotel Takoradi",
            hotelLoc: "Front de mer",
            hotelFonct: "Hôtel d'affaires et de loisirs haut de gamme",
            hotelContact: "+233 31 202 2400",
            hotelRestau: "Cuisine côtière",
            guide: "Akosua Addo",
            guideContact: "akosua@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser ma visite</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="20" value="2" required>
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
                Demande envoyée ! Nos experts ghanéens vous contacteront.
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
