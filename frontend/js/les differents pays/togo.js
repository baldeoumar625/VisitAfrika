/**
 * PROJET: VISIT AFRIKA
 * FICHIER: togo.js
 * DESCRIPTION: Script premium pour la page Togo.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Togo chargé.");

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
                    // Centrer sur le Togo
                    map = L.map('togo-map').setView([8.6195, 0.8248], 8);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Koutammakou (UNESCO)", lat: 10.15, lng: 1.10 },
                        { name: "Cascade d'Akloa", lat: 7.50, lng: 0.60 },
                        { name: "Pic Agou", lat: 6.85, lng: 0.75 },
                        { name: "Lac Togo", lat: 6.25, lng: 1.30 },
                        { name: "Grand Marché de Lomé", lat: 6.12, lng: 1.22 },
                        { name: "Togoville", lat: 6.23, lng: 1.30 },
                        { name: "Aného", lat: 6.23, lng: 1.60 },
                        { name: "Parc National Fazao-Malfakassa", lat: 8.75, lng: 0.80 },
                        { name: "Parc National de la Kéran", lat: 10.15, lng: 0.55 },
                        { name: "Châteaux Tamberma", lat: 10.18, lng: 1.05 },
                        { name: "Falaises de Dapaong", lat: 10.86, lng: 0.21 },
                        { name: "Monastère de Dzogbégan", lat: 7.23, lng: 0.68 },
                        { name: "Kpalimé (Artisanat)", lat: 6.90, lng: 0.63 },
                        { name: "Kara", lat: 9.55, lng: 1.19 },
                        { name: "Atakpamé", lat: 7.53, lng: 1.13 }
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
        koutammakou: {
            titre: "Koutammakou",
            localisation: "Région de la Kara (Nord-Est)",
            periode: "Novembre à Mars (Saison sèche)",
            acces: "Route bitumée puis piste (4x4 conseillé)",
            conseils: "Découvrez les 'Takienta', maisons à étages en terre uniques au monde du peuple Batammariba",
            contact: "Direction Régionale du Tourisme Kara",
            hotel: "Hôtel Kara",
            hotelLoc: "Kara (base)",
            hotelFonct: "Hôtel de référence dans le Nord, grand confort",
            hotelContact: "+228 26 60 00 22",
            hotelRestau: "Cuisine locale et européenne",
            guide: "Koffi Mensah",
            guideContact: "koffi@visitafrika.com"
        },
        cascade_akloa: {
            titre: "Cascade d'Akloa",
            localisation: "Badou (Région des Plateaux)",
            periode: "Toute l'année (Plus impressionnante après les pluies)",
            acces: "Route puis randonnée guidée de 45 min en forêt",
            conseils: "Baignade possible au pied de la chute de 80m. Prévoyez des chaussures de marche",
            contact: "Syndicat d'initiative de Badou",
            hotel: "Campement de Badou",
            hotelLoc: "Badou Centre",
            hotelFonct: "Simple, ambiance tropicale",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine du terroir (Foutou banane)",
            guide: "Koffi Mensah",
            guideContact: "koffi@visitafrika.com"
        },
        pic_agou: {
            titre: "Pic Agou",
            localisation: "Près de Kpalimé",
            periode: "Toute l'année",
            acces: "Route de montagne sinueuse",
            conseils: "Le point culminant du Togo (986m), vue panoramique sur les vallées et le Ghana voisin",
            contact: "Office du Tourisme de Kpalimé",
            hotel: "Hôtel du 30 Août",
            hotelLoc: "Kpalimé",
            hotelFonct: "Hôtel historique rénové, calme et verdure",
            hotelContact: "+228 24 41 00 95",
            hotelRestau: "Spécialités de montagne",
            guide: "Abla Togolais",
            guideContact: "abla@visitafrika.com"
        },
        lac_togo: {
            titre: "Lac Togo",
            localisation: "Agbodrafo / Togoville",
            periode: "Toute l'année",
            acces: "Route côtière (30 min de Lomé)",
            conseils: "Parfait pour les sports nautiques et les balades en pirogue vers Togoville",
            contact: "Hôtel du Lac",
            hotel: "Hôtel du Lac",
            hotelLoc: "Agbodrafo",
            hotelFonct: "Resort pieds dans l'eau, piscine et ponton",
            hotelContact: "+228 23 35 70 66",
            hotelRestau: "Buffet de poissons frais",
            guide: "Abla Togolais",
            guideContact: "abla@visitafrika.com"
        },
        lomé_marché: {
            titre: "Grand Marché de Lomé",
            localisation: "Lomé Centre",
            periode: "Toute l'année (Jours de pointe : Mercredi et Samedi)",
            acces: "Cœur de la capitale",
            conseils: "Le royaume des 'Nana Benz' (vendeuses de pagnes Wax), immersion totale garantie",
            contact: "Mairie de Lomé",
            hotel: "Hôtel 2 Février",
            hotelLoc: "Place de l'Indépendance, Lomé",
            hotelFonct: "Palace emblématique, le plus haut standard du pays",
            hotelContact: "+228 22 23 86 00",
            hotelRestau: "Restaurants gastronomiques",
            guide: "Abla Togolais",
            guideContact: "abla@visitafrika.com"
        },
        togoville: {
            titre: "Togoville",
            localisation: "Rive Nord du Lac Togo",
            periode: "Toute l'année",
            acces: "Pirogue depuis Agbodrafo",
            conseils: "Ville chargée d'histoire (Traité de protectorat) et centre spirituel Vaudou",
            contact: "Palais Royal de Togoville",
            hotel: "Hôtels de Lomé / Agbodrafo",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale sur place",
            guide: "Abla Togolais",
            guideContact: "abla@visitafrika.com"
        },
        aneho: {
            titre: "Aného",
            localisation: "Frontière Bénin",
            periode: "Toute l'année",
            acces: "Route côtière (45 min de Lomé)",
            conseils: "Ancienne capitale coloniale, admirez le spectacle des pêcheurs au canal",
            contact: "Mairie d'Aného",
            hotel: "Lodge de l'Embouchure",
            hotelLoc: "Aného",
            hotelFonct: "Charmant, vue sur le fleuve et la mer",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités de poisson",
            guide: "Abla Togolais",
            guideContact: "abla@visitafrika.com"
        },
        parc_fazao: {
            titre: "Parc National Fazao-Malfakassa",
            localisation: "Centre-Ouest (Sokodé)",
            periode: "Novembre à Mars",
            acces: "4x4 obligatoire",
            conseils: "Le plus grand parc du pays, paysages de collines et savane arborée",
            contact: "Direction des Parcs Nationaux",
            hotel: "Hôtel Central Sokodé",
            hotelLoc: "Sokodé",
            hotelFonct: "Base idéale pour explorer le centre",
            hotelContact: "+228 25 50 00 03",
            hotelRestau: "Plats locaux Tem",
            guide: "Koffi Mensah",
            guideContact: "koffi@visitafrika.com"
        },
        parc_keran: {
            titre: "Parc National de la Kéran",
            localisation: "Nord du Togo",
            periode: "Saison sèche",
            acces: "Route vers Dapaong",
            conseils: "Observez les éléphants et la riche faune aviaire en bordure de rivière",
            contact: "N/A",
            hotel: "Hôtel de la Kéran",
            hotelLoc: "Naboulgou",
            hotelFonct: "Lodge de brousse authentique",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale",
            guide: "Ranger du parc",
            guideContact: "Sur place"
        },
        chateau_tamberma: {
            titre: "Châteaux Tamberma",
            localisation: "Koutammakou",
            periode: "Hiver",
            acces: "Piste",
            conseils: "Symbole de la résistance culturelle, architecture de défense fascinante",
            contact: "Bureau du Patrimoine Mondial",
            hotel: "Campements villageois",
            hotelLoc: "Nadoba",
            hotelFonct: "Nuit authentique sous les étoiles",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine traditionnelle locale",
            guide: "Guide Batammariba",
            guideContact: "Obligatoire"
        },
        falaise_dapaong: {
            titre: "Falaises de Dapaong",
            localisation: "Extrême Nord",
            periode: "Hiver (Harmattan)",
            acces: "Route nationale 1",
            conseils: "Grottes de Nok et Mamproug, anciens refuges accrochés à la falaise",
            contact: "Musée de Dapaong",
            hotel: "Hôtel Dapaong",
            hotelLoc: "Dapaong",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "Cuisine du Nord",
            guide: "Koffi Mensah",
            guideContact: "koffi@visitafrika.com"
        },
        monastere_dzogbegan: {
            titre: "Monastère de Dzogbégan",
            localisation: "Plateau de Day",
            periode: "Toute l'année",
            acces: "Route depuis Kpalimé",
            conseils: "Un havre de paix, achetez les produits artisanaux des moines (café, confitures)",
            contact: "Abbaye de l'Ascension",
            hotel: "Hôtellerie monastique",
            hotelLoc: "Dzogbégan",
            hotelFonct: "Calme, silence, idéal pour la retraite",
            hotelContact: "Sur place",
            hotelRestau: "Produits de la ferme du monastère",
            guide: "N/A",
            guideContact: "N/A"
        },
        kpalime: {
            titre: "Kpalimé",
            localisation: "Région des Plateaux",
            periode: "Toute l'année",
            acces: "Route (1h30 de Lomé)",
            conseils: "Centre de l'artisanat (batiks, poterie) et des randonnées en montagne",
            contact: "Centre Artisanal de Kpalimé",
            hotel: "Hôtel Jess",
            hotelLoc: "Kpalimé Centre",
            hotelFonct: "Moderne et confortable",
            hotelContact: "+228 24 41 05 55",
            hotelRestau: "Cuisine internationale et locale",
            guide: "Abla Togolais",
            guideContact: "abla@visitafrika.com"
        },
        kara: {
            titre: "Kara",
            localisation: "Nord du pays",
            periode: "Juillet (Luttes Evala)",
            acces: "Route nationale 1",
            conseils: "Cœur du pays Kabyé, ville dynamique et carrefour commercial",
            contact: "Mairie de Kara",
            hotel: "Hôtel Kara",
            hotelLoc: "Kara",
            hotelFonct: "Le meilleur hôtel de la région",
            hotelContact: "+228 26 60 00 22",
            hotelRestau: "Buffets généreux",
            guide: "Koffi Mensah",
            guideContact: "koffi@visitafrika.com"
        },
        atakampe: {
            titre: "Atakpamé",
            localisation: "Région des Plateaux",
            periode: "Toute l'année",
            acces: "Route nationale 1 (mi-chemin)",
            conseils: "La ville aux sept collines, réputée pour ses tisserands et sa fraîcheur",
            contact: "N/A",
            hotel: "Hôtel Roc",
            hotelLoc: "Atakpamé",
            hotelFonct: "Hôtel de passage historique",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités de fonio",
            guide: "Koffi Mensah",
            guideContact: "koffi@visitafrika.com"
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
                Demande envoyée ! Nos experts togolais vous contacteront.
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
