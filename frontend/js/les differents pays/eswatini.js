/**
 * PROJET: VISIT AFRIKA
 * FICHIER: eswatini.js
 * DESCRIPTION: Script premium pour la page Eswatini.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Eswatini chargé.");

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
                    // Centrer sur l'Eswatini
                    map = L.map('eswatini-map').setView([-26.5225, 31.4659], 9);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc Royal Hlane", lat: -26.25, lng: 31.88 },
                        { name: "Réserve de Mlilwane", lat: -26.48, lng: 31.18 },
                        { name: "Village de Mantenga", lat: -26.44, lng: 31.17 },
                        { name: "Vallée d'Ezulwini", lat: -26.41, lng: 31.18 },
                        { name: "Réserve de Mkhaya", lat: -26.65, lng: 31.75 },
                        { name: "Barrage de Maguga", lat: -25.95, lng: 31.25 },
                        { name: "Piggs Peak", lat: -25.96, lng: 31.25 },
                        { name: "Mbabane (Capitale)", lat: -26.31, lng: 31.14 },
                        { name: "Lobamba (Capitale Royale)", lat: -26.45, lng: 31.20 },
                        { name: "Réserve de Malolotja", lat: -26.15, lng: 31.12 },
                        { name: "Mine de Ngwenya", lat: -26.20, lng: 31.03 },
                        { name: "Réserve de Shewula", lat: -26.15, lng: 32.02 },
                        { name: "Réserve de Mlawula", lat: -26.18, lng: 32.01 },
                        { name: "Chutes de Phophonyane", lat: -25.90, lng: 31.28 },
                        { name: "Manzini", lat: -26.49, lng: 31.37 }
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
        hlane: {
            titre: "Hlane Royal National Park",
            localisation: "Est de l'Eswatini",
            periode: "Saison sèche (Mai à Septembre)",
            acces: "Route bitumée (MR3), accessible en voiture citadine",
            conseils: "Dormez au Ndlovu Camp pour voir les rhinocéros s'abreuver juste devant votre terrasse",
            contact: "Big Game Parks Eswatini",
            hotel: "Ndlovu Camp (Hlane)",
            hotelLoc: "Dans le parc",
            hotelFonct: "Bungalows traditionnels sans électricité (lanterne)",
            hotelContact: "+268 2528 3943",
            hotelRestau: "Cuisine locale au feu de bois",
            guide: "Thulani Dlamini",
            guideContact: "thulani@visitafrika.com"
        },
        mlilwane: {
            titre: "Mlilwane Wildlife Sanctuary",
            localisation: "Vallée d'Ezulwini",
            periode: "Toute l'année",
            acces: "Route MR27, proche de Mbabane",
            conseils: "Parfait pour le VTT et la randonnée car il n'y a pas de prédateurs dangereux",
            contact: "Big Game Parks Mlilwane",
            hotel: "Reilly's Rock Hilltop Lodge",
            hotelLoc: "Mlilwane",
            hotelFonct: "Hôtel de luxe historique, jardins botaniques",
            hotelContact: "+268 2528 3943",
            hotelRestau: "Gastronomie raffinée",
            guide: "Thulani Dlamini",
            guideContact: "thulani@visitafrika.com"
        },
        mantenga: {
            titre: "Village Culturel de Mantenga",
            localisation: "Ezulwini",
            periode: "Toute l'année (Spectacles à 11h et 15h)",
            acces: "Route bitumée",
            conseils: "Ne manquez pas la danse traditionnelle Sibhaca et la cascade de Mantenga juste à côté",
            contact: "Eswatini National Trust Commission",
            hotel: "Mantenga Lodge",
            hotelLoc: "Ezulwini",
            hotelFonct: "Chambres confortables avec vue sur Executive Rock",
            hotelContact: "+268 2416 1133",
            hotelRestau: "Cuisine internationale et locale",
            guide: "Zama Mamba",
            guideContact: "zama@visitafrika.com"
        },
        ezulwini: {
            titre: "Vallée d'Ezulwini",
            localisation: "Entre Mbabane et Manzini",
            periode: "Toute l'année",
            acces: "Route MR3",
            conseils: "La 'Vallée du Paradis', centre touristique avec marchés artisanaux et casinos",
            contact: "Tourism Authority Eswatini",
            hotel: "Royal Swazi Spa",
            hotelLoc: "Ezulwini",
            hotelFonct: "Hôtel mythique, spa et golf",
            hotelContact: "+268 2416 5000",
            hotelRestau: "Plusieurs restaurants de luxe",
            guide: "N/A",
            guideContact: "N/A"
        },
        mkhaya: {
            titre: "Mkhaya Game Reserve",
            localisation: "Sud-Est",
            periode: "Saison sèche",
            acces: "Rendez-vous à Phuzamoya (Transfert obligatoire)",
            conseils: "Le sanctuaire des rhinocéros noirs et blancs, immersion totale garantie",
            contact: "Big Game Parks Mkhaya",
            hotel: "Stone Camp",
            hotelLoc: "Mkhaya",
            hotelFonct: "Cottages en pierre ouverts sur la nature",
            hotelContact: "+268 2528 3943",
            hotelRestau: "Dîner aux chandelles en brousse",
            guide: "Thulani Dlamini",
            guideContact: "thulani@visitafrika.com"
        },
        maguga: {
            titre: "Barrage de Maguga",
            localisation: "Près de Piggs Peak",
            periode: "Toute l'année",
            acces: "Route MR1",
            conseils: "Le plus haut barrage du pays, admirez les peintures rupestres à proximité",
            contact: "Maguga Dam Tourism",
            hotel: "Maguga Lodge",
            hotelLoc: "Surplombant le barrage",
            hotelFonct: "Chambres et chalets avec vue lac",
            hotelContact: "+268 2437 1975",
            hotelRestau: "Restaurant panoramique",
            guide: "N/A",
            guideContact: "N/A"
        },
        piggs_peak: {
            titre: "Piggs Peak",
            localisation: "Hauts plateaux du Nord",
            periode: "Printemps et Été",
            acces: "Route MR1",
            conseils: "Ancienne ville minière entourée de forêts de pins géantes",
            contact: "Office local",
            hotel: "Piggs Peak Hotel & Casino",
            hotelLoc: "Piggs Peak",
            hotelFonct: "Grand hôtel classique avec vue montagne",
            hotelContact: "+268 2437 1104",
            hotelRestau: "Buffets variés",
            guide: "N/A",
            guideContact: "N/A"
        },
        mbabane: {
            titre: "Mbabane",
            localisation: "Hauts plateaux",
            periode: "Toute l'année",
            acces: "Capitale administrative",
            conseils: "Profitez de la fraîcheur du climat et visitez le Swazi Plaza",
            contact: "Mairie de Mbabane",
            hotel: "Hilton Garden Inn Mbabane",
            hotelLoc: "Centre-ville",
            hotelFonct: "Moderne et central",
            hotelContact: "+268 2409 2200",
            hotelRestau: "Cuisine contemporaine",
            guide: "Zama Mamba",
            guideContact: "zama@visitafrika.com"
        },
        lobamba: {
            titre: "Lobamba",
            localisation: "Vallée d'Ezulwini",
            periode: "Décembre (Incwala) ou Août (Umhlanga)",
            acces: "Route MR3",
            conseils: "Le cœur spirituel et législatif, visitez le Musée National et le Parlement",
            contact: "National Museum",
            hotel: "Happy Valley Hotel",
            hotelLoc: "Ezulwini (proche)",
            hotelFonct: "Confort et animations",
            hotelContact: "+268 2416 1199",
            hotelRestau: "Restaurant de qualité",
            guide: "Zama Mamba",
            guideContact: "zama@visitafrika.com"
        },
        malolotja: {
            titre: "Malolotja Nature Reserve",
            localisation: "Nord-Ouest",
            periode: "Saison sèche pour le trek",
            acces: "Route MR1 (4x4 non obligatoire mais conseillé en interne)",
            conseils: "Tentez le Canopy Tour (tyrolienne) pour des sensations fortes en forêt",
            contact: "ENTC Malolotja",
            hotel: "Log Cabins Malolotja",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Chalets en bois confortables",
            hotelContact: "+268 2444 2423",
            hotelRestau: "Restaurant self-catering ou snack",
            guide: "Bhekisisa Guide",
            guideContact: "bhekisisa@visitafrika.com"
        },
        ngwenya: {
            titre: "Mine de Ngwenya",
            localisation: "Frontière Ouest",
            periode: "Toute l'année",
            acces: "Près du poste frontière d'Oshoek",
            conseils: "La plus vieille mine du monde (ocre rouge), visitez aussi l'usine de verre soufflé Ngwenya Glass",
            contact: "Ngwenya Glass & Mine",
            hotel: "Forest Arms",
            hotelLoc: "Mbabane (Transit)",
            hotelFonct: "Hôtel forestier calme",
            hotelContact: "N/A",
            hotelRestau: "Cuisine maison",
            guide: "N/A",
            guideContact: "N/A"
        },
        shewula: {
            titre: "Shewula Mountain Camp",
            localisation: "Monts Lubombo",
            periode: "Toute l'année",
            acces: "Piste (4x4 préférable)",
            conseils: "Premier projet d'écotourisme communautaire, vue imprenable sur les plaines du Mozambique",
            contact: "Shewula Community Trust",
            hotel: "Shewula Mountain Camp",
            hotelLoc: "Sommet des Lubombo",
            hotelFonct: "Rondavels traditionnels gérés par la communauté",
            hotelContact: "+268 7605 1160",
            hotelRestau: "Plats traditionnels Swazi",
            guide: "Guide communautaire",
            guideContact: "Sur place"
        },
        mlawula: {
            titre: "Mlawula Nature Reserve",
            localisation: "Lubombo (Est)",
            periode: "Hiver",
            acces: "Route bitumée",
            conseils: "Une réserve sauvage et aride, paradis pour les marcheurs et observateurs d'oiseaux",
            contact: "ENTC Mlawula",
            hotel: "Siphiso Campsite",
            hotelLoc: "Dans la réserve",
            hotelFonct: "Bungalows tentes et camping",
            hotelContact: "+268 2383 8885",
            hotelRestau: "Barbecue",
            guide: "Ranger du parc",
            guideContact: "Sur place"
        },
        phophonyane: {
            titre: "Phophonyane Falls",
            localisation: "Près de Piggs Peak",
            periode: "Toute l'année",
            acces: "Route puis sentier",
            conseils: "Cascades nichées dans une forêt ancienne, lieu de légendes romantiques",
            contact: "Phophonyane Falls Ecolodge",
            hotel: "Phophonyane Falls Lodge",
            hotelLoc: "Près des chutes",
            hotelFonct: "Ecolodge de charme, tentes de safari et cottages",
            hotelContact: "+268 2437 1319",
            hotelRestau: "Cuisine saine et locale",
            guide: "N/A",
            guideContact: "N/A"
        },
        manzini: {
            titre: "Manzini",
            localisation: "Centre du pays",
            periode: "Toute l'année",
            acces: "Hub de transport central",
            conseils: "Le poumon économique, visitez le marché animé de Manzini",
            contact: "Mairie de Manzini",
            hotel: "The George Hotel",
            hotelLoc: "Manzini",
            hotelFonct: "Hôtel d'affaires et loisirs",
            hotelContact: "+268 2505 2260",
            hotelRestau: "Restaurant italien",
            guide: "Zama Mamba",
            guideContact: "zama@visitafrika.com"
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
                Demande envoyée ! Nos experts swazis vous contacteront.
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