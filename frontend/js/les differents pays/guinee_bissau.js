/**
 * PROJET: VISIT AFRIKA
 * FICHIER: guinee_bissau.js
 * DESCRIPTION: Script premium pour la page Guinée-Bissau.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Guinée-Bissau chargé.");

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
                    // Centrer sur la Guinée-Bissau
                    map = L.map('guineebissau-map').setView([11.8632, -15.5977], 8);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Archipel des Bijagós", lat: 11.25, lng: -15.90 },
                        { name: "Île de Bubaque", lat: 11.29, lng: -15.83 },
                        { name: "Parc d'Orango (Hippopotames)", lat: 11.15, lng: -16.20 },
                        { name: "Plage de Varela", lat: 12.28, lng: -16.58 },
                        { name: "Bissau Velha (Capitale)", lat: 11.85, lng: -15.58 },
                        { name: "Parc de Cantanhez", lat: 11.20, lng: -15.00 },
                        { name: "Chutes de Saltinho", lat: 11.72, lng: -14.65 },
                        { name: "Île de Bolama", lat: 11.58, lng: -15.48 },
                        { name: "Quinhamel", lat: 11.89, lng: -15.85 },
                        { name: "Île de Rubane", lat: 11.31, lng: -15.82 },
                        { name: "Parc Joao Vieira", lat: 10.90, lng: -15.65 },
                        { name: "Cacheu (Histoire)", lat: 12.27, lng: -16.16 },
                        { name: "Bafatá (Ville coloniale)", lat: 12.17, lng: -14.65 },
                        { name: "Gabú (Commerce)", lat: 12.28, lng: -14.21 },
                        { name: "Farim", lat: 12.48, lng: -15.22 }
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
        bijagos: {
            titre: "Archipel des Bijagós",
            localisation: "Océan Atlantique (88 îles)",
            periode: "Novembre à Mai (Saison sèche)",
            acces: "Bateau depuis Bissau (2h à 5h selon l'île)",
            conseils: "Réserve de biosphère UNESCO, respectez les traditions sacrées locales",
            contact: "Direction Générale du Tourisme",
            hotel: "Pontamari",
            hotelLoc: "Île de Rubane",
            hotelFonct: "Hôtel de charme sur plage paradisiaque",
            hotelContact: "+245 966 610 610",
            hotelRestau: "Fruits de mer et spécialités locales",
            guide: "Carlos Mendy",
            guideContact: "carlos@visitafrika.com"
        },
        bubaque: {
            titre: "Île de Bubaque",
            localisation: "Cœur des Bijagós",
            periode: "Toute l'année (Surtout Carnaval en fév/mars)",
            acces: "Bateau régulier ou rapide depuis Bissau",
            conseils: "L'île la plus animée, louez un vélo pour explorer les plages du Sud",
            contact: "Mairie de Bubaque",
            hotel: "Kasa Afrikana",
            hotelLoc: "Bubaque Port",
            hotelFonct: "Confortable, style africain moderne",
            hotelContact: "+245 955 801 801",
            hotelRestau: "Cuisine fusion",
            guide: "Carlos Mendy",
            guideContact: "carlos@visitafrika.com"
        },
        orango: {
            titre: "Parc National d'Orango",
            localisation: "Île d'Orango (Bijagós Sud)",
            periode: "Octobre à Janvier pour voir les hippos",
            acces: "Bateau privé (Expédition)",
            conseils: "Observation unique des hippopotames marins, guide obligatoire",
            contact: "Institut de la Biodiversité (IBAP)",
            hotel: "Orango Parque Hotel",
            hotelLoc: "Sur l'île d'Orango",
            hotelFonct: "Ecolodge géré en partenariat avec le parc",
            hotelContact: "+245 966 112 112",
            hotelRestau: "Gastronomie éco-responsable",
            guide: "Ranger du parc Orango",
            guideContact: "Inclus"
        },
        varela: {
            titre: "Plage de Varela",
            localisation: "Nord du pays (Frontière Sénégal)",
            periode: "Novembre à Avril",
            acces: "Piste depuis São Domingos (4x4 conseillé)",
            conseils: "Plages vierges et falaises ocres, l'endroit le plus paisible du continent",
            contact: "Office du Tourisme Nord",
            hotel: "Apart-Hotel Varela",
            hotelLoc: "Bord de mer",
            hotelFonct: "Simple, authentique, vue mer",
            hotelContact: "Sur place",
            hotelRestau: "Poisson grillé au feu de bois",
            guide: "N/A",
            guideContact: "N/A"
        },
        bissau_velha: {
            titre: "Bissau Velha",
            localisation: "Bissau (Centre historique)",
            periode: "Toute l'année",
            acces: "Cœur de la capitale",
            conseils: "Déambulez dans les rues pavées aux maisons coloniales colorées",
            contact: "Mairie de Bissau",
            hotel: "Ledger Plaza Bissau",
            hotelLoc: "Bissau",
            hotelFonct: "Grand hôtel de luxe, piscine",
            hotelContact: "+245 325 35 35",
            hotelRestau: "Restaurant international",
            guide: "Maria Gomes",
            guideContact: "maria@visitafrika.com"
        },
        parc_cantanhez: {
            titre: "Parc National de Cantanhez",
            localisation: "Sud du pays (Jemberem)",
            periode: "Novembre à Mai",
            acces: "Route du Sud (Longue piste)",
            conseils: "Dernière forêt primaire, observez les chimpanzés dans leur habitat naturel",
            contact: "IBAP Jemberem",
            hotel: "Campement de Jemberem",
            hotelLoc: "Jemberem",
            hotelFonct: "Bungalows communautaires simples",
            hotelContact: "Sur place",
            hotelRestau: "Plats locaux riz et poisson",
            guide: "Guide spécialisé Chimpanzés",
            guideContact: "Inclus dans la visite"
        },
        saltinho: {
            titre: "Chutes de Saltinho",
            localisation: "Rivière Corubal",
            periode: "Saison des pluies (Spectaculaire) ou Janvier",
            acces: "Route vers le Sud-Est",
            conseils: "Pont historique et cascades, idéal pour une halte rafraîchissante",
            contact: "N/A",
            hotel: "Pousada de Saltinho",
            hotelLoc: "Surplombant les chutes",
            hotelFonct: "Hôtel de passage historique",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine de rivière",
            guide: "N/A",
            guideContact: "N/A"
        },
        bolama: {
            titre: "Île de Bolama",
            localisation: "Près de Bissau",
            periode: "Toute l'année",
            acces: "Pirogue depuis Bissau (1h)",
            conseils: "Ancienne capitale abandonnée, atmosphère mélancolique et architecture coloniale en ruines",
            contact: "Mairie de Bolama",
            hotel: "Bungalows de Bolama",
            hotelLoc: "Vila de Bolama",
            hotelFonct: "Logement chez l'habitant ou petit campement",
            hotelContact: "Sur place",
            hotelRestau: "Poisson local",
            guide: "Maria Gomes",
            guideContact: "maria@visitafrika.com"
        },
        quinhamel: {
            titre: "Quinhamel",
            localisation: "Région de Biombo",
            periode: "Toute l'année",
            acces: "Route bitumée (45 min de Bissau)",
            conseils: "Célèbre pour son artisanat du tissage et ses huîtres de mangrove",
            contact: "Office local de Biombo",
            hotel: "Hôtel Mar Azul",
            hotelLoc: "Quinhamel",
            hotelFonct: "Hôtel calme face au fleuve Mansoa",
            hotelContact: "+245 966 642 000",
            hotelRestau: "Spécialités de mer",
            guide: "Maria Gomes",
            guideContact: "maria@visitafrika.com"
        },
        rubane: {
            titre: "Île de Rubane",
            localisation: "Bijagós (Face à Bubaque)",
            periode: "Toute l'année",
            acces: "Bateau privé",
            conseils: "La plus belle plage de l'archipel central, paradis de la pêche sportive",
            contact: "Hôtels de Rubane",
            hotel: "Pontamari",
            hotelLoc: "Rubane",
            hotelFonct: "Luxe tropical",
            hotelContact: "+245 966 610 610",
            hotelRestau: "Gastronomie fine",
            guide: "Carlos Mendy",
            guideContact: "carlos@visitafrika.com"
        },
        joao_vieira: {
            titre: "Parc National Joao Vieira-Poilao",
            localisation: "Extrême Sud des Bijagós",
            periode: "Novembre à Janvier",
            acces: "Expédition organisée (Bateau)",
            conseils: "Site sacré de ponte pour les tortues marines, accès très réglementé",
            contact: "IBAP Bissau",
            hotel: "N/A (Campement temporaire)",
            hotelLoc: "Sur les îles",
            hotelFonct: "Bivouac respectueux",
            hotelContact: "Via IBAP",
            hotelRestau: "N/A",
            guide: "Expert IBAP",
            guideContact: "Obligatoire"
        },
        cacheu: {
            titre: "Cacheu",
            localisation: "Nord-Ouest",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Visitez le fort historique et le musée mémorial de l'esclavage",
            contact: "Mairie de Cacheu",
            hotel: "Hôtels de Bissau (Transit)",
            hotelLoc: "Bissau",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale du fleuve",
            guide: "N/A",
            guideContact: "N/A"
        },
        bafata: {
            titre: "Bafatá",
            localisation: "Centre du pays",
            periode: "Toute l'année",
            acces: "Route bitumée MR1",
            conseils: "Ville de briques rouges, ville natale d'Amílcar Cabral",
            contact: "Bureau régional",
            hotel: "Apart-Hotel Bafatá",
            hotelLoc: "Bafatá Centre",
            hotelFonct: "Simple et central",
            hotelContact: "Sur place",
            hotelRestau: "Plats typiques",
            guide: "N/A",
            guideContact: "N/A"
        },
        gabu: {
            titre: "Gabú",
            localisation: "Est du pays",
            periode: "Toute l'année",
            acces: "Route bitumée",
            conseils: "Grand carrefour commercial Mandingue et Peulh",
            contact: "N/A",
            hotel: "Hôtels locaux",
            hotelLoc: "Gabú",
            hotelFonct: "Basique",
            hotelContact: "N/A",
            hotelRestau: "Marché local",
            guide: "N/A",
            guideContact: "N/A"
        },
        farim: {
            titre: "Farim",
            localisation: "Nord, sur le fleuve Cacheu",
            periode: "Saison sèche",
            acces: "Route",
            conseils: "Ville paisible en bord de fleuve, connue pour son calme",
            contact: "N/A",
            hotel: "N/A",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser ma visite</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="15" value="1" required>
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
                Demande envoyée ! Nos experts bissau-guinéens vous contacteront.
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
