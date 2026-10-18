/**
 * PROJET: VISIT AFRIKA
 * FICHIER: capVert.js
 * DESCRIPTION: Script premium pour la page Cap-Vert.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Cap-Vert chargé.");

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
                    // Centrer sur l'archipel du Cap-Vert
                    map = L.map('capvert-map').setView([16.0, -24.0], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Pico do Fogo", lat: 14.95, lng: -24.35 },
                        { name: "Cidade Velha (Santiago)", lat: 14.91, lng: -23.60 },
                        { name: "Mindelo (São Vicente)", lat: 16.89, lng: -24.98 },
                        { name: "Salinas de Pedra de Lume (Sal)", lat: 16.76, lng: -22.89 },
                        { name: "Praia de Chaves (Boa Vista)", lat: 16.14, lng: -22.91 },
                        { name: "Vale do Paul (Santo Antão)", lat: 17.11, lng: -25.02 },
                        { name: "Praia (Capitale)", lat: 14.92, lng: -23.51 },
                        { name: "Tarrafal (Santiago)", lat: 15.27, lng: -23.75 },
                        { name: "Santa Maria (Sal)", lat: 16.59, lng: -22.90 },
                        { name: "Deserto de Viana (Boa Vista)", lat: 16.11, lng: -22.84 },
                        { name: "Baía das Gatas (São Vicente)", lat: 16.90, lng: -24.91 },
                        { name: "Assomada (Santiago)", lat: 15.09, lng: -23.65 },
                        { name: "Ribeira Grande (Santo Antão)", lat: 17.18, lng: -25.07 },
                        { name: "Porto Novo (Santo Antão)", lat: 17.02, lng: -25.06 },
                        { name: "Maio (Île)", lat: 15.20, lng: -23.13 }
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
        fogo: {
            titre: "Pico do Fogo",
            localisation: "Île de Fogo",
            periode: "Toute l'année (sauf éruptions)",
            acces: "Route vers Chã das Caldeiras puis ascension à pied",
            conseils: "Faites l'ascension avec un guide local, dégustez le vin volcanique",
            contact: "Office du Tourisme Fogo",
            hotel: "Casa Marisa",
            hotelLoc: "Chã das Caldeiras",
            hotelFonct: "Immersion totale au pied du volcan",
            hotelContact: "+238 991 23 45",
            hotelRestau: "Cuisine volcanique traditionnelle",
            guide: "Zeca do Fogo",
            guideContact: "zeca@visitafrika.com"
        },
        cidade_velha: {
            titre: "Cidade Velha",
            localisation: "Santiago, 15km de Praia",
            periode: "Toute l'année",
            acces: "Taxi ou bus local (aluguer)",
            conseils: "Patrimoine UNESCO, visitez la Fortaleza Real de San Felipe",
            contact: "Office Culturel Santiago",
            hotel: "Pestana Trópico",
            hotelLoc: "Praia (base)",
            hotelFonct: "Hôtel 4 étoiles bord de mer",
            hotelContact: "+238 261 42 00",
            hotelRestau: "Gastronomie internationale & créole",
            guide: "Isabel Lima",
            guideContact: "isabel@visitafrika.com"
        },
        mindelo: {
            titre: "Mindelo",
            localisation: "Île de São Vicente",
            periode: "Février (Carnaval) ou toute l'année",
            acces: "Aéroport Cesária Évora",
            conseils: "Capitale culturelle, profitez de la musique live au 'Chez Loutcha'",
            contact: "Mairie de Mindelo",
            hotel: "Kira's Boutique Hotel",
            hotelLoc: "Mindelo, Centre historique",
            hotelFonct: "Charme, calme et service personnalisé",
            hotelContact: "+238 232 40 10",
            hotelRestau: "Petit-déjeuner local",
            guide: "Manel de São Vicente",
            guideContact: "manel@visitafrika.com"
        },
        pedra_lume: {
            titre: "Salinas de Pedra de Lume",
            localisation: "Île de Sal, Est",
            periode: "Toute l'année",
            acces: "Route bitumée (Taxi)",
            conseils: "Flottez dans les eaux salées au milieu d'un cratère volcanique",
            contact: "Salines de Sal",
            hotel: "Hilton Cabo Verde Sal Resort",
            hotelLoc: "Santa Maria, Sal",
            hotelFonct: "Luxe, plage, spa",
            hotelContact: "+238 334 44 44",
            hotelRestau: "Buffets d'exception",
            guide: "N/A",
            guideContact: "N/A"
        },
        chaves: {
            titre: "Praia de Chaves",
            localisation: "Île de Boa Vista",
            periode: "Toute l'année",
            acces: "Route ou marche depuis Sal Rei",
            conseils: "Dunes de sable blanc plongeant dans l'océan turquoise",
            contact: "Tourisme Boa Vista",
            hotel: "Iberostar Club Boa Vista",
            hotelLoc: "Praia de Chaves",
            hotelFonct: "Tout inclus haut de gamme",
            hotelContact: "+238 251 21 70",
            hotelRestau: "Tout compris",
            guide: "N/A",
            guideContact: "N/A"
        },
        paul: {
            titre: "Vale do Paul",
            localisation: "Île de Santo Antão",
            periode: "Toute l'année (très vert après les pluies)",
            acces: "Ferry depuis Mindelo puis route",
            conseils: "Le paradis des randonneurs, cascades et plantations de canne",
            contact: "Association des Guides de Paul",
            hotel: "Cabo de Ribeira",
            hotelLoc: "Haute vallée du Paul",
            hotelFonct: "Ecolodge en pleine montagne",
            hotelContact: "Sur place",
            hotelRestau: "Produits de la vallée",
            guide: "Nelson Rando",
            guideContact: "nelson@visitafrika.com"
        },
        praia: {
            titre: "Praia",
            localisation: "Santiago, Sud",
            periode: "Toute l'année",
            acces: "Aéroport Nelson Mandela",
            conseils: "Visitez le quartier du Plateau pour son architecture coloniale",
            contact: "Mairie de Praia",
            hotel: "Hotel Oasis Atlantico",
            hotelLoc: "Prainha, Praia",
            hotelFonct: "Business & Loisirs",
            hotelContact: "+238 261 30 61",
            hotelRestau: "Cuisine variée",
            guide: "Isabel Lima",
            guideContact: "isabel@visitafrika.com"
        },
        tarrafal: {
            titre: "Tarrafal",
            localisation: "Santiago, Nord",
            periode: "Toute l'année",
            acces: "Route RN1 (2h depuis Praia)",
            conseils: "La plus belle plage de sable blanc de Santiago, entourée de montagnes",
            contact: "Communauté de Tarrafal",
            hotel: "King Fisher Village",
            hotelLoc: "Bord de mer, Tarrafal",
            hotelFonct: "Chic, épuré, spécialisé plongée",
            hotelContact: "+238 266 19 21",
            hotelRestau: "Cuisine fusion",
            guide: "Dany Tarrafal",
            guideContact: "dany@visitafrika.com"
        },
        santa_maria: {
            titre: "Santa Maria",
            localisation: "Île de Sal, Sud",
            periode: "Toute l'année",
            acces: "Route directe depuis l'aéroport",
            conseils: "Observez le retour des pêcheurs sur le ponton chaque midi",
            contact: "Mairie de Sal",
            hotel: "Hotel Odjo d'Agua",
            hotelLoc: "Santa Maria",
            hotelFonct: "Hôtel de tradition au bord de l'eau",
            hotelContact: "+238 242 14 14",
            hotelRestau: "Spécialités de poisson",
            guide: "N/A",
            guideContact: "N/A"
        },
        viana: {
            titre: "Deserto de Viana",
            localisation: "Boa Vista, Intérieur",
            periode: "Toute l'année",
            acces: "4x4 obligatoire",
            conseils: "Un petit bout de Sahara au milieu de l'Atlantique",
            contact: "Excursions Boa Vista",
            hotel: "Hotel Riu Karamboa",
            hotelLoc: "Praia de Salines",
            hotelFonct: "Palace tout inclus",
            hotelContact: "+238 251 24 40",
            hotelRestau: "Gastronomie mondiale",
            guide: "Beto Boa Vista",
            guideContact: "beto@visitafrika.com"
        },
        baia_gatas: {
            titre: "Baía das Gatas",
            localisation: "São Vicente, Est",
            periode: "Août (Festival de Musique)",
            acces: "Route depuis Mindelo",
            conseils: "Lagon naturel calme, idéal pour nager en famille",
            contact: "Mairie de Mindelo",
            hotel: "Foya Branca Hotel",
            hotelLoc: "São Pedro (proche)",
            hotelFonct: "Grand resort face à la mer",
            hotelContact: "+238 230 74 00",
            hotelRestau: "Brasserie méditerranéenne",
            guide: "N/A",
            guideContact: "N/A"
        },
        assomada: {
            titre: "Assomada",
            localisation: "Santiago, Centre",
            periode: "Mercredi et Samedi (Marché)",
            acces: "Route RN1",
            conseils: "Visitez le marché traditionnel, le plus grand de l'archipel",
            contact: "Mairie de Santa Catarina",
            hotel: "Pousada Quinta da Montanha",
            hotelLoc: "Rui Vaz (proche)",
            hotelFonct: "Hôtel de montagne avec vue",
            hotelContact: "+238 261 11 01",
            hotelRestau: "Cuisine terrienne Santiago",
            guide: "Isabel Lima",
            guideContact: "isabel@visitafrika.com"
        },
        ribeira_grande: {
            titre: "Ribeira Grande",
            localisation: "Santo Antão, Nord",
            periode: "Toute l'année",
            acces: "Route spectaculaire (Corda)",
            conseils: "Village pittoresque niché entre les falaises et l'océan",
            contact: "Office Tourisme Santo Antão",
            hotel: "Pedracin Village",
            hotelLoc: "Boca de Coruja",
            hotelFonct: "Architecture traditionnelle, superbe piscine",
            hotelContact: "+238 223 20 20",
            hotelRestau: "Plats locaux généreux",
            guide: "Nelson Rando",
            guideContact: "nelson@visitafrika.com"
        },
        porto_novo: {
            titre: "Porto Novo",
            localisation: "Santo Antão, Sud",
            periode: "Toute l'année",
            acces: "Arrivée du Ferry",
            conseils: "Point d'entrée de l'île, point de départ des tours en 4x4",
            contact: "Port de Porto Novo",
            hotel: "Santantao Art Resort",
            hotelLoc: "Porto Novo",
            hotelFonct: "Moderne, face à la mer",
            hotelContact: "+238 222 30 00",
            hotelRestau: "Fusion créole",
            guide: "Nelson Rando",
            guideContact: "nelson@visitafrika.com"
        },
        maio: {
            titre: "Île de Maio",
            localisation: "Est de Santiago",
            periode: "Toute l'année",
            acces: "Vol (10 min) ou bateau depuis Praia",
            conseils: "L'île de la tranquillité absolue, plages désertes",
            contact: "Mairie de Vila do Maio",
            hotel: "Stella Maris",
            hotelLoc: "Vila do Maio",
            hotelFonct: "Bungalows fleuris au bord de la mer",
            hotelContact: "+238 255 10 01",
            hotelRestau: "Cuisine locale simple et fraîche",
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
                        <input type="number" name="personnes" min="1" max="20" value="1" required>
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
                Demande envoyée ! Nos experts capverdiens vous contacteront.
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
