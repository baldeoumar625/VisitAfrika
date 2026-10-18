/**
 * PROJET: VISIT AFRIKA
 * FICHIER: djibouti.js
 * DESCRIPTION: Script premium pour la page Djibouti.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Djibouti chargé.");

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
                    // Centrer sur Djibouti
                    map = L.map('djibouti-map').setView([11.8251, 42.5903], 9);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Lac Assal", lat: 11.65, lng: 42.42 },
                        { name: "Lac Abbé", lat: 11.18, lng: 41.79 },
                        { name: "Îles Moucha", lat: 11.72, lng: 43.18 },
                        { name: "Forêt du Day", lat: 11.74, lng: 42.64 },
                        { name: "Goubet-al-Kharab", lat: 11.53, lng: 42.48 },
                        { name: "Tadjourah", lat: 11.78, lng: 42.88 },
                        { name: "Obock", lat: 11.96, lng: 43.28 },
                        { name: "Archipel des Sept Frères", lat: 12.46, lng: 43.41 },
                        { name: "Djibouti Ville", lat: 11.58, lng: 43.14 },
                        { name: "Plage d'Arta", lat: 11.52, lng: 42.84 },
                        { name: "Phare de Ras Bir", lat: 11.97, lng: 43.36 },
                        { name: "Monts Goda", lat: 11.75, lng: 42.66 },
                        { name: "Refuge DECAN", lat: 11.51, lng: 43.13 },
                        { name: "Plage des Sables Blancs", lat: 11.78, lng: 42.92 },
                        { name: "Ali Sabieh", lat: 11.15, lng: 42.71 }
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
        lac_assal: {
            titre: "Lac Assal",
            localisation: "Dépression de l'Afar",
            periode: "Novembre à Mars (Évitez les chaleurs extrêmes)",
            acces: "Route bitumée (1h30 depuis Djibouti ville)",
            conseils: "Le point le plus bas d'Afrique (-155m), portez des lunettes de soleil (réverbération du sel)",
            contact: "Office National du Tourisme de Djibouti",
            hotel: "Djibouti Palace Kempinski",
            hotelLoc: "Djibouti Ville (base)",
            hotelFonct: "Luxe 5 étoiles, piscine, spa",
            hotelContact: "+253 21 32 50 00",
            hotelRestau: "Cuisine gastronomique",
            guide: "Aden Hassan",
            guideContact: "aden@visitafrika.com"
        },
        lac_abbe: {
            titre: "Lac Abbé",
            localisation: "Frontière avec l'Éthiopie",
            periode: "Hiver djiboutien (Nov-Fév)",
            acces: "4x4 obligatoire (Piste difficile)",
            conseils: "Paysage lunaire avec cheminées calcaires, assistez au lever du soleil",
            contact: "Agence de voyage locale",
            hotel: "Campement Touristique d'As-Eyla",
            hotelLoc: "Près du lac",
            hotelFonct: "Tentes traditionnelles (Toukouls), basique",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine nomade traditionnelle",
            guide: "Aden Hassan",
            guideContact: "aden@visitafrika.com"
        },
        moucha: {
            titre: "Îles Moucha et Maskali",
            localisation: "Golfe de Tadjourah",
            periode: "Toute l'année",
            acces: "Bateau depuis le port de Djibouti (45 min)",
            conseils: "Idéal pour le snorkeling et l'observation des requins-baleines (Nov-Jan)",
            contact: "Centres de plongée de Djibouti",
            hotel: "Lagon Bleu",
            hotelLoc: "Île Moucha",
            hotelFonct: "Bungalows écologiques simples",
            hotelContact: "+253 21 35 12 12",
            hotelRestau: "Barbecue de poisson",
            guide: "N/A",
            guideContact: "N/A"
        },
        foret_day: {
            titre: "Forêt du Day",
            localisation: "Monts Goda",
            periode: "Septembre à Mai",
            acces: "Route puis piste (4x4)",
            conseils: "Altitude 1500m, fraîcheur garantie. Cherchez le Francolin de Djibouti (endémique)",
            contact: "Parc National de la Forêt du Day",
            hotel: "Campement de Ditillou",
            hotelLoc: "Dans la forêt",
            hotelFonct: "Hébergement en pleine nature, calme absolu",
            hotelContact: "Sur place",
            hotelRestau: "Produits locaux",
            guide: "Guide nature certifié",
            guideContact: "Sur place"
        },
        goubet: {
            titre: "Goubet-al-Kharab",
            localisation: "Bout du Golfe de Tadjourah",
            periode: "Toute l'année",
            acces: "Route panoramique",
            conseils: "Admirez le 'Pont de l'Équateur', faille géologique séparant deux plaques",
            contact: "N/A",
            hotel: "Sheraton Djibouti",
            hotelLoc: "Djibouti Ville",
            hotelFonct: "Confort international",
            hotelContact: "+253 21 35 04 05",
            hotelRestau: "International",
            guide: "N/A",
            guideContact: "N/A"
        },
        tadjourah: {
            titre: "Tadjourah (La Ville Blanche)",
            localisation: "Côte Nord",
            periode: "Toute l'année",
            acces: "Bateau-ferry ou route côtière",
            conseils: "Une des plus vieilles villes de la région, ambiance paisible et religieuse",
            contact: "Mairie de Tadjourah",
            hotel: "Hôtel du Golfe",
            hotelLoc: "Tadjourah, Front de mer",
            hotelFonct: "Simple et charmant",
            hotelContact: "Sur place",
            hotelRestau: "Poisson grillé",
            guide: "Mohamed Tadj",
            guideContact: "mohamed@visitafrika.com"
        },
        obock: {
            titre: "Obock",
            localisation: "Entrée du détroit de Bab-el-Mandeb",
            periode: "Hiver",
            acces: "Ferry depuis Djibouti ou route",
            conseils: "Point d'ancrage historique, visitez la maison d'Henry de Monfreid",
            contact: "Préfecture d'Obock",
            hotel: "Campement de la Mer",
            hotelLoc: "Obock",
            hotelFonct: "Hébergement pied dans l'eau",
            hotelContact: "N/A",
            hotelRestau: "Gastronomie marine",
            guide: "N/A",
            guideContact: "N/A"
        },
        sept_freres: {
            titre: "Archipel des Sept Frères",
            localisation: "Détroit de Bab-el-Mandeb",
            periode: "Septembre à Mai",
            acces: "Croisière de plongée uniquement",
            conseils: "Spot de plongée de classe mondiale, courants forts mais vie sous-marine intense",
            contact: "Dolphin Excursions",
            hotel: "N/A (Bateau de croisière)",
            hotelLoc: "En mer",
            hotelFonct: "Pleine pension",
            hotelContact: "Via agence",
            hotelRestau: "Buffet marin",
            guide: "Instructeur de plongée",
            guideContact: "Via agence"
        },
        djibouti_ville: {
            titre: "Djibouti Ville",
            localisation: "Capitale",
            periode: "Toute l'année",
            acces: "Aéroport international Ambouli",
            conseils: "Flânez sur la place Menelik et goûtez au 'Yemeni Fish'",
            contact: "Office du Tourisme",
            hotel: "Djibouti Palace Kempinski",
            hotelLoc: "Ilot du Héron",
            hotelFonct: "Le plus luxueux du pays",
            hotelContact: "+253 21 32 50 00",
            hotelRestau: "Gastronomie mondiale",
            guide: "Aden Hassan",
            guideContact: "aden@visitafrika.com"
        },
        arali: {
            titre: "Plage d'Arta",
            localisation: "Région d'Arta",
            periode: "Novembre à Janvier (Requins-baleines)",
            acces: "Route puis piste (45 min de la capitale)",
            conseils: "Le meilleur endroit pour nager avec les requins-baleines",
            contact: "ONTD",
            hotel: "Les Sables Blancs",
            hotelLoc: "Arta Plage",
            hotelFonct: "Campement de plage",
            hotelContact: "Sur place",
            hotelRestau: "Buffet local",
            guide: "N/A",
            guideContact: "N/A"
        },
        ras_bir: {
            titre: "Phare de Ras Bir",
            localisation: "Près d'Obock",
            periode: "Toute l'année",
            acces: "4x4 depuis Obock",
            conseils: "Vue magnifique sur le détroit, point stratégique mondial",
            contact: "N/A",
            hotel: "Hôtels d'Obock",
            hotelLoc: "Obock",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        goda: {
            titre: "Monts Goda",
            localisation: "Nord de Djibouti",
            periode: "Hiver",
            acces: "4x4",
            conseils: "Randonnées magnifiques dans les massifs montagneux",
            contact: "Guides locaux",
            hotel: "Campement de Bankoualé",
            hotelLoc: "Massif du Goda",
            hotelFonct: "Hébergement traditionnel Toukoul",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine de montagne",
            guide: "Mohamed Tadj",
            guideContact: "mohamed@visitafrika.com"
        },
        decan: {
            titre: "Refuge DECAN",
            localisation: "Périphérie de Djibouti Ville",
            periode: "Toute l'année",
            acces: "Taxi (15 min du centre)",
            conseils: "Protection de la faune locale (guépards, autruches, antilopes)",
            contact: "Association DECAN",
            hotel: "Hôtels de la ville",
            hotelLoc: "Djibouti Ville",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        plage_sables_blancs: {
            titre: "Plage des Sables Blancs",
            localisation: "Tadjourah",
            periode: "Toute l'année",
            acces: "Bateau depuis Tadjourah",
            conseils: "Sable fin et eaux turquoises, le paradis du farniente",
            contact: "N/A",
            hotel: "Campement des Sables Blancs",
            hotelLoc: "Sur la plage",
            hotelFonct: "Détente absolue",
            hotelContact: "Sur place",
            hotelRestau: "Grillades",
            guide: "N/A",
            guideContact: "N/A"
        },
        ali_sabieh: {
            titre: "Ali Sabieh",
            localisation: "Sud de Djibouti",
            periode: "Saison fraîche",
            acces: "Route ou Train (Ethio-Djibouti Railway)",
            conseils: "Ville entourée de montagnes rouges, découvrez le char à voile sur le Petit Bara",
            contact: "Préfecture d'Ali Sabieh",
            hotel: "Hôtel Palmeraie",
            hotelLoc: "Ali Sabieh",
            hotelFonct: "Simple et accueillant",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine somalie et afar",
            guide: "Aden Hassan",
            guideContact: "aden@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser ma visite</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="20" value="1" required>
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
                Demande envoyée ! Nos experts djiboutiens vous contacteront.
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
