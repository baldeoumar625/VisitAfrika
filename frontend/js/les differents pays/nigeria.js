/**
 * PROJET: VISIT AFRIKA
 * FICHIER: nigeria.js
 * DESCRIPTION: Script premium pour le Nigéria.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Nigéria chargé.");

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
                    // Centrer sur le Nigéria
                    map = L.map('nigeria-map').setView([9.0820, 8.6753], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Lagos Island", lat: 6.45, lng: 3.40 },
                        { name: "Zuma Rock (Abuja)", lat: 9.13, lng: 7.23 },
                        { name: "Obudu Mountain Resort", lat: 6.55, lng: 9.38 },
                        { name: "Forêt d'Osun-Osogbo", lat: 7.75, lng: 4.55 },
                        { name: "Palais de l'Émir de Kano", lat: 12.00, lng: 8.52 },
                        { name: "Olumo Rock", lat: 7.16, lng: 3.35 },
                        { name: "Réserve de Yankari", lat: 9.75, lng: 10.51 },
                        { name: "Collines d'Idanre", lat: 7.11, lng: 5.10 },
                        { name: "Lekki Conservation Centre", lat: 6.44, lng: 3.53 },
                        { name: "Parc National de Cross River", lat: 5.42, lng: 8.81 },
                        { name: "Parc Gashaka-Gumti", lat: 7.35, lng: 11.54 },
                        { name: "Parc National de Kamuku", lat: 10.82, lng: 6.18 },
                        { name: "Parc National d'Okomu", lat: 6.42, lng: 5.25 },
                        { name: "Calabar (Capitale du tourisme)", lat: 4.95, lng: 8.33 },
                        { name: "Ibadan", lat: 7.37, lng: 3.94 }
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
        lagos_island: {
            titre: "Lagos Island",
            localisation: "Lagos (État de Lagos)",
            periode: "Novembre à Mars (Harmattan, moins humide)",
            acces: "Aéroport international Murtala Muhammed (LOS) puis taxi/uber",
            conseils: "Cœur historique et financier. Visitez le Freedom Park et le marché de Balogun pour une immersion totale",
            contact: "Lagos State Tourism Board",
            hotel: "The Wheatbaker Lagos",
            hotelLoc: "Ikoyi, Lagos",
            hotelFonct: "Hôtel de luxe boutique, référence pour l'art et le confort à Lagos",
            hotelContact: "+234 1 277 3560",
            hotelRestau: "Saraya Deli",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        abuja_zuma: {
            titre: "Zuma Rock",
            localisation: "Près d'Abuja (État de Niger)",
            periode: "Toute l'année",
            acces: "Route depuis Abuja (45 min)",
            conseils: "Le 'Monolithe avec un visage'. Impressionnant au coucher du soleil. Respectez les légendes locales entourant le rocher",
            contact: "FCT Tourism Department",
            hotel: "Transcorp Hilton Abuja",
            hotelLoc: "Maitama, Abuja",
            hotelFonct: "Le plus grand hôtel de luxe d'Abuja, centre de la vie diplomatique",
            hotelContact: "+234 9 461 3000",
            hotelRestau: "Zuma Grill",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        obudu: {
            titre: "Obudu Mountain Resort",
            localisation: "Plateau d'Obanliku (Cross River)",
            periode: "Octobre à Février",
            acces: "Route depuis Calabar ou vol charter",
            conseils: "Prenez le téléphérique le plus long d'Afrique pour monter au sommet. Climat tempéré exceptionnel au Nigéria",
            contact: "Obudu Resort Management",
            hotel: "Obudu Mountain Resort Lodges",
            hotelLoc: "Sommet du plateau",
            hotelFonct: "Style chalet de montagne, calme et vue panoramique sur les nuages",
            hotelContact: "+234 803 550 5510",
            hotelRestau: "Cuisine locale et continentale",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        osun_osogbo: {
            titre: "Forêt Sacrée d'Osun-Osogbo",
            localisation: "Osogbo (État d'Osun)",
            periode: "Août (Festival annuel d'Osun Osogbo)",
            acces: "Route (3-4h de Lagos)",
            conseils: "Site UNESCO. Un mélange mystique d'art yoruba contemporain et de nature sacrée. Ne manquez pas les sculptures de Susanne Wenger",
            contact: "National Commission for Museums and Monuments",
            hotel: "Ideal Nest Hotel",
            hotelLoc: "Osogbo",
            hotelFonct: "Hôtel moderne et confortable pour une escale culturelle",
            hotelContact: "+234 803 358 1111",
            hotelRestau: "Plats traditionnels Yoruba",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        kano_emir: {
            titre: "Palais de l'Émir de Kano",
            localisation: "Vieille ville de Kano",
            periode: "Fêtes de l'Aïd (Festival de Durbar)",
            acces: "Vol vers Kano ou route",
            conseils: "Chef-d'œuvre de l'architecture soudano-sahélienne. Assistez au Durbar pour voir les parades de chevaux richement décorés",
            contact: "Kano State Tourism Board",
            hotel: "Prince Hotel Kano",
            hotelLoc: "Nassarawa GRA, Kano",
            hotelFonct: "Hôtel élégant offrant un service de qualité au Nord",
            hotelContact: "+234 64 639 999",
            hotelRestau: "International et Haoussa",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        olumo_rock: {
            titre: "Olumo Rock",
            localisation: "Abeokuta (État d'Ogun)",
            periode: "Saison sèche",
            acces: "Route (1h30 de Lagos)",
            conseils: "Symbole de résilience des Egbas. Utilisez l'ascenseur ou les escaliers historiques creusés dans la roche",
            contact: "Ogun State Tourism",
            hotel: "Park Inn by Radisson Abeokuta",
            hotelLoc: "Abeokuta",
            hotelFonct: "Hôtel moderne avec vue sur la ville et le rocher",
            hotelContact: "+234 813 411 1111",
            hotelRestau: "Buffet nigérian",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        yankari: {
            titre: "Réserve de Yankari",
            localisation: "État de Bauchi",
            periode: "Décembre à Avril",
            acces: "Route depuis Bauchi",
            conseils: "Baignez-vous dans les eaux cristallines de la source Wikki Warm Spring après votre safari",
            contact: "Yankari Game Reserve Admin",
            hotel: "Wikki Camp",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Hébergement simple mais idéalement situé près des sources",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine de brousse",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        idanre_hills: {
            titre: "Collines d'Idanre",
            localisation: "Idanre (État d'Ondo)",
            periode: "Octobre à Mars",
            acces: "Route depuis Akure",
            conseils: "Grimpez les 682 marches pour atteindre le village historique perché. Paysage mystique et panoramique",
            contact: "Ondo State Tourism Bureau",
            hotel: "Sunview Hotel",
            hotelLoc: "Akure (proximité)",
            hotelFonct: "Hôtel de luxe standard pour rayonner dans l'État",
            hotelContact: "+234 803 333 3333",
            hotelRestau: "Cuisine locale Ondo",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        lekki_conservation: {
            titre: "Lekki Conservation Centre",
            localisation: "Lekki, Lagos",
            periode: "Toute l'année",
            acces: "Taxi/Uber",
            conseils: "Empruntez le plus long 'Canopy Walk' d'Afrique. Une oasis de nature au milieu de la métropole géante",
            contact: "NCF (Nigerian Conservation Foundation)",
            hotel: "Eko Hotels & Suites",
            hotelLoc: "Victoria Island, Lagos",
            hotelFonct: "L'hôtel le plus emblématique de Lagos pour les événements et le luxe",
            hotelContact: "+234 1 277 2700",
            hotelRestau: "8 restaurants thématiques",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        parc_cross_river: {
            titre: "Parc National de Cross River",
            localisation: "État de Cross River",
            periode: "Novembre à Mars",
            acces: "Route depuis Calabar",
            conseils: "Dernière forêt tropicale primaire du Nigéria. Sanctuaire pour les gorilles de la rivière Cross",
            contact: "Nigeria National Park Service",
            hotel: "Transcorp Hotels Calabar",
            hotelLoc: "Calabar",
            hotelFonct: "Le meilleur hôtel de la région Sud-Sud",
            hotelContact: "+234 803 900 3000",
            hotelRestau: "Spécialités de Calabar (Edikang Ikong)",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        parc_gashaka_gumti: {
            titre: "Parc Gashaka-Gumti",
            localisation: "États de Taraba & Adamawa",
            periode: "Saison sèche",
            acces: "4x4 uniquement",
            conseils: "Plus grand parc national du Nigéria. Idéal pour le trekking vers le mont Gangirwal, le point culminant du pays",
            contact: "Gashaka Gumti NP Office",
            hotel: "Camps de base de Serti",
            hotelLoc: "Serti",
            hotelFonct: "Aventure et immersion",
            hotelContact: "Sur place",
            hotelRestau: "N/A",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        parc_kamuku: {
            titre: "Parc National de Kamuku",
            localisation: "État de Kaduna",
            periode: "Novembre à Avril",
            acces: "Route depuis Kaduna",
            conseils: "Savane riche en oiseaux et en petits mammifères. Très calme",
            contact: "National Park Service Kaduna",
            hotel: "Hamdala Hotel Kaduna",
            hotelLoc: "Kaduna Centre",
            hotelFonct: "Hôtel classique de référence",
            hotelContact: "Sur place",
            hotelRestau: "International",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        parc_oinu: {
            titre: "Parc National d'Okomu",
            localisation: "État d'Edo",
            periode: "Saison sèche",
            acces: "Route depuis Benin City",
            conseils: "Refuge pour l'éléphant de forêt et le singe à gorge blanche. Plateforme d'observation des arbres spectaculaire",
            contact: "Okomu National Park Service",
            hotel: "Best Western Homeville",
            hotelLoc: "Benin City",
            hotelFonct: "Standard international de confort",
            hotelContact: "+234 52 250 500",
            hotelRestau: "Local Edo",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        calabar: {
            titre: "Calabar",
            localisation: "État de Cross River",
            periode: "Décembre (Carnaval de Calabar)",
            acces: "Aéroport Margaret Ekpo (CBQ)",
            conseils: "La ville la plus propre et la plus touristique du Nigéria. Visitez le Slave History Museum",
            contact: "Cross River State Tourism",
            hotel: "Transcorp Hotels Calabar",
            hotelLoc: "Calabar",
            hotelFonct: "Excellence de service en zone côtière",
            hotelContact: "+234 803 900 3000",
            hotelRestau: "Oriental & African",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
        },
        ibadan: {
            titre: "Ibadan",
            localisation: "État d'Oyo",
            periode: "Toute l'année",
            acces: "Train moderne depuis Lagos ou Route",
            conseils: "Plus grande ville par superficie en Afrique de l'Ouest. Visitez la Bower's Tower et l'Université d'Ibadan",
            contact: "Oyo State Tourism",
            hotel: "Golden Tulip Ibadan",
            hotelLoc: "Jericho, Ibadan",
            hotelFonct: "Hôtel moderne et sécurisé, idéal pour le business ou le loisir",
            hotelContact: "+234 2 201 0000",
            hotelRestau: "Gastronomie nigériane raffinée",
            guide: "Chidi Okafor",
            guideContact: "chidi@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon séjour</h4>
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
                Demande envoyée ! Nos experts nigérians vous contacteront.
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
