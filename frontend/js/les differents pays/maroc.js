/**
 * PROJET: VISIT AFRIKA
 * FICHIER: maroc.js
 * DESCRIPTION: Script premium pour le Maroc.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Maroc chargé.");

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
                    // Centrer sur le Maroc
                    map = L.map('maroc-map').setView([31.7917, -7.0926], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Médina de Marrakech", lat: 31.6295, lng: -7.9811 },
                        { name: "Chefchaouen (La perle bleue)", lat: 35.1688, lng: -5.2636 },
                        { name: "Fès el-Bali (UNESCO)", lat: 34.0650, lng: -4.9772 },
                        { name: "Essaouira (Mogador)", lat: 31.5085, lng: -9.7595 },
                        { name: "Mosquée Hassan II (Casablanca)", lat: 33.6086, lng: -7.6326 },
                        { name: "Dunes de Merzouga (Sahara)", lat: 31.0802, lng: -4.0120 },
                        { name: "Aït-ben-Haddou", lat: 31.0470, lng: -7.1300 },
                        { name: "Vallée du Dadès", lat: 31.4255, lng: -5.9815 },
                        { name: "Kasbah des Oudayas (Rabat)", lat: 34.0321, lng: -6.8364 },
                        { name: "Volubilis (Ruines romaines)", lat: 34.0722, lng: -5.5542 },
                        { name: "Agadir (Plages)", lat: 30.4278, lng: -9.5981 },
                        { name: "Tanger (La porte de l'Afrique)", lat: 35.7595, lng: -5.8340 },
                        { name: "Ifrane (La petite Suisse)", lat: 33.5273, lng: -5.1067 },
                        { name: "Ouarzazate (Cinéma)", lat: 30.9189, lng: -6.8934 },
                        { name: "Meknès (Ville impériale)", lat: 33.8935, lng: -5.5473 }
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
        marrakech_medina: {
            titre: "Médina de Marrakech",
            localisation: "Marrakech",
            periode: "Mars à Mai ou Septembre à Novembre",
            acces: "Aéroport Menara (RAK) puis taxi/navette",
            conseils: "Perdez-vous dans les souks et finissez votre journée sur la place Jemaa el-Fna pour le spectacle des conteurs et musiciens",
            contact: "Office National Marocain du Tourisme (ONMT)",
            hotel: "La Mamounia",
            hotelLoc: "Médina de Marrakech",
            hotelFonct: "Palace mythique alliant luxe contemporain et artisanat marocain",
            hotelContact: "+212 5243-88600",
            hotelRestau: "Le Marocain (Gastronomique)",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        chefchaouen: {
            titre: "Chefchaouen",
            localisation: "Montagnes du Rif (Nord)",
            periode: "Printemps",
            acces: "Bus ou voiture privée depuis Tanger (2h) ou Fès (4h)",
            conseils: "La ville bleue. Flânez dans les ruelles peintes à la chaux et montez à la mosquée espagnole pour la vue",
            contact: "Conseil Provincial du Tourisme de Chefchaouen",
            hotel: "Lina Ryad & Spa",
            hotelLoc: "Cœur de la Médina",
            hotelFonct: "Hôtel de charme avec spa et toit terrasse panoramique",
            hotelContact: "+212 5399-86633",
            hotelRestau: "Cuisine rifaine traditionnelle",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        fes_el_bali: {
            titre: "Fès el-Bali",
            localisation: "Fès",
            periode: "Automne / Printemps",
            acces: "Gare ferroviaire ou aéroport de Fès-Saïss",
            conseils: "La plus grande médina médiévale au monde. Visitez les tanneries Chouara et l'université Al-Quaraouiyine",
            contact: "Association des Guides de Fès",
            hotel: "Palais Faraj Suites & Spa",
            hotelLoc: "Surplombant la Médina",
            hotelFonct: "Ancien palais réhabilité en hôtel de luxe avec vue imprenable",
            hotelContact: "+212 5356-35356",
            hotelRestau: "L'Amandier (Cuisine Fassie)",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        essaouira: {
            titre: "Essaouira (Mogador)",
            localisation: "Côte Atlantique",
            periode: "Toute l'année (Juin pour le Festival Gnaoua)",
            acces: "Bus ou voiture depuis Marrakech (2h30)",
            conseils: "La ville du vent. Parfait pour le surf, le kite et la dégustation de poisson frais au port",
            contact: "Essaouira Mogador Association",
            hotel: "Heure Bleue Palais",
            hotelLoc: "Médina d'Essaouira",
            hotelFonct: "Relais & Châteaux au charme colonial et oriental",
            hotelContact: "+212 5244-73434",
            hotelRestau: "Le Salon Oriental",
            guide: "Zineb Mansouri",
            guideContact: "zineb@visitafrika.com"
        },
        casablanca_hassan2: {
            titre: "Mosquée Hassan II",
            localisation: "Casablanca",
            periode: "Toute l'année",
            acces: "Taxi ou Tramway",
            conseils: "L'un des plus grands édifices religieux au monde. Visitez l'intérieur lors des tours guidés (hors heures de prière)",
            contact: "Fondation de la Mosquée Hassan II",
            hotel: "Four Seasons Hotel Casablanca",
            hotelLoc: "Anfa Place, Corniche",
            hotelFonct: "Luxe moderne face à l'océan Atlantique",
            hotelContact: "+212 5291-20000",
            hotelRestau: "Bleu (Fruits de mer)",
            guide: "Zineb Mansouri",
            guideContact: "zineb@visitafrika.com"
        },
        merzouga: {
            titre: "Dunes de Merzouga (Erg Chebbi)",
            localisation: "Sud-Est (Sahara)",
            periode: "Octobre à Avril",
            acces: "Voiture de location ou bus depuis Errachidia ou Ouarzazate",
            conseils: "Nuit en bivouac sous les étoiles après une balade à dos de dromadaire. Magique au lever du soleil",
            contact: "N/A",
            hotel: "Merzouga Luxury Desert Camp",
            hotelLoc: "Au cœur des dunes",
            hotelFonct: "Tentes de grand luxe avec douches privatives au milieu du désert",
            hotelContact: "Via agence",
            hotelRestau: "Dîner bédouin traditionnel",
            guide: "Guide bédouin local",
            guideContact: "Obligatoire"
        },
        ait_ben_haddou: {
            titre: "Aït-ben-Haddou",
            localisation: "Près de Ouarzazate",
            periode: "Toute l'année",
            acces: "Route (30 min de Ouarzazate)",
            conseils: "Ksar classé UNESCO, décor de nombreux films (Gladiator, Game of Thrones). Explorez les ruelles escarpées",
            contact: "N/A",
            hotel: "Ksar Ighnda",
            hotelLoc: "Village d'Aït-ben-Haddou",
            hotelFonct: "Hôtel de luxe inspiré de l'architecture traditionnelle des Kasbahs",
            hotelContact: "+212 5248-90000",
            hotelRestau: "Cuisine marocaine créative",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        vallee_dades: {
            titre: "Vallée du Dadès",
            localisation: "Haut Atlas",
            periode: "Printemps",
            acces: "Route depuis Ouarzazate",
            conseils: "La vallée des milles Kasbahs. Admirez les gorges sinueuses et les formations rocheuses 'Pattes de singe'",
            contact: "N/A",
            hotel: "Hotel Xaluca Dades",
            hotelLoc: "Boumalne Dades",
            hotelFonct: "Hôtel panoramique offrant une vue imprenable sur la vallée",
            hotelContact: "+212 5248-35000",
            hotelRestau: "Buffets généreux",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        rabat_oudayas: {
            titre: "Kasbah des Oudayas",
            localisation: "Rabat (Capitale)",
            periode: "Toute l'année",
            acces: "Tramway ou Taxi",
            conseils: "Ancienne citadelle aux murs bleus et blancs. Prenez un thé aux pignons au célèbre Café Maure",
            contact: "Ministère du Tourisme Rabat",
            hotel: "La Villa Mandarine",
            hotelLoc: "Quartier Souissi, Rabat",
            hotelFonct: "Ancienne villa entourée d'une orangeraie, calme et élégance",
            hotelContact: "+212 5377-52019",
            hotelRestau: "Cuisine fusion marocaine",
            guide: "Zineb Mansouri",
            guideContact: "zineb@visitafrika.com"
        },
        volubilis: {
            titre: "Volubilis",
            localisation: "Près de Meknès",
            periode: "Printemps (Fleurs sauvages)",
            acces: "Route (45 min de Meknès ou 1h30 de Fès)",
            conseils: "Le plus beau site romain du Maroc. Admirez les mosaïques parfaitement conservées in situ",
            contact: "Conservation de Volubilis",
            hotel: "Hotel Transatlantique",
            hotelLoc: "Meknès",
            hotelFonct: "Hôtel historique avec jardins surplombant la ville",
            hotelContact: "+212 5355-25050",
            hotelRestau: "International",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        agadir: {
            titre: "Agadir",
            localisation: "Côte Sud-Ouest",
            periode: "Toute l'année (Surtout l'hiver pour le soleil)",
            acces: "Aéroport Al Massira (AGA)",
            conseils: "Station balnéaire moderne. Montez à l'ancienne Kasbah (Agadir Oufella) pour la vue sur la baie",
            contact: "Conseil Régional du Tourisme Agadir",
            hotel: "Sofitel Agadir Royal Bay Resort",
            hotelLoc: "Bord de mer",
            hotelFonct: "Palais de style mauresque sur la plage",
            hotelContact: "+212 5288-40000",
            hotelRestau: "Plusieurs bars et restaurants",
            guide: "Zineb Mansouri",
            guideContact: "zineb@visitafrika.com"
        },
        tanger: {
            titre: "Tanger",
            localisation: "Détroit de Gibraltar",
            periode: "Toute l'année",
            acces: "Train à grande vitesse (Al Boraq) depuis Casa/Rabat",
            conseils: "Ville mythique des écrivains et artistes. Visitez les Grottes d'Hercule et le Cap Spartel",
            contact: "Office du Tourisme de Tanger",
            hotel: "El Minzah Hotel",
            hotelLoc: "Centre-ville Tanger",
            hotelFonct: "Hôtel mythique des années 30, luxe et histoire",
            hotelContact: "+212 5393-33444",
            hotelRestau: "Cuisine internationale",
            guide: "Zineb Mansouri",
            guideContact: "zineb@visitafrika.com"
        },
        ifrane: {
            titre: "Ifrane",
            localisation: "Moyen Atlas",
            periode: "Hiver (Ski) ou Été (Fraîcheur)",
            acces: "Route depuis Fès (1h)",
            conseils: "Architecture de style alpin, parcs verdoyants et air pur. Surnommée la 'Suisse marocaine'",
            contact: "N/A",
            hotel: "Michlifen Resort & Golf",
            hotelLoc: "Ifrane",
            hotelFonct: "Palais de montagne 5 étoiles avec spa de classe mondiale",
            hotelContact: "+212 5358-64000",
            hotelRestau: "Le Cèdre (Gastronomique)",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        ouarzazate: {
            titre: "Ouarzazate",
            localisation: "Porte du Désert",
            periode: "Hiver / Printemps",
            acces: "Vol interne ou route (Col du Tichka)",
            conseils: "Visitez les Studios Atlas et la Kasbah de Taourirt au centre-ville",
            contact: "Studios Atlas",
            hotel: "Berbère Palace",
            hotelLoc: "Ouarzazate",
            hotelFonct: "Hôtel de luxe prisé par les stars de cinéma en tournage",
            hotelContact: "+212 5248-82500",
            hotelRestau: "Spécialités marocaines",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
        },
        meknes: {
            titre: "Meknès",
            localisation: "Ville Impériale (Nord)",
            periode: "Printemps",
            acces: "Train depuis Fès ou Rabat",
            conseils: "Visitez la porte Bab Mansour, l'une des plus belles au monde, et le mausolée de Moulay Ismaïl",
            contact: "Délégation du Tourisme Meknès",
            hotel: "Riad Yacout",
            hotelLoc: "Médina de Meknès",
            hotelFonct: "Riad traditionnel somptueusement décoré",
            hotelContact: "+212 5355-50000",
            hotelRestau: "Tajines faits maison",
            guide: "Youssef El Alami",
            guideContact: "youssef@visitafrika.com"
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
                    <i class="fas fa-car-side"></i>
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon séjour</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="25" value="2" required>
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
                Demande envoyée ! Nos experts marocains vous contacteront.
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
