/**
 * PROJET: VISIT AFRIKA
 * FICHIER: liberia.js
 * DESCRIPTION: Script premium pour la page Libéria.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Libéria chargé.");

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
                    // Centrer sur le Libéria
                    map = L.map('liberia-map').setView([6.4281, -9.4295], 8);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National de Sapo", lat: 5.35, lng: -8.50 },
                        { name: "Robertsport (Surf)", lat: 6.75, lng: -11.37 },
                        { name: "Monrovia (Capitale)", lat: 6.31, lng: -10.80 },
                        { name: "Providence Island", lat: 6.32, lng: -10.80 },
                        { name: "Plantation Firestone", lat: 6.30, lng: -10.35 },
                        { name: "Mont Nimba", lat: 7.50, lng: -8.42 },
                        { name: "Buchanan", lat: 5.88, lng: -10.05 },
                        { name: "Harper", lat: 4.38, lng: -7.71 },
                        { name: "Chutes de Kpatawee", lat: 7.02, lng: -9.51 },
                        { name: "Blue Lake (Bomi)", lat: 6.88, lng: -10.82 },
                        { name: "Lake Piso", lat: 6.74, lng: -11.25 },
                        { name: "Mont Wologizi", lat: 8.05, lng: -9.95 },
                        { name: "Kru Coast", lat: 4.80, lng: -8.50 },
                        { name: "Marshall", lat: 6.13, lng: -10.38 },
                        { name: "Forêt de Gola", lat: 7.25, lng: -10.75 }
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
        sapo: {
            titre: "Parc National de Sapo",
            localisation: "Sud-Est du Libéria",
            periode: "Saison sèche (Décembre à Avril)",
            acces: "4x4 obligatoire, route difficile depuis Monrovia (2 jours)",
            conseils: "Plus grande forêt primaire du pays, observez les hippopotames pygmées et les éléphants de forêt",
            contact: "FDA (Forestry Development Authority)",
            hotel: "Campement Sapo Lodge",
            hotelLoc: "Lisière du parc",
            hotelFonct: "Rustique, immersion totale nature",
            hotelContact: "Via FDA Monrovia",
            hotelRestau: "Cuisine de brousse traditionnelle",
            guide: "Jefferson Koffa",
            guideContact: "jefferson@visitafrika.com"
        },
        robertsport: {
            titre: "Robertsport",
            localisation: "Comté de Grand Cape Mount",
            periode: "Mars à Octobre pour le surf",
            acces: "Route (3h depuis Monrovia)",
            conseils: "L'un des meilleurs spots de surf d'Afrique de l'Ouest, vagues de classe mondiale",
            contact: "Robertsport Surf Club",
            hotel: "Nana's Lodge",
            hotelLoc: "Plage de Robertsport",
            hotelFonct: "Bungalows sur la plage, ambiance surf chill",
            hotelContact: "+231 77 712 3456",
            hotelRestau: "Poissons frais et cocktails",
            guide: "Samba Surf",
            guideContact: "samba@visitafrika.com"
        },
        monrovia: {
            titre: "Monrovia",
            localisation: "Côte centrale",
            periode: "Toute l'année",
            acces: "Aéroport international Roberts (ROB)",
            conseils: "Visitez le Musée National et profitez de la vue depuis l'hôtel Ducor abandonné",
            contact: "Ministry of Information & Tourism",
            hotel: "The Royal Grand Hotel",
            hotelLoc: "Sinkor, Monrovia",
            hotelFonct: "Luxe moderne, business et loisirs",
            hotelContact: "+231 88 655 5555",
            hotelRestau: "The Grill (Restaurant sur le toit)",
            guide: "Jefferson Koffa",
            guideContact: "jefferson@visitafrika.com"
        },
        providence_island: {
            titre: "Providence Island",
            localisation: "Monrovia (Rivière Mesurado)",
            periode: "Toute l'année",
            acces: "Petit pont/bateau depuis le centre",
            conseils: "Lieu historique où les premiers colons afro-américains ont débarqué en 1822",
            contact: "National Museum Liberia",
            hotel: "Hôtels de Monrovia",
            hotelLoc: "Monrovia",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Jefferson Koffa",
            guideContact: "jefferson@visitafrika.com"
        },
        firestone: {
            titre: "Plantation Firestone",
            localisation: "Comté de Margibi",
            periode: "Toute l'année",
            acces: "Route principale vers l'aéroport",
            conseils: "Découvrez l'histoire de la production mondiale de caoutchouc dans cette plantation historique",
            contact: "Firestone Natural Rubber Co.",
            hotel: "Farmington Hotel",
            hotelLoc: "Près de l'aéroport Roberts",
            hotelFonct: "Luxe international, piscine géante",
            hotelContact: "+231 77 000 0000",
            hotelRestau: "Cuisine internationale",
            guide: "N/A",
            guideContact: "N/A"
        },
        mount_nimba: {
            titre: "Mont Nimba",
            localisation: "Frontière Guinée/Côte d'Ivoire (Yekepa)",
            periode: "Novembre à Mars",
            acces: "Route puis randonnée (Guide obligatoire)",
            conseils: "Patrimoine UNESCO, biodiversité exceptionnelle, espèces endémiques",
            contact: "Nimba Conservation",
            hotel: "Guesthouse à Yekepa",
            hotelLoc: "Yekepa",
            hotelFonct: "Basique, héritage minier",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine locale libérienne",
            guide: "Guide spécialisé Nimba",
            guideContact: "Via agence Monrovia"
        },
        buchanan: {
            titre: "Buchanan",
            localisation: "Comté de Grand Bassa",
            periode: "Toute l'année",
            acces: "Route bitumée depuis Monrovia (2h)",
            conseils: "Deuxième port du pays, plages relaxantes et estuaire de la rivière Saint John",
            contact: "Mairie de Buchanan",
            hotel: "Liberia Hotel",
            hotelLoc: "Buchanan",
            hotelFonct: "Standard",
            hotelContact: "N/A",
            hotelRestau: "Cuisine locale",
            guide: "N/A",
            guideContact: "N/A"
        },
        harper: {
            titre: "Harper",
            localisation: "Extrême Sud (Maryland)",
            periode: "Saison sèche",
            acces: "Avion (vols internes) ou longue route (piste difficile)",
            conseils: "Architecture antebellum magnifique et plages sauvages désertes",
            contact: "Office régional Maryland",
            hotel: "JJ Dossen Guest House",
            hotelLoc: "Harper Centre",
            hotelFonct: "Authentique",
            hotelContact: "Sur place",
            hotelRestau: "Poisson et riz local",
            guide: "N/A",
            guideContact: "N/A"
        },
        kpatawee: {
            titre: "Chutes de Kpatawee",
            localisation: "Comté de Bong",
            periode: "Après la saison des pluies",
            acces: "Route vers Gbarnga",
            conseils: "Cascades nichées dans une jungle dense, lieu prisé pour le pique-nique",
            contact: "Bong County Tourism",
            hotel: "Passion Hotel",
            hotelLoc: "Gbarnga (base)",
            hotelFonct: "Le meilleur confort de la région centrale",
            hotelContact: "+231 88 000 0000",
            hotelRestau: "Plats libériens généreux",
            guide: "Jefferson Koffa",
            guideContact: "jefferson@visitafrika.com"
        },
        blue_lake: {
            titre: "Blue Lake",
            localisation: "Comté de Bomi (Tubmanburg)",
            periode: "Toute l'année",
            acces: "Route (1h30 depuis Monrovia)",
            conseils: "Ancienne mine de fer devenue un lac d'un bleu profond mystérieux",
            contact: "N/A",
            hotel: "Hôtels de Monrovia (Excursion)",
            hotelLoc: "Monrovia",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        lake_piso: {
            titre: "Lake Piso",
            localisation: "Robertsport",
            periode: "Toute l'année",
            acces: "Proche de Robertsport",
            conseils: "Vaste lagune idéale pour l'observation des oiseaux et la pêche",
            contact: "Robertsport Community",
            hotel: "Nana's Lodge",
            hotelLoc: "Robertsport",
            hotelFonct: "Lodge de plage",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Samba Surf",
            guideContact: "samba@visitafrika.com"
        },
        wologizi: {
            titre: "Mont Wologizi",
            localisation: "Comté de Lofa (Nord)",
            periode: "Saison sèche",
            acces: "Expédition (4x4 et trek)",
            conseils: "Plus haut sommet du pays, aventure pure pour les amateurs de sommets isolés",
            contact: "Lofa Tourism Board",
            hotel: "Guesthouse locale",
            hotelLoc: "Voinjama",
            hotelFonct: "Basique",
            hotelContact: "N/A",
            hotelRestau: "Cuisine Lofa traditionnelle",
            guide: "Guide local Voinjama",
            guideContact: "Sur place"
        },
        kru_coast: {
            titre: "Kru Coast",
            localisation: "Sud-Est",
            periode: "Saison sèche",
            acces: "Bateau ou piste difficile",
            conseils: "Berceau de la culture Kru, paysages côtiers sauvages et authentiques",
            contact: "N/A",
            hotel: "N/A (Hébergement villageois)",
            hotelLoc: "Sinoe",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        marshall: {
            titre: "Marshall",
            localisation: "Comté de Margibi",
            periode: "Toute l'année",
            acces: "Route (1h de Monrovia)",
            conseils: "Visitez le sanctuaire des chimpanzés de Libéria Chimpanzee Rescue & Protection",
            contact: "LCRP Liberia",
            hotel: "Farmington Hotel",
            hotelLoc: "Marshall/Robertsfield",
            hotelFonct: "Luxe",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert LCRP",
            guideContact: "Via LCRP"
        },
        gola: {
            titre: "Forêt de Gola",
            localisation: "Nord-Ouest (Frontière Sierra Leone)",
            periode: "Saison sèche",
            acces: "4x4",
            conseils: "Forêt transfrontalière riche en biodiversité et en projets de conservation",
            contact: "Society for Conservation of Nature Liberia",
            hotel: "Hébergements de Monrovia (Expédition)",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Ranger Gola",
            guideContact: "Via agence"
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
                Demande envoyée ! Nos experts libériens vous contacteront.
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
