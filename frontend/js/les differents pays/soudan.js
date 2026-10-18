/**
 * PROJET: VISIT AFRIKA
 * FICHIER: soudan.js
 * DESCRIPTION: Script premium pour la page Soudan.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Soudan chargé.");

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
                    // Centrer sur le Soudan
                    map = L.map('soudan-map').setView([15.5007, 32.5599], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Pyramides de Méroé", lat: 16.94, lng: 33.75 },
                        { name: "Jebel Barkal (Montagne Sacrée)", lat: 18.53, lng: 31.83 },
                        { name: "Confluence des Nils (Khartoum)", lat: 15.61, lng: 32.51 },
                        { name: "Port-Soudan (Mer Rouge)", lat: 19.62, lng: 37.22 },
                        { name: "Musawwarat es-Sufra", lat: 16.42, lng: 33.32 },
                        { name: "Naqa (Temples)", lat: 16.27, lng: 33.27 },
                        { name: "Pyramides de Nuri", lat: 18.56, lng: 31.91 },
                        { name: "Kerma (Ruines)", lat: 19.16, lng: 30.41 },
                        { name: "Vieux Dongola", lat: 18.22, lng: 30.74 },
                        { name: "Île de Suakin", lat: 19.10, lng: 37.33 },
                        { name: "Atoll de Sanganeb", lat: 19.72, lng: 37.44 },
                        { name: "Parc National du Dinder", lat: 12.30, lng: 35.00 },
                        { name: "Monts Taka (Kassala)", lat: 15.45, lng: 36.40 },
                        { name: "Temple de Soleb", lat: 20.43, lng: 30.34 },
                        { name: "Temple d'Amara", lat: 20.83, lng: 30.41 }
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
        meroe: {
            titre: "Pyramides de Méroé",
            localisation: "Rive Est du Nil (200km au Nord de Khartoum)",
            periode: "Novembre à Février (Climat tempéré)",
            acces: "Route bitumée (3h de Khartoum)",
            conseils: "Plus de 200 pyramides noires surgissant du sable, visitez au lever du soleil pour une lumière magique",
            contact: "Sudan Antiquities Service",
            hotel: "Meroe Tented Camp",
            hotelLoc: "Surplombant les pyramides",
            hotelFonct: "Tentes de safari luxueuses, vue directe sur le site",
            hotelContact: "+249 91 230 1100",
            hotelRestau: "Cuisine traditionnelle soudanaise",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        jebel_barkal: {
            titre: "Jebel Barkal",
            localisation: "Karima (Nord du Soudan)",
            periode: "Hiver",
            acces: "Route ou vol interne (quand disponible)",
            conseils: "La montagne sacrée d'Amon, montez au sommet pour une vue panoramique sur les pyramides et le Nil",
            contact: "Karima Tourism Office",
            hotel: "Nuban Rest House",
            hotelLoc: "Pied du Jebel Barkal",
            hotelFonct: "Boutique hôtel construit en terre, style nubien raffiné",
            hotelContact: "+249 91 230 1100",
            hotelRestau: "Spécialités nubiennes",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        khartoum_confluence: {
            titre: "Confluence des Nils",
            localisation: "Khartoum (Al-Mogran)",
            periode: "Toute l'année",
            acces: "Capitale",
            conseils: "Observez le point précis où le Nil Bleu et le Nil Blanc se rejoignent pour former le Nil",
            contact: "N/A",
            hotel: "Corinthia Hotel Khartoum",
            hotelLoc: "Front de Nil, Khartoum",
            hotelFonct: "Le bâtiment le plus iconique de la ville (L'Oeuf), luxe 5*",
            hotelContact: "+249 18 715 0000",
            hotelRestau: "Rick's Cafe (Vue panoramique)",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        port_soudan: {
            titre: "Port-Soudan",
            localisation: "Côte de la Mer Rouge",
            periode: "Novembre à Mai",
            acces: "Aéroport de Port-Soudan ou route",
            conseils: "Porte d'entrée vers les récifs coralliens les plus vierges au monde, plongée exceptionnelle",
            contact: "Sudan Diving Center",
            hotel: "Coral Port Sudan Hotel",
            hotelLoc: "Front de mer",
            hotelFonct: "Hôtel classique avec vue sur le port",
            hotelContact: "+249 31 182 3550",
            hotelRestau: "Fruits de mer frais",
            guide: "Expert plongée Mer Rouge",
            guideContact: "Via agence"
        },
        musawwarat: {
            titre: "Musawwarat es-Sufra",
            localisation: "Ad-Damer (Nord)",
            periode: "Saison fraîche",
            acces: "4x4 depuis Khartoum",
            conseils: "Immense complexe religieux célèbre pour ses représentations d'éléphants",
            contact: "N/A",
            hotel: "Hébergements à Shendi",
            hotelLoc: "Shendi (proche)",
            hotelFonct: "Basique",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        naqa: {
            titre: "Naqa",
            localisation: "Désert de Butana",
            periode: "Hiver",
            acces: "Piste 4x4",
            conseils: "Temples méroïtiques magnifiquement préservés au milieu de nulle part",
            contact: "N/A",
            hotel: "Meroe Tented Camp (base)",
            hotelLoc: "Méroé",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        nuri: {
            titre: "Pyramides de Nuri",
            localisation: "Près de Karima",
            periode: "Hiver",
            acces: "Route",
            conseils: "Nécropole abritant la plus haute pyramide du Soudan (Roi Taharqa)",
            contact: "N/A",
            hotel: "Nuban Rest House",
            hotelLoc: "Karima",
            hotelFonct: "Luxe nubien",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        kerma: {
            titre: "Kerma",
            localisation: "Nord (Province du Nord)",
            periode: "Saison fraîche",
            acces: "Route",
            conseils: "Visitez la 'Deffufa', immense monument de terre cuite, centre de l'une des plus vieilles civilisations d'Afrique",
            contact: "Musée de Kerma",
            hotel: "Guesthouse locale",
            hotelLoc: "Kerma",
            hotelFonct: "Simple et accueillant",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine nubienne",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        dongola: {
            titre: "Vieux Dongola",
            localisation: "Bord du Nil",
            periode: "Printemps",
            acces: "Route",
            conseils: "Ancienne capitale chrétienne puis islamique, vestiges de palais et d'églises",
            contact: "Mission Archéologique Polonaise",
            hotel: "Hôtels de Dongola (Nouvelle)",
            hotelLoc: "Dongola",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        suakin: {
            titre: "Île de Suakin",
            localisation: "Sud de Port-Soudan",
            periode: "Hiver",
            acces: "Route (1h de Port-Soudan)",
            conseils: "Ville fantôme en corail, autrefois port majeur de la Mer Rouge et départ des pèlerins vers La Mecque",
            contact: "N/A",
            hotel: "Hôtels de Port-Soudan",
            hotelLoc: "Port-Soudan",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        sanganeb: {
            titre: "Atoll de Sanganeb",
            localisation: "Mer Rouge (UNESCO)",
            periode: "Décembre à Mai",
            acces: "Bateau depuis Port-Soudan (2h)",
            conseils: "Seul atoll de la Mer Rouge, montez au phare pour une vue irréelle sur l'eau turquoise",
            contact: "Sudan Marine Parks",
            hotel: "N/A (Excursion journée ou croisière)",
            hotelLoc: "En mer",
            hotelFonct: "Bateau de plongée",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine marine à bord",
            guide: "Instructeur de plongée",
            guideContact: "Via agence"
        },
        dinder: {
            titre: "Parc National du Dinder",
            localisation: "Frontière Éthiopienne",
            periode: "Janvier à Mai",
            acces: "4x4 obligatoire",
            conseils: "Une des plus grandes réserves de biosphère d'Afrique, abritant lions et léopards",
            contact: "Wild Life Conservation Force",
            hotel: "Galagu Camp",
            hotelLoc: "Dans le parc",
            hotelFonct: "Rustique, bungalows simples",
            hotelContact: "Sur place",
            hotelRestau: "Produits locaux",
            guide: "Ranger armé",
            guideContact: "Obligatoire"
        },
        kassala: {
            titre: "Kassala (Monts Taka)",
            localisation: "Est du Soudan",
            periode: "Saison sèche",
            acces: "Route bitumée (7h de Khartoum)",
            conseils: "Admirez les pics granitiques abrupts et visitez le souk animé de la tribu des Hadendowa",
            contact: "Tourism Kassala",
            hotel: "Mawada Hotel",
            hotelLoc: "Kassala Centre",
            hotelFonct: "Confortable",
            hotelContact: "Sur place",
            hotelRestau: "Agneau grillé renommé",
            guide: "Guide local Beja",
            guideContact: "Sur place"
        },
        soleb: {
            titre: "Temple de Soleb",
            localisation: "Rive Ouest du Nil",
            periode: "Hiver",
            acces: "Route puis traversée en pirogue",
            conseils: "Le plus beau temple égyptien au Soudan, bâti par Amenhotep III",
            contact: "N/A",
            hotel: "Guesthouse nubienne",
            hotelLoc: "Wawa (Rive en face)",
            hotelFonct: "Logement chez l'habitant authentique",
            hotelContact: "Sur place",
            hotelRestau: "Foul et pain local",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
        },
        temple_amara: {
            titre: "Temple d'Amara",
            localisation: "Province du Nord",
            periode: "Hiver",
            acces: "Piste",
            conseils: "Site antique aux piliers magnifiquement décorés, loin des sentiers battus",
            contact: "N/A",
            hotel: "N/A (Expédition)",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ahmed Ibrahim",
            guideContact: "ahmed@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon expédition</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="10" value="1" required>
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
                Demande envoyée ! Nos experts soudanais vous contacteront.
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
