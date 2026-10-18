/**
 * PROJET: VISIT AFRIKA
 * FICHIER: burkina_faso.js
 * DESCRIPTION: Script pour la page Burkina Faso.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script burkina_faso loaded.");

    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (menuToggle && navbarMenu) {
        menuToggle.onclick = function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        };
    }

    // 2. ANIMATIONS
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

    const h1 = document.querySelector('.hero-title');
    if (h1) {
        h1.style.opacity = '0';
        h1.style.transform = 'translate(-50%, -40%)';
        setTimeout(() => {
            h1.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            h1.style.opacity = '1';
            h1.style.transform = 'translate(-50%, -50%)';
        }, 300);
    }

    // 3. INTERACTIVE MAP (LEAFLET)
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
                    map = L.map('burkina-map').setView([12.37, -1.53], 6); // Centré sur Ouagadougou
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                    
                    // Ajout de quelques marqueurs
                    L.marker([10.65, -4.75]).addTo(map).bindPopup('Pics de Sindou');
                    L.marker([10.67, -4.71]).addTo(map).bindPopup('Cascades de Karfiguéla');
                    L.marker([11.17, -4.30]).addTo(map).bindPopup('Grande Mosquée de Bobo');
                }
                setTimeout(() => map.invalidateSize(), 100);
            } else {
                mapContainer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-map"></i> <span class="btn-text">Afficher la carte</span>';
                this.style.background = '';
            }
        };
    }

    // Données détaillées des sites pour le Burkina Faso
    const infos = {
        sindou: {
            titre: "Pics de Sindou",
            localisation: "Région des Cascades",
            periode: "Novembre à Avril",
            acces: "45 min de route depuis Banfora",
            conseils: "Chaussures de marche indispensables, visite au lever du soleil recommandée",
            contact: "Office du Tourisme de Banfora",
            hotel: "Hôtel Canne à Sucre",
            hotelLoc: "Banfora",
            hotelFonct: "Confortable, piscine, jardin tropical",
            hotelContact: "+226 20 91 01 07",
            hotelRestau: "Spécialités locales et européennes",
            guide: "Ibrahim Traoré",
            guideContact: "+226 70 00 11 22"
        },
        karfiguela: {
            titre: "Cascades de Karfiguéla",
            localisation: "Banfora",
            periode: "Toute l'année, superbe après les pluies",
            acces: "Piste depuis Banfora (15 min)",
            conseils: "Possibilité de baignade, prévoir serviette",
            contact: "Site des Cascades",
            hotel: "Campement Baobab",
            hotelLoc: "Proche des cascades",
            hotelFonct: "Écotourisme, tentes tout confort",
            hotelContact: "+226 70 22 33 44",
            hotelRestau: "Plats cuisinés au feu de bois",
            guide: "Moussa Sanou",
            guideContact: "+226 76 55 44 33"
        },
        mosquee_bobo: {
            titre: "Grande Mosquée de Bobo",
            localisation: "Quartier Dioulassoba",
            periode: "Toute l'année",
            acces: "Centre-ville de Bobo-Dioulasso",
            conseils: "Tenue correcte exigée, pourboire pour le guide du site",
            contact: "Comité de gestion de la mosquée",
            hotel: "Hôtel Sissiman",
            hotelLoc: "Bobo-Dioulasso",
            hotelFonct: "Luxe, moderne, wifi, piscine",
            hotelContact: "+226 20 97 10 10",
            hotelRestau: "Restaurant gastronomique",
            guide: "Abdoulaye Koné",
            guideContact: "+226 71 88 99 00"
        },
        loropeni: {
            titre: "Ruines de Loropéni",
            localisation: "Région du Sud-Ouest",
            periode: "Saison sèche",
            acces: "Route depuis Gaoua",
            conseils: "Site classé UNESCO, guide sur place obligatoire",
            contact: "Direction du Patrimoine Culturel",
            hotel: "Hôtel Hala",
            hotelLoc: "Gaoua",
            hotelFonct: "Simple, propre, accueil chaleureux",
            hotelContact: "+226 20 90 01 01",
            hotelRestau: "Cuisine familiale",
            guide: "Jean-Pierre Poda",
            guideContact: "+226 78 11 22 33"
        },
        laongo: {
            titre: "Sculptures de Laongo",
            localisation: "Ziniaré",
            periode: "Octobre à Juin",
            acces: "45 min d'Ouagadougou",
            conseils: "Visite guidée pour comprendre les œuvres",
            contact: "Site de Laongo",
            hotel: "Hôtel Silmandé",
            hotelLoc: "Ouagadougou (proche)",
            hotelFonct: "Luxe, bord de lac, tennis",
            hotelContact: "+226 25 35 62 62",
            hotelRestau: "Buffets variés",
            guide: "Ali Sawadogo",
            guideContact: "+226 70 44 55 66"
        },
        fabedougou: {
            titre: "Dômes de Fabedougou",
            localisation: "Banfora",
            periode: "Novembre à Mars",
            acces: "Piste proche des cascades",
            conseils: "Escalade facile sur les dômes pour la vue",
            contact: "Syndicat d'initiative de Banfora",
            hotel: "Hôtel Canne à Sucre",
            hotelLoc: "Banfora",
            hotelFonct: "Le meilleur de la ville",
            hotelContact: "+226 20 91 01 07",
            hotelRestau: "Menu du terroir",
            guide: "Ibrahim Traoré",
            guideContact: "+226 70 00 11 22"
        },
        bazoule: {
            titre: "Mare de Bazoulé",
            localisation: "Bazoulé (proche Ouaga)",
            periode: "Toute l'année",
            acces: "30 min de la capitale",
            conseils: "Possibilité de s'asseoir sur les crocodiles (sacrés)",
            contact: "Association de Bazoulé",
            hotel: "Bravia Hotel",
            hotelLoc: "Ouagadougou",
            hotelFonct: "Luxe moderne, centre-ville",
            hotelContact: "+226 25 33 08 08",
            hotelRestau: "Cuisine internationale",
            guide: "Pierre Kabore",
            guideContact: "+226 76 99 88 77"
        },
        arly: {
            titre: "Parc National d'Arly",
            localisation: "Est du pays",
            periode: "Janvier à Mai",
            acces: "4x4 obligatoire, agence conseillée",
            conseils: "Prudence, vérifier la situation sécuritaire locale",
            contact: "Office National des Aires Protégées",
            hotel: "Campement de la Tapoa",
            hotelLoc: "Entrée du parc",
            hotelFonct: "Rustique, authentique, en pleine nature",
            hotelContact: "+226 70 11 22 33",
            hotelRestau: "Gibier et plats locaux",
            guide: "Daouda Diallo",
            guideContact: "+226 74 33 22 11"
        },
        tiebele: {
            titre: "Tiébélé",
            localisation: "Province du Nahouri",
            periode: "Toute l'année, idéal en saison sèche",
            acces: "Route depuis Ouagadougou via Pô",
            conseils: "Respecter l'intimité des habitants, guide local obligatoire",
            contact: "Cour Royale de Tiébélé",
            hotel: "Auberge de la Cour Royale",
            hotelLoc: "Tiébélé",
            hotelFonct: "Immersion culturelle, confort simple",
            hotelContact: "+226 70 55 66 77",
            hotelRestau: "Plats traditionnels Gourounsi",
            guide: "Ziba l'Ancien",
            guideContact: "+226 71 22 33 44"
        },
        pendjari: {
            titre: "Parc de la Pendjari",
            localisation: "Région de l'Est",
            periode: "Décembre à Avril",
            acces: "Expédition 4x4 organisée",
            conseils: "Vérifier les conditions d'accès saisonnières",
            contact: "Direction des Parcs Nationaux",
            hotel: "Hôtel de la Pendjari",
            hotelLoc: "Entrée du parc",
            hotelFonct: "Vue imprenable sur la savane",
            hotelContact: "+226 75 00 11 22",
            hotelRestau: "Cuisine de brousse",
            guide: "Moussa le Ranger",
            guideContact: "+226 78 55 44 33"
        },
        musee_national: {
            titre: "Musée National",
            localisation: "Ouagadougou",
            periode: "Toute l'année",
            acces: "Boulevard Charles de Gaulle",
            conseils: "Prendre le temps d'observer l'architecture en terre",
            contact: "Direction du Musée",
            hotel: "Laïco Ouaga 2000",
            hotelLoc: "Ouagadougou",
            hotelFonct: "Luxe, proche des institutions",
            hotelContact: "+226 25 49 98 00",
            hotelRestau: "Buffets internationaux",
            guide: "Yaya Conservateur",
            guideContact: "+226 70 11 00 99"
        },
        bangr_weogo: {
            titre: "Forêt de Bangr Weogo",
            localisation: "Ouagadougou",
            periode: "Toute l'année",
            acces: "Taxi ou voiture (centre-ville)",
            conseils: "Idéal pour une balade en famille le dimanche",
            contact: "Gestion du Parc Urbain",
            hotel: "Hôtel Splendid",
            hotelLoc: "Ouagadougou",
            hotelFonct: "Central, historique, piscine",
            hotelContact: "+226 25 31 72 72",
            hotelRestau: "Restaurant Le Gourmet",
            guide: "Ali Nature",
            guideContact: "+226 72 44 55 66"
        },
        cathedrale: {
            titre: "Cathédrale de Ouaga",
            localisation: "Centre-ville",
            periode: "Toute l'année",
            acces: "Place des Nations Unies",
            conseils: "Observer les détails des briques rouges",
            contact: "Archidiocèse de Ouagadougou",
            hotel: "Bravia Hotel",
            hotelLoc: "Centre-ville",
            hotelFonct: "Moderne, services haut de gamme",
            hotelContact: "+226 25 33 08 08",
            hotelRestau: "Cuisine fusion",
            guide: "Paul Historien",
            guideContact: "+226 76 11 22 33"
        },
        koro: {
            titre: "Village de Koro",
            localisation: "Bobo-Dioulasso",
            periode: "Toute l'année",
            acces: "Route vers l'Est (15 min de Bobo)",
            conseils: "Monter au sommet pour le panorama sur Bobo",
            contact: "Chef du village de Koro",
            hotel: "Hôtel Sissiman",
            hotelLoc: "Bobo-Dioulasso",
            hotelFonct: "Meilleur confort de la région",
            hotelContact: "+226 20 97 10 10",
            hotelRestau: "Spécialités de l'Ouest",
            guide: "Salif Koro",
            guideContact: "+226 71 44 55 66"
        },
        kompienga: {
            titre: "Lac de Kompienga",
            localisation: "Province de la Kompienga",
            periode: "Saison de pêche",
            acces: "Route nationale direction Sud-Est",
            conseils: "Louer une pirogue pour la journée",
            contact: "Syndicat de pêcheurs",
            hotel: "Campement de Kompienga",
            hotelLoc: "Bord du lac",
            hotelFonct: "Calme, idéal pour le repos",
            hotelContact: "+226 74 11 22 33",
            hotelRestau: "Poissons frais du lac",
            guide: "Oumar Pêcheur",
            guideContact: "+226 79 00 99 88"
        }
    };

    // --- GESTION MODALE PREMIUM ---
    const modal = document.getElementById('visit-modal');
    const modalBody = document.getElementById('visit-modal-body');
    const closeBtn = document.querySelector('.visit-modal-close');

    function openModal(siteKey) {
        if (!modal || !modalBody) return;
        const data = infos[siteKey];
        if (!data) return;

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
                <div class="info-item"><i class="fas fa-calendar-check"></i><div><strong>Période</strong><br>${data.periode}</div></div>
                <div class="info-item"><i class="fas fa-car"></i><div><strong>Accès</strong><br>${data.acces}</div></div>
                <div class="info-item"><i class="fas fa-lightbulb"></i><div><strong>Conseils</strong><br>${data.conseils}</div></div>
                <div class="info-item"><i class="fas fa-headset"></i><div><strong>Contact</strong><br>${data.contact}</div></div>
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
                    <div><strong>Guide :</strong> ${data.guide}<br><span class="guide-tel">${data.guideContact}</span></div>
                </div>
            </div>
            <hr>
            <form id="visit-form" class="visit-form-styled">
                <div class="form-header"><h4><i class="fas fa-paper-plane"></i> Réservation</h4></div>
                <div class="form-group"><label>Nom complet</label><input type="text" name="nom" required><i class="fas fa-user input-icon"></i></div>
                <div class="form-row">
                    <div class="form-group"><label>Date</label><input type="date" name="date" required></div>
                    <div class="form-group"><label>Participants</label><input type="number" name="personnes" min="1" value="1" required><i class="fas fa-users input-icon"></i></div>
                </div>
                <div class="form-group"><label>Coordonnées</label><input type="text" name="contact" placeholder="Email ou WhatsApp" required><i class="fas fa-envelope input-icon"></i></div>
                <button type="submit" class="btn-submit"><span>Envoyer la demande</span><i class="fas fa-chevron-right"></i></button>
            </form>
            <div id="visit-confirm" style="display:none;" class="alert-success-styled">
                <i class="fas fa-check-circle"></i> Demande transmise avec succès !
            </div>
        `;

        if (imgSrc) {
            const modalContentEl = document.querySelector('.visit-modal-content');
            modalContentEl.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.97)), url("${imgSrc}")`;
            modalContentEl.style.backgroundSize = 'cover';
        }

        modal.style.display = 'block';

        const form = document.getElementById('visit-form');
        form.onsubmit = async function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const payload = {
                site_name: data.titre,
                full_name: formData.get('nom'),
                email: formData.get('contact'),
                phone: formData.get('contact'), 
                date_visit: formData.get('date'),
                guests: parseInt(formData.get('personnes')),
                details: "Burkina Faso Expedition"
            };
            try {
                const response = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    form.style.display = 'none';
                    document.getElementById('visit-confirm').style.display = 'block';
                }
            } catch (error) { alert("Erreur de connexion."); }
        };
    }

    document.querySelectorAll('.btn-decouvrir, .visit-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            openModal(this.getAttribute('data-site'));
        };
    });

    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };

    // 6. HOTEL BOOKING
    const bookingForm = document.getElementById('hotel-booking-form');
    if (bookingForm) {
        bookingForm.onsubmit = async function(e) {
            e.preventDefault();
            const hotel = document.getElementById('hotel-select').options[document.getElementById('hotel-select').selectedIndex].text;
            const data = {
                hotel_name: hotel,
                full_name: document.getElementById('user-name').value,
                email: document.getElementById('user-contact').value,
                check_in: document.getElementById('check-in').value,
                check_out: document.getElementById('check-out').value,
                guests: document.getElementById('guests').value,
                country: "Burkina Faso"
            };
            try {
                const response = await fetch('/api/hotel_reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    alert("Réservation enregistrée !");
                    bookingForm.reset();
                }
            } catch (error) { alert("Erreur serveur."); }
        };
    }

    // 7. FILTERS
    const searchInput = document.querySelector('.search-input-wrapper input');
    const filterTags = document.querySelectorAll('.filter-tag');
    const attractions = document.querySelectorAll('.attraction');

    function filterAttractions() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeTag = document.querySelector('.filter-tag.active');
        const activeFilter = activeTag ? activeTag.textContent.trim() : 'Tous';

        attractions.forEach(card => {
            const h3 = card.querySelector('h3').textContent.toLowerCase();
            const badge = card.querySelector('.badge-location').textContent.trim();
            const matchesSearch = h3.includes(searchTerm);
            const matchesFilter = activeFilter.startsWith('Tous') || badge.includes(activeFilter);
            if (matchesSearch && matchesFilter) {
                card.style.setProperty('display', 'block', 'important');
            } else {
                card.style.setProperty('display', 'none', 'important');
            }
        });
    }

    if (searchInput) searchInput.oninput = filterAttractions;
    filterTags.forEach(tag => {
        tag.onclick = function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterAttractions();
        };
    });
});
