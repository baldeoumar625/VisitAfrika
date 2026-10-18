/**
 * PROJET: VISIT AFRIKA
 * FICHIER: niger.js
 * DESCRIPTION: Script premium pour la page Niger.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Niger chargé.");

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
                    // Centrer sur le Niger
                    map = L.map('niger-map').setView([17.6078, 8.0817], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Réserve de l'Aïr et du Ténéré", lat: 19.00, lng: 9.00 },
                        { name: "Agadez (Mosquée & Vieille Ville)", lat: 16.97, lng: 7.99 },
                        { name: "Parc National du W", lat: 12.40, lng: 2.50 },
                        { name: "Girafes de Kouré", lat: 13.33, lng: 2.58 },
                        { name: "Niamey (Capitale)", lat: 13.51, lng: 2.11 },
                        { name: "Sultanat de Zinder", lat: 13.80, lng: 8.98 },
                        { name: "Palais du Sultan (Zinder)", lat: 13.81, lng: 8.99 },
                        { name: "Salines de Bilma", lat: 18.68, lng: 12.92 },
                        { name: "Gravures de Dabous", lat: 17.55, lng: 7.75 },
                        { name: "Oasis de Timia", lat: 18.10, lng: 8.78 },
                        { name: "Iffouane", lat: 19.10, lng: 8.40 },
                        { name: "Tahoua", lat: 14.88, lng: 5.26 },
                        { name: "Palais de Dosso", lat: 13.04, lng: 3.19 },
                        { name: "Maradi", lat: 13.49, lng: 7.10 },
                        { name: "Diffa (Lac Tchad)", lat: 13.31, lng: 12.61 }
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
        air_tenere: {
            titre: "Réserve de l'Aïr et du Ténéré",
            localisation: "Nord du Niger (Massif de l'Aïr / Désert du Ténéré)",
            periode: "Novembre à Février (Saison fraîche)",
            acces: "4x4 d'expédition uniquement depuis Agadez",
            conseils: "Plus grande réserve d'Afrique, paysages lunaires et dunes géantes. Escorte de sécurité obligatoire",
            contact: "Office National du Tourisme du Niger",
            hotel: "Bivouac de luxe en plein désert",
            hotelLoc: "Dunes de Temet",
            hotelFonct: "Immersion totale, confort itinérant",
            hotelContact: "Via agence Agadez",
            hotelRestau: "Cuisine Touareg traditionnelle",
            guide: "Moussa Ag Ibrahim",
            guideContact: "moussa@visitafrika.com"
        },
        agadez: {
            titre: "Agadez",
            localisation: "Porte du désert",
            periode: "Festival de la Cure Salée (Septembre)",
            acces: "Vols internes ou route goudronnée (longue)",
            conseils: "Admirez le minaret en terre crue de 27m et perdez-vous dans le quartier historique UNESCO",
            contact: "Mairie d'Agadez / Bureau du Tourisme",
            hotel: "Hôtel de la Paix",
            hotelLoc: "Agadez Centre",
            hotelFonct: "Hôtel mythique, style architectural local",
            hotelContact: "+227 20 44 00 00",
            hotelRestau: "Gastronomie nigérienne de l'Aïr",
            guide: "Moussa Ag Ibrahim",
            guideContact: "moussa@visitafrika.com"
        },
        parc_w: {
            titre: "Parc National du W",
            localisation: "Sud-Ouest (Triple frontière Niger/Bénin/Burkina)",
            periode: "Janvier à Mai",
            acces: "Route depuis Niamey (2h)",
            conseils: "Réserve de biosphère UNESCO, idéale pour observer les éléphants et les lions",
            contact: "Direction des Parcs Nationaux",
            hotel: "Hôtel de la Tapoa",
            hotelLoc: "Entrée du parc",
            hotelFonct: "Lodge de brousse confortable, piscine",
            hotelContact: "+227 20 73 30 00",
            hotelRestau: "Plats locaux et internationaux",
            guide: "Issoufou M.",
            guideContact: "issoufou@visitafrika.com"
        },
        girafes_koure: {
            titre: "Girafes de Kouré",
            localisation: "Près de Niamey (60km)",
            periode: "Toute l'année (Matin de préférence)",
            acces: "Route bitumée facile",
            conseils: "Dernière colonie de girafes d'Afrique de l'Ouest vivant en liberté totale avec les populations",
            contact: "Association de sauvegarde des girafes (AVSN)",
            hotel: "Hôtels de Niamey (Excursion)",
            hotelLoc: "Niamey",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Issoufou M.",
            guideContact: "issoufou@visitafrika.com"
        },
        niamey: {
            titre: "Niamey",
            localisation: "Bord du fleuve Niger (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international Diori Hamani (NIM)",
            conseils: "Visitez le Musée National et profitez du coucher de soleil sur le fleuve en pirogue",
            contact: "Ministère du Tourisme et de l'Artisanat",
            hotel: "Radisson Blu Hotel & Conference Center",
            hotelLoc: "Quartier Plateau, Niamey",
            hotelFonct: "Le plus haut standard de luxe du pays",
            hotelContact: "+227 20 73 20 00",
            hotelRestau: "Gastronomie internationale raffinée",
            guide: "Issoufou M.",
            guideContact: "issoufou@visitafrika.com"
        },
        zinder: {
            titre: "Zinder (Damagaram)",
            localisation: "Est du pays",
            periode: "Toute l'année",
            acces: "Route bitumée ou vol interne",
            conseils: "Deuxième ville du pays, célèbre pour son quartier Birni et ses maisons peintes",
            contact: "Sultanat de Zinder",
            hotel: "Hôtel Gawèye Zinder",
            hotelLoc: "Zinder Centre",
            hotelFonct: "Hôtel classique confortable",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités de l'Est",
            guide: "Abdou Zinder",
            guideContact: "abdou@visitafrika.com"
        },
        zinder_palais: {
            titre: "Palais du Sultan de Zinder",
            localisation: "Quartier Birni, Zinder",
            periode: "Toute l'année",
            acces: "Cœur historique",
            conseils: "Architecture monumentale en terre, symbole de l'histoire pré-coloniale",
            contact: "N/A",
            hotel: "Lodges locaux",
            hotelLoc: "Zinder",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Abdou Zinder",
            guideContact: "abdou@visitafrika.com"
        },
        bilma: {
            titre: "Salines de Bilma",
            localisation: "Désert du Kawar (Nord-Est)",
            periode: "Hiver",
            acces: "Expédition 4x4 (Très long)",
            conseils: "Découvrez les puits de sel millénaires et l'arrivée des caravanes (Azalaï)",
            contact: "N/A",
            hotel: "Maison de passage traditionnelle",
            hotelLoc: "Bilma",
            hotelFonct: "Rustique",
            hotelContact: "N/A",
            hotelRestau: "Cuisine de l'oasis",
            guide: "Expert désert",
            guideContact: "Via agence Agadez"
        },
        dabous: {
            titre: "Gravures de Dabous",
            localisation: "Nord d'Agadez",
            periode: "Saison fraîche",
            acces: "4x4 depuis Agadez (1h30)",
            conseils: "Admirez les girafes géantes gravées il y a 8000 ans, un chef-d'œuvre de l'art rupestre",
            contact: "Bradshaw Foundation",
            hotel: "Hôtels d'Agadez",
            hotelLoc: "Agadez",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Moussa Ag Ibrahim",
            guideContact: "moussa@visitafrika.com"
        },
        timia: {
            titre: "Oasis de Timia",
            localisation: "Massif de l'Aïr",
            periode: "Janvier (Récolte des agrumes)",
            acces: "4x4 d'Agadez",
            conseils: "Vergers d'orangers, de grenadiers et cascades d'eau en plein désert",
            contact: "Communauté de Timia",
            hotel: "Auberge de Timia",
            hotelLoc: "Dans l'oasis",
            hotelFonct: "Construction traditionnelle, accueil Touareg authentique",
            hotelContact: "Sur place",
            hotelRestau: "Fruits frais de l'oasis",
            guide: "Guide local Timia",
            guideContact: "Sur place"
        },
        iffouane: {
            titre: "Iffouane",
            localisation: "Extrême Nord de l'Aïr",
            periode: "Hiver",
            acces: "Expédition 4x4",
            conseils: "Porte du grand désert du Ténéré, paysages grandioses",
            contact: "N/A",
            hotel: "Bivouac",
            hotelLoc: "Iffouane",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Moussa Ag Ibrahim",
            guideContact: "moussa@visitafrika.com"
        },
        tahoua: {
            titre: "Tahoua",
            localisation: "Centre-Ouest",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Capitale de l'Ader, visitez les villages aux habitations troglodytes proches",
            contact: "N/A",
            hotel: "Hôtel de l'Ader",
            hotelLoc: "Tahoua",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "Plats locaux",
            guide: "N/A",
            guideContact: "N/A"
        },
        dosso: {
            titre: "Dosso",
            localisation: "Sud du Niger",
            periode: "Toute l'année",
            acces: "Route (1h30 de Niamey)",
            conseils: "Visitez le Palais du Zarmakoye, monument historique de la culture Djerma-Zarma",
            contact: "Sultanat de Dosso",
            hotel: "Hôtels de Niamey (Transit)",
            hotelLoc: "Niamey",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale Djerma",
            guide: "Issoufou M.",
            guideContact: "issoufou@visitafrika.com"
        },
        maradi: {
            titre: "Maradi",
            localisation: "Centre-Sud",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Capitale économique, visitez le grand marché artisanal",
            contact: "N/A",
            hotel: "Hôtel Maradi",
            hotelLoc: "Centre-ville",
            hotelFonct: "Confort d'affaires",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités Haoussa",
            guide: "N/A",
            guideContact: "N/A"
        },
        diffa: {
            titre: "Diffa (Lac Tchad)",
            localisation: "Extrême Sud-Est",
            periode: "Novembre à Janvier",
            acces: "Route longue ou vol (Consulter sécurité)",
            conseils: "Région du Lac Tchad, paysages de dunes et d'eau",
            contact: "N/A",
            hotel: "Hôtel de Diffa",
            hotelLoc: "Diffa",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "Poisson du lac",
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
                    <i class="fas fa-truck-monster"></i>
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon expédition</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="12" value="1" required>
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
                Demande envoyée ! Nos experts nigériens vous contacteront.
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
