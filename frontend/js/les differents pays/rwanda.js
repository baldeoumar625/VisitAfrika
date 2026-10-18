/**
 * PROJET: VISIT AFRIKA
 * FICHIER: rwanda.js
 * DESCRIPTION: Script premium pour le Rwanda.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Rwanda chargé.");

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
                    // Centrer sur le Rwanda
                    map = L.map('rwanda-map').setView([-1.9403, 29.8739], 9);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc des Volcans (Gorilles)", lat: -1.47, lng: 29.49 },
                        { name: "Forêt de Nyungwe", lat: -2.48, lng: 29.23 },
                        { name: "Parc National de l'Akagera", lat: -1.88, lng: 30.71 },
                        { name: "Lac Kivu (Gisenyi/Rubavu)", lat: -1.70, lng: 29.26 },
                        { name: "Mémorial du Génocide (Kigali)", lat: -1.93, lng: 30.06 },
                        { name: "Forêt de Gishwati-Mukura", lat: -1.81, lng: 29.37 },
                        { name: "Lac Burera", lat: -1.43, lng: 29.80 },
                        { name: "Musée Ethnographique (Huye)", lat: -2.51, lng: 29.74 },
                        { name: "Palais Royal de Nyanza", lat: -2.35, lng: 29.75 },
                        { name: "Rubavu (Bord du lac)", lat: -1.69, lng: 29.26 },
                        { name: "Grottes de Musanze", lat: -1.50, lng: 29.63 },
                        { name: "Twin Lakes (Burera & Ruhondo)", lat: -1.45, lng: 29.75 },
                        { name: "Kigali City Tour", lat: -1.94, lng: 30.06 },
                        { name: "Centre de Karisoke (Dian Fossey)", lat: -1.50, lng: 29.50 },
                        { name: "Huye (Butare)", lat: -2.51, lng: 29.74 }
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
        gorilles_volcans: {
            titre: "Parc National des Volcans",
            localisation: "Musanze (Nord)",
            periode: "Juin à Septembre (Saison sèche)",
            acces: "Route depuis Kigali (2h30)",
            conseils: "L'expérience d'une vie : le trekking des gorilles de montagne. Réservez votre permis des mois à l'avance (1500$). Prévoyez des vêtements de pluie et des chaussures de marche robustes",
            contact: "RDB (Rwanda Development Board)",
            hotel: "Bisate Lodge (Wilderness)",
            hotelLoc: "Proximité immédiate du parc",
            hotelFonct: "Lodges en forme de nids d'oiseaux traditionnels, luxe ultime et vue sur les volcans Bisoke et Karisimbi",
            hotelContact: "+250 788 300 000",
            hotelRestau: "Gastronomie organique",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        nyungwe: {
            titre: "Parc National de Nyungwe",
            localisation: "Sud-Ouest du Rwanda",
            periode: "Toute l'année",
            acces: "Route depuis Kigali (5-6h) ou vol charter vers Kamembe",
            conseils: "L'une des plus anciennes forêts pluviales d'Afrique. Ne manquez pas le 'Canopy Walk' (pont suspendu) à 60m de hauteur et le trek des chimpanzés",
            contact: "Nyungwe Park Management",
            hotel: "One&Only Nyungwe House",
            hotelLoc: "Gisakura, en lisière de forêt",
            hotelFonct: "Retraite de luxe nichée dans une plantation de thé, immersion totale en pleine nature",
            hotelContact: "+250 221 000 000",
            hotelRestau: "The Dining Room (Produits du jardin)",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        akagera: {
            titre: "Parc National de l'Akagera",
            localisation: "Est du Rwanda",
            periode: "Juin à Octobre",
            acces: "Route (2h30 de Kigali)",
            conseils: "Le seul parc de savane du Rwanda abritant les 'Big Five'. Profitez d'un safari en bateau sur le lac Ihema pour voir hippos et crocodiles",
            contact: "African Parks Akagera",
            hotel: "Magashi Camp",
            hotelLoc: "Concession privée nord de l'Akagera",
            hotelFonct: "Campement de tentes de luxe surplombant le lac Rwanyakazinga, vision exclusive",
            hotelContact: "Via Wilderness Safaris",
            hotelRestau: "Fine dining africain",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        kivu_beach: {
            titre: "Lac Kivu",
            localisation: "Gisenyi (Rubavu) / Karongi",
            periode: "Toute l'année",
            acces: "Route (3h de Kigali)",
            conseils: "Détente au bord du lac, kayak au coucher du soleil et découverte de la 'Congo Nile Trail'. Visitez les plantations de café sur les îles",
            contact: "Rubavu Tourism Information",
            hotel: "Lake Kivu Serena Hotel",
            hotelLoc: "Gisenyi Plage",
            hotelFonct: "Hôtel 5 étoiles avec jardins tropicaux et piscine face au lac",
            hotelContact: "+250 252 541 100",
            hotelRestau: "The Kiyaga Restaurant",
            guide: "Alice Uwase",
            guideContact: "alice@visitafrika.com"
        },
        kigali_memorial: {
            titre: "Mémorial du Génocide de Kigali",
            localisation: "Gisozi, Kigali",
            periode: "Toute l'année",
            acces: "Taxi ou Moto-taxi",
            conseils: "Lieu de mémoire essentiel pour comprendre l'histoire et la résilience du peuple rwandais. Entrée gratuite, audioguide recommandé",
            contact: "Kigali Genocide Memorial Office",
            hotel: "The Retreat by Heaven",
            hotelLoc: "Kiyovu, Kigali",
            hotelFonct: "Eco-hôtel de luxe avec spa et restaurant réputé, calme absolu en ville",
            hotelContact: "+250 788 486 524",
            hotelRestau: "Heaven Restaurant",
            guide: "Alice Uwase",
            guideContact: "alice@visitafrika.com"
        },
        foret_gishwati: {
            titre: "Forêt de Gishwati-Mukura",
            localisation: "Ouest du Rwanda",
            periode: "Saison sèche",
            acces: "Route vers Rubavu",
            conseils: "Nouveau parc national. Observez les chimpanzés et les singes dorés dans une forêt en pleine régénération",
            contact: "RDB Gishwati",
            hotel: "Forest of Hope Guest House",
            hotelLoc: "Dans la réserve de Gishwati",
            hotelFonct: "Hébergement simple mais immersif pour les amoureux de la nature",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine locale",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        lac_burera: {
            titre: "Lac Burera",
            localisation: "Nord du Rwanda",
            periode: "Toute l'année",
            acces: "Route de Musanze",
            conseils: "Paysage de fjords africains au pied du mont Muhabura. Balade en pirogue traditionnelle",
            contact: "N/A",
            hotel: "Virunga Lodge",
            hotelLoc: "Crête entre Burera et Ruhondo",
            hotelFonct: "L'un des plus beaux panoramas d'Afrique, luxe éco-chic",
            hotelContact: "+250 788 302 069",
            hotelRestau: "Cuisine gastronomique",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        musee_ethnographique: {
            titre: "Musée Ethnographique",
            localisation: "Huye (Sud)",
            periode: "Toute l'année",
            acces: "Route (3h de Kigali)",
            conseils: "Considéré comme l'un des meilleurs musées d'Afrique de l'Est. Découvrez les traditions et l'artisanat rwandais",
            contact: "Institute of National Museums of Rwanda",
            hotel: "Hôtel Credo",
            hotelLoc: "Huye",
            hotelFonct: "Hôtel classique confortable pour une étape au Sud",
            hotelContact: "Sur place",
            hotelRestau: "International",
            guide: "Alice Uwase",
            guideContact: "alice@visitafrika.com"
        },
        palais_royal_nyanza: {
            titre: "Palais Royal de Nyanza",
            localisation: "Nyanza (Sud)",
            periode: "Toute l'année",
            acces: "Route (2h30 de Kigali)",
            conseils: "Reconstitution du palais traditionnel du Mwami (Roi). Admirez les vaches royales 'Inyambo' aux cornes immenses",
            contact: "National Museums of Rwanda",
            hotel: "Heritage Hotel Nyanza",
            hotelLoc: "Nyanza",
            hotelFonct: "Simple et historique",
            hotelContact: "N/A",
            hotelRestau: "Local",
            guide: "Alice Uwase",
            guideContact: "alice@visitafrika.com"
        },
        rubavu: {
            titre: "Rubavu (Gisenyi)",
            localisation: "Bord du Lac Kivu",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Ville thermale avec ses sources d'eau chaude (Amashyuza) et ses brasseries au bord du lac",
            contact: "Rubavu Information",
            hotel: "The Palm Beach Resort",
            hotelLoc: "Rubavu",
            hotelFonct: "Charme tropical et vue lac",
            hotelContact: "Sur place",
            hotelRestau: "Poissons du lac (Isambaza)",
            guide: "Alice Uwase",
            guideContact: "alice@visitafrika.com"
        },
        musanze_caves: {
            titre: "Grottes de Musanze",
            localisation: "Musanze (Nord)",
            periode: "Toute l'année",
            acces: "Court trajet depuis Musanze centre",
            conseils: "Explorez ces tunnels de lave longs de 2km, formés par l'activité volcanique des Virunga",
            contact: "RDB Musanze",
            hotel: "Five Volcanoes Boutique Hotel",
            hotelLoc: "Musanze",
            hotelFonct: "Hôtel de charme confortable, base parfaite pour les activités volcaniques",
            hotelContact: "+250 788 300 000",
            hotelRestau: "International",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        twin_lakes: {
            titre: "Twin Lakes (Burera & Ruhondo)",
            localisation: "District de Burera",
            periode: "Toute l'année",
            acces: "4x4 recommandé",
            conseils: "Point de vue magnifique sur les deux lacs séparés par une langue de terre. Idéal pour la photographie",
            contact: "N/A",
            hotel: "Sabyinyo Silverback Lodge",
            hotelLoc: "Pied des montagnes",
            hotelFonct: "Lodge communautaire de luxe",
            hotelContact: "N/A",
            hotelRestau: "Gastronomie",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        kigali_city_tour: {
            titre: "Kigali City Tour",
            localisation: "Kigali",
            periode: "Toute l'année",
            acces: "Bus touristique ou guide privé",
            conseils: "Découvrez la ville la plus propre d'Afrique : le marché de Kimironko, le village artistique d'Inema et le mont Kigali",
            contact: "Kigali City Council",
            hotel: "Kigali Marriott Hotel",
            hotelLoc: "Nyarugenge, Kigali",
            hotelFonct: "Grand luxe moderne au centre des affaires",
            hotelContact: "+250 222 111 111",
            hotelRestau: "Cucina (Italien)",
            guide: "Alice Uwase",
            guideContact: "alice@visitafrika.com"
        },
        karisoke: {
            titre: "Centre de Karisoke (Dian Fossey)",
            localisation: "Musanze / Parc des Volcans",
            periode: "Saison sèche",
            acces: "Randonnée vigoureuse depuis Musanze",
            conseils: "Pèlerinage vers les ruines du camp de Dian Fossey et sa tombe à côté de celle du gorille Digit",
            contact: "The Dian Fossey Gorilla Fund",
            hotel: "Ellen DeGeneres Campus",
            hotelLoc: "Kinigi",
            hotelFonct: "Centre de recherche et d'éducation (visite uniquement)",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Emmanuel Nsabimana",
            guideContact: "emmanuel@visitafrika.com"
        },
        huye: {
            titre: "Huye (Butare)",
            localisation: "Sud du Rwanda",
            periode: "Toute l'année",
            acces: "Route",
            conseils: "Ville universitaire calme et intellectuelle. Berceau de la culture rwandaise",
            contact: "N/A",
            hotel: "Barthos Hotel",
            hotelLoc: "Huye",
            hotelFonct: "Standard confortable",
            hotelContact: "Sur place",
            hotelRestau: "Buffet local",
            guide: "Alice Uwase",
            guideContact: "alice@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon séjour</h4>
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
                Demande envoyée ! Nos experts rwandais vous contacteront.
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
