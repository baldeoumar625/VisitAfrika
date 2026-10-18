/**
 * PROJET: VISIT AFRIKA
 * FICHIER: kenya.js
 * DESCRIPTION: Script premium pour le Kenya.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Kenya chargé.");

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
                    // Centrer sur le Kenya
                    map = L.map('kenya-map').setView([0.0236, 37.9062], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Maasai Mara", lat: -1.48, lng: 35.12 },
                        { name: "Amboseli (Kilimandjaro view)", lat: -2.63, lng: 37.25 },
                        { name: "Tsavo (East & West)", lat: -2.98, lng: 38.47 },
                        { name: "Lac Nakuru (Flamants)", lat: -0.35, lng: 36.10 },
                        { name: "Samburu Reserve", lat: 0.62, lng: 37.53 },
                        { name: "Mont Kenya", lat: -0.15, lng: 37.31 },
                        { name: "Hell's Gate", lat: -0.88, lng: 36.31 },
                        { name: "Lac Naivasha", lat: -0.72, lng: 36.35 },
                        { name: "Mombasa Old Town", lat: -4.06, lng: 39.68 },
                        { name: "Diani Beach", lat: -4.28, lng: 39.59 },
                        { name: "Lamu (UNESCO)", lat: -2.27, lng: 40.90 },
                        { name: "Parc National de Nairobi", lat: -1.37, lng: 36.85 },
                        { name: "Giraffe Centre", lat: -1.37, lng: 36.75 },
                        { name: "David Sheldrick Elephant Orphanage", lat: -1.37, lng: 36.77 },
                        { name: "Malindi", lat: -3.22, lng: 40.12 }
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
        maasai_mara: {
            titre: "Maasai Mara National Reserve",
            localisation: "Sud-Ouest du Kenya",
            periode: "Juillet à Octobre (La Grande Migration)",
            acces: "Aéroport de Nairobi (Wilson) puis vol charter ou 6h de route",
            conseils: "L'un des meilleurs endroits au monde pour voir les 'Big Five' et assister à la traversée épique de la rivière Mara par les gnous",
            contact: "Narok County Government",
            hotel: "Angama Mara",
            hotelLoc: "Surplombant la vallée du Rift",
            hotelFonct: "Lodge de luxe ultra-exclusif avec vue panoramique spectaculaire",
            hotelContact: "+254 20 660 6000",
            hotelRestau: "Gastronomie de brousse étoilée",
            guide: "David Ole",
            guideContact: "david@visitafrika.com"
        },
        amboseli: {
            titre: "Amboseli National Park",
            localisation: "Frontière Sud (Rift Valley)",
            periode: "Juin à Octobre et Janvier-Février",
            acces: "Route depuis Nairobi (4h) ou vol charter",
            conseils: "Célèbre pour ses troupeaux d'éléphants avec, en toile de fond, le Mont Kilimandjaro enneigé",
            contact: "KWS Amboseli",
            hotel: "Tortilis Camp",
            hotelLoc: "Concession privée, Amboseli",
            hotelFonct: "Tentes de luxe éco-responsables face au Kilimandjaro",
            hotelContact: "+254 73 012 7000",
            hotelRestau: "Cuisine italienne et locale",
            guide: "David Ole",
            guideContact: "david@visitafrika.com"
        },
        tsavo: {
            titre: "Tsavo East & West",
            localisation: "Entre Nairobi et Mombasa",
            periode: "Toute l'année",
            acces: "Route ou Train (SGR)",
            conseils: "Plus grand parc du Kenya. Visitez les Mzima Springs et admirez les 'éléphants rouges' de Tsavo",
            contact: "KWS Tsavo",
            hotel: "Kilaguni Serena Safari Lodge",
            hotelLoc: "Tsavo West",
            hotelFonct: "Premier lodge construit dans un parc au Kenya, face à un point d'eau",
            hotelContact: "+254 73 469 9696",
            hotelRestau: "Buffets internationaux",
            guide: "David Ole",
            guideContact: "david@visitafrika.com"
        },
        lac_nakuru: {
            titre: "Parc National du Lac Nakuru",
            localisation: "Rift Valley",
            periode: "Toute l'année",
            acces: "Route (3h de Nairobi)",
            conseils: "Sanctuaire pour les rhinocéros blancs et noirs, et célèbre pour ses millions de flamants roses",
            contact: "KWS Nakuru",
            hotel: "Sarova Lion Hill Game Lodge",
            hotelLoc: "Bord du lac Nakuru",
            hotelFonct: "Lodge élégant avec vue sur le lac et jardins luxuriants",
            hotelContact: "+254 70 911 1000",
            hotelRestau: "Flamingo Restaurant",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        samburu: {
            titre: "Réserve de Samburu",
            localisation: "Nord du Kenya",
            periode: "Saison sèche",
            acces: "Vol charter ou route (6h de Nairobi)",
            conseils: "Paysage aride unique abritant les 'Special Five' de Samburu (Girafe réticulée, Zèbre de Grévy, etc.)",
            contact: "Samburu County Council",
            hotel: "Elephant Watch Camp",
            hotelLoc: "Bord de la rivière Ewaso Nyiro",
            hotelFonct: "Lodge eco-chic géré par la famille Douglas-Hamilton",
            hotelContact: "+254 72 238 8704",
            hotelRestau: "Cuisine bio du jardin",
            guide: "David Ole",
            guideContact: "david@visitafrika.com"
        },
        mont_kenya: {
            titre: "Mont Kenya",
            localisation: "Centre du pays",
            periode: "Janvier-Février et Août-Septembre",
            acces: "Base à Nanyuki",
            conseils: "Deuxième plus haut sommet d'Afrique (5199m). Trekking vers Point Lenana accessible aux randonneurs entraînés",
            contact: "Mount Kenya National Park",
            hotel: "Fairmont Mount Kenya Safari Club",
            hotelLoc: "Nanyuki",
            hotelFonct: "Hôtel mythique sur la ligne de l'Équateur",
            hotelContact: "+254 20 226 5555",
            hotelRestau: "Fine dining",
            guide: "Expert montagne KWS",
            guideContact: "Sur place"
        },
        hells_gate: {
            titre: "Hell's Gate National Park",
            localisation: "Naivasha",
            periode: "Toute l'année",
            acces: "Route facile",
            conseils: "L'un des rares parcs où l'on peut faire du vélo et de la randonnée au milieu des zèbres et girafes",
            contact: "N/A",
            hotel: "Enashipai Resort & Spa",
            hotelLoc: "Naivasha",
            hotelFonct: "Luxe et bien-être au bord du lac",
            hotelContact: "+254 51 213 0000",
            hotelRestau: "International",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        lac_naivasha: {
            titre: "Lac Naivasha",
            localisation: "Rift Valley",
            periode: "Toute l'année",
            acces: "Route (1h30 de Nairobi)",
            conseils: "Faites une balade en bateau pour voir les hippopotames et visitez Crescent Island",
            contact: "N/A",
            hotel: "Loldia House",
            hotelLoc: "Rive Nord du lac",
            hotelFonct: "Maison de campagne coloniale pleine de charme",
            hotelContact: "+254 73 012 7000",
            hotelRestau: "Cuisine de ferme à la table",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        mombasa_old_town: {
            titre: "Mombasa Old Town",
            localisation: "Île de Mombasa",
            periode: "Toute l'année",
            acces: "Aéroport Moi (MBA) / Train SGR",
            conseils: "Perdez-vous dans les ruelles swahilies et visitez Fort Jesus, classé au patrimoine mondial de l'UNESCO",
            contact: "Fort Jesus Museum",
            hotel: "Sarova Whitesands Beach Resort",
            hotelLoc: "Bamburi Beach, Mombasa",
            hotelFonct: "Immense resort avec 5 piscines et accès direct à la plage",
            hotelContact: "+254 70 911 1000",
            hotelRestau: "Lido Seafood Grill",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        diani_beach: {
            titre: "Diani Beach",
            localisation: "Côte Sud (Sud de Mombasa)",
            periode: "Toute l'année",
            acces: "Route/Ferry depuis Mombasa ou vol vers Ukunda",
            conseils: "Élue plusieurs fois meilleure plage d'Afrique. Sable blanc immaculé et eaux turquoise",
            contact: "Diani Tourism",
            hotel: "The Sands at Nomad",
            hotelLoc: "Diani Beach",
            hotelFonct: "Boutique hôtel de luxe, atmosphère relaxante et exclusive",
            hotelContact: "+254 72 537 3888",
            hotelRestau: "Indo-Oceanic cuisine",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        lamu_archipel: {
            titre: "Lamu",
            localisation: "Côte Nord",
            periode: "Toute l'année (Sauf Mai-Juin)",
            acces: "Vol vers l'île de Manda puis bateau",
            conseils: "Plus ancienne et mieux préservée des cités swahilies. Pas de voiture, seulement des ânes",
            contact: "Lamu Museums",
            hotel: "The Majlis Resort",
            hotelLoc: "Manda Island, face à Lamu",
            hotelFonct: "Hôtel d'art et de design swahili, vue magnifique",
            hotelContact: "+254 77 377 7066",
            hotelRestau: "Gastronomie Swahilie-Italienne",
            guide: "Expert local Lamu",
            guideContact: "Sur place"
        },
        parc_nairobi: {
            titre: "Parc National de Nairobi",
            localisation: "Nairobi (à 7km du centre)",
            periode: "Toute l'année",
            acces: "Taxi urbain",
            conseils: "Le seul parc national au monde situé dans une capitale. Safari avec les gratte-ciel en arrière-plan",
            contact: "KWS Headquarters",
            hotel: "The Emakoko",
            hotelLoc: "Lisière du parc Nairobi",
            hotelFonct: "Lodge de luxe permettant une immersion immédiate dès l'arrivée au Kenya",
            hotelContact: "+254 71 212 3456",
            hotelRestau: "Fine dining",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        girafe_centre: {
            titre: "Giraffe Centre",
            localisation: "Langata, Nairobi",
            periode: "Toute l'année",
            acces: "Taxi",
            conseils: "Nourrissez les girafes de Rothschild depuis une plateforme surélevée. Idéal pour les familles",
            contact: "AFEW (African Fund for Endangered Wildlife)",
            hotel: "Giraffe Manor",
            hotelLoc: "Langata, Nairobi",
            hotelFonct: "Manoir iconique où les girafes passent la tête par la fenêtre au petit-déjeuner",
            hotelContact: "+254 20 251 3166",
            hotelRestau: "Exclusif aux résidents",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        david_sheldrick: {
            titre: "David Sheldrick Wildlife Trust",
            localisation: "Nairobi National Park Gate",
            periode: "11h00 à 12h00 (Unique créneau de visite)",
            acces: "Taxi",
            conseils: "Orphelinat pour éléphants et rhinocéros. Assistez au nourrissage au biberon des éléphanteaux",
            contact: "DSWT Nairobi",
            hotel: "Hôtels de Nairobi",
            hotelLoc: "Nairobi",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
        },
        malindi: {
            titre: "Malindi",
            localisation: "Côte Nord",
            periode: "Toute l'année",
            acces: "Vol interne ou route",
            conseils: "Visitez le pilier de Vasco de Gama et explorez le parc marin pour la plongée",
            contact: "N/A",
            hotel: "Billionaire Resort & Retreat",
            hotelLoc: "Casuarina Road, Malindi",
            hotelFonct: "Le comble du luxe et de l'exclusivité sur la côte",
            hotelContact: "+254 70 543 2100",
            hotelRestau: "Cuisine italienne de classe mondiale",
            guide: "Grace Wanjiku",
            guideContact: "grace@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Réserver mon aventure</h4>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date souhaitée</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="number" name="personnes" min="1" max="12" value="2" required>
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
                Demande envoyée ! Nos experts kenyans vous contacteront.
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
