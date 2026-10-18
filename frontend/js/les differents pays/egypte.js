/**
 * PROJET: VISIT AFRIKA
 * FICHIER: egypte.js
 * DESCRIPTION: Script premium pour la page Égypte.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Égypte chargé.");

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
                    // Centrer sur l'Égypte
                    map = L.map('egypte-map').setView([26.8206, 30.8025], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Pyramides de Gizeh", lat: 29.9792, lng: 31.1342 },
                        { name: "Louxor (Temple)", lat: 25.6995, lng: 32.6394 },
                        { name: "Temple de Karnak", lat: 25.7188, lng: 32.6573 },
                        { name: "Vallée des Rois", lat: 25.7402, lng: 32.6014 },
                        { name: "Abou Simbel", lat: 22.3372, lng: 31.6258 },
                        { name: "Temple de Philae", lat: 24.0253, lng: 32.8844 },
                        { name: "Vieux Caire", lat: 30.0059, lng: 31.2301 },
                        { name: "Souk Khan el-Khalili", lat: 30.0477, lng: 31.2622 },
                        { name: "Bibliothèque d'Alexandrie", lat: 31.2089, lng: 29.9092 },
                        { name: "Oasis de Siwa", lat: 29.2032, lng: 25.5195 },
                        { name: "Dahab (Plongée)", lat: 28.5010, lng: 34.5152 },
                        { name: "Charm el-Cheikh", lat: 27.9158, lng: 34.3299 },
                        { name: "Hurghada", lat: 27.2579, lng: 33.8116 },
                        { name: "Désert Blanc", lat: 27.0607, lng: 27.9711 },
                        { name: "Mont Sinaï", lat: 28.5394, lng: 33.9744 }
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
        gizeh: {
            titre: "Pyramides de Gizeh",
            localisation: "Plateau de Gizeh, Le Caire",
            periode: "Octobre à Avril (Saison fraîche)",
            acces: "Taxi, Métro ou Bus depuis le centre du Caire",
            conseils: "Dernière des Sept Merveilles du monde antique. Visitez tôt le matin pour éviter la foule et la chaleur",
            contact: "Ministry of Tourism and Antiquities",
            hotel: "Marriott Mena House",
            hotelLoc: "Au pied des pyramides, Gizeh",
            hotelFonct: "Hôtel historique de luxe avec vue directe sur la Grande Pyramide",
            hotelContact: "+20 2 33773222",
            hotelRestau: "Le 139 (Restaurant avec vue)",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        louxor: {
            titre: "Louxor",
            localisation: "Haute-Égypte",
            periode: "Novembre à Mars",
            acces: "Train de nuit ou vol interne depuis Le Caire",
            conseils: "Surnommé 'le plus grand musée à ciel ouvert du monde'. Ne manquez pas la visite nocturne du temple de Louxor éclairé",
            contact: "Luxor Tourist Office",
            hotel: "Sofitel Winter Palace Luxor",
            hotelLoc: "Bord du Nil, Louxor",
            hotelFonct: "Hôtel de l'ère coloniale, élégance et jardins tropicaux",
            hotelContact: "+20 95 2380422",
            hotelRestau: "1886 Restaurant (Gastronomique)",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        karnak: {
            titre: "Temple de Karnak",
            localisation: "Louxor",
            periode: "Hiver",
            acces: "Caleche ou taxi depuis Louxor",
            conseils: "Plus grand complexe religieux jamais construit. La salle hypostyle avec ses 134 colonnes géantes est époustouflante",
            contact: "N/A",
            hotel: "Hilton Luxor Resort & Spa",
            hotelLoc: "Louxor Nord",
            hotelFonct: "Hôtel moderne avec vue imprenable sur le Nil",
            hotelContact: "+20 95 2374933",
            hotelRestau: "Plats locaux et internationaux",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        vallee_rois: {
            titre: "Vallée des Rois",
            localisation: "Rive Ouest de Louxor",
            periode: "Matinée uniquement",
            acces: "Ferry public ou bateau privé puis taxi/bus",
            conseils: "Lieu de sépulture de Toutânkhamon et de Ramsès II. Prévoyez de bonnes chaussures et de l'eau",
            contact: "N/A",
            hotel: "Al Moudira Hotel",
            hotelLoc: "Rive Ouest, Louxor",
            hotelFonct: "Palais d'inspiration orientale, calme et luxueux",
            hotelContact: "+20 122 3301230",
            hotelRestau: "Cuisine égyptienne raffinée",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        abou_simbel: {
            titre: "Abou Simbel",
            localisation: "Sud de l'Égypte (Nubie)",
            periode: "Février ou Octobre (Phénomène du soleil)",
            acces: "Vol interne depuis Assouan ou convoi de bus",
            conseils: "Les temples colossaux sauvés des eaux du Nil. Un chef-d'œuvre de Ramsès II et de l'ingénierie de l'UNESCO",
            contact: "N/A",
            hotel: "Seti Abu Simbel Lake Resort",
            hotelLoc: "Bord du lac Nasser",
            hotelFonct: "Style nubien, magnifique vue sur le lac",
            hotelContact: "+20 97 3401701",
            hotelRestau: "Buffets Nubiens",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        philae: {
            titre: "Temple de Philae",
            localisation: "Assouan",
            periode: "Fin d'après-midi",
            acces: "Bateau à moteur depuis Assouan",
            conseils: "Le temple d'Isis, sauvé et déplacé sur une île. Le spectacle Son et Lumière le soir est magnifique",
            contact: "N/A",
            hotel: "Old Cataract Aswan",
            hotelLoc: "Assouan",
            hotelFonct: "L'hôtel d'Agatha Christie, luxe historique ultime",
            hotelContact: "+20 97 2316000",
            hotelRestau: "1902 Restaurant",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        le_caire_vieux: {
            titre: "Vieux Caire",
            localisation: "Le Caire (Quartier Copte/Islamique)",
            periode: "Toute l'année",
            acces: "Métro Mar Girgis",
            conseils: "Explorez l'église suspendue et les mosquées millénaires. Un voyage dans l'histoire médiévale",
            contact: "N/A",
            hotel: "Fairmont Nile City",
            hotelLoc: "Le Caire",
            hotelFonct: "Moderne, vue sur le Nil et les pyramides au loin",
            hotelContact: "+20 2 24619494",
            hotelRestau: "Plusieurs options de luxe",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        khan_el_khalili: {
            titre: "Khan el-Khalili",
            localisation: "Caire Islamique",
            periode: "Soirée",
            acces: "Taxi ou marche depuis Al-Azhar",
            conseils: "Le plus célèbre souk d'Orient. Prenez un thé à la menthe au café historique El Fishawy",
            contact: "N/A",
            hotel: "Le Riad Hotel de Charme",
            hotelLoc: "Rue El Moez, Le Caire",
            hotelFonct: "Boutique hôtel de luxe au cœur de l'histoire",
            hotelContact: "+20 2 27876074",
            hotelRestau: "Toit terrasse panoramique",
            guide: "Amir Hassan",
            guideContact: "amir@visitafrika.com"
        },
        alexandrie_bibliotheque: {
            titre: "Bibliothèque d'Alexandrie",
            localisation: "Alexandrie (Corniche)",
            periode: "Toute l'année",
            acces: "Train depuis Le Caire (2h30)",
            conseils: "Réincarnation moderne de l'ancienne bibliothèque. Visitez aussi le fort de Qaitbay sur l'ancien site du Phare",
            contact: "Bibliotheca Alexandrina",
            hotel: "Four Seasons Hotel Alexandria",
            hotelLoc: "San Stefano, Alexandrie",
            hotelFonct: "Luxe absolu face à la Méditerranée",
            hotelContact: "+20 3 5818000",
            hotelRestau: "Poissons et fruits de mer",
            guide: "Heba Zaki",
            guideContact: "heba@visitafrika.com"
        },
        siwa: {
            titre: "Oasis de Siwa",
            localisation: "Désert Libyque (Ouest)",
            periode: "Octobre à Mars",
            acces: "Bus ou 4x4 privé depuis Alexandrie ou Le Caire (8-10h)",
            conseils: "Baignez-vous dans le bain de Cléopâtre et visitez le temple de l'Oracle d'Alexandre le Grand",
            contact: "Siwa Oasis Council",
            hotel: "Adrère Amellal",
            hotelLoc: "Pied de la montagne blanche",
            hotelFonct: "Eco-lodge unique sans électricité, luxe authentique",
            hotelContact: "Via agence",
            hotelRestau: "Produits de l'oasis",
            guide: "Guide Siwi local",
            guideContact: "Sur place"
        },
        dahab: {
            titre: "Dahab",
            localisation: "Golfe d'Aqaba, Sinaï",
            periode: "Toute l'année",
            acces: "Route depuis Charm el-Cheikh (1h)",
            conseils: "Ambiance bohème, idéal pour la plongée (Blue Hole) et le kitesurf",
            contact: "Diving Association",
            hotel: "Le Méridien Dahab",
            hotelLoc: "Dahab",
            hotelFonct: "Resort élégant et tranquille",
            hotelContact: "+20 69 3640401",
            hotelRestau: "Cuisine méditerranéenne",
            guide: "Heba Zaki",
            guideContact: "heba@visitafrika.com"
        },
        charm_el_cheikh: {
            titre: "Charm el-Cheikh",
            localisation: "Péninsule du Sinaï",
            periode: "Printemps / Automne",
            acces: "Aéroport international (SSH)",
            conseils: "Paradis de la plongée sous-marine (Parc Ras Mohammed). Vie nocturne animée à Naama Bay",
            contact: "Sinai Tourism",
            hotel: "Four Seasons Resort Sharm El Sheikh",
            hotelLoc: "Shark's Bay",
            hotelFonct: "Luxe de renommée mondiale, plage privée corallienne",
            hotelContact: "+20 69 3603555",
            hotelRestau: "Gastronomie italienne et arabe",
            guide: "Heba Zaki",
            guideContact: "heba@visitafrika.com"
        },
        hurghada: {
            titre: "Hurghada",
            localisation: "Côte de la Mer Rouge",
            periode: "Toute l'année",
            acces: "Aéroport international (HRG)",
            conseils: "Destination balnéaire majeure, point de départ pour explorer les îles Giftun",
            contact: "Red Sea Tourism",
            hotel: "The Oberoi Beach Resort Sahl Hasheesh",
            hotelLoc: "Sahl Hasheesh, Hurghada",
            hotelFonct: "Suites de luxe avec jardins privés face à la mer",
            hotelContact: "+20 65 3440777",
            hotelRestau: "Fine dining",
            guide: "Heba Zaki",
            guideContact: "heba@visitafrika.com"
        },
        desert_blanc: {
            titre: "Désert Blanc",
            localisation: "Près de Farafra (Désert Occidental)",
            periode: "Octobre à Avril",
            acces: "Expédition 4x4 depuis Le Caire",
            conseils: "Formations de craie irréelles sculptées par le vent. Camping à la belle étoile recommandé",
            contact: "White Desert National Park",
            hotel: "Bivouac sous les étoiles",
            hotelLoc: "Désert Blanc",
            hotelFonct: "Expérience magique, tentes traditionnelles",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine bédouine au feu de bois",
            guide: "Guide Bédouin certifié",
            guideContact: "Obligatoire"
        },
        mont_sinai: {
            titre: "Mont Sinaï",
            localisation: "Sainte-Catherine, Sinaï",
            periode: "Printemps / Automne",
            acces: "Route vers Sainte-Catherine",
            conseils: "Gravissez la montagne de nuit pour voir le lever du soleil au sommet. Visitez le monastère au pied",
            contact: "Monastery of St. Catherine",
            hotel: "Sheikh Moussa Guesthouse",
            hotelLoc: "Sainte-Catherine",
            hotelFonct: "Auberge de montagne simple et accueillante",
            hotelContact: "Sur place",
            hotelRestau: "Repas bédouins",
            guide: "Guide bédouin local",
            guideContact: "Obligatoire pour l'ascension"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon séjour</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="30" value="2" required>
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
                Demande envoyée ! Nos experts égyptiens vous contacteront.
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
