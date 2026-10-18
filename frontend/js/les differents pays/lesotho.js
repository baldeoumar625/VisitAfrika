/**
 * PROJET: VISIT AFRIKA
 * FICHIER: lesotho.js
 * DESCRIPTION: Script premium pour le Lesotho (Royaume dans le Ciel).
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Lesotho chargé.");

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
                    // Centrer sur le Lesotho
                    map = L.map('lesotho-map').setView([-29.61, 28.2336], 9);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Chutes de Maletsunyane (Semonkong)", lat: -29.86, lng: 28.05 },
                        { name: "Thaba Bosiu (Site National)", lat: -29.35, lng: 27.67 },
                        { name: "Barrage de Katse", lat: -29.33, lng: 28.50 },
                        { name: "Parc National de Sehlabathebe", lat: -29.87, lng: 29.12 },
                        { name: "Parc National de Tsehlanyane", lat: -28.91, lng: 28.47 },
                        { name: "Afriski Mountain Resort", lat: -28.82, lng: 28.72 },
                        { name: "Maseru (Capitale)", lat: -29.31, lng: 27.48 },
                        { name: "Pistes de Dinosaures (Leribe)", lat: -28.87, lng: 28.24 },
                        { name: "Grottes de Ha Kome", lat: -29.25, lng: 27.85 },
                        { name: "Mokhotlong", lat: -29.28, lng: 29.06 },
                        { name: "Sani Pass", lat: -29.58, lng: 29.28 },
                        { name: "Lac Letsie", lat: -30.33, lng: 28.17 },
                        { name: "Leribe (Hlotse)", lat: -28.87, lng: 28.23 },
                        { name: "Barrage de Mohale", lat: -29.45, lng: 28.10 },
                        { name: "Quthing (Art rupestre)", lat: -30.40, lng: 27.70 }
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
        maletsunyane: {
            titre: "Chutes de Maletsunyane",
            localisation: "Semonkong (Place de la Fumée)",
            periode: "Été (Novembre à Mars) ou Hiver (pour les cascades glacées)",
            acces: "Route depuis Maseru (3h) ou petit avion",
            conseils: "L'une des plus hautes chutes d'eau ininterrompues d'Afrique (192m). Tentez le record mondial de rappel (abseiling) ou profitez d'une randonnée à cheval le long de la gorge",
            contact: "Semonkong Lodge",
            hotel: "Semonkong Lodge",
            hotelLoc: "Semonkong, au bord de la rivière",
            hotelFonct: "Lodge de montagne rustique et chaleureux, célèbre pour son accueil et ses activités de plein air",
            hotelContact: "+266 2700 6037",
            hotelRestau: "Cuisine de montagne consistante",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        thaba_bosiu: {
            titre: "Thaba Bosiu",
            localisation: "Près de Maseru",
            periode: "Toute l'année",
            acces: "Route (30 min de Maseru)",
            conseils: "La 'Montagne de la Nuit', forteresse historique du roi Moshoeshoe Ier. Un lieu sacré pour le peuple Basotho. Visitez les tombeaux royaux au sommet du plateau",
            contact: "Thaba Bosiu Cultural Village",
            hotel: "Thaba Bosiu Cultural Village Lodge",
            hotelLoc: "Au pied de la montagne",
            hotelFonct: "Hébergement inspiré des huttes traditionnelles avec le confort moderne",
            hotelContact: "+266 2221 0000",
            hotelRestau: "Plats traditionnels Basotho",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        katse_dam: {
            titre: "Barrage de Katse",
            localisation: "Hautes terres centrales",
            periode: "Printemps / Été",
            acces: "Route panoramique sinueuse depuis Leribe",
            conseils: "Le plus haut barrage d'Afrique. Faites une visite technique de l'intérieur du mur et profitez des vues spectaculaires sur le lac artificiel et les montagnes",
            contact: "LHDA (Lesotho Highlands Development Authority)",
            hotel: "Katse Lodge",
            hotelLoc: "Surplombant le barrage",
            hotelFonct: "Hôtel confortable avec vue panoramique sur les infrastructures et le lac",
            hotelContact: "+266 2291 0806",
            hotelRestau: "Truites du lac",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        parc_sehlabathebe: {
            titre: "Parc National de Sehlabathebe",
            localisation: "Sud-Est (UNESCO)",
            periode: "Été (Fleurs sauvages)",
            acces: "4x4 obligatoire ou vol charter",
            conseils: "Paysage spectaculaire de formations rocheuses, d'arches naturelles et de prairies alpines. Un paradis pour les randonneurs et les photographes",
            contact: "Lesotho Ministry of Tourism",
            hotel: "Sehlabathebe Lodge",
            hotelLoc: "Dans le parc",
            hotelFonct: "Lodge d'État rustique offrant un calme absolu en pleine nature",
            hotelContact: "Sur place",
            hotelRestau: "Self-catering recommandé",
            guide: "Expert montagne",
            guideContact: "Sur place"
        },
        tsehlanyane: {
            titre: "Parc National de Tsehlanyane",
            localisation: "District de Leribe (Maloti Mountains)",
            periode: "Toute l'année",
            acces: "Route bitumée (Base du parc)",
            conseils: "Protège l'une des rares zones forestières indigènes du Lesotho. Idéal pour la randonnée, le VTT et l'observation des oiseaux",
            contact: "N/A",
            hotel: "Maliba Mountain Lodge",
            hotelLoc: "Dans le parc national",
            hotelFonct: "Lodge 5 étoiles luxueux, le seul établissement de ce standing en montagne au Lesotho",
            hotelContact: "+27 31 701 4431",
            hotelRestau: "Gastronomie de montagne",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        afriski: {
            titre: "Afriski Mountain Resort",
            localisation: "Passe de Mahlasela",
            periode: "Juin à Août (Ski) / Octobre à Avril (VTT/Randonnée)",
            acces: "Route bitumée (Attention à la neige)",
            conseils: "L'une des deux seules stations de ski d'Afrique subsaharienne. En été, c'est le spot idéal pour le VTT de descente et les parcours en 4x4",
            contact: "Afriski Info Desk",
            hotel: "Afriski Lodge & Chalets",
            hotelLoc: "Pied des pistes",
            hotelFonct: "Ambiance station de ski alpine avec options allant du backpacker au chalet de luxe",
            hotelContact: "+27 861 237 4754",
            hotelRestau: "Sky Restaurant (le plus haut d'Afrique)",
            guide: "Moniteur de montagne",
            guideContact: "Sur place"
        },
        maseru: {
            titre: "Maseru",
            localisation: "Frontière Ouest (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport Moshoeshoe I (MSU) / Route",
            conseils: "Visitez le centre d'artisanat Basotho (en forme de chapeau traditionnel) et le palais royal. Base idéale pour rayonner vers le centre du pays",
            contact: "Lesotho Tourism Development Corporation",
            hotel: "Avani Lesotho Hotel & Casino",
            hotelLoc: "Colline surplombant Maseru",
            hotelFonct: "Grand hôtel international avec vue sur la ville et infrastructures complètes",
            hotelContact: "+266 2224 3000",
            hotelRestau: "International et Buffets",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        pistes_dinosaures: {
            titre: "Pistes de Dinosaures",
            localisation: "Leribe & Quthing",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Le Lesotho possède l'une des plus fortes concentrations d'empreintes de dinosaures au monde. Visitez le site de Subeng près de Hlotse",
            contact: "N/A",
            hotel: "Hôtels de Leribe",
            hotelLoc: "Leribe",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "Local",
            guide: "Guide naturaliste local",
            guideContact: "Sur place"
        },
        ha_kome: {
            titre: "Grottes de Ha Kome",
            localisation: "District de Berea",
            periode: "Printemps / Été",
            acces: "Route 4x4 recommandée",
            conseils: "Maisons construites sous des surplombs rocheux naturels, habitées depuis la fin du 19ème siècle par des familles fuyant les guerres",
            contact: "Kome Caves Center",
            hotel: "Maison d'hôtes locale",
            hotelLoc: "Berea",
            hotelFonct: "Authentique",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine maison",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        mokhotlong: {
            titre: "Mokhotlong",
            localisation: "Nord-Est",
            periode: "Saison sèche",
            acces: "Route via Sani Pass (Spectaculaire)",
            conseils: "Région la plus haute et la plus isolée du Lesotho. Parfait pour découvrir le mode de vie traditionnel des bergers Maloti",
            contact: "N/A",
            hotel: "Mokhotlong Hotel",
            hotelLoc: "Mokhotlong",
            hotelFonct: "Escale historique de montagne",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        sani_pass: {
            titre: "Sani Pass",
            localisation: "Frontière Afrique du Sud / Lesotho",
            periode: "Toute l'année (Sauf météo extrême)",
            acces: "4x4 uniquement requis",
            conseils: "La route la plus raide et la plus célèbre d'Afrique. Terminez votre ascension par un verre au 'Highest Pub in Africa' à 2874m",
            contact: "N/A",
            hotel: "Sani Mountain Lodge",
            hotelLoc: "Sommet de la passe",
            hotelFonct: "Dormez littéralement sur le toit de l'Afrique du Sud, au Lesotho",
            hotelContact: "+27 33 702 1069",
            hotelRestau: "Pub culte et restauration copieuse",
            guide: "Expert 4x4 Sani",
            guideContact: "Sur place"
        },
        lac_letsie: {
            titre: "Lac Letsie",
            localisation: "Quthing",
            periode: "Été",
            acces: "4x4",
            conseils: "Magnifique zone humide de haute altitude, sanctuaire pour de nombreux oiseaux migrateurs et chevaux sauvages",
            contact: "N/A",
            hotel: "Campement de montagne",
            hotelLoc: "Letsie",
            hotelFonct: "Nature sauvage",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide équestre",
            guideContact: "Sur place"
        },
        leribe: {
            titre: "Leribe (Hlotse)",
            localisation: "Nord du Lesotho",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Ville commerciale dynamique, centre de production de l'artisanat de laine et base pour explorer les sites de dinosaures",
            contact: "N/A",
            hotel: "Mountain View Hotel",
            hotelLoc: "Leribe",
            hotelFonct: "Grand hôtel classique avec jardins",
            hotelContact: "+266 2240 0532",
            hotelRestau: "International",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        mohale_dam: {
            titre: "Barrage de Mohale",
            localisation: "Hautes terres centrales",
            periode: "Printemps / Été",
            acces: "Route panoramique A3",
            conseils: "Un autre prodige de l'ingénierie hydraulique du Lesotho. Moins fréquenté que Katse, il offre des paysages encore plus sauvages",
            contact: "LHDA Mohale",
            hotel: "Mohale Lodge",
            hotelLoc: "Près du barrage",
            hotelFonct: "Style chalet moderne et confortable",
            hotelContact: "+266 2292 7000",
            hotelRestau: "International",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
        },
        quthing: {
            titre: "Quthing",
            localisation: "Sud du Lesotho",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Région riche en peintures rupestres San et en vestiges de dinosaures. Paysages plus arides et dramatiques",
            contact: "N/A",
            hotel: "Orange River Hotel",
            hotelLoc: "Quthing",
            hotelFonct: "Escale au bord du fleuve Orange",
            hotelContact: "Sur place",
            hotelRestau: "Local",
            guide: "Thabo Molise",
            guideContact: "thabo@visitafrika.com"
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
                    <i class="fas fa-mountain"></i>
                    <div><strong>Accès & Transport</strong><br>${data.acces}</div>
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
                        <input type="number" name="personnes" min="1" max="8" value="2" required>
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
                Demande envoyée ! Nos experts du Royaume vous contacteront.
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