/**
 * PROJET: VISIT AFRIKA
 * FICHIER: erythree.js
 * DESCRIPTION: Script premium pour la page Érythrée.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Érythrée chargé.");

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
                    // Centrer sur l'Érythrée
                    map = L.map('erythree-map').setView([15.1794, 39.7823], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Massawa (La Perle de la Mer Rouge)", lat: 15.61, lng: 39.45 },
                        { name: "Asmara (Architecture Art Déco)", lat: 15.33, lng: 38.93 },
                        { name: "Archipel des Dahlak", lat: 15.70, lng: 40.10 },
                        { name: "Qohaito (Cité Antique)", lat: 14.88, lng: 39.43 },
                        { name: "Keren (Marché & Forteresse)", lat: 15.78, lng: 38.45 },
                        { name: "Metera (Stèle Antique)", lat: 14.67, lng: 39.42 },
                        { name: "Adulis (Port Antique)", lat: 15.26, lng: 39.66 },
                        { name: "Monastère de Debre Bizen", lat: 15.33, lng: 39.10 },
                        { name: "Semona Bahri (Forêt Tropicale)", lat: 15.55, lng: 38.95 },
                        { name: "Assab (Port du Sud)", lat: 13.01, lng: 42.74 },
                        { name: "Vallée des Sycomores", lat: 14.95, lng: 39.30 },
                        { name: "Îles Hanish", lat: 13.70, lng: 42.80 },
                        { name: "Canyon de Segheneyti", lat: 15.05, lng: 39.18 },
                        { name: "Golfe de Zula", lat: 15.25, lng: 39.75 },
                        { name: "Nakfa (Ville Héroïque)", lat: 16.66, lng: 38.47 }
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
        massawa: {
            titre: "Massawa",
            localisation: "Côte de la Mer Rouge",
            periode: "Novembre à Mars (Évitez l'été torride)",
            acces: "Route panoramique depuis Asmara (3h) ou petit avion",
            conseils: "Dégustez du poisson frais dans la vieille ville ottomane et faites une excursion vers les îles Dahlak",
            contact: "Office du Tourisme de Massawa",
            hotel: "Dahlak Hotel",
            hotelLoc: "Bord de mer, Massawa",
            hotelFonct: "Hôtel emblématique, vue sur le port",
            hotelContact: "+291 1 552 233",
            hotelRestau: "Gastronomie marine érythréenne",
            guide: "Yonas Berhe",
            guideContact: "yonas@visitafrika.com"
        },
        asmara_art_deco: {
            titre: "Asmara (Art Déco)",
            localisation: "Hauts plateaux centraux",
            periode: "Toute l'année",
            acces: "Aéroport international d'Asmara",
            conseils: "Surnommée 'Piccola Roma', visitez le bâtiment Fiat Tagliero et profitez des cafés italiens",
            contact: "Municipalité d'Asmara",
            hotel: "Albergo Italia",
            hotelLoc: "Centre-ville d'Asmara",
            hotelFonct: "Boutique hôtel historique, luxe colonial",
            hotelContact: "+291 1 123 456",
            hotelRestau: "Cuisine italienne raffinée",
            guide: "Helen Tesfai",
            guideContact: "helen@visitafrika.com"
        },
        dahlak: {
            titre: "Archipel des Dahlak",
            localisation: "Mer Rouge",
            periode: "Décembre à Avril",
            acces: "Bateau privé depuis Massawa",
            conseils: "Plus de 120 îles, paradis du snorkeling et de la solitude. Permis spécial requis",
            contact: "Ministère du Tourisme (Permis)",
            hotel: "Camping de luxe (Bivouac)",
            hotelLoc: "Dahlak Kebir",
            hotelFonct: "Immersion totale sous les étoiles",
            hotelContact: "Via agence",
            hotelRestau: "Barbecue de pêche fraîche",
            guide: "Expert marin Dahlak",
            guideContact: "Via agence"
        },
        qohaito: {
            titre: "Qohaito",
            localisation: "Sud d'Asmara, région de Debub",
            periode: "Septembre à Mai",
            acces: "4x4 depuis Senafe",
            conseils: "Cité antique perchée à 2600m, admirez les ruines axoumites et le canyon vertigineux",
            contact: "Site archéologique de Qohaito",
            hotel: "Hôtels de Senafe",
            hotelLoc: "Senafe (base)",
            hotelFonct: "Simple et authentique",
            hotelContact: "Sur place",
            hotelRestau: "Injera traditionnelle",
            guide: "Yonas Berhe",
            guideContact: "yonas@visitafrika.com"
        },
        keren: {
            titre: "Keren",
            localisation: "Nord-Ouest d'Asmara",
            periode: "Lundi (Grand Marché)",
            acces: "Route bitumée (2h30 depuis Asmara)",
            conseils: "Ne manquez pas le marché aux chameaux du lundi et la forteresse de Tigu",
            contact: "Mairie de Keren",
            hotel: "Keren Hotel",
            hotelLoc: "Centre Keren",
            hotelFonct: "Hôtel de tradition locale",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités régionales",
            guide: "Idris Keren",
            guideContact: "idris@visitafrika.com"
        },
        metera: {
            titre: "Metera (Belew Kelew)",
            localisation: "Près de Senafe",
            periode: "Toute l'année",
            acces: "Route du Sud",
            conseils: "Admirez la stèle axoumite géante et les vestiges d'églises anciennes",
            contact: "Département des Antiquités",
            hotel: "Hôtels d'Asmara (Excursion)",
            hotelLoc: "Asmara",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Yonas Berhe",
            guideContact: "yonas@visitafrika.com"
        },
        adulis: {
            titre: "Adulis",
            localisation: "Près de Zula",
            periode: "Hiver",
            acces: "4x4 depuis Massawa",
            conseils: "Ancien port majeur de la Mer Rouge, site historique de première importance",
            contact: "Musée National d'Érythrée",
            hotel: "Dahlak Hotel",
            hotelLoc: "Massawa (base)",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        monastere_debre_bizen: {
            titre: "Monastère de Debre Bizen",
            localisation: "Sommet de la montagne Bizen",
            periode: "Toute l'année (Matin pour l'ascension)",
            acces: "Randonnée raide de 3h (Accès interdit aux femmes)",
            conseils: "Vue imprenable sur la Mer Rouge et les montagnes du centre",
            contact: "Monastère Debre Bizen",
            hotel: "Hôtels de Nefasit",
            hotelLoc: "Nefasit (pied de la montagne)",
            hotelFonct: "Logement simple",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine monastique (végétarienne)",
            guide: "Moine local",
            guideContact: "Accueil"
        },
        semonai_bahri: {
            titre: "Semona Bahri (Filfil)",
            localisation: "Route d'Asmara à Massawa",
            periode: "Après la saison des pluies (Oct-Déc)",
            acces: "Route panoramique de montagne",
            conseils: "La 'ceinture verte' de l'Érythrée, forêt tropicale d'altitude et plantations de café",
            contact: "N/A",
            hotel: "Hôtels d'Asmara",
            hotelLoc: "Asmara",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Kiosques de café en bord de route",
            guide: "N/A",
            guideContact: "N/A"
        },
        assab: {
            titre: "Assab",
            localisation: "Extrême Sud",
            periode: "Hiver",
            acces: "Avion (vols limités) ou expédition 4x4 (très long)",
            conseils: "Ville portuaire isolée, climat aride, point le plus proche de Djibouti",
            contact: "Préfecture d'Assab",
            hotel: "Assab Hotel",
            hotelLoc: "Bord de mer",
            hotelFonct: "Simple et fonctionnel",
            hotelContact: "Sur place",
            hotelRestau: "Poisson et cuisine Afar",
            guide: "Guide local Afar",
            guideContact: "Sur place"
        },
        vallee_des_sycomores: {
            titre: "Vallée des Sycomores",
            localisation: "Entre Segheneyti et Senafe",
            periode: "Toute l'année",
            acces: "Route du Sud",
            conseils: "Admirez les sycomores géants multi-centenaires figurant sur les billets de banque",
            contact: "N/A",
            hotel: "Hôtels de Segheneyti",
            hotelLoc: "Segheneyti",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        iles_hanish: {
            titre: "Îles Hanish",
            localisation: "Mer Rouge méridionale",
            periode: "Saison sèche",
            acces: "Bateau (vraisemblablement expédition spécialisée)",
            conseils: "Eaux cristallines, zone de pêche riche, solitude absolue",
            contact: "Garde-côtes érythréens",
            hotel: "N/A",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert marin",
            guideContact: "N/A"
        },
        canyon_de_segheneyti: {
            titre: "Canyon de Segheneyti",
            localisation: "Sud d'Asmara",
            periode: "Printemps",
            acces: "Route puis marche",
            conseils: "Formations géologiques impressionnantes et végétation d'altitude",
            contact: "N/A",
            hotel: "Lodge local",
            hotelLoc: "Segheneyti",
            hotelFonct: "Accueillant",
            hotelContact: "N/A",
            hotelRestau: "Plats locaux",
            guide: "N/A",
            guideContact: "N/A"
        },
        marais_de_zula: {
            titre: "Golfe de Zula",
            localisation: "Sud de Massawa",
            periode: "Hiver",
            acces: "4x4",
            conseils: "Point où la Vallée du Grand Rift rencontre la mer",
            contact: "N/A",
            hotel: "N/A",
            hotelLoc: "Massawa (base)",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        nakfa: {
            titre: "Nakfa",
            localisation: "Nord du pays",
            periode: "Hiver",
            acces: "Piste longue (4x4 obligatoire)",
            conseils: "Ville symbole de la résistance, visitez les tranchées et les hôpitaux souterrains",
            contact: "Musée de la Résistance de Nakfa",
            hotel: "Maison de passage",
            hotelLoc: "Nakfa",
            hotelFonct: "Rustique",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine simple",
            guide: "Ancien combattant",
            guideContact: "Via le musée"
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
                Demande envoyée ! Nos experts érythréens vous contacteront.
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
