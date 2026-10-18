/**
 * PROJET: VISIT AFRIKA
 * FICHIER: congo.js
 * DESCRIPTION: Script premium pour la page Congo (Brazzaville).
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Congo chargé.");

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
                    // Centrer sur le Congo
                    map = L.map('congo-map').setView([-0.2280, 15.8277], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National d'Odzala-Kokoua", lat: 0.80, lng: 14.90 },
                        { name: "Parc de Nouabalé-Ndoki", lat: 2.50, lng: 16.50 },
                        { name: "Parc National de Conkouati-Douli", lat: -3.80, lng: 11.20 },
                        { name: "Réserve de Lésio-Louna (Gorilles)", lat: -3.30, lng: 15.50 },
                        { name: "Rapides de Brazzaville", lat: -4.30, lng: 15.25 },
                        { name: "Pointe-Noire (Plages)", lat: -4.78, lng: 11.85 },
                        { name: "Gorges de Diosso", lat: -4.63, lng: 11.85 },
                        { name: "Loango (Ancien port)", lat: -4.65, lng: 11.82 },
                        { name: "Chaîne du Mayombe", lat: -4.20, lng: 12.30 },
                        { name: "Chutes de la Mami Wata", lat: -4.35, lng: 12.10 },
                        { name: "Chutes de Loufoulakari", lat: -4.55, lng: 15.00 },
                        { name: "Chutes de Bela", lat: -4.65, lng: 15.15 },
                        { name: "Madingou", lat: -4.15, lng: 13.55 },
                        { name: "Owando", lat: -0.48, lng: 15.90 },
                        { name: "Ouesso", lat: 1.61, lng: 16.05 }
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
        odziala_kokoua: {
            titre: "Parc National d'Odzala-Kokoua",
            localisation: "Nord du Congo (Cuvette-Ouest)",
            periode: "Juin à Septembre (Saison sèche)",
            acces: "Charter aérien depuis Brazzaville (2h) ou route longue",
            conseils: "L'un des plus anciens parcs d'Afrique. Observez les gorilles de plaine et les éléphants dans les 'baïs' (clairières)",
            contact: "Odzala Discovery Camps",
            hotel: "Ngaga Lodge",
            hotelLoc: "Dans la forêt d'Odzala",
            hotelFonct: "Luxe écologique, spécialisé dans l'observation des gorilles",
            hotelContact: "+242 05 529 1111",
            hotelRestau: "Gastronomie de brousse fusion",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
        },
        nouabale_ndoki: {
            titre: "Parc National de Nouabalé-Ndoki",
            localisation: "Extrême Nord du pays",
            periode: "Décembre à Mars",
            acces: "Bateau et 4x4 depuis Ouesso",
            conseils: "Surnommé 'Le dernier lieu vierge sur terre'. Expérience de jungle profonde et intacte",
            contact: "WCS Congo",
            hotel: "Mondika Camp",
            hotelLoc: "Nouabalé-Ndoki",
            hotelFonct: "Camp de recherche ouvert à l'écotourisme",
            hotelContact: "Via agence Brazzaville",
            hotelRestau: "Cuisine fraîche locale",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
        },
        conkouati: {
            titre: "Parc National de Conkouati-Douli",
            localisation: "Côte Atlantique (Kouilou)",
            periode: "Toute l'année",
            acces: "Route depuis Pointe-Noire (3h)",
            conseils: "Seul parc au Congo mêlant mer, lagune et forêt. Observez les lamantins et les tortues luths",
            contact: "HELP Congo",
            hotel: "Conkouati Lodge",
            hotelLoc: "Bord de lagune",
            hotelFonct: "Eco-lodge confortable face à la mer",
            hotelContact: "+242 06 667 9043",
            hotelRestau: "Poissons et crustacés frais",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
        },
        lesio_louna: {
            titre: "Réserve de Lésio-Louna",
            localisation: "Plateaux (Nord de Brazzaville)",
            periode: "Toute l'année",
            acces: "Route bitumée (2h de Brazzaville)",
            conseils: "Sanctuaire des gorilles orphelins réintroduits. Idéal pour une excursion de 2 jours",
            contact: "Projet Protection des Gorilles (PPG)",
            hotel: "Abio Camp",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Campement de tentes confortable",
            hotelContact: "Sur place",
            hotelRestau: "Repas conviviaux",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
        },
        brazzaville_rapides: {
            titre: "Rapides du Fleuve Congo",
            localisation: "Brazzaville (Kintélé / Djoué)",
            periode: "Coucher du soleil",
            acces: "Facile, taxi urbain",
            conseils: "Admirez la puissance du deuxième fleuve le plus puissant du monde face à Kinshasa",
            contact: "Mairie de Brazzaville",
            hotel: "Radisson Blu M'Bamou Palace",
            hotelLoc: "Bord du fleuve, Brazzaville",
            hotelFonct: "Le nec plus ultra du luxe au Congo",
            hotelContact: "+242 05 050 6060",
            hotelRestau: "Le M'Bamou (Restaurant Gastronomique)",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
        },
        pointe_noire: {
            titre: "Pointe-Noire",
            localisation: "Littoral Atlantique",
            periode: "Toute l'année",
            acces: "Aéroport Agostinho-Neto (PNR)",
            conseils: "Capitale économique, profitez des plages de la Côte Sauvage et du surf",
            contact: "Chambre de Commerce Pointe-Noire",
            hotel: "Atlantic Palace",
            hotelLoc: "Centre-ville Pointe-Noire",
            hotelFonct: "Hôtel de luxe moderne et élégant",
            hotelContact: "+242 05 520 2020",
            hotelRestau: "Cuisine internationale",
            guide: "Guy-Noël",
            guideContact: "guy@visitafrika.com"
        },
        diosso: {
            titre: "Gorges de Diosso",
            localisation: "District de Loango",
            periode: "Toute l'année",
            acces: "Route depuis Pointe-Noire (30 min)",
            conseils: "Le 'Grand Canyon' du Congo, falaises d'ocre rouge plongeant dans une forêt dense",
            contact: "N/A",
            hotel: "Lodges de Pointe-Noire",
            hotelLoc: "Pointe-Noire",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guy-Noël",
            guideContact: "guy@visitafrika.com"
        },
        loango: {
            titre: "Ancien Port de Loango",
            localisation: "Kouilou",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Site historique majeur de la traite transatlantique, visitez les stèles commémoratives",
            contact: "Musée de Loango",
            hotel: "N/A",
            hotelLoc: "Loango",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guy-Noël",
            guideContact: "guy@visitafrika.com"
        },
        mayombe: {
            titre: "Chaîne du Mayombe",
            localisation: "Sud-Ouest du pays",
            periode: "Saison sèche",
            acces: "Route ou Train (Chemin de fer Congo-Océan)",
            conseils: "Traversez cette forêt mythique par le train pour des paysages époustouflants de montagnes vertes",
            contact: "CFCO (Chemin de Fer Congo-Océan)",
            hotel: "Hôtels à Dolisie",
            hotelLoc: "Dolisie (base)",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "Plats locaux (Saka-Saka)",
            guide: "Guy-Noël",
            guideContact: "guy@visitafrika.com"
        },
        mami_wata: {
            titre: "Chutes de la Mami Wata",
            localisation: "Kouilou (Massif du Mayombe)",
            periode: "Toute l'année",
            acces: "Piste et randonnée",
            conseils: "Cascade sacrée entourée de légendes, idéale pour le pique-nique en pleine nature",
            contact: "N/A",
            hotel: "Hôtels de Pointe-Noire (Excursion)",
            hotelLoc: "Pointe-Noire",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guy-Noël",
            guideContact: "guy@visitafrika.com"
        },
        loufoulakari: {
            titre: "Chutes de Loufoulakari",
            localisation: "Département du Pool",
            periode: "Saison des pluies pour le spectacle",
            acces: "Route depuis Brazzaville (1h30)",
            conseils: "L'un des sites naturels les plus impressionnants près de la capitale, confluence spectaculaire",
            contact: "N/A",
            hotel: "Hôtels de Brazzaville",
            hotelLoc: "Brazzaville",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
        },
        bela: {
            titre: "Chutes de Bela",
            localisation: "Pool (Près de Kinkala)",
            periode: "Toute l'année",
            acces: "Piste",
            conseils: "Cascades calmes entourées de grottes, lieu de repos très apprécié",
            contact: "N/A",
            hotel: "Hébergements à Kinkala",
            hotelLoc: "Kinkala",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
        },
        madingou: {
            titre: "Madingou",
            localisation: "Département de la Bouenza",
            periode: "Toute l'année",
            acces: "Route ou train",
            conseils: "Ville agricole dynamique, visitez les chutes de la Bouenza à proximité",
            contact: "N/A",
            hotel: "Hôtel Madingou",
            hotelLoc: "Madingou",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale",
            guide: "N/A",
            guideContact: "N/A"
        },
        owando: {
            titre: "Owando",
            localisation: "Département de la Cuvette",
            periode: "Toute l'année",
            acces: "Route nationale Nord (bitumée)",
            conseils: "Carrefour vers le Nord, visitez le Palais du chef traditionnel",
            contact: "N/A",
            hotel: "Hôtel la Frontière",
            hotelLoc: "Owando",
            hotelFonct: "Moderne et confortable",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités de la Cuvette",
            guide: "N/A",
            guideContact: "N/A"
        },
        wes_esso: {
            titre: "Ouesso",
            localisation: "Département de la Sangha",
            periode: "Saison sèche",
            acces: "Route ou vol charter",
            conseils: "Porte d'entrée du Nord profond, départ pour les parcs nationaux et la rivière Sangha",
            contact: "N/A",
            hotel: "Hôtel de la Sangha",
            hotelLoc: "Ouesso",
            hotelFonct: "Confortable, face au fleuve",
            hotelContact: "Sur place",
            hotelRestau: "Poissons d'eau douce",
            guide: "Alain Mampouya",
            guideContact: "alain@visitafrika.com"
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
                Demande envoyée ! Nos experts congolais vous contacteront.
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
