/**
 * PROJET: VISIT AFRIKA
 * FICHIER: cameroun.js
 * DESCRIPTION: Script premium pour le Cameroun.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Cameroun chargé.");

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
                    // Centrer sur le Cameroun
                    map = L.map('cameroun-map').setView([7.3697, 12.3547], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Parc National de Waza", lat: 11.25, lng: 14.60 },
                        { name: "Mont Cameroun (Buea)", lat: 4.20, lng: 9.17 },
                        { name: "Kribi (Cité balnéaire)", lat: 2.95, lng: 9.91 },
                        { name: "Limbé (Plages de sable noir)", lat: 4.01, lng: 9.22 },
                        { name: "Réserve du Dja (UNESCO)", lat: 3.00, lng: 13.00 },
                        { name: "Foumban (Cité des Arts)", lat: 5.72, lng: 10.90 },
                        { name: "Ebogo (Site écotouristique)", lat: 3.40, lng: 11.50 },
                        { name: "Chutes de la Lobé", lat: 2.88, lng: 9.90 },
                        { name: "Parc National de Korup", lat: 5.20, lng: 8.85 },
                        { name: "Parc National de la Bénoué", lat: 8.25, lng: 13.75 },
                        { name: "Parc National de Bouba Ndjida", lat: 8.60, lng: 14.50 },
                        { name: "Lac Tchad (Rive Cameroun)", lat: 12.50, lng: 14.20 },
                        { name: "Yaoundé (Capitale)", lat: 3.8480, lng: 11.5021 },
                        { name: "Douala (Métropole)", lat: 4.0511, lng: 9.7679 },
                        { name: "Bamenda", lat: 5.96, lng: 10.15 }
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
        waza: {
            titre: "Parc National de Waza",
            localisation: "Extrême-Nord du Cameroun",
            periode: "Mars à Mai (Saison sèche pour l'observation)",
            acces: "Route depuis Maroua (3h)",
            conseils: "Le parc le plus célèbre du Cameroun. Admirez les girafes, les lions et les éléphants près des points d'eau. Guide obligatoire",
            contact: "Direction du Parc National de Waza",
            hotel: "Campement de Waza",
            hotelLoc: "Entrée du parc",
            hotelFonct: "Style traditionnel en boukarous, immersion totale en pleine brousse",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités du Nord-Cameroun",
            guide: "Jean-Paul Mbarga",
            guideContact: "jeanpaul@visitafrika.com"
        },
        mont_cameroun: {
            titre: "Mont Cameroun (Le Char des Dieux)",
            localisation: "Buea (Sud-Ouest)",
            periode: "Décembre à Février",
            acces: "Route depuis Douala (1h30)",
            conseils: "Plus haut sommet d'Afrique de l'Ouest et Centrale (4095m). Choisissez une ascension en 3 jours pour profiter des différents écosystèmes",
            contact: "Mount Cameroon National Park Office",
            hotel: "Mountain Hotel Buea",
            hotelLoc: "Hauteurs de Buea",
            hotelFonct: "Hôtel historique avec vue sur la montagne et l'océan Atlantique",
            hotelContact: "+237 233 32 21 07",
            hotelRestau: "Cuisine internationale et locale",
            guide: "Jean-Paul Mbarga",
            guideContact: "jeanpaul@visitafrika.com"
        },
        kribi: {
            titre: "Kribi",
            localisation: "Département de l'Océan",
            periode: "Toute l'année (Eviter Septembre-Octobre)",
            acces: "Route depuis Douala (3h) ou Yaoundé (4h)",
            conseils: "La cité balnéaire de référence. Profitez des plages de sable blanc et dégustez des crevettes géantes pieds dans le sable",
            contact: "Office du Tourisme de Kribi",
            hotel: "Les Gîtes de Kribi",
            hotelLoc: "Bord de mer, Kribi",
            hotelFonct: "Bungalows de charme dans un jardin tropical luxuriant face à l'océan",
            hotelContact: "+237 699 91 21 21",
            hotelRestau: "Poissons et fruits de mer frais",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
        },
        limbe: {
            titre: "Limbé",
            localisation: "Sud-Ouest",
            periode: "Saison sèche",
            acces: "Route depuis Douala (1h)",
            conseils: "Visitez le jardin botanique historique et le centre de sauvetage de la faune (Limbe Wildlife Centre). Plages de sable noir volcanique",
            contact: "Limbe City Council",
            hotel: "Finest Surfhouse",
            hotelLoc: "Limbé",
            hotelFonct: "Villas modernes avec vue imprenable sur la baie",
            hotelContact: "+237 233 33 25 55",
            hotelRestau: "Plats de poisson à la braise",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
        },
        dja: {
            titre: "Réserve de Faune du Dja",
            localisation: "Sud-Est (Lomié / Somalomo)",
            periode: "Janvier à Mars",
            acces: "4x4 recommandé depuis Yaoundé (7h)",
            conseils: "Classé UNESCO. L'une des forêts pluviales les plus vastes et les mieux protégées d'Afrique. Sanctuaire des gorilles et chimpanzés",
            contact: "Conservation du Dja",
            hotel: "Lodges communautaires",
            hotelLoc: "Lomié",
            hotelFonct: "Simple et immersif pour les naturalistes",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine forestière",
            guide: "Jean-Paul Mbarga",
            guideContact: "jeanpaul@visitafrika.com"
        },
        foumban: {
            titre: "Foumban (Cité des Arts)",
            localisation: "Région de l'Ouest",
            periode: "Période du Nguon (Festival biennal)",
            acces: "Route depuis Bafoussam",
            conseils: "Capitale du royaume Bamoun. Visitez le Palais Royal, le nouveau musée des rois et le quartier des fondeurs de bronze",
            contact: "Palais Royal de Foumban",
            hotel: "Hôtel de la Réunification",
            hotelLoc: "Foumban",
            hotelFonct: "Standard confortable en centre-ville",
            hotelContact: "Sur place",
            hotelRestau: "Cuisine traditionnelle Bamoun",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
        },
        ebogo: {
            titre: "Ebogo",
            localisation: "Près de Mbalmayo (Sud de Yaoundé)",
            periode: "Toute l'année",
            acces: "Route bitumée (1h de Yaoundé)",
            conseils: "Site écotouristique majeur. Balade en pirogue traditionnelle sur le fleuve Nyong pour admirer les arbres millénaires et les oiseaux",
            contact: "Comité de Gestion d'Ebogo",
            hotel: "Gîtes d'Ebogo",
            hotelLoc: "Ebogo",
            hotelFonct: "Bungalows en bois au bord du fleuve",
            hotelContact: "Sur place",
            hotelRestau: "Poisson d'eau douce (Kanga)",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
        },
        chutes_lobe: {
            titre: "Chutes de la Lobé",
            localisation: "7km au sud de Kribi",
            periode: "Toute l'année",
            acces: "Taxi ou Moto depuis Kribi",
            conseils: "Unique au monde : ces chutes se jettent directement dans l'océan Atlantique. Possibilité de remonter le fleuve en pirogue vers les campements pygmées",
            contact: "Syndicat d'Initiative de Kribi",
            hotel: "Hôtel Tara Plage",
            hotelLoc: "Bord des chutes",
            hotelFonct: "Proximité immédiate du site, ambiance sonore des cascades",
            hotelContact: "+237 233 46 14 56",
            hotelRestau: "Cuisine de mer",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
        },
        parc_korup: {
            titre: "Parc National de Korup",
            localisation: "Sud-Ouest (Mundemba)",
            periode: "Saison sèche",
            acces: "Route puis marche (pont suspendu)",
            conseils: "Forêt primaire d'une biodiversité exceptionnelle, l'une des plus vieilles du monde",
            contact: "N/A",
            hotel: "Camps de brousse",
            hotelLoc: "Dans le parc",
            hotelFonct: "Rustique pour les aventuriers",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "Expert Korup",
            guideContact: "Sur place"
        },
        parc_benoue: {
            titre: "Parc National de la Bénoué",
            localisation: "Région du Nord",
            periode: "Janvier à Avril",
            acces: "Route depuis Ngaoundéré ou Garoua",
            conseils: "Réserve de biosphère riche en hippopotames, élands de Derby et de nombreux oiseaux",
            contact: "Direction des Parcs Nord",
            hotel: "Campement Buffle Noir",
            hotelLoc: "Dans le parc",
            hotelFonct: "Campement de safari authentique",
            hotelContact: "Via agence",
            hotelRestau: "Repas de safari",
            guide: "Jean-Paul Mbarga",
            guideContact: "jeanpaul@visitafrika.com"
        },
        parc_bouba_ndjida: {
            titre: "Parc National de Bouba Ndjida",
            localisation: "Frontière Tchadienne",
            periode: "Saison sèche",
            acces: "4x4 uniquement",
            conseils: "Dernier refuge pour de grands troupeaux d'éléphants et les rhinocéros noirs (à vérifier selon saison)",
            contact: "N/A",
            hotel: "Bouba Ndjida Safari Lodge",
            hotelLoc: "Dans le parc",
            hotelFonct: "Grand standing pour le Nord",
            hotelContact: "Via agence",
            hotelRestau: "Cuisine soignée",
            guide: "Jean-Paul Mbarga",
            guideContact: "jeanpaul@visitafrika.com"
        },
        lac_chad: {
            titre: "Lac Tchad (Rive Cameroun)",
            localisation: "Extrême-Nord",
            periode: "Octobre à Janvier",
            acces: "4x4 depuis Kousseri",
            conseils: "Paysage désertique et lacustre unique. Observez la vie des pêcheurs et des éleveurs nomades",
            contact: "N/A",
            hotel: "Hôtels à Kousseri",
            hotelLoc: "Kousseri",
            hotelFonct: "Simple",
            hotelContact: "N/A",
            hotelRestau: "Local",
            guide: "Jean-Paul Mbarga",
            guideContact: "jeanpaul@visitafrika.com"
        },
        yaounde: {
            titre: "Yaoundé (La ville aux sept collines)",
            localisation: "Centre (Capitale)",
            periode: "Toute l'année",
            acces: "Aéroport international Nsimalen (NSI)",
            conseils: "Visitez le Musée National, le monument de la Réunification et profitez de la vue depuis le Mont Fébé",
            contact: "Ministère du Tourisme",
            hotel: "Hilton Yaoundé",
            hotelLoc: "Centre-ville",
            hotelFonct: "Seul hôtel 5 étoiles international de la capitale, luxe et prestige",
            hotelContact: "+237 222 23 36 46",
            hotelRestau: "Le Panoramique",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
        },
        douala: {
            titre: "Douala (La capitale économique)",
            localisation: "Littoral",
            periode: "Toute l'année",
            acces: "Aéroport international de Douala (DLA)",
            conseils: "Cœur battant du pays. Visitez le quartier Akwa, le centre d'art Doual'art et le marché aux fleurs",
            contact: "Mairie de Douala",
            hotel: "Hôtel Akwa Palace",
            hotelLoc: "Boulevard de la Liberté, Akwa",
            hotelFonct: "Hôtel iconique mêlant histoire coloniale et confort moderne",
            hotelContact: "+237 233 42 26 01",
            hotelRestau: "Le Tournebroche",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
        },
        bamenda: {
            titre: "Bamenda & Les Grassfields",
            localisation: "Nord-Ouest",
            periode: "Novembre à Mars",
            acces: "Route nationale (Accès à vérifier selon sécurité)",
            conseils: "Découvrez les paysages de montagnes, les chefferies traditionnelles et l'artisanat des hauts plateaux",
            contact: "N/A",
            hotel: "Ayaba Hotel",
            hotelLoc: "Bamenda",
            hotelFonct: "Grand hôtel classique",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités de l'Ouest",
            guide: "Marie-Claire Ngo",
            guideContact: "marieclaire@visitafrika.com"
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
                    <h4><i class="fas fa-calendar-alt"></i> Organiser mon séjour</h4>
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
                Demande envoyée ! Nos experts camerounais vous contacteront.
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
