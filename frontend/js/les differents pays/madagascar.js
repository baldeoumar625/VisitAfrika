/**
 * PROJET: VISIT AFRIKA
 * FICHIER: madagascar.js
 * DESCRIPTION: Script premium pour Madagascar.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Madagascar chargé.");

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
                    // Centrer sur Madagascar
                    map = L.map('madagascar-map').setView([-18.7669, 46.8691], 5);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Allée des Baobabs", lat: -20.25, lng: 44.39 },
                        { name: "Tsingy de Bemaraha (UNESCO)", lat: -19.00, lng: 44.75 },
                        { name: "Parc National de l'Isalo", lat: -22.50, lng: 45.25 },
                        { name: "Nosy Be (Plages)", lat: -13.31, lng: 48.26 },
                        { name: "Andasibe-Mantadia", lat: -18.93, lng: 48.42 },
                        { name: "Île Sainte-Marie", lat: -17.00, lng: 49.85 },
                        { name: "Parc de Ranomafana", lat: -21.25, lng: 47.42 },
                        { name: "Masoala (Forêt primaire)", lat: -15.50, lng: 50.00 },
                        { name: "Ankarafantsika", lat: -16.25, lng: 46.80 },
                        { name: "Montagne d'Ambre", lat: -12.60, lng: 49.15 },
                        { name: "Antananarivo (Capitale)", lat: -18.88, lng: 47.51 },
                        { name: "Antsiranana (Diego Suarez)", lat: -12.28, lng: 49.28 },
                        { name: "Toliara (Tuléar)", lat: -23.35, lng: 43.67 },
                        { name: "Fort-Dauphin (Taolagnaro)", lat: -25.02, lng: 46.99 },
                        { name: "Morondava", lat: -20.28, lng: 44.28 }
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
        allee_baobabs: {
            titre: "Allée des Baobabs",
            localisation: "Près de Morondava (Ouest)",
            periode: "Coucher du soleil (Toute l'année)",
            acces: "4x4 ou taxi-brousse depuis Morondava (30 min)",
            conseils: "Le lieu le plus photographié de l'île. Venez 1h avant le coucher du soleil pour voir les ombres s'allonger sur ces arbres millénaires",
            contact: "Fanamby NGO",
            hotel: "Palissandre Côte Ouest",
            hotelLoc: "Plage de Morondava",
            hotelFonct: "Hôtel de charme, bungalows en bois et confort moderne",
            hotelContact: "+261 20 22 240 56",
            hotelRestau: "Spécialités de fruits de mer",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        tsingy_bemaraha: {
            titre: "Tsingy de Bemaraha",
            localisation: "Bekopaka (Ouest)",
            periode: "Mai à Octobre (Fermé pendant la saison des pluies)",
            acces: "4x4 obligatoire (8-10h de piste depuis Morondava)",
            conseils: "Cathédrale de calcaire aux aiguilles acérées. Parcours via ferrata impressionnant, nécessite une bonne condition physique",
            contact: "Madagascar National Parks (MNP)",
            hotel: "Le Soleil des Tsingy",
            hotelLoc: "Bekopaka",
            hotelFonct: "Lodge de luxe surplombant la rivière Manambolo",
            hotelContact: "+261 32 07 202 24",
            hotelRestau: "Gastronomie fusion",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        isalo: {
            titre: "Parc National de l'Isalo",
            localisation: "Ranohira (Sud-Ouest)",
            periode: "Avril à Octobre",
            acces: "Route Nationale 7 (RN7) bitumée",
            conseils: "Canyon jurassique, piscines naturelles et tombeaux Bara. Ne manquez pas la 'Fenêtre de l'Isalo' au coucher du soleil",
            contact: "MNP Ranohira",
            hotel: "Isalo Rock Lodge",
            hotelLoc: "Dans les massifs de l'Isalo",
            hotelFonct: "Architecture moderne intégrée dans les rochers de grès",
            hotelContact: "+261 20 22 328 60",
            hotelRestau: "Cuisine internationale",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        nosy_be: {
            titre: "Nosy Be (L'Île aux Parfums)",
            localisation: "Nord-Ouest du pays",
            periode: "Mai à Décembre",
            acces: "Aéroport international de Fascene (NOS) ou bateau depuis Ankify",
            conseils: "Paradis balnéaire. Visitez la réserve de Lokobe et faites une excursion vers Nosy Iranja, la perle de l'océan Indien",
            contact: "Office du Tourisme de Nosy Be",
            hotel: "Andilana Beach Resort",
            hotelLoc: "Plage d'Andilana, Nosy Be",
            hotelFonct: "Le meilleur resort 'all-inclusive' de Madagascar",
            hotelContact: "+261 20 86 611 76",
            hotelRestau: "Plusieurs restaurants thématiques",
            guide: "Nivo Andria",
            guideContact: "nivo@visitafrika.com"
        },
        andisibe_mantadia: {
            titre: "Andasibe-Mantadia",
            localisation: "Est de Madagascar (RN2)",
            periode: "Toute l'année (Plus humide de Janvier à Mars)",
            acces: "Route (3h d'Antananarivo)",
            conseils: "Sanctuaire de l'Indri-Indri, le plus grand lémurien au monde. Son cri matinal est inoubliable",
            contact: "Association Mitsinjo",
            hotel: "Vakona Forest Lodge",
            hotelLoc: "Andasibe",
            hotelFonct: "Lodge au cœur de la forêt avec îlot aux lémuriens privé",
            hotelContact: "+261 20 22 213 94",
            hotelRestau: "Cuisine familiale soignée",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        ile_sainte_marie: {
            titre: "Île Sainte-Marie (Nosy Boraha)",
            localisation: "Côte Est",
            periode: "Juillet à Septembre (Baleines à bosse)",
            acces: "Avion ou bateau depuis Soanierana Ivongo",
            conseils: "Ancien repaire de pirates. Explorez l'île aux Nattes au sud et visitez le cimetière des pirates",
            contact: "Cétamada (Protection des baleines)",
            hotel: "Princesse Bora Lodge & Spa",
            hotelLoc: "Sainte-Marie",
            hotelFonct: "Luxe décontracté, villas écologiques en bord de lagon",
            hotelContact: "+261 20 57 400 35",
            hotelRestau: "Gastronomie marine",
            guide: "Nivo Andria",
            guideContact: "nivo@visitafrika.com"
        },
        ranomafana: {
            titre: "Parc National de Ranomafana",
            localisation: "Hautes Terres (Est de Fianarantsoa)",
            periode: "Saison sèche",
            acces: "Route bitumée (RN7)",
            conseils: "Forêt humide dense célèbre pour le lémurien bambou doré. Station thermale à proximité pour se détendre",
            contact: "MNP Ranomafana",
            hotel: "Setam Lodge",
            hotelLoc: "Ranomafana",
            hotelFonct: "Surplombant la forêt tropicale",
            hotelContact: "+261 20 75 523 33",
            hotelRestau: "Spécialités malgaches",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        masoala: {
            titre: "Péninsule de Masoala",
            localisation: "Nord-Est",
            periode: "Octobre à Janvier",
            acces: "Bateau depuis Maroantsetra",
            conseils: "Le plus grand parc de l'île. La forêt rencontre la mer. Idéal pour le kayak et l'observation d'espèces endémiques rares",
            contact: "MNP Masoala",
            hotel: "Masoala Forest Lodge",
            hotelLoc: "Lisière du parc",
            hotelFonct: "Campement de luxe en mode 'bout du monde'",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine fraîche locale",
            guide: "Nivo Andria",
            guideContact: "nivo@visitafrika.com"
        },
        ankarafantsika: {
            titre: "Parc National d'Ankarafantsika",
            localisation: "Nord-Ouest (RN4)",
            periode: "Saison sèche",
            acces: "Route bitumée (entre Tana et Mahajanga)",
            conseils: "Forêt sèche abritant des lémuriens et de nombreux oiseaux. Visitez le canyon d'Ankarokaroka",
            contact: "MNP Ankarafantsika",
            hotel: "Gîtes du Parc",
            hotelLoc: "Entrée du parc",
            hotelFonct: "Bungalows simples et intégrés",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine malgache",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        montagne_ambre: {
            titre: "Montagne d'Ambre",
            localisation: "Près de Diego Suarez (Nord)",
            periode: "Toute l'année",
            acces: "Route depuis Diego (1h)",
            conseils: "Parc volcanique humide. Découvrez les cascades sacrées et les caméléons minuscules (Brookesia)",
            contact: "MNP Diego",
            hotel: "Nature Lodge",
            hotelLoc: "Joffreville",
            hotelFonct: "Bungalows avec vue sur la baie de Diego",
            hotelContact: "+261 32 02 201 11",
            hotelRestau: "Produits du terroir",
            guide: "Nivo Andria",
            guideContact: "nivo@visitafrika.com"
        },
        antananarivo: {
            titre: "Antananarivo (Tana)",
            localisation: "Hautes Terres centrales (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international d'Ivato (TNR)",
            conseils: "Visitez le Palais de la Reine (Rova) et flânez dans les escaliers de la ville haute. Attention aux embouteillages",
            contact: "ORTANA (Office du Tourisme)",
            hotel: "Carlton Madagascar",
            hotelLoc: "Anosy, Antananarivo",
            hotelFonct: "Hôtel 5 étoiles de référence, vue sur le lac Anosy",
            hotelContact: "+261 20 22 260 60",
            hotelRestau: "Le Café de la Gare",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        antsiranana: {
            titre: "Diego Suarez (Antsiranana)",
            localisation: "Extrême Nord",
            periode: "Mai à Novembre",
            acces: "Vol interne",
            conseils: "Deuxième plus grande baie du monde après Rio. Visitez la Mer d'Émeraude pour le snorkeling",
            contact: "N/A",
            hotel: "Grand Hôtel Diego",
            hotelLoc: "Centre-ville Diego",
            hotelFonct: "Hôtel classique avec piscine, centre d'animation",
            hotelContact: "+261 20 82 221 00",
            hotelRestau: "Cuisine métissée",
            guide: "Nivo Andria",
            guideContact: "nivo@visitafrika.com"
        },
        toliara: {
            titre: "Tuléar (Toliara)",
            localisation: "Sud-Ouest",
            periode: "Toute l'année",
            acces: "Fin de la RN7 / Vol interne",
            conseils: "Ville du soleil et des Vezo (nomades de la mer). Explorez le lagon d'Ifaty et l'Arboretum d'Antsokay",
            contact: "N/A",
            hotel: "Bakuba Concept Tool",
            hotelLoc: "Ankilibe, Tuléar",
            hotelFonct: "Architecture onirique face à la mer, design unique",
            hotelContact: "+261 32 05 600 01",
            hotelRestau: "Gastronomie du Sud",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        fort_dauphin: {
            titre: "Fort-Dauphin (Taolagnaro)",
            localisation: "Extrême Sud-Est",
            periode: "Septembre à Décembre",
            acces: "Vol interne uniquement (Routes très difficiles)",
            conseils: "Où la montagne rencontre la mer. Visitez la réserve privée de Berenty pour voir les lémuriens Catta",
            contact: "N/A",
            hotel: "Talanjoky",
            hotelLoc: "Baie de Libanona",
            hotelFonct: "Boutique hôtel de charme surplombant la plage",
            hotelContact: "+261 34 07 433 13",
            hotelRestau: "Langoustes fraîches",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
        },
        morondava: {
            titre: "Morondava",
            localisation: "Région Menabe (Ouest)",
            periode: "Saison sèche",
            acces: "Vol interne ou Route (RN35/34)",
            conseils: "Ville paisible, point de départ vers les Baobabs et les Tsingy. Profitez de la vie nocturne au Nosy Kely",
            contact: "N/A",
            hotel: "Palissandre Côte Ouest",
            hotelLoc: "Plage de Morondava",
            hotelFonct: "Resort haut de gamme",
            hotelContact: "+261 20 22 240 56",
            hotelRestau: "Spécialités de la mer",
            guide: "Faly Rakoto",
            guideContact: "faly@visitafrika.com"
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
                    <i class="fas fa-plane"></i>
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon aventure</h4>
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
                Demande envoyée ! Nos experts malgaches vous contacteront.
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
