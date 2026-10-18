/**
 * PROJET: VISIT AFRIKA
 * FICHIER: malawi.js
 * DESCRIPTION: Script premium pour la page Malawi.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Malawi chargé.");

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
                    // Centrer sur le Malawi
                    map = L.map('malawi-map').setView([-13.2543, 34.3015], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Lac Malawi (Parc National)", lat: -14.03, lng: 34.88 },
                        { name: "Parc National de Liwonde", lat: -14.83, lng: 35.33 },
                        { name: "Mont Mulanje", lat: -15.94, lng: 35.58 },
                        { name: "Plateau de Nyika", lat: -10.60, lng: 33.80 },
                        { name: "Plateau de Zomba", lat: -15.35, lng: 35.30 },
                        { name: "Réserve de Majete", lat: -15.83, lng: 34.70 },
                        { name: "Réserve de Nkhotakota", lat: -12.92, lng: 34.13 },
                        { name: "Lilongwe (Capitale)", lat: -13.97, lng: 33.77 },
                        { name: "Blantyre", lat: -15.78, lng: 35.00 },
                        { name: "Cape Maclear", lat: -14.02, lng: 34.85 },
                        { name: "Île de Likoma", lat: -12.05, lng: 34.73 },
                        { name: "Art Rupestre de Chongoni", lat: -14.25, lng: 34.15 },
                        { name: "Réserve de Kuti", lat: -13.88, lng: 34.45 },
                        { name: "Parc National de Lengwe", lat: -16.25, lng: 34.75 },
                        { name: "Viphya Plateau", lat: -12.00, lng: 33.90 }
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
        lake_malawi: {
            titre: "Lac Malawi",
            localisation: "Sud du Lac (Monkey Bay / Cape Maclear)",
            periode: "Mai à Octobre (Saison sèche et fraîche)",
            acces: "Route bitumée depuis Lilongwe (4h)",
            conseils: "Le lac aux étoiles, paradis des poissons cichlidés colorés. Idéal pour le kayak et le snorkeling",
            contact: "Malawi Department of Tourism",
            hotel: "Kaya Mawa",
            hotelLoc: "Île de Likoma",
            hotelFonct: "Luxe bohème sur une île isolée",
            hotelContact: "+265 99 931 1441",
            hotelRestau: "Gastronomie lacustre fusion",
            guide: "Bright Phiri",
            guideContact: "bright@visitafrika.com"
        },
        liwonde: {
            titre: "Liwonde National Park",
            localisation: "Sud du pays (Rivière Shire)",
            periode: "Juin à Septembre (Concentration animale)",
            acces: "Route bitumée facile (MR3)",
            conseils: "Faites un safari en bateau pour voir les troupeaux d'éléphants et les hippopotames de près",
            contact: "African Parks Malawi",
            hotel: "Mvuu Lodge",
            hotelLoc: "Dans le parc Liwonde",
            hotelFonct: "Lodge de safari haut de gamme au bord du fleuve",
            hotelContact: "+265 1 771 393",
            hotelRestau: "Cuisine de brousse raffinée",
            guide: "Bright Phiri",
            guideContact: "bright@visitafrika.com"
        },
        mulanje: {
            titre: "Mont Mulanje",
            localisation: "Sud-Est du Malawi",
            periode: "Septembre à Avril (Évitez les mois de pluie intense)",
            acces: "Route bitumée depuis Blantyre (1h30)",
            conseils: "Le 'Cœur du Malawi', parfait pour le trekking avec des refuges de montagne authentiques",
            contact: "Mulanje Mountain Conservation Trust",
            hotel: "Kara O'Mula Resort",
            hotelLoc: "Au pied du mont Mulanje",
            hotelFonct: "Confortable, vue magnifique sur les sommets",
            hotelContact: "+265 88 884 3163",
            hotelRestau: "Cuisine locale et internationale",
            guide: "Chikondi Mtambo",
            guideContact: "chikondi@visitafrika.com"
        },
        nyika: {
            titre: "Plateau de Nyika",
            localisation: "Nord du Malawi",
            periode: "Septembre à Décembre (Floraison des orchidées)",
            acces: "4x4 obligatoire, route de montagne isolée",
            conseils: "Paysages de landes écossaises en plein cœur de l'Afrique, riche en léopards",
            contact: "Central African Wilderness Safaris",
            hotel: "Chelinda Camp",
            hotelLoc: "Sur le plateau de Nyika",
            hotelFonct: "Chalets en bois confortables avec cheminée",
            hotelContact: "+265 1 771 393",
            hotelRestau: "Plats réconfortants de montagne",
            guide: "Chikondi Mtambo",
            guideContact: "chikondi@visitafrika.com"
        },
        zomba: {
            titre: "Plateau de Zomba",
            localisation: "Zomba (Ancienne capitale)",
            periode: "Toute l'année",
            acces: "Route bitumée jusqu'au sommet",
            conseils: "Randonnées faciles vers les points de vue 'Queen's View' et 'Emperor's View'",
            contact: "Zomba Forest Lodge",
            hotel: "Sunbird Ku Chawe",
            hotelLoc: "Bord du plateau",
            hotelFonct: "Hôtel mythique surplombant la vallée",
            hotelContact: "+265 1 524 400",
            hotelRestau: "Buffets variés",
            guide: "Bright Phiri",
            guideContact: "bright@visitafrika.com"
        },
        majete: {
            titre: "Majete Wildlife Reserve",
            localisation: "Vallée du Bas Shire",
            periode: "Hiver (Juin-Août)",
            acces: "Route bitumée (1h de Blantyre)",
            conseils: "L'histoire d'un succès de conservation, observez le 'Big Five' dans un cadre sauvage",
            contact: "African Parks Majete",
            hotel: "Mkulumadzi Lodge",
            hotelLoc: "Majete",
            hotelFonct: "Luxe en bord de rivière",
            hotelContact: "+265 99 994 2354",
            hotelRestau: "Gastronomie safari",
            guide: "Ranger African Parks",
            guideContact: "Inclus"
        },
        nkhotakota: {
            titre: "Réserve de Nkhotakota",
            localisation: "Centre du pays",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Immense étendue sauvage, paradis des éléphants réintroduits",
            contact: "Tongole Elephant Lodge",
            hotel: "Tongole Elephant Lodge",
            hotelLoc: "Rivière Bua",
            hotelFonct: "Eco-lodge de luxe intégré à la nature",
            hotelContact: "+265 99 949 1777",
            hotelRestau: "Cuisine fraîche locale",
            guide: "Guide spécialisé Tongole",
            guideContact: "Via lodge"
        },
        lilongwe: {
            titre: "Lilongwe",
            localisation: "Centre (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international Kamuzu (LLW)",
            conseils: "Visitez le sanctuaire de la vie sauvage de Lilongwe en plein centre-ville",
            contact: "Lilongwe Wildlife Centre",
            hotel: "President Walmont Hotel",
            hotelLoc: "Umoja Park, Lilongwe",
            hotelFonct: "Le premier hôtel 5 étoiles du Malawi",
            hotelContact: "+265 1 773 981",
            hotelRestau: "Cuisine gastronomique",
            guide: "Bright Phiri",
            guideContact: "bright@visitafrika.com"
        },
        blantyre: {
            titre: "Blantyre",
            localisation: "Sud du pays",
            periode: "Toute l'année",
            acces: "Aéroport Chileka (BLZ)",
            conseils: "Capitale commerciale, visitez l'église St Michael and All Angels en brique rouge",
            contact: "Mairie de Blantyre",
            hotel: "Protea Hotel Blantyre Ryalls",
            hotelLoc: "Blantyre Centre",
            hotelFonct: "Hôtel d'affaires historique et chic",
            hotelContact: "+265 1 820 395",
            hotelRestau: "Le 21 Grill",
            guide: "N/A",
            guideContact: "N/A"
        },
        cape_maclear: {
            titre: "Cape Maclear",
            localisation: "Lac Malawi",
            periode: "Toute l'année",
            acces: "Route (via Monkey Bay)",
            conseils: "Le cœur du tourisme lacustre, idéal pour le bateau à voile et le farniente",
            contact: "N/A",
            hotel: "Mumbo Island",
            hotelLoc: "Île en face de Cape Maclear",
            hotelFonct: "Ecolodge déconnecté sur une île privée",
            hotelContact: "Via agence",
            hotelRestau: "Buffets conviviaux",
            guide: "N/A",
            guideContact: "N/A"
        },
        likoma: {
            titre: "Île de Likoma",
            localisation: "Lac Malawi (Eaux mozambicaines)",
            periode: "Toute l'année",
            acces: "Avion privé ou ferry Ilala",
            conseils: "Visitez l'immense cathédrale anglicane bâtie sur l'île",
            contact: "St Peter's Cathedral",
            hotel: "Kaya Mawa",
            hotelLoc: "Likoma",
            hotelFonct: "Classé parmi les plus romantiques au monde",
            hotelContact: "+265 99 931 1441",
            hotelRestau: "Spécialités de poissons cichlidés (Chambo)",
            guide: "N/A",
            guideContact: "N/A"
        },
        chongoni: {
            titre: "Art Rupestre de Chongoni",
            localisation: "Près de Dedza",
            periode: "Saison sèche",
            acces: "Route vers le Sud",
            conseils: "Plus de 100 sites d'art rupestre UNESCO, témoignant de l'histoire des Chewa",
            contact: "Department of Antiquities",
            hotel: "Dedza Pottery Lodge",
            hotelLoc: "Dedza",
            hotelFonct: "Authentique, célèbre pour sa poterie",
            hotelContact: "+265 1 223 062",
            hotelRestau: "Gâteaux réputés",
            guide: "Guide local patrimoine",
            guideContact: "Sur place"
        },
        kuti: {
            titre: "Réserve de Kuti",
            localisation: "Salima (Plaine du Lac)",
            periode: "Toute l'année",
            acces: "Route bitumée facile",
            conseils: "Observez les zèbres et les girafes dans cette réserve communautaire dynamique",
            contact: "Kuti Wildlife Reserve",
            hotel: "Chalets de Kuti",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Simple et proche des animaux",
            hotelContact: "Sur place",
            hotelRestau: "Petite restauration",
            guide: "N/A",
            guideContact: "N/A"
        },
        lengwe: {
            titre: "Parc National de Lengwe",
            localisation: "Vallée du Shire",
            periode: "Hiver",
            acces: "Route Sud",
            conseils: "Réserve aride célèbre pour l'antilope Nyala et ses caches d'eau d'observation",
            contact: "N/A",
            hotel: "Nyala Lodge",
            hotelLoc: "Lengwe",
            hotelFonct: "Traditionnel et calme",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale",
            guide: "N/A",
            guideContact: "N/A"
        },
        viphya: {
            titre: "Viphya Plateau",
            localisation: "Nord du Malawi",
            periode: "Saison sèche",
            acces: "Route du Nord",
            conseils: "Vastes forêts de pins, parfait pour le VTT et la tranquillité",
            contact: "Luangwa Safari",
            hotel: "Luwawa Forest Lodge",
            hotelLoc: "Viphya Plateau",
            hotelFonct: "Centre de plein air et de randonnée",
            hotelContact: "+265 99 991 2133",
            hotelRestau: "Produits du potager",
            guide: "N/A",
            guideContact: "N/A"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon séjour</h4>
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
                Demande envoyée ! Nos experts malawites vous contacteront.
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
