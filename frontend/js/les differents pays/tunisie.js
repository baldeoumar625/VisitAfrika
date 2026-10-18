/**
 * PROJET: VISIT AFRIKA
 * FICHIER: tunisie.js
 * DESCRIPTION: Script premium pour la Tunisie.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Tunisie chargé.");

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
                    // Centrer sur la Tunisie
                    map = L.map('tunisie-map').setView([33.8869, 9.5375], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Carthage (UNESCO)", lat: 36.8529, lng: 10.3233 },
                        { name: "Sidi Bou Saïd", lat: 36.8703, lng: 10.3411 },
                        { name: "Amphithéâtre d'El Jem", lat: 35.2964, lng: 10.7064 },
                        { name: "Kairouan (Sainte)", lat: 35.6744, lng: 10.0908 },
                        { name: "Djerba (L'île des rêves)", lat: 33.8076, lng: 10.8451 },
                        { name: "Matmata (Troglodytes)", lat: 33.5422, lng: 9.9675 },
                        { name: "Douz (Porte du désert)", lat: 33.4611, lng: 9.0203 },
                        { name: "Tozeur (Oasis)", lat: 33.9189, lng: 8.1333 },
                        { name: "Musée du Bardo (Tunis)", lat: 36.8094, lng: 10.1347 },
                        { name: "Sousse (Médina)", lat: 35.8256, lng: 10.6369 },
                        { name: "Monastir", lat: 35.7642, lng: 10.8113 },
                        { name: "Hammamet", lat: 36.4000, lng: 10.6167 },
                        { name: "Tabarka", lat: 36.9544, lng: 8.7525 },
                        { name: "Parc d'Ichkeul (UNESCO)", lat: 37.1611, lng: 9.6644 },
                        { name: "Dougga (Thugga)", lat: 36.4222, lng: 9.2189 }
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
        carthage: {
            titre: "Site archéologique de Carthage",
            localisation: "Banlieue Nord de Tunis",
            periode: "Printemps ou Automne",
            acces: "Train TGM depuis Tunis Marine ou Taxi",
            conseils: "Visitez les thermes d'Antonin et le tophet de Salammbô. Prenez un billet groupé pour accéder à tous les sites dispersés",
            contact: "Agence de Mise en Valeur du Patrimoine (AMVPPC)",
            hotel: "The Residence Tunis",
            hotelLoc: "Gammarth (proximité)",
            hotelFonct: "Palais de luxe inspiré de l'architecture arabo-andalouse avec un spa réputé",
            hotelContact: "+216 71 910 101",
            hotelRestau: "L'Olivier",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        sidi_bou_said: {
            titre: "Sidi Bou Saïd",
            localisation: "Falaise dominant Carthage",
            periode: "Toute l'année (Surtout au coucher du soleil)",
            acces: "Train TGM ou Taxi",
            conseils: "Le village bleu et blanc. Prenez un thé à la menthe et des bambalouni (beignets) au célèbre Café des Nattes",
            contact: "Mairie de Sidi Bou Saïd",
            hotel: "La Villa Bleue",
            hotelLoc: "Sidi Bou Saïd",
            hotelFonct: "Boutique hôtel de charme avec vue plongeante sur le golfe de Tunis",
            hotelContact: "+216 71 742 000",
            hotelRestau: "Gastronomie tunisienne raffinée",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        el_jem: {
            titre: "Amphithéâtre d'El Jem",
            localisation: "Région de Mahdia",
            periode: "Juillet/Août (Festival international de musique symphonique)",
            acces: "Train ou Louage (Taxi collectif) depuis Sousse ou Tunis",
            conseils: "Mieux conservé que le Colisée de Rome. Explorez les galeries souterraines où étaient gardés les fauves et les gladiateurs",
            contact: "Musée archéologique d'El Jem",
            hotel: "Iberostar Royal El Mansour",
            hotelLoc: "Mahdia (proximité)",
            hotelFonct: "Hôtel 5 étoiles en bord de mer, idéal pour une étape après la visite",
            hotelContact: "+216 73 681 100",
            hotelRestau: "Cuisine méditerranéenne",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        kairouan: {
            titre: "Kairouan",
            localisation: "Centre de la Tunisie",
            periode: "Toute l'année",
            acces: "Route (2h de Tunis)",
            conseils: "Quatrième ville sainte de l'islam. Visitez la Grande Mosquée d'Oqba et goûtez aux célèbres Makroudh (pâtisseries)",
            contact: "Office de Tourisme de Kairouan",
            hotel: "Hôtel La Kasbah",
            hotelLoc: "Médina de Kairouan",
            hotelFonct: "Hôtel de luxe intégré dans les remparts de la ville, architecture magnifique",
            hotelContact: "+216 77 237 301",
            hotelRestau: "Spécialités de Kairouan",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        djerba: {
            titre: "Djerba (L'île des rêves)",
            localisation: "Sud-Est tunisien",
            periode: "Avril à Octobre",
            acces: "Aéroport international Djerba-Zarzis (DJE) ou chaussée romaine",
            conseils: "Visitez Djerbahood (village d'art urbain) et la synagogue de la Ghriba. Profitez des plages de sable fin",
            contact: "Office du Tourisme de Djerba",
            hotel: "Hasdrubal Prestige Thalassa & Spa",
            hotelLoc: "Sidi Mehrez, Djerba",
            hotelFonct: "Le nec plus ultra du luxe et de la thalassothérapie sur l'île",
            hotelContact: "+216 75 759 259",
            hotelRestau: "L'Alhambra",
            guide: "Selma Mansour",
            guideContact: "selma@visitafrika.com"
        },
        matmata: {
            titre: "Matmata",
            localisation: "Montagnes du Sud",
            periode: "Hiver / Printemps",
            acces: "Route depuis Gabès ou Djerba",
            conseils: "Village berbère célèbre pour ses maisons troglodytes. Lieu de tournage culte de Star Wars (Hôtel Sidi Driss)",
            contact: "N/A",
            hotel: "Au Trait d'Union",
            hotelLoc: "Tijma (Matmata)",
            hotelFonct: "Maison d'hôtes troglodyte authentique et confortable",
            hotelContact: "+216 98 433 342",
            hotelRestau: "Plats berbères traditionnels",
            guide: "Selma Mansour",
            guideContact: "selma@visitafrika.com"
        },
        douz: {
            titre: "Douz (La Porte du Désert)",
            localisation: "Kebili",
            periode: "Décembre (Festival international du Sahara)",
            acces: "Route",
            conseils: "Point de départ idéal pour les méharées ou excursions en 4x4 vers le Grand Erg Oriental",
            contact: "N/A",
            hotel: "Sahara Douz",
            hotelLoc: "Douz",
            hotelFonct: "Hôtel confortable à l'orée du désert avec une grande piscine",
            hotelContact: "+216 75 470 300",
            hotelRestau: "International et Saharien",
            guide: "Selma Mansour",
            guideContact: "selma@visitafrika.com"
        },
        tozeur: {
            titre: "Tozeur",
            localisation: "Sud-Ouest (Oasis)",
            periode: "Octobre à Mars",
            acces: "Aéroport Nefta (TOE) ou Route",
            conseils: "Admirez l'architecture unique en briques de la médina. Visitez les oasis de montagne Chebika et Tamerza à proximité",
            contact: "Office de Tourisme de Tozeur",
            hotel: "Anantara Tozeur Resort",
            hotelLoc: "Tozeur",
            hotelFonct: "Resort de luxe oasis avec villas privées et expériences dans le désert",
            hotelContact: "+216 70 100 800",
            hotelRestau: "Sarab",
            guide: "Selma Mansour",
            guideContact: "selma@visitafrika.com"
        },
        bardo: {
            titre: "Musée National du Bardo",
            localisation: "Le Bardo, Tunis",
            periode: "Toute l'année",
            acces: "Tramway ligne 4",
            conseils: "Possède la plus riche collection de mosaïques romaines au monde, abritée dans un ancien palais beylical",
            contact: "Direction du Musée du Bardo",
            hotel: "Hôtels de Tunis Centre",
            hotelLoc: "Tunis",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        sousse: {
            titre: "Médina de Sousse",
            localisation: "Sahel tunisien",
            periode: "Toute l'année",
            acces: "Train ou Louage",
            conseils: "Classée UNESCO. Visitez le Ribat (forteresse) et perdez-vous dans les souks animés. Ne manquez pas le port El Kantaoui",
            contact: "Office de Tourisme de Sousse",
            hotel: "Mövenpick Resort & Marine Spa Sousse",
            hotelLoc: "Bord de mer, Sousse",
            hotelFonct: "Hôtel moderne de luxe avec plage privée et centre de bien-être",
            hotelContact: "+216 73 202 000",
            hotelRestau: "Sendai (Japonais) et local",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        monastir: {
            titre: "Monastir",
            localisation: "Côte du Sahel",
            periode: "Toute l'année",
            acces: "Aéroport Habib Bourguiba (MIR) / Train",
            conseils: "Visitez le somptueux Mausolée de Bourguiba et l'imposant Ribat, décor de nombreux films historiques",
            contact: "Mairie de Monastir",
            hotel: "Royal Thalassa Monastir",
            hotelLoc: "Zone touristique Skanes",
            hotelFonct: "Luxe et relaxation avec l'un des meilleurs spas de la région",
            hotelContact: "+216 73 520 520",
            hotelRestau: "Rancho (Grill)",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        hammamet: {
            titre: "Hammamet",
            localisation: "Cap Bon",
            periode: "Été (Animation) / Printemps (Calme)",
            acces: "Route (1h de Tunis)",
            conseils: "Ville des jasmins. Visitez le Centre Culturel International (Villa Sebastian) et les remparts de la médina",
            contact: "N/A",
            hotel: "La Badira",
            hotelLoc: "Hammamet Nord",
            hotelFonct: "Hôtel d'exception réservé aux adultes, design épuré et vue sur mer",
            hotelContact: "+216 72 262 812",
            hotelRestau: "Kamasu",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        tabarka: {
            titre: "Tabarka",
            localisation: "Nord-Ouest (Côte de Corail)",
            periode: "Été / Automne",
            acces: "Route panoramique de montagne",
            conseils: "Célèbre pour son corail rouge, son festival de Jazz et ses 'Aiguilles' rocheuses. Paradis des plongeurs",
            contact: "N/A",
            hotel: "La Cigale Tabarka",
            hotelLoc: "Tabarka",
            hotelFonct: "Hôtel de luxe avec parcours de golf et centre de thalassothérapie",
            hotelContact: "+216 70 019 000",
            hotelRestau: "Poissons et gibier",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
        },
        parc_ichkeul: {
            titre: "Parc National de l'Ichkeul",
            localisation: "Près de Bizerte",
            periode: "Hiver (Oiseaux migrateurs)",
            acces: "Route",
            conseils: "Site UNESCO. Observation privilégiée de milliers d'oiseaux migrateurs et de buffles d'eau autour du lac",
            contact: "Direction des Forêts",
            hotel: "Hôtels de Bizerte",
            hotelLoc: "Bizerte",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert naturaliste",
            guideContact: "Sur place"
        },
        dougga: {
            titre: "Dougga (Thugga)",
            localisation: "Teboursouk (Nord-Ouest)",
            periode: "Printemps",
            acces: "Route (2h de Tunis)",
            conseils: "La cité romaine la mieux préservée d'Afrique du Nord. Le Capitole et le Théâtre sont magistraux",
            contact: "AMVPPC Dougga",
            hotel: "Dar Hi Nefta (ou séjour à Tunis)",
            hotelLoc: "Nefta",
            hotelFonct: "Concept hôtel moderne",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Mehdi Ben Salem",
            guideContact: "mehdi@visitafrika.com"
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
                        <input type="number" name="personnes" min="1" max="20" value="2" required>
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
                Demande envoyée ! Nos experts tunisiens vous contacteront.
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
