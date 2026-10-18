/**
 * PROJET: VISIT AFRIKA
 * FICHIER: mali.js
 * DESCRIPTION: Script premium pour le Mali.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Mali chargé.");

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
                    // Centrer sur le Mali
                    map = L.map('mali-map').setView([17.5707, -3.9962], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Grande Mosquée de Djenné", lat: 13.90, lng: -4.55 },
                        { name: "Pays Dogon", lat: 14.50, lng: -3.30 },
                        { name: "Tombouctou (Cité des 333 saints)", lat: 16.77, lng: -3.00 },
                        { name: "Musée National du Mali (Bamako)", lat: 12.65, lng: -8.00 },
                        { name: "Mopti (La Venise du Mali)", lat: 14.48, lng: -4.18 },
                        { name: "Ségou (Cité des Balanzans)", lat: 13.43, lng: -6.27 },
                        { name: "Siby (Monts Manding)", lat: 12.38, lng: -8.33 },
                        { name: "Falaises de Bandiagara (UNESCO)", lat: 14.35, lng: -3.61 },
                        { name: "Parc National de la Boucle du Baoulé", lat: 14.00, lng: -9.00 },
                        { name: "Chutes de Fina", lat: 13.00, lng: -10.50 },
                        { name: "Mont Hombori", lat: 15.28, lng: -1.70 },
                        { name: "Lac Débo", lat: 15.31, lng: -4.10 },
                        { name: "Gao (Tombeau des Askia)", lat: 16.27, lng: -0.05 },
                        { name: "Kayes (Cité des rails)", lat: 14.45, lng: -11.43 },
                        { name: "Sikasso", lat: 11.32, lng: -5.67 }
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
        djenne: {
            titre: "Grande Mosquée de Djenné",
            localisation: "Djenné (Région de Mopti)",
            periode: "Janvier à Mars (Plus frais)",
            acces: "Route depuis Mopti (Traversée en bac)",
            conseils: "Plus grand édifice en terre crue au monde. Assistez au crépissage annuel en Avril pour une expérience culturelle unique",
            contact: "Mission Culturelle de Djenné",
            hotel: "Hôtel Campement de Djenné",
            hotelLoc: "Djenné Centre",
            hotelFonct: "Style architectural soudanais, au cœur de la ville historique",
            hotelContact: "+223 21 42 12 12",
            hotelRestau: "Cuisine locale traditionnelle",
            guide: "Oumar Touré",
            guideContact: "oumar@visitafrika.com"
        },
        dogon: {
            titre: "Pays Dogon",
            localisation: "Falaise de Bandiagara",
            periode: "Octobre à Février",
            acces: "4x4 depuis Mopti ou Bandiagara",
            conseils: "Randonnée entre les villages perchés. Découvrez la cosmogonie fascinante et les danses de masques rituelles",
            contact: "Office du Tourisme de Bandiagara",
            hotel: "Hôtel la Falaise",
            hotelLoc: "Bandiagara",
            hotelFonct: "Confortable et bien situé pour explorer les falaises",
            hotelContact: "+223 21 44 20 20",
            hotelRestau: "Plats locaux Dogon",
            guide: "Oumar Touré",
            guideContact: "oumar@visitafrika.com"
        },
        tombouctou: {
            titre: "Tombouctou",
            localisation: "Bord du Sahara (Nord)",
            periode: "Saison fraîche uniquement",
            acces: "Avion (rare actuellement) ou 4x4",
            conseils: "La cité mystérieuse des 333 saints. Visitez les mosquées millénaires de Djingareyber et Sankoré",
            contact: "Mairie de Tombouctou",
            hotel: "Hôtel la Colombe",
            hotelLoc: "Tombouctou Centre",
            hotelFonct: "Hôtel de référence, style traditionnel",
            hotelContact: "N/A",
            hotelRestau: "Cuisine du désert",
            guide: "Oumar Touré",
            guideContact: "oumar@visitafrika.com"
        },
        bamako_musee: {
            titre: "Musée National du Mali",
            localisation: "Bamako (Quartier du Parc National)",
            periode: "Toute l'année",
            acces: "Taxi urbain",
            conseils: "L'un des meilleurs musées ethnographiques d'Afrique. Découvrez les trésors des empires du Mali, du Ghana et Songhaï",
            contact: "Direction du Musée National",
            hotel: "Radisson Blu Hotel Bamako",
            hotelLoc: "Quartier ACI 2000, Bamako",
            hotelFonct: "Standard 5 étoiles international, luxe et sécurité",
            hotelContact: "+223 44 98 00 00",
            hotelRestau: "Gastronomie internationale et locale",
            guide: "Aminata Traoré",
            guideContact: "aminata@visitafrika.com"
        },
        mopti: {
            titre: "Mopti",
            localisation: "Confluence Niger et Bani",
            periode: "Septembre à Mars",
            acces: "Route bitumée ou avion",
            conseils: "La 'Venise du Mali'. Balade en pirogue au coucher du soleil pour observer le ballet des pêcheurs Bozo",
            contact: "Syndicat d'Initiative de Mopti",
            hotel: "Hôtel Kanaga",
            hotelLoc: "Bord du fleuve Niger, Mopti",
            hotelFonct: "Hôtel iconique avec vue sur le fleuve et les pirogues",
            hotelContact: "+223 21 43 05 00",
            hotelRestau: "Capitaine du Niger grillé",
            guide: "Oumar Touré",
            guideContact: "oumar@visitafrika.com"
        },
        segou: {
            titre: "Ségou",
            localisation: "Rive du Niger (RN6)",
            periode: "Toute l'année (Festival sur le Niger en Février)",
            acces: "Route (3h de Bamako)",
            conseils: "Ancienne capitale de l'empire Bambara. Célèbre pour ses poteries et ses tissus bogolan",
            contact: "Fondation Festival sur le Niger",
            hotel: "Hôtel de la Réserve",
            hotelLoc: "Bord de l'eau, Ségou",
            hotelFonct: "Hôtel de charme calme et ombragé",
            hotelContact: "+223 21 32 02 45",
            hotelRestau: "Cuisine Bambara raffinée",
            guide: "Aminata Traoré",
            guideContact: "aminata@visitafrika.com"
        },
        siby: {
            titre: "Siby",
            localisation: "Monts Manding (Sud-Ouest)",
            periode: "Toute l'année (Printemps pour les mangues)",
            acces: "Route (1h de Bamako)",
            conseils: "Visitez l'Arche de Kamadjan et les grottes historiques liées à l'empereur Soundiata Keïta",
            contact: "Bureau du Tourisme de Siby",
            hotel: "Hôtel Kamadjan",
            hotelLoc: "Siby",
            hotelFonct: "Eco-campement intégré dans la nature",
            hotelContact: "+223 76 45 45 45",
            hotelRestau: "Produits de la ferme",
            guide: "Aminata Traoré",
            guideContact: "aminata@visitafrika.com"
        },
        falaises_bandiagara: {
            titre: "Falaises de Bandiagara",
            localisation: "Pays Dogon",
            periode: "Saison sèche",
            acces: "Randonnée guidée",
            conseils: "Site UNESCO. Admirez les maisons Tellem accrochées à la paroi rocheuse et les greniers Dogon",
            contact: "N/A",
            hotel: "Campements villageois",
            hotelLoc: "Villages de la falaise",
            hotelFonct: "Nuits sur les toits-terrasses sous les étoiles",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine villageoise authentique",
            guide: "Oumar Touré",
            guideContact: "oumar@visitafrika.com"
        },
        parc_boucle_baoule: {
            titre: "Parc de la Boucle du Baoulé",
            localisation: "Ouest de Bamako",
            periode: "Décembre à Avril",
            acces: "4x4 uniquement",
            conseils: "Réserve de biosphère riche en antilopes et en vestiges archéologiques",
            contact: "Direction des Parcs Nationaux",
            hotel: "Camping sauvage aménagé",
            hotelLoc: "Dans le parc",
            hotelFonct: "Expérience aventure",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert nature",
            guideContact: "Via agence"
        },
        chutes_fina: {
            titre: "Chutes de Fina",
            localisation: "Près de Kita (Ouest)",
            periode: "Septembre à Décembre",
            acces: "Piste difficile",
            conseils: "Magnifiques cascades en escaliers peu fréquentées, havre de paix en pleine brousse",
            contact: "N/A",
            hotel: "Hébergements à Kita (transit)",
            hotelLoc: "Kita",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Aminata Traoré",
            guideContact: "aminata@visitafrika.com"
        },
        hombori: {
            titre: "Mont Hombori",
            localisation: "Ligne Mopti-Gao",
            periode: "Hiver",
            acces: "Route nationale 16",
            conseils: "Le point culminant du Mali (1155m). Visitez 'la main de Fatma' pour les amateurs d'escalade",
            contact: "N/A",
            hotel: "Auberge d'Hombori",
            hotelLoc: "Hombori Village",
            hotelFonct: "Simple étape de voyage",
            hotelContact: "Sur place",
            hotelRestau: "Repas voyageurs",
            guide: "Oumar Touré",
            guideContact: "oumar@visitafrika.com"
        },
        lac_debov: {
            titre: "Lac Débo",
            localisation: "Delta Central du Niger",
            periode: "Saison des eaux (Décembre-Janvier)",
            acces: "Pirogue uniquement",
            conseils: "Immense mer intérieure au milieu du Sahel. Observez les oiseaux migrateurs et les hippopotames",
            contact: "N/A",
            hotel: "Nuitée en pinasse (Pirogue)",
            hotelLoc: "Sur le lac",
            hotelFonct: "Expérience unique de navigation de nuit",
            hotelContact: "Via Mopti",
            hotelRestau: "Pêche du jour cuisinée à bord",
            guide: "Oumar Touré",
            guideContact: "oumar@visitafrika.com"
        },
        gao: {
            titre: "Gao",
            localisation: "Nord-Est",
            periode: "Saison fraîche",
            acces: "Route (Long trajet) ou avion",
            conseils: "Visitez le tombeau des Askia (UNESCO) et admirez la dune rose de Koïma au coucher du soleil",
            contact: "N/A",
            hotel: "Hôtel Atlantide",
            hotelLoc: "Gao Centre",
            hotelFonct: "Hôtel historique de la ville",
            hotelContact: "N/A",
            hotelRestau: "Cuisine Songhaï",
            guide: "Guide local Gao",
            guideContact: "Sur place"
        },
        kayes: {
            titre: "Kayes",
            localisation: "Ouest du pays (Frontière Sénégal)",
            periode: "Hiver (La ville la plus chaude d'Afrique en été)",
            acces: "Train ou Route",
            conseils: "Visitez le fort de Médine et les chutes du Felou à proximité",
            contact: "N/A",
            hotel: "Hôtel Khasso",
            hotelLoc: "Kayes Centre",
            hotelFonct: "Confortable et moderne",
            hotelContact: "Sur place",
            hotelRestau: "International",
            guide: "Aminata Traoré",
            guideContact: "aminata@visitafrika.com"
        },
        sikasso: {
            titre: "Sikasso",
            localisation: "Sud du Mali",
            periode: "Toute l'année",
            acces: "Route bitumée (5h de Bamako)",
            conseils: "La ville verte. Visitez les ruines du Tata (muraille) et les grottes de Missirikoro",
            contact: "N/A",
            hotel: "Hôtel Maïssa",
            hotelLoc: "Sikasso",
            hotelFonct: "Standard de qualité",
            hotelContact: "+223 21 62 20 20",
            hotelRestau: "Spécialités fruitières du Sud",
            guide: "Aminata Traoré",
            guideContact: "aminata@visitafrika.com"
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
                Demande envoyée ! Nos experts maliens vous contacteront.
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
