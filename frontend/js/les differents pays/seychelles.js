/**
 * PROJET: VISIT AFRIKA
 * FICHIER: seychelles.js
 * DESCRIPTION: Script premium pour les Seychelles.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Seychelles chargé.");

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
                    // Centrer sur les Seychelles (Mahé)
                    map = L.map('seychelles-map').setView([-4.6796, 55.4920], 9);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Anse Source d'Argent (La Digue)", lat: -4.37, lng: 55.82 },
                        { name: "Vallée de Mai (UNESCO, Praslin)", lat: -4.33, lng: 55.74 },
                        { name: "Atoll d'Aldabra (UNESCO)", lat: -9.41, lng: 46.36 },
                        { name: "Anse Lazio (Praslin)", lat: -4.29, lng: 55.70 },
                        { name: "Victoria Clocktower (Mahé)", lat: -4.62, lng: 55.45 },
                        { name: "Curieuse Island (Tortues)", lat: -4.28, lng: 55.72 },
                        { name: "Cousin Island (Oiseaux)", lat: -4.33, lng: 55.66 },
                        { name: "Bird Island", lat: -3.72, lng: 55.20 },
                        { name: "Morne Seychellois (Mahé)", lat: -4.64, lng: 55.43 },
                        { name: "Beau Vallon (Mahé)", lat: -4.61, lng: 55.43 },
                        { name: "Anse Georgette (Praslin)", lat: -4.30, lng: 55.67 },
                        { name: "L'Union Estate (La Digue)", lat: -4.36, lng: 55.83 },
                        { name: "Silhouette Island", lat: -4.48, lng: 55.23 },
                        { name: "Desroches Island", lat: -5.69, lng: 53.65 },
                        { name: "Frégate Island", lat: -4.58, lng: 55.94 }
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
        anse_source_dargent: {
            titre: "Anse Source d'Argent",
            localisation: "L'Union Estate, La Digue",
            periode: "Toute l'année (Marée haute pour la baignade)",
            acces: "Vélo ou à pied depuis le port de La Digue",
            conseils: "La plage la plus photographiée au monde. Admirez les blocs de granit rose sculptés par les vagues. Allez-y tôt le matin pour éviter les excursions de Praslin",
            contact: "L'Union Estate Management",
            hotel: "Le Domaine de L'Orangeraie",
            hotelLoc: "Anse Sévère, La Digue",
            hotelFonct: "Boutique hôtel de luxe mêlant architecture zen et hospitalité créole",
            hotelContact: "+248 429 9999",
            hotelRestau: "Le Combava",
            guide: "Jean-Marc Hoareau",
            guideContact: "jeanmarc@visitafrika.com"
        },
        vallee_de_mai: {
            titre: "Vallée de Mai",
            localisation: "Praslin",
            periode: "Toute l'année",
            acces: "Bus ou voiture (15 min de Grand Anse)",
            conseils: "Classé UNESCO. Le 'Jardin d'Éden' originel. Découvrez le célèbre Coco de Mer et cherchez le rare perroquet noir",
            contact: "Seychelles Islands Foundation (SIF)",
            hotel: "Raffles Seychelles",
            hotelLoc: "Anse Takamaka, Praslin",
            hotelFonct: "Villas de luxe avec piscine privée surplombant l'océan",
            hotelContact: "+248 429 6000",
            hotelRestau: "Curieuse Restaurant",
            guide: "Jean-Marc Hoareau",
            guideContact: "jeanmarc@visitafrika.com"
        },
        aldabra: {
            titre: "Atoll d'Aldabra",
            localisation: "Outer Islands",
            periode: "Mars à Mai / Octobre à Décembre (Mer calme)",
            acces: "Bateau d'expédition ou vol charter (accès restreint)",
            conseils: "Le plus grand atoll de corail émergé au monde. Sanctuaire des tortues géantes (plus de 150 000 individus)",
            contact: "SIF Aldabra",
            hotel: "Navires d'expédition",
            hotelLoc: "En mer",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Cuisine de bord",
            guide: "Scientifique SIF",
            guideContact: "Via SIF"
        },
        anse_lazio: {
            titre: "Anse Lazio",
            localisation: "Praslin",
            periode: "Toute l'année",
            acces: "Bus ou voiture",
            conseils: "Souvent classée parmi les plus belles plages du monde. Sable fin, eau cristalline et snorkeling facile aux extrémités",
            contact: "N/A",
            hotel: "Constance Lemuria",
            hotelLoc: "Anse Kerlan, Praslin",
            hotelFonct: "Hôtel 5 étoiles luxe avec le seul parcours de golf 18 trous des Seychelles",
            hotelContact: "+248 428 1281",
            hotelRestau: "The Legend",
            guide: "Jean-Marc Hoareau",
            guideContact: "jeanmarc@visitafrika.com"
        },
        victoria_clocktower: {
            titre: "Victoria Clocktower",
            localisation: "Victoria, Mahé",
            periode: "Toute l'année",
            acces: "Centre-ville",
            conseils: "Réplique du 'Little Ben' de Londres, symbole de la capitale des Seychelles. Visitez aussi le marché couvert Sir Selwyn Selwyn-Clarke",
            contact: "National Museum of History",
            hotel: "Hilton Seychelles Northolme",
            hotelLoc: "Glacis, Mahé",
            hotelFonct: "Hôtel historique de luxe, refuge d'Ian Fleming (auteur de James Bond)",
            hotelContact: "+248 429 9000",
            hotelRestau: "Les Cocotiers",
            guide: "Nathalie Morel",
            guideContact: "nathalie@visitafrika.com"
        },
        curieuse_island: {
            titre: "Curieuse Island",
            localisation: "Face à Praslin",
            periode: "Toute l'année",
            acces: "Bateau taxi depuis Cote d'Or (Praslin)",
            conseils: "Terre rouge, mangroves et liberté totale pour les tortues géantes d'Aldabra réintroduites. Barbecue sur la plage recommandé",
            contact: "SNPA (Seychelles National Parks Authority)",
            hotel: "Hôtels de Praslin",
            hotelLoc: "Praslin",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Jean-Marc Hoareau",
            guideContact: "jeanmarc@visitafrika.com"
        },
        cousin_island: {
            titre: "Cousin Island",
            localisation: "Près de Praslin",
            periode: "Toute l'année",
            acces: "Excursion bateau organisée",
            conseils: "Réserve naturelle gérée par Nature Seychelles. Paradis pour les oiseaux marins et les tortues imbriquées",
            contact: "Nature Seychelles",
            hotel: "Hôtels de Praslin",
            hotelLoc: "Praslin",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide naturaliste",
            guideContact: "Sur place"
        },
        bird_island: {
            titre: "Bird Island",
            localisation: "Extrême Nord de l'archipel",
            periode: "Mai à Octobre (Saison des oiseaux migrateurs)",
            acces: "Vol charter (30 min de Mahé)",
            conseils: "Vivez l'expérience d'une île corallienne sauvage. Rencontrez Esmeralda, la plus vieille tortue géante au monde",
            contact: "Bird Island Lodge",
            hotel: "Bird Island Lodge",
            hotelLoc: "Unique hôtel sur l'île",
            hotelFonct: "Eco-lodge authentique sans télévision ni téléphone pour une déconnexion totale",
            hotelContact: "+248 422 4925",
            hotelRestau: "Produits de la ferme et de la mer",
            guide: "Nathalie Morel",
            guideContact: "nathalie@visitafrika.com"
        },
        mahe_morne: {
            titre: "Morne Seychellois",
            localisation: "Parc National, Mahé",
            periode: "Saison sèche (Juillet-Août)",
            acces: "Sentier de randonnée depuis Sans Souci",
            conseils: "Point culminant des Seychelles (905m). Explorez les sentiers de Copolia ou Mission Lodge pour des vues épiques",
            contact: "SNPA Mahé",
            hotel: "Four Seasons Resort Seychelles",
            hotelLoc: "Petite Anse, Mahé",
            hotelFonct: "Luxe ultime dans des villas perchées dans la colline avec vue sur mer",
            hotelContact: "+248 439 3000",
            hotelRestau: "ZEZ",
            guide: "Nathalie Morel",
            guideContact: "nathalie@visitafrika.com"
        },
        beau_vallon: {
            titre: "Beau Vallon",
            localisation: "Nord de Mahé",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "La plage la plus animée. Idéal pour les sports nautiques, les restaurants de plage et le marché du mercredi soir",
            contact: "N/A",
            hotel: "Fisherman's Cove Resort",
            hotelLoc: "Beau Vallon",
            hotelFonct: "Hôtel iconique mêlant héritage et modernité",
            hotelContact: "+248 467 7000",
            hotelRestau: "Paris Seychelles",
            guide: "Nathalie Morel",
            guideContact: "nathalie@visitafrika.com"
        },
        praslin_anse_georgette: {
            titre: "Anse Georgette",
            localisation: "Praslin (Constance Lemuria)",
            periode: "Toute l'année",
            acces: "Via l'hôtel Lemuria (réservation nécessaire) ou bateau",
            conseils: "Petite baie sauvage de sable blanc pur. Une alternative plus intime à Anse Lazio",
            contact: "Constance Lemuria Reception",
            hotel: "Constance Lemuria",
            hotelLoc: "Anse Kerlan",
            hotelFonct: "Prestige et nature préservée",
            hotelContact: "+248 428 1281",
            hotelRestau: "The Nest",
            guide: "Jean-Marc Hoareau",
            guideContact: "jeanmarc@visitafrika.com"
        },
        la_digue_union: {
            titre: "L'Union Estate",
            localisation: "La Digue",
            periode: "Toute l'année",
            acces: "Vélo",
            conseils: "Visitez l'ancienne fabrique de coprah, la plantation de vanille et la maison coloniale historique",
            contact: "N/A",
            hotel: "La Digue Island Lodge",
            hotelLoc: "Anse Réunion",
            hotelFonct: "Style traditionnel créole, bungalows sur la plage",
            hotelContact: "+248 429 2525",
            hotelRestau: "Cuisine créole authentique",
            guide: "Jean-Marc Hoareau",
            guideContact: "jeanmarc@visitafrika.com"
        },
        silhouette_island: {
            titre: "Silhouette Island",
            localisation: "30km au nord de Mahé",
            periode: "Toute l'année",
            acces: "Bateau ou hélicoptère depuis Bel Ombre (Mahé)",
            conseils: "Parc national montagneux et sauvage. Troisième plus grande île, presque inhabitée. Idéal pour la randonnée forestière",
            contact: "IDC (Island Development Company)",
            hotel: "Hilton Seychelles Labriz Resort & Spa",
            hotelLoc: "La Passe, Silhouette",
            hotelFonct: "Resort de luxe unique sur une île-parc national",
            hotelContact: "+248 429 3949",
            hotelRestau: "Grann Kaz (Maison coloniale)",
            guide: "Nathalie Morel",
            guideContact: "nathalie@visitafrika.com"
        },
        desroches: {
            titre: "Desroches Island",
            localisation: "Outer Islands (Amirantes)",
            periode: "Octobre à Mai",
            acces: "Vol charter (40 min de Mahé)",
            conseils: "L'île de corail par excellence. 14km de plages immaculées pour vous seul. Paradis de la pêche et de la plongée",
            contact: "Four Seasons Desroches",
            hotel: "Four Seasons Resort Seychelles at Desroches Island",
            hotelLoc: "Île Desroches",
            hotelFonct: "L'apogée de l'exclusivité et du luxe pieds nus",
            hotelContact: "+248 439 3000",
            hotelRestau: "Claudine",
            guide: "Guide résident Four Seasons",
            guideContact: "Via hôtel"
        },
        fregate: {
            titre: "Frégate Island",
            localisation: "Inner Islands",
            periode: "Toute l'année",
            acces: "Hélicoptère de Mahé (15 min)",
            conseils: "Île privée ultra-luxe. Sanctuaire pour la Pie-chanteuse des Seychelles et des milliers de tortues géantes",
            contact: "Fregate Island Private",
            hotel: "Fregate Island Private",
            hotelLoc: "Île Frégate",
            hotelFonct: "L'une des destinations les plus exclusives au monde",
            hotelContact: "+248 429 0280",
            hotelRestau: "Cuisine 'Island to table'",
            guide: "Nathalie Morel",
            guideContact: "nathalie@visitafrika.com"
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
                    <i class="fas fa-ship"></i>
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon voyage</h4>
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
                Demande envoyée ! Nos experts seychellois vous contacteront.
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
