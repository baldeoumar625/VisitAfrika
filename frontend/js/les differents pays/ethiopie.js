/**
 * PROJET: VISIT AFRIKA
 * FICHIER: ethiopie.js
 * DESCRIPTION: Script premium pour l'Éthiopie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Éthiopie chargé.");

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
                    // Centrer sur l'Éthiopie
                    map = L.map('ethiopie-map').setView([9.145, 40.4897], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Lalibela (Églises rupestres)", lat: 12.03, lng: 39.04 },
                        { name: "Montagnes du Simien", lat: 13.17, lng: 38.30 },
                        { name: "Axoum (Stèles)", lat: 14.12, lng: 38.72 },
                        { name: "Gondar (Châteaux)", lat: 12.60, lng: 37.47 },
                        { name: "Vallée de l'Omo", lat: 5.45, lng: 36.35 },
                        { name: "Dallol (Dépression du Danakil)", lat: 14.24, lng: 40.30 },
                        { name: "Erta Ale (Volcan)", lat: 13.60, lng: 40.67 },
                        { name: "Harar Jugol (UNESCO)", lat: 9.31, lng: 42.12 },
                        { name: "Monastères du Lac Tana", lat: 11.95, lng: 37.35 },
                        { name: "Addis-Abeba (Capitale)", lat: 9.03, lng: 38.74 },
                        { name: "Parc National de Bale", lat: 6.75, lng: 39.60 },
                        { name: "Parc National de Nechisar", lat: 6.00, lng: 37.55 },
                        { name: "Tiya (Stèles)", lat: 8.43, lng: 38.61 },
                        { name: "Bahir Dar (Chutes du Nil Bleu)", lat: 11.59, lng: 37.39 },
                        { name: "Dire Dawa", lat: 9.60, lng: 41.86 }
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
        lalibela: {
            titre: "Lalibela",
            localisation: "Hauts plateaux d'Éthiopie (Amhara)",
            periode: "Septembre à Mars (Surtout pour Noël éthiopien 'Genna' en Janvier)",
            acces: "Vol interne quotidien depuis Addis-Abeba",
            conseils: "Visitez l'église Saint-Georges (Bet Giyorgis) creusée en forme de croix. Engagez un guide local pour comprendre la symbolique spirituelle",
            contact: "Lalibela Cultural Office",
            hotel: "Maribela Hotel",
            hotelLoc: "Sur les falaises de Lalibela",
            hotelFonct: "Vue imprenable sur les vallées, architecture locale",
            hotelContact: "+251 33 336 0000",
            hotelRestau: "Cuisine éthiopienne raffinée (Injera et plats locaux)",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        simien: {
            titre: "Montagnes du Simien",
            localisation: "Nord de l'Éthiopie",
            periode: "Octobre à Mars (Ciel dégagé)",
            acces: "Route depuis Gondar",
            conseils: "Le 'Toit de l'Afrique'. Observez les singes Géladas et les bouquetins Walia. Prévoyez des vêtements chauds pour les nuits",
            contact: "Simien Mountains National Park Office",
            hotel: "Limalimo Lodge",
            hotelLoc: "Lisière du parc Simien",
            hotelFonct: "Eco-lodge de luxe avec vue spectaculaire sur les escarpements",
            hotelContact: "+251 93 404 0404",
            hotelRestau: "Produits frais locaux",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        axoum: {
            titre: "Axoum (Aksum)",
            localisation: "Région du Tigré",
            periode: "Saison sèche",
            acces: "Vol interne",
            conseils: "Ancienne capitale du royaume axoumite. Visitez le champ de stèles monumentales et l'église Notre-Dame-de-Sion",
            contact: "Axum Tourist Information",
            hotel: "Sabean International Hotel",
            hotelLoc: "Axoum Centre",
            hotelFonct: "Moderne et confortable",
            hotelContact: "+251 34 775 0000",
            hotelRestau: "International et Local",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        gondar: {
            titre: "Gondar",
            localisation: "Région Amhara",
            periode: "Janvier (Célébrations du Timkat)",
            acces: "Vol interne ou route panoramique",
            conseils: "Le 'Camelot de l'Afrique'. Explorez l'enceinte royale de Fasil Ghebbi et l'église Debre Berhan Selassie",
            contact: "Gondar Tourism Bureau",
            hotel: "Goha Hotel",
            hotelLoc: "Sur une colline surplombant la ville",
            hotelFonct: "Hôtel historique avec la meilleure vue sur les châteaux",
            hotelContact: "+251 58 111 0000",
            hotelRestau: "Buffets traditionnels",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        omo_valley: {
            titre: "Vallée de l'Omo",
            localisation: "Sud de l'Éthiopie",
            periode: "Juin à Septembre ou Décembre à Mars",
            acces: "Vol vers Jinka ou Arba Minch puis 4x4",
            conseils: "Rencontre exceptionnelle avec les tribus Mursi, Hamer et Karo. Respectez scrupuleusement les coutumes locales",
            contact: "South Omo Zone Tourism",
            hotel: "Buska Lodge",
            hotelLoc: "Turmi",
            hotelFonct: "Lodge de charme au cœur du pays Hamer",
            hotelContact: "+251 11 552 2222",
            hotelRestau: "Cuisine de brousse soignée",
            guide: "Expert local Omo",
            guideContact: "Via agence Addis"
        },
        dallol: {
            titre: "Dallol (Danakil)",
            localisation: "Dépression de l'Afar",
            periode: "Novembre à Février (Chaleur extrême le reste de l'année)",
            acces: "Expédition 4x4 organisée depuis Mekele",
            conseils: "Paysage irréel de sel, soufre et minéraux aux couleurs fluos. Le point le plus bas d'Afrique",
            contact: "Danakil Tourism Service",
            hotel: "Bivouac sous les étoiles",
            hotelLoc: "Campement de Hamed Ela",
            hotelFonct: "Rustique, expérience unique sous la Voie Lactée",
            hotelContact: "Via agence",
            hotelRestau: "Préparé par l'équipe d'expédition",
            guide: "Guide Afar et escorte militaire",
            guideContact: "Obligatoire"
        },
        erta_ale: {
            titre: "Erta Ale",
            localisation: "Désert du Danakil",
            periode: "Hiver",
            acces: "4x4 puis randonnée de nuit vers le cratère",
            conseils: "Un lac de lave permanent en activité. Spectacle volcanique fascinant et rare",
            contact: "N/A",
            hotel: "Campement de base au cratère",
            hotelLoc: "Sommet du volcan",
            hotelFonct: "Sommaire, matelas au sol",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide local Afar",
            guideContact: "Obligatoire"
        },
        harar: {
            titre: "Harar Jugol",
            localisation: "Est de l'Éthiopie",
            periode: "Toute l'année",
            acces: "Vol vers Dire Dawa puis 1h de route",
            conseils: "Quatrième ville sainte de l'islam. Ne manquez pas le rituel nocturne du nourrissage des hyènes",
            contact: "Harar Heritage Bureau",
            hotel: "Rewda Guesthouse",
            hotelLoc: "Dans la vieille ville (Jugol)",
            hotelFonct: "Maison hararie traditionnelle magnifiquement décorée",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités de Harar",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        lac_tana: {
            titre: "Monastères du Lac Tana",
            localisation: "Bahir Dar",
            periode: "Septembre à Mai",
            acces: "Bateau depuis Bahir Dar",
            conseils: "Naviguez vers les îles isolées pour découvrir des monastères peints datant du 14ème siècle",
            contact: "Bahir Dar Tourism Office",
            hotel: "Kuriftu Resort & Spa",
            hotelLoc: "Bord du Lac Tana, Bahir Dar",
            hotelFonct: "Luxe, spa et calme face au lac",
            hotelContact: "+251 58 220 0000",
            hotelRestau: "Poissons du lac frais",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        addis_abeba: {
            titre: "Addis-Abeba",
            localisation: "Centre (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international Bole (ADD)",
            conseils: "Visitez le Musée National pour voir 'Lucy' et profitez d'une cérémonie du café traditionnelle",
            contact: "Ministry of Culture and Tourism",
            hotel: "Sheraton Addis",
            hotelLoc: "Quartier Kirkos, Addis",
            hotelFonct: "Palais de luxe, centre diplomatique de l'Union Africaine",
            hotelContact: "+251 11 517 1717",
            hotelRestau: "Multiples restaurants de classe mondiale",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        parc_bale: {
            titre: "Parc National de Bale Mountains",
            localisation: "Sud-Est",
            periode: "Saison sèche",
            acces: "Route depuis Addis (7h) ou vol vers Robe",
            conseils: "Sanctuaire du loup d'Éthiopie, le canidé le plus rare au monde",
            contact: "EWCA (Ethiopian Wildlife Conservation Authority)",
            hotel: "Bale Mountain Lodge",
            hotelLoc: "Forêt d'Harenna",
            hotelFonct: "Eco-lodge niché dans une forêt de nuages",
            hotelContact: "+251 91 140 0000",
            hotelRestau: "Cuisine gastronomique bio",
            guide: "Expert nature Bale",
            guideContact: "Via lodge"
        },
        parc_nechisar: {
            titre: "Parc National de Nechisar",
            localisation: "Arba Minch",
            periode: "Saison sèche",
            acces: "Route",
            conseils: "Visitez le 'Pont de Dieu' entre les lacs Abaya et Chamo. Safari en bateau pour voir les crocodiles géants",
            contact: "Arba Minch Tourism Bureau",
            hotel: "Paradise Lodge",
            hotelLoc: "Surplombant les lacs Abaya et Chamo",
            hotelFonct: "Hôtel construit en matériaux naturels, vue magique",
            hotelContact: "+251 46 881 0000",
            hotelRestau: "Poissons frais du lac",
            guide: "Guide local Arba Minch",
            guideContact: "Sur place"
        },
        tiya: {
            titre: "Stèles de Tiya",
            localisation: "Sud d'Addis-Abeba",
            periode: "Excursion journée",
            acces: "Route (2h de la capitale)",
            conseils: "Site UNESCO abritant 36 stèles gravées de symboles mystérieux, héritage d'une culture protohistorique",
            contact: "ARCCH (Authority for Research and Conservation of Cultural Heritage)",
            hotel: "Hôtels de Addis-Abeba",
            hotelLoc: "Addis-Abeba",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        bahir_dar: {
            titre: "Bahir Dar",
            localisation: "Région Amhara",
            periode: "Toute l'année",
            acces: "Vol interne ou route",
            conseils: "Visitez les chutes du Nil Bleu (Tis Abay) à 30km de la ville",
            contact: "Bahir Dar Tourist Information",
            hotel: "Avanti Blue Nile Hotel",
            hotelLoc: "Bord du lac",
            hotelFonct: "Moderne et spacieux",
            hotelContact: "+251 58 222 0000",
            hotelRestau: "Buffet international",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
        },
        dire_dawa: {
            titre: "Dire Dawa",
            localisation: "Est",
            periode: "Toute l'année",
            acces: "Train moderne depuis Addis ou vol",
            conseils: "Ville cheminote au charme cosmopolite, point de passage vers Harar",
            contact: "Dire Dawa City Admin Tourism",
            hotel: "Samrat Hotel",
            hotelLoc: "Dire Dawa",
            hotelFonct: "Standard confortable",
            hotelContact: "Sur place",
            hotelRestau: "Mélange de cuisines éthiopienne et arabe",
            guide: "Selamawit Kebede",
            guideContact: "selam@visitafrika.com"
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
                    <i class="fas fa-plane-departure"></i>
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
                Demande envoyée ! Nos experts éthiopiens vous contacteront.
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
