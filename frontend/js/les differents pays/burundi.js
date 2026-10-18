/**
 * PROJET: VISIT AFRIKA
 * FICHIER: burundi.js
 * DESCRIPTION: Script premium pour la page Burundi.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Burundi chargé.");

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
                    // Centrer sur le Burundi
                    map = L.map('burundi-map').setView([-3.3731, 29.9189], 9);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National de la Kibira", lat: -3.00, lng: 29.50 },
                        { name: "Réserve de la Rusizi", lat: -3.33, lng: 29.25 },
                        { name: "Parc National de la Ruvubu", lat: -3.05, lng: 30.25 },
                        { name: "Source du Nil (Rutana)", lat: -3.91, lng: 29.83 },
                        { name: "Chutes de la Karera", lat: -3.83, lng: 30.00 },
                        { name: "Lac Tanganyika (Plages)", lat: -3.45, lng: 29.35 },
                        { name: "Bujumbura (Capitale économique)", lat: -3.38, lng: 29.36 },
                        { name: "Gitega (Capitale politique)", lat: -3.42, lng: 29.92 },
                        { name: "Pierre de Livingstone et Stanley", lat: -3.50, lng: 29.33 },
                        { name: "Faille de Nyakazu", lat: -3.90, lng: 30.10 },
                        { name: "Réserve de Vyanda", lat: -3.95, lng: 29.60 },
                        { name: "Monument de l'Unité", lat: -3.38, lng: 29.37 },
                        { name: "Musigati (Cultures de thé)", lat: -3.05, lng: 29.45 },
                        { name: "Lacs aux Oiseaux (Kirundo)", lat: -2.35, lng: 30.10 },
                        { name: "Rumonge", lat: -3.97, lng: 29.43 }
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
        kibira: {
            titre: "Parc National de la Kibira",
            localisation: "Crête Congo-Nil",
            periode: "Juin à Septembre",
            acces: "Route bitumée depuis Bujumbura (1h30)",
            conseils: "Forêt de montagne primaire, idéale pour observer les chimpanzés et les oiseaux endémiques",
            contact: "OBPE (Office Burundais pour la Protection de l'Environnement)",
            hotel: "Hôtel Green Park",
            hotelLoc: "Près de Bugarama",
            hotelFonct: "Hôtel de montagne avec vue sur la forêt",
            hotelContact: "+257 22 22 00 00",
            hotelRestau: "Spécialités de montagne",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
        },
        rusizi: {
            titre: "Réserve de la Rusizi",
            localisation: "Embouchure de la Rusizi, Bujumbura",
            periode: "Toute l'année",
            acces: "Facile, 15 min du centre de Bujumbura",
            conseils: "Faites un tour en bateau pour voir les hippopotames et les crocodiles du Nil",
            contact: "Rusizi Park Office",
            hotel: "Hôtel Club du Lac Tanganyika",
            hotelLoc: "Chaussée d'Uvira, Bujumbura",
            hotelFonct: "Resort de luxe en bord de lac avec piscine",
            hotelContact: "+257 22 23 50 10",
            hotelRestau: "Cuisine méditerranéenne et locale",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
        },
        ruvubu: {
            titre: "Parc National de la Ruvubu",
            localisation: "Est du pays (Province Muyinga/Karuzi)",
            periode: "Saison sèche",
            acces: "Route bitumée puis piste",
            conseils: "Le plus grand parc du pays, abritant les derniers troupeaux de buffles et de nombreuses antilopes",
            contact: "OBPE",
            hotel: "Hôtels de Gitega (base)",
            hotelLoc: "Gitega",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
        },
        source_nil_burundi: {
            titre: "Source du Nil",
            localisation: "Rutovu (Province Bururi)",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Visitez la pyramide marquant la source la plus méridionale du Nil",
            contact: "Office National du Tourisme (ONT)",
            hotel: "Bururi Guesthouse",
            hotelLoc: "Bururi",
            hotelFonct: "Simple et calme",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine familiale",
            guide: "Thierry Bizimana",
            guideContact: "thierry@visitafrika.com"
        },
        chutes_kagera: {
            titre: "Chutes de la Karera",
            localisation: "Musinga (Province Rutana)",
            periode: "Saison des pluies pour le débit, Saison sèche pour l'accès",
            acces: "Route depuis Gitega",
            conseils: "Série de quatre cascades spectaculaires nichées dans une forêt sacrée",
            contact: "N/A",
            hotel: "Hôtels de Rutana",
            hotelLoc: "Rutana",
            hotelFonct: "Basique",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Thierry Bizimana",
            guideContact: "thierry@visitafrika.com"
        },
        lac_tanganyika: {
            titre: "Plages du Lac Tanganyika",
            localisation: "Bujumbura / Rumonge",
            periode: "Toute l'année",
            acces: "Direct depuis la ville",
            conseils: "Profitez des plages de sable blanc de Saga et dégustez le poisson 'Mukeke' grillé",
            contact: "Cercle Nautique de Bujumbura",
            hotel: "Kiriri Garden Hotel",
            hotelLoc: "Kiriri Hill, Bujumbura",
            hotelFonct: "Luxe avec vue panoramique sur le lac et la ville",
            hotelContact: "+257 22 27 77 77",
            hotelRestau: "Gastronomie internationale",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
        },
        bujumbura: {
            titre: "Bujumbura",
            localisation: "Bord du Lac Tanganyika",
            periode: "Toute l'année",
            acces: "Aéroport international Melchior Ndadaye (BJM)",
            conseils: "Découvrez l'ambiance nocturne animée et le marché central coloré",
            contact: "ONT Burundi",
            hotel: "Hôtel source du Nil",
            hotelLoc: "Bujumbura Centre",
            hotelFonct: "Hôtel historique et central",
            hotelContact: "+257 22 22 52 22",
            hotelRestau: "Buffets variés",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
        },
        gitega: {
            titre: "Gitega",
            localisation: "Centre du Burundi (Capitale politique)",
            periode: "Toute l'année",
            acces: "Route bitumée (1h30 de Bujumbura)",
            conseils: "Visitez le Musée National et le sanctuaire des tambours royaux de Gishora",
            contact: "Musée National de Gitega",
            hotel: "Hôtel Helena",
            hotelLoc: "Gitega",
            hotelFonct: "Meilleur confort de la ville",
            hotelContact: "+257 22 40 40 40",
            hotelRestau: "Cuisine locale raffinée",
            guide: "Thierry Bizimana",
            guideContact: "thierry@visitafrika.com"
        },
        pierre_livingstone: {
            titre: "Pierre de Livingstone et Stanley",
            localisation: "Mugere (12km de Bujumbura)",
            periode: "Toute l'année",
            acces: "Route côtière Sud",
            conseils: "Lieu historique marquant la rencontre des deux explorateurs en 1871",
            contact: "ONT",
            hotel: "Hôtels de Bujumbura",
            hotelLoc: "Bujumbura",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
        },
        faille_nyakazu: {
            titre: "Faille de Nyakazu",
            localisation: "Province Karuzi",
            periode: "Saison sèche",
            acces: "4x4 conseillé",
            conseils: "Aussi appelée 'Faille des Allemands', offre un panorama vertigineux sur la plaine de la Kumoso",
            contact: "N/A",
            hotel: "Lodges locaux",
            hotelLoc: "Gitega (transit)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Thierry Bizimana",
            guideContact: "thierry@visitafrika.com"
        },
        parc_vyanda: {
            titre: "Réserve Forestière de Vyanda",
            localisation: "Sud du pays",
            periode: "Saison sèche",
            acces: "Route depuis Rumonge",
            conseils: "Petit sanctuaire abritant des chimpanzés et de magnifiques cascades",
            contact: "N/A",
            hotel: "Resort de Rumonge",
            hotelLoc: "Rumonge",
            hotelFonct: "Bord de lac",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Guide local Vyanda",
            guideContact: "Sur place"
        },
        monument_unite: {
            titre: "Monument de l'Unité",
            localisation: "Colline Vugizo, Bujumbura",
            periode: "Coucher du soleil",
            acces: "Taxi",
            conseils: "Symbole de la réconciliation nationale, point de vue unique sur toute la ville",
            contact: "ONT",
            hotel: "Hôtels de Bujumbura",
            hotelLoc: "Bujumbura",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
        },
        temple_musigati: {
            titre: "Musigati (Théiers)",
            localisation: "Province Bubanza",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Paysages de collines couvertes de plantations de thé à perte de vue",
            contact: "OTB (Office du Thé du Burundi)",
            hotel: "Hôtels de Bujumbura (Excursion)",
            hotelLoc: "Bujumbura",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Dégustation de thé sur place",
            guide: "N/A",
            guideContact: "N/A"
        },
        kirundo: {
            titre: "Lacs du Nord (Kirundo)",
            localisation: "Province Kirundo",
            periode: "Janvier à Mars",
            acces: "Route Nord",
            conseils: "Lac Rwihinda (Lac aux Oiseaux), sanctuaire pour les grues couronnées",
            contact: "ONT Kirundo",
            hotel: "Hôtel Rama",
            hotelLoc: "Kirundo Centre",
            hotelFonct: "Simple et propre",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale",
            guide: "Guide local ornithologue",
            guideContact: "Sur place"
        },
        rumonge: {
            titre: "Rumonge",
            localisation: "Sud de Bujumbura",
            periode: "Toute l'année",
            acces: "Route côtière Sud (RN3)",
            conseils: "Célèbre pour ses palmeraies, son huile de palme et ses plages tranquilles",
            contact: "ONT",
            hotel: "Blue Bay Resort",
            hotelLoc: "Rumonge",
            hotelFonct: "Charmant resort au bord de l'eau",
            hotelContact: "+257 22 23 20 00",
            hotelRestau: "Poissons grillés",
            guide: "Jean-Marie Nduwayo",
            guideContact: "jeanmarie@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon voyage</h4>
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
                Demande envoyée ! Nos experts burundais vous contacteront.
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
