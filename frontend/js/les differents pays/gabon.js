/**
 * PROJET: VISIT AFRIKA
 * FICHIER: gabon.js
 * DESCRIPTION: Script premium pour le Gabon.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Gabon chargé.");

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
                    // Centrer sur le Gabon
                    map = L.map('gabon-map').setView([-0.8037, 11.6094], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National de Loango", lat: -2.33, lng: 9.67 },
                        { name: "Parc National de la Lopé", lat: -0.50, lng: 11.50 },
                        { name: "Parc National d'Ivindo", lat: 0.10, lng: 12.60 },
                        { name: "Parc National de Pongara", lat: 0.15, lng: 9.35 },
                        { name: "Moukalaba-Doudou", lat: -2.40, lng: 10.45 },
                        { name: "Parc National de Mayumba", lat: -3.65, lng: 10.95 },
                        { name: "Plateaux Batéké", lat: -2.00, lng: 14.00 },
                        { name: "Parc National de Birougou", lat: -1.75, lng: 12.25 },
                        { name: "Parc National de Mwagne", lat: 0.25, lng: 13.70 },
                        { name: "Parc National de Waka", lat: -1.15, lng: 11.10 },
                        { name: "Libreville (Capitale)", lat: 0.39, lng: 9.45 },
                        { name: "Lambaréné (Hôpital Schweitzer)", lat: -0.70, lng: 10.23 },
                        { name: "Franceville", lat: -1.63, lng: 13.58 },
                        { name: "Pointe-Denis", lat: 0.30, lng: 9.37 },
                        { name: "Port-Gentil", lat: -0.72, lng: 8.78 }
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
        loango_gabon: {
            titre: "Parc National de Loango",
            localisation: "Province de l'Ogooué-Maritime",
            periode: "Novembre à Mars (Baleines, tortues et hippos surfeurs)",
            acces: "Bateau depuis Port-Gentil ou petit avion",
            conseils: "L'Eden de l'Afrique. Le seul endroit au monde où l'on peut voir des hippopotames et des éléphants sur la plage au bord de l'océan",
            contact: "ANPN (Agence Nationale des Parcs Nationaux)",
            hotel: "Loango Lodge",
            hotelLoc: "Lisière du parc, Loango",
            hotelFonct: "Lodge de luxe, point de départ des safaris terrestres et marins",
            hotelContact: "+241 01 11 22 33",
            hotelRestau: "Gastronomie fusion forêt-mer",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        lopé: {
            titre: "Parc National de la Lopé",
            localisation: "Centre du Gabon",
            periode: "Juillet à Septembre (Migration des mandrills)",
            acces: "Train 'Le Transgabonais' depuis Libreville",
            conseils: "Mélange unique de savane et forêt. Visitez les gravures rupestres millénaires de la vallée de l'Ogooué",
            contact: "ANPN Lopé",
            hotel: "Lopé Hotel",
            hotelLoc: "Bord du fleuve Ogooué",
            hotelFonct: "Hôtel confortable avec vue sur le Mont Brazza",
            hotelContact: "+241 07 77 88 99",
            hotelRestau: "Spécialités de gibier et poissons d'eau douce",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        ivindo: {
            titre: "Parc National d'Ivindo",
            localisation: "Nord-Est du Gabon",
            periode: "Décembre à Février",
            acces: "Train puis pirogue depuis Makokou",
            conseils: "Découvrez les chutes de Kongou, les plus belles d'Afrique Centrale, et la clairière de Langoué (Baï)",
            contact: "Conservation Ivindo",
            hotel: "Camp de Kongou",
            hotelLoc: "Face aux chutes d'Ivindo",
            hotelFonct: "Campement de forêt authentique",
            hotelContact: "Via agence Libreville",
            hotelRestau: "Cuisine locale de forêt",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        pongara: {
            titre: "Parc National de Pongara",
            localisation: "Face à Libreville",
            periode: "Novembre à Février (Tortues Luths)",
            acces: "Bateau navette (20 min de Libreville)",
            conseils: "Idéal pour une escapade sauvage proche de la capitale. Observez la ponte des tortues géantes sur la plage",
            contact: "ANPN Pongara",
            hotel: "Pongara Lodge",
            hotelLoc: "Pointe-Denis / Pongara",
            hotelFonct: "Lodge de plage haut de gamme et calme",
            hotelContact: "+241 05 55 66 77",
            hotelRestau: "Buffets de mer",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        moukalaba_doudou: {
            titre: "Moukalaba-Doudou",
            localisation: "Sud-Ouest (Tchibanga)",
            periode: "Saison sèche",
            acces: "4x4 depuis Tchibanga",
            conseils: "Sanctuaire des gorilles et des chimpanzés. Expérience de tracking de primates très réputée",
            contact: "N/A",
            hotel: "Iret Ecolodge",
            hotelLoc: "Doussala",
            hotelFonct: "Eco-lodge géré par la communauté locale",
            hotelContact: "Sur place",
            hotelRestau: "Plats traditionnels gabonais",
            guide: "Guide local certifié primates",
            guideContact: "Obligatoire"
        },
        mayumba: {
            titre: "Parc National de Mayumba",
            localisation: "Extrême Sud (Océan)",
            periode: "Décembre à Janvier",
            acces: "Route ou avion vers Mayumba",
            conseils: "Le plus important site de nidification des tortues Luths au monde. Parc marin exceptionnel",
            contact: "ANPN Mayumba",
            hotel: "Bungalows de Mayumba",
            hotelLoc: "Mayumba Plage",
            hotelFonct: "Simple et tranquille",
            hotelContact: "N/A",
            hotelRestau: "Cuisine de pêcheurs",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        plateaux_bateke: {
            titre: "Plateaux Batéké",
            localisation: "Sud-Est (Frontière Congo)",
            periode: "Toute l'année",
            acces: "Vol vers Franceville puis 4x4",
            conseils: "Paysages de canyons rouges et de savanes d'altitude. Visitez le canyon de Léconi",
            contact: "N/A",
            hotel: "Hôtels de Franceville / Léconi",
            hotelLoc: "Franceville",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        birougou: {
            titre: "Parc National de Birougou",
            localisation: "Massif du Chaillu",
            periode: "Saison sèche",
            acces: "Expédition difficile",
            conseils: "Forêt de montagne mystérieuse, sanctuaire pour la culture locale et la biodiversité",
            contact: "N/A",
            hotel: "Camping expédition",
            hotelLoc: "En forêt",
            hotelFonct: "Rudimentaire",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide local obligatoire",
            guideContact: "Sur place"
        },
        mwagne: {
            titre: "Parc National de Mwagne",
            localisation: "Frontière Congo",
            periode: "Saison sèche",
            acces: "Pirogue et marche",
            conseils: "Observation privilégiée des éléphants de forêt dans les clairières marécageuses",
            contact: "N/A",
            hotel: "Bivouac ANPN",
            hotelLoc: "Mwagne",
            hotelFonct: "Scientifique / Aventure",
            hotelContact: "Via ANPN",
            hotelRestau: "N/A",
            guide: "Ecogarde ANPN",
            guideContact: "Sur place"
        },
        waka: {
            titre: "Parc National de Waka",
            localisation: "Monts Ikoundou",
            periode: "Saison sèche",
            acces: "Route depuis Fougamou",
            conseils: "Falaises spectaculaires et forêt profonde, paradis des botanistes",
            contact: "N/A",
            hotel: "Gîtes de Fougamou",
            hotelLoc: "Fougamou",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        libreville: {
            titre: "Libreville",
            localisation: "Estuaire du Gabon (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international Léon Mba (LBV)",
            conseils: "Découvrez le front de mer, le marché de Mont-Bouët et dégustez un 'Poulet Nyembwe'",
            contact: "Mairie de Libreville",
            hotel: "Radisson Blu Okoume Palace",
            hotelLoc: "Bord de mer, Libreville",
            hotelFonct: "Hôtel 5 étoiles moderne, référence business et loisirs",
            hotelContact: "+241 01 44 80 00",
            hotelRestau: "L'Olatano (Buffets internationaux)",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        lambarene: {
            titre: "Lambaréné",
            localisation: "Province du Moyen-Ogooué",
            periode: "Toute l'année",
            acces: "Route bitumée (3h de Libreville) ou bateau",
            conseils: "Visitez l'Hôpital et le Musée du Dr Albert Schweitzer (Prix Nobel). Balade en pirogue sur les lacs",
            contact: "Fondation Schweitzer",
            hotel: "Hôtel Ogooué Palace",
            hotelLoc: "Bord du fleuve, Lambaréné",
            hotelFonct: "Hôtel historique avec piscine et terrasse sur l'eau",
            hotelContact: "+241 01 58 12 12",
            hotelRestau: "Carpe de l'Ogooué braisée",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        franceville: {
            titre: "Franceville",
            localisation: "Province du Haut-Ogooué",
            periode: "Toute l'année",
            acces: "Train ou avion depuis Libreville",
            conseils: "Ville nichée dans les collines, point de départ vers le pont de lianes de Poubara",
            contact: "Gouvernorat Franceville",
            hotel: "Hôtel Héliconia",
            hotelLoc: "Moanda / Franceville",
            hotelFonct: "Standard international, grand confort",
            hotelContact: "+241 01 66 11 00",
            hotelRestau: "Cuisine variée",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
        },
        point_denis: {
            titre: "Pointe-Denis",
            localisation: "Péninsule de Pongara",
            periode: "Week-end",
            acces: "Bateau depuis le port de Michel Marine (Libreville)",
            conseils: "La station balnéaire chic de Libreville. Sable blanc et farniente à 15 minutes de la ville",
            contact: "N/A",
            hotel: "La Baie des Tortues Luth",
            hotelLoc: "Pointe-Denis",
            hotelFonct: "Eco-resort de luxe, idéal pour les couples et les familles",
            hotelContact: "+241 07 28 88 88",
            hotelRestau: "Spécialités de poissons",
            guide: "N/A",
            guideContact: "N/A"
        },
        port_gentil: {
            titre: "Port-Gentil",
            localisation: "Île Mandji (Capitale pétrolière)",
            periode: "Toute l'année",
            acces: "Avion ou Bateau uniquement (Pas de route)",
            conseils: "Visitez l'église St-Louis et profitez de l'ambiance cosmopolite de la presqu'île",
            contact: "Mairie de Port-Gentil",
            hotel: "Hôtel du Parc",
            hotelLoc: "Centre Port-Gentil",
            hotelFonct: "Confortable et central",
            hotelContact: "+241 01 55 20 00",
            hotelRestau: "Grillades et cuisine internationale",
            guide: "Jean-Pierre Bongo",
            guideContact: "jp@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon expédition</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="10" value="2" required>
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
                Demande envoyée ! Nos experts gabonais vous contacteront.
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
