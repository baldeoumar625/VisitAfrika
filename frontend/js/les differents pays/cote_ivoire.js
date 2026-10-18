/**
 * PROJET: VISIT AFRIKA
 * FICHIER: cote_ivoire.js
 * DESCRIPTION: Script premium pour la page Côte d'Ivoire.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Côte d'Ivoire chargé.");

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
                    // Centrer sur la Côte d'Ivoire
                    map = L.map('coteivoire-map').setView([7.5399, -5.5471], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National de Taï (UNESCO)", lat: 5.75, lng: -7.10 },
                        { name: "Parc National de la Comoé", lat: 9.00, lng: -3.80 },
                        { name: "Basilique de Yamoussoukro", lat: 6.81, lng: -5.29 },
                        { name: "Grand-Bassam (Cité historique)", lat: 5.20, lng: -3.73 },
                        { name: "Assinie-Mafia (Plages)", lat: 5.15, lng: -3.28 },
                        { name: "Mont Nimba", lat: 7.58, lng: -8.41 },
                        { name: "Ponts de lianes (Man)", lat: 7.41, lng: -7.55 },
                        { name: "Cascades de Man", lat: 7.39, lng: -7.58 },
                        { name: "Mosquée de Kong", lat: 9.15, lng: -4.61 },
                        { name: "Artisanat de Korhogo", lat: 9.45, lng: -5.63 },
                        { name: "Le Plateau (Abidjan)", lat: 5.32, lng: -4.01 },
                        { name: "Parc National du Banco", lat: 5.37, lng: -4.05 },
                        { name: "Île Boulay", lat: 5.28, lng: -4.10 },
                        { name: "San Pédro (Port & Plages)", lat: 4.75, lng: -6.61 },
                        { name: "Sassandra", lat: 4.95, lng: -6.08 }
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
        taï: {
            titre: "Parc National de Taï",
            localisation: "Sud-Ouest de la Côte d'Ivoire",
            periode: "Décembre à Mars (Saison sèche)",
            acces: "4x4 obligatoire depuis San Pédro ou Guiglo",
            conseils: "L'un des derniers vestiges de la forêt primaire d'Afrique de l'Ouest. Observez les chimpanzés et les hippopotames pygmées",
            contact: "OIPR (Office Ivoirien des Parcs et Réserves)",
            hotel: "Ecolodge de Taï",
            hotelLoc: "Lisière du parc, Taï",
            hotelFonct: "Immersion totale en forêt, confort éco-responsable",
            hotelContact: "+225 07 07 07 07",
            hotelRestau: "Cuisine locale bio",
            guide: "Koffi Kouamé",
            guideContact: "koffi@visitafrika.com"
        },
        comoé: {
            titre: "Parc National de la Comoé",
            localisation: "Nord-Est du pays",
            periode: "Janvier à Mai",
            acces: "Route depuis Korhogo ou Bouna",
            conseils: "Plus grand parc d'Afrique de l'Ouest, idéal pour le safari savane et l'observation des lions",
            contact: "OIPR Korhogo",
            hotel: "Comoé Safari Lodge",
            hotelLoc: "Entrée Kafolo",
            hotelFonct: "Bungalows de brousse traditionnels",
            hotelContact: "+225 01 01 01 01",
            hotelRestau: "Spécialités du Nord",
            guide: "Koffi Kouamé",
            guideContact: "koffi@visitafrika.com"
        },
        basilique_yamoussoukro: {
            titre: "Basilique Notre-Dame de la Paix",
            localisation: "Yamoussoukro (Capitale politique)",
            periode: "Toute l'année",
            acces: "Autoroute du Nord (2h30 d'Abidjan)",
            conseils: "Plus grand édifice religieux chrétien au monde. Admirez les vitraux monumentaux et la coupole",
            contact: "Rectorat de la Basilique",
            hotel: "Hôtel de l'Hôtel Président",
            hotelLoc: "Yamoussoukro Centre",
            hotelFonct: "Hôtel de luxe iconique avec golf et piscine",
            hotelContact: "+225 30 64 64 64",
            hotelRestau: "Restaurant panoramique tournant",
            guide: "Awa Diabaté",
            guideContact: "awa@visitafrika.com"
        },
        grand_bassam: {
            titre: "Grand-Bassam",
            localisation: "Sud (Près d'Abidjan)",
            periode: "Toute l'année (Fête de l'Abissa en Octobre)",
            acces: "Autoroute de Grand-Bassam (30 min)",
            conseils: "Ancienne capitale coloniale UNESCO. Visitez le quartier France et ses demeures historiques",
            contact: "Maison du Patrimoine Culturel",
            hotel: "Hôtel France",
            hotelLoc: "Quartier France, Bassam",
            hotelFonct: "Hôtel de charme dans une bâtisse coloniale restaurée",
            hotelContact: "+225 21 30 11 11",
            hotelRestau: "Poissons et langoustes en bord de mer",
            guide: "Awa Diabaté",
            guideContact: "awa@visitafrika.com"
        },
        assinie: {
            titre: "Assinie-Mafia",
            localisation: "Littoral Est",
            periode: "Toute l'année",
            acces: "Route bitumée (1h30 d'Abidjan)",
            conseils: "Le paradis balnéaire ivoirien. Profitez de la lagune et de la mer sur la presqu'île",
            contact: "Assinie Tourisme",
            hotel: "La Maison de la Lagune",
            hotelLoc: "Assinie, Bord de lagune",
            hotelFonct: "Lodge de luxe exclusif et intimiste",
            hotelContact: "+225 05 05 05 05",
            hotelRestau: "Haute gastronomie marine",
            guide: "N/A",
            guideContact: "N/A"
        },
        mont_nimba: {
            titre: "Réserve Intégrale du Mont Nimba",
            localisation: "Frontière Guinée / Liberia",
            periode: "Décembre à Mars",
            acces: "Via Man (4x4 obligatoire)",
            conseils: "Site UNESCO pour sa biodiversité unique (crapauds vivipares). Ascension pour les aventuriers",
            contact: "OIPR Man",
            hotel: "Hôtels de Man (base)",
            hotelLoc: "Man",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "Cuisine de l'Ouest",
            guide: "Guide montagne certifié",
            guideContact: "Obligatoire"
        },
        pont_liane_man: {
            titre: "Ponts de lianes (Man)",
            localisation: "Villages de Lieupleu / Yapleu",
            periode: "Toute l'année",
            acces: "Piste depuis Man",
            conseils: "Ouvrages d'art traditionnels mystiques construits en une nuit selon la légende",
            contact: "Chefferie locale",
            hotel: "Hôtel les Cascades",
            hotelLoc: "Man",
            hotelFonct: "Hôtel de référence dans l'Ouest, vue sur les montagnes",
            hotelContact: "+225 33 79 12 34",
            hotelRestau: "Spécialités de l'Ouest (Sauce graine)",
            guide: "Awa Diabaté",
            guideContact: "awa@visitafrika.com"
        },
        cascade_man: {
            titre: "Cascades de Man",
            localisation: "Sortie de la ville de Man",
            periode: "Toute l'année",
            acces: "Facile, 10 min du centre",
            conseils: "Havre de paix et de fraîcheur, idéal pour la baignade et le repos",
            contact: "N/A",
            hotel: "Hôtels de Man",
            hotelLoc: "Man",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        mosquee_kong: {
            titre: "Mosquée de Kong",
            localisation: "Kong (Nord-Est)",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Joyau de l'architecture soudano-sahélienne en terre crue",
            contact: "Grande Mosquée de Kong",
            hotel: "Hébergements à Kong",
            hotelLoc: "Kong",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Koffi Kouamé",
            guideContact: "koffi@visitafrika.com"
        },
        korhogo_artisanat: {
            titre: "Korhogo (Artisanat)",
            localisation: "Nord de la Côte d'Ivoire",
            periode: "Toute l'année",
            acces: "Route ou vol interne",
            conseils: "Cœur du pays Sénoufo. Visitez les toiles de Fakaha et les sculpteurs sur bois",
            contact: "Centre Artisanal de Korhogo",
            hotel: "Hôtel Mont Korhogo",
            hotelLoc: "Pied du mont Korhogo",
            hotelFonct: "Hôtel classique confortable",
            hotelContact: "+225 36 66 00 00",
            hotelRestau: "Cuisine Sénoufo",
            guide: "Koffi Kouamé",
            guideContact: "koffi@visitafrika.com"
        },
        plateau_abidjan: {
            titre: "Le Plateau (Abidjan)",
            localisation: "Abidjan (Centre)",
            periode: "Toute l'année",
            acces: "Cœur économique",
            conseils: "Le 'Manhattan africain'. Admirez l'architecture moderne et visitez le Musée des Civilisations",
            contact: "Mairie du Plateau",
            hotel: "Sofitel Abidjan Hôtel Ivoire",
            hotelLoc: "Cocody (face au Plateau)",
            hotelFonct: "L'hôtel le plus prestigieux d'Afrique de l'Ouest",
            hotelContact: "+225 22 48 26 26",
            hotelRestau: "Le Toit d'Abidjan (Gastronomique)",
            guide: "Awa Diabaté",
            guideContact: "awa@visitafrika.com"
        },
        parc_banco: {
            titre: "Parc National du Banco",
            localisation: "Abidjan (Adjamé / Yopougon)",
            periode: "Toute l'année",
            acces: "Entrée autoroute du Nord",
            conseils: "Forêt tropicale en plein cœur de la ville. Parfait pour le VTT et la randonnée",
            contact: "OIPR Banco",
            hotel: "Hôtels d'Abidjan",
            hotelLoc: "Abidjan",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Espace pique-nique",
            guide: "Ranger OIPR",
            guideContact: "Sur place"
        },
        ile_boulay: {
            titre: "Île Boulay",
            localisation: "Lagune Ébrié, Abidjan",
            periode: "Week-end",
            acces: "Bateau-navette depuis Yopougon ou Plateau",
            conseils: "Évasion lagunaire à quelques minutes de la ville. Profitez des resorts de jour",
            contact: "N/A",
            hotel: "Coconut Grove",
            hotelLoc: "Île Boulay",
            hotelFonct: "Resort de détente avec piscine et plage privée",
            hotelContact: "+225 07 07 07 07",
            hotelRestau: "Buffets conviviaux",
            guide: "N/A",
            guideContact: "N/A"
        },
        san_pedro: {
            titre: "San Pédro",
            localisation: "Sud-Ouest",
            periode: "Toute l'année",
            acces: "Aéroport de San Pédro / Route côtière",
            conseils: "Premier port exportateur de cacao au monde, profitez des plages de Monogaga à proximité",
            contact: "Direction Régionale du Tourisme San Pédro",
            hotel: "Hôtel Degny Plage",
            hotelLoc: "Bord de mer, San Pédro",
            hotelFonct: "Confortable et calme",
            hotelContact: "+225 34 71 11 11",
            hotelRestau: "Spécialités de poissons grillés",
            guide: "Awa Diabaté",
            guideContact: "awa@visitafrika.com"
        },
        sassandra: {
            titre: "Sassandra",
            localisation: "Littoral Ouest",
            periode: "Toute l'année",
            acces: "La Côtière (Route)",
            conseils: "Ville historique de pêcheurs, admirez l'embouchure du fleuve Sassandra et visitez le Palais du Gouverneur",
            contact: "N/A",
            hotel: "Le Pollet",
            hotelLoc: "Sassandra",
            hotelFonct: "Hôtel de charme surplombant l'océan",
            hotelContact: "Sur place",
            hotelRestau: "Produits de la mer",
            guide: "Awa Diabaté",
            guideContact: "awa@visitafrika.com"
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
                Demande envoyée ! Nos experts ivoiriens vous contacteront.
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
