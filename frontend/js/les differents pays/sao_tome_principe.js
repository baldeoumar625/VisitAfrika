/**
 * PROJET: VISIT AFRIKA
 * FICHIER: sao_tome_principe.js
 * DESCRIPTION: Script premium pour la page Sao Tomé-et-Principe.
 * Gère les animations, la carte interactive Leaflet, les filtres et les modales détaillées.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Sao Tomé-et-Principe chargé.");

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
                    // Centrer sur l'archipel
                    map = L.map('saotome-map').setView([0.1862, 6.6131], 9);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    // Ajout des marqueurs pour les 15 sites
                    const sites = [
                        { name: "Lagoa Azul", lat: 0.40, lng: 6.62 },
                        { name: "Pico Cão Grande", lat: 0.12, lng: 6.56 },
                        { name: "Boca do Inferno", lat: 0.30, lng: 6.74 },
                        { name: "Roça Agostinho Neto", lat: 0.36, lng: 6.64 },
                        { name: "Praia Jalé", lat: 0.01, lng: 6.52 },
                        { name: "Ilhéu das Rolas", lat: 0.00, lng: 6.52 },
                        { name: "Cascade São Nicolau", lat: 0.28, lng: 6.63 },
                        { name: "Parc National d'Obo", lat: 0.20, lng: 6.55 },
                        { name: "Ville de São Tomé", lat: 0.33, lng: 6.73 },
                        { name: "Praia Piscina", lat: 0.02, lng: 6.53 },
                        { name: "Roça Monte Café", lat: 0.30, lng: 6.64 },
                        { name: "Santo António (Príncipe)", lat: 1.64, lng: 7.42 },
                        { name: "Baía des Agulhas", lat: 1.62, lng: 7.37 },
                        { name: "Praia Banana", lat: 1.66, lng: 7.45 },
                        { name: "Cascade de l'Abade", lat: 1.60, lng: 7.40 }
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
        lagoa_azul: {
            titre: "Lagoa Azul",
            localisation: "Nord de Sao Tomé",
            periode: "Toute l'année",
            acces: "Route (30 min depuis Sao Tomé ville)",
            conseils: "Emportez masque et tuba, le lagon est riche en poissons tropicaux",
            contact: "Direction du Tourisme STP",
            hotel: "Mucumbli Ecolodge",
            hotelLoc: "Pont Figo (proche)",
            hotelFonct: "Villas en bois surplombant l'océan",
            hotelContact: "+239 222 23 23",
            hotelRestau: "Cuisine bio du jardin",
            guide: "Lina Rodrigues",
            guideContact: "lina@visitafrika.com"
        },
        cao_grande: {
            titre: "Pico Cão Grande",
            localisation: "Sud de Sao Tomé (Parc Obo)",
            periode: "Saison sèche (Juin-Sept) pour la visibilité",
            acces: "Route du Sud (RN2), arrêt photo ou trek",
            conseils: "Souvent entouré de brume, attendez le bon moment pour la photo parfaite",
            contact: "Parc National d'Obo",
            hotel: "Club Santana",
            hotelLoc: "Mesquita",
            hotelFonct: "Bungalows tropicaux et plage privée",
            hotelContact: "+239 222 66 66",
            hotelRestau: "Grillades de poisson",
            guide: "Lina Rodrigues",
            guideContact: "lina@visitafrika.com"
        },
        boca_inferno: {
            titre: "Boca do Inferno",
            localisation: "Côte Est de Sao Tomé",
            periode: "Toute l'année",
            acces: "Route côtière Sud",
            conseils: "Allez-y à marée haute pour voir les jets d'eau les plus hauts",
            contact: "Office local",
            hotel: "Pestana São Tomé",
            hotelLoc: "São Tomé ville",
            hotelFonct: "Hôtel 5 étoiles moderne",
            hotelContact: "+239 222 55 55",
            hotelRestau: "International & Local",
            guide: "N/A",
            guideContact: "N/A"
        },
        roca_neto: {
            titre: "Roça Agostinho Neto",
            localisation: "Nord de Sao Tomé",
            periode: "Toute l'année",
            acces: "Route (20 min depuis la capitale)",
            conseils: "Visitez le jardin botanique et l'hôpital colonial historique",
            contact: "Communauté de la Roça",
            hotel: "Omali Lodge",
            hotelLoc: "Praia Lagarto",
            hotelFonct: "Boutique hôtel chic et confortable",
            hotelContact: "+239 222 44 44",
            hotelRestau: "Fusion créole",
            guide: "Joao de Jesus",
            guideContact: "joao@visitafrika.com"
        },
        jale: {
            titre: "Praia Jalé",
            localisation: "Extrême Sud de Sao Tomé",
            periode: "Novembre à Mars (Ponte des tortues)",
            acces: "Route Sud (4x4 conseillé)",
            conseils: "Passez la nuit dans les bungalows pour voir les tortues pondre",
            contact: "Projet MARAPA",
            hotel: "Bungalows Praia Jalé",
            hotelLoc: "Sur la plage",
            hotelFonct: "Rustique, éco-responsable",
            hotelContact: "Sur place",
            hotelRestau: "Repas communautaires",
            guide: "Gardien de tortues",
            guideContact: "MARAPA"
        },
        rolas: {
            titre: "Ilhéu das Rolas",
            localisation: "Sud de Sao Tomé",
            periode: "Toute l'année",
            acces: "Bateau depuis Ponta Baleia (20 min)",
            conseils: "Prenez une photo sur le monument de la ligne de l'Équateur",
            contact: "Pestana Rolas Resort",
            hotel: "Pestana Equador",
            hotelLoc: "Sur l'îlot",
            hotelFonct: "Resort de vacances complet",
            hotelContact: "+239 222 00 00",
            hotelRestau: "Buffet international",
            guide: "N/A",
            guideContact: "N/A"
        },
        nicolau: {
            titre: "Cascade São Nicolau",
            localisation: "Hauts de Sao Tomé",
            periode: "Toute l'année",
            acces: "Route vers Monte Café",
            conseils: "L'eau est fraîche, parfait pour se ressourcer après une randonnée",
            contact: "N/A",
            hotel: "Mucumbli",
            hotelLoc: "Neves",
            hotelFonct: "Nature & Vue",
            hotelContact: "N/A",
            hotelRestau: "Gastronomie locale",
            guide: "N/A",
            guideContact: "N/A"
        },
        obo: {
            titre: "Parc National d'Obo",
            localisation: "Cœur de l'île",
            periode: "Saison sèche (Juin-Sept)",
            acces: "Plusieurs entrées (Bombaim, Lagoa Amelia)",
            conseils: "Randonnée vers la Lagoa Amelia, ancien cratère volcanique",
            contact: "Direction du Parc Obo",
            hotel: "Roça Bombaim",
            hotelLoc: "Bord du parc",
            hotelFonct: "Logement en plantation historique",
            hotelContact: "Sur place",
            hotelRestau: "Produits de la plantation",
            guide: "Lina Rodrigues",
            guideContact: "lina@visitafrika.com"
        },
        saotome_city: {
            titre: "Ville de São Tomé",
            localisation: "Côte Est",
            periode: "Toute l'année",
            acces: "Aéroport international (10 min)",
            conseils: "Ne manquez pas le Fort São Sebastião (Musée National)",
            contact: "Bureau du Tourisme",
            hotel: "Pestana São Tomé",
            hotelLoc: "Bord de mer",
            hotelFonct: "Luxe urbain",
            hotelContact: "+239 222 11 11",
            hotelRestau: "Cuisine internationale",
            guide: "Joao de Jesus",
            guideContact: "joao@visitafrika.com"
        },
        piscina: {
            titre: "Praia Piscina",
            localisation: "Sud de Sao Tomé",
            periode: "Saison sèche (vagues moins fortes)",
            acces: "Piste depuis Porto Alegre",
            conseils: "Baignade unique dans un bassin naturel de basalte",
            contact: "N/A",
            hotel: "Club Santana",
            hotelLoc: "São Tomé",
            hotelFonct: "Resort",
            hotelContact: "N/A",
            hotelRestau: "N/A",
            guide: "N/A",
            guideContact: "N/A"
        },
        monte_cafe: {
            titre: "Roça Monte Café",
            localisation: "Hauts plateaux",
            periode: "Toute l'année",
            acces: "Route bitumée depuis la capitale",
            conseils: "Goûtez le café Robusta et Arabica produit sur place",
            contact: "Coopérative Monte Café",
            hotel: "Ecolodge Monte Café",
            hotelLoc: "Dans la plantation",
            hotelFonct: "Authentique, frais (altitude)",
            hotelContact: "Sur place",
            hotelRestau: "Spécialités au café",
            guide: "Joao de Jesus",
            guideContact: "joao@visitafrika.com"
        },
        santo_antonio: {
            titre: "Santo António do Príncipe",
            localisation: "Île de Príncipe",
            periode: "Toute l'année",
            acces: "Vol (35 min de Sao Tomé) ou bateau",
            conseils: "L'ambiance la plus paisible au monde, pur 'Leve Leve'",
            contact: "Gouvernement régional de Príncipe",
            hotel: "Sundy Praia",
            hotelLoc: "Príncipe",
            hotelFonct: "Luxe absolu en pleine nature",
            hotelContact: "+239 223 00 00",
            hotelRestau: "Gastronomie 5 étoiles",
            guide: "Marco Gomes",
            guideContact: "marco@visitafrika.com"
        },
        agulhas: {
            titre: "Baía des Agulhas",
            localisation: "Príncipe, Réserve de Biosphère",
            periode: "Saison sèche",
            acces: "Bateau uniquement",
            conseils: "Vue imprenable sur les 'pics jumeaux' de l'île",
            contact: "UNESCO Príncipe",
            hotel: "Bom Bom Island Resort",
            hotelLoc: "Îlot au nord de Príncipe",
            hotelFonct: "Bungalows sur l'eau et en forêt",
            hotelContact: "+239 223 00 01",
            hotelRestau: "Poissons d'exception",
            guide: "Marco Gomes",
            guideContact: "marco@visitafrika.com"
        },
        banana: {
            titre: "Praia Banana",
            localisation: "Príncipe",
            periode: "Toute l'année",
            acces: "Route ou bateau",
            conseils: "La plage carte postale par excellence, eau cristalline",
            contact: "Tourisme Príncipe",
            hotel: "Sundy Praia",
            hotelLoc: "Príncipe",
            hotelFonct: "Tentes de luxe (Glamping)",
            hotelContact: "Via Sundy",
            hotelRestau: "Cuisine créole moderne",
            guide: "Marco Gomes",
            guideContact: "marco@visitafrika.com"
        },
        abade: {
            titre: "Cascade de l'Abade",
            localisation: "Sud de Príncipe",
            periode: "Saison sèche",
            acces: "Trek de 2h à travers la jungle",
            conseils: "Pour les amateurs de nature sauvage et de solitude",
            contact: "Parc Naturel de Príncipe",
            hotel: "N/A (Excursion)",
            hotelLoc: "N/A",
            hotelFonct: "N/A",
            hotelContact: "N/A",
            hotelRestau: "Pique-nique en forêt",
            guide: "Marco Gomes",
            guideContact: "marco@visitafrika.com"
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
                Demande envoyée ! Nos experts santoméens vous contacteront.
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
