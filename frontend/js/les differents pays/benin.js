/**
 * PROJET: VISIT AFRIKA
 * FICHIER: benin.js
 * DESCRIPTION: Script pour la page Bénin, basé sur le modèle fonctionnel de l'Algérie.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Bénin chargé.");

    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (menuToggle && navbarMenu) {
        menuToggle.onclick = function () {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        };
    }

    // 2. ANIMATIONS
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

    const h1 = document.querySelector('.hero-title');
    if (h1) {
        h1.style.opacity = '0';
        h1.style.transform = 'translate(-50%, -40%)';
        setTimeout(() => {
            h1.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            h1.style.opacity = '1';
            h1.style.transform = 'translate(-50%, -50%)';
        }, 300);
    }

    // 3. INTERACTIVE MAP (LEAFLET)
    const toggleMapBtn = document.getElementById('toggleMap');
    const mapContainer = document.getElementById('map-container');
    let map = null;

    if (toggleMapBtn && mapContainer) {
        toggleMapBtn.onclick = function (e) {
            e.preventDefault();
            const isHidden = (mapContainer.style.display === 'none' || mapContainer.style.display === '');

            if (isHidden) {
                mapContainer.style.display = 'block';
                this.innerHTML = '<i class="fas fa-times"></i> <span class="btn-text">Fermer la carte</span>';
                this.style.background = '#e74c3c';

                if (!map) {
                    map = L.map('benin-map').setView([9.3077, 2.3158], 7);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                    const sites = [
                        { name: "Ganvié", lat: 6.4678, lng: 2.4136 },
                        { name: "Ouidah", lat: 6.3667, lng: 2.0833 },
                        { name: "Abomey", lat: 7.1833, lng: 1.9833 },
                        { name: "Pendjari", lat: 11.23, lng: 1.50 },
                        { name: "Grand-Popo", lat: 6.28, lng: 1.83 },
                        { name: "Porto-Novo", lat: 6.4969, lng: 2.6289 }
                    ];
                    sites.forEach(s => L.marker([s.lat, s.lng]).addTo(map).bindPopup(s.name));
                }
                setTimeout(() => map.invalidateSize(), 100);
            } else {
                mapContainer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-map"></i> <span class="btn-text">Afficher la carte</span>';
                this.style.background = '';
            }
        };
    }

    // 4. DONNÉES DÉTAILLÉES (INFOS)
    const infos = {
        ganvie: {
            titre: "Ganvié (Venise de l'Afrique)",
            localisation: "Lac Nokoué, Atlantique",
            periode: "Toute l'année",
            acces: "Embarcadère d'Abomey-Calavi puis pirogue",
            conseils: "Visitez le marché flottant matinal et respectez la vie privée des habitants.",
            contact: "Office de Tourisme d'Abomey-Calavi",
            hotel: "Hôtel Tata Somba (ou séjour à Cotonou)",
            hotelLoc: "Cotonou",
            hotelFonct: "Confortable, piscine, idéal pour rayonner",
            hotelContact: "+229 21 30 11 11",
            hotelRestau: "Poissons et crustacés frais",
            guide: "Sika Almeida",
            guideContact: "+229 97 00 11 22"
        },
        ouidah: {
            titre: "Ouidah (Cité Historique)",
            localisation: "Département de l'Atlantique",
            periode: "Janvier (Fête du Vaudou)",
            acces: "Route (45 min de Cotonou)",
            conseils: "Prévoyez 3 heures pour la Route des Esclaves jusqu'à la Porte du Non-Retour.",
            contact: "Office du Tourisme de Ouidah",
            hotel: "La Casa del Papa",
            hotelLoc: "Ouidah Plage",
            hotelFonct: "Bungalows haut de gamme, bord de mer, détente absolue",
            hotelContact: "+229 21 34 70 01",
            hotelRestau: "Buffets locaux et internationaux",
            guide: "Koffi Gado",
            guideContact: "+229 95 66 77 88"
        },
        abomey: {
            titre: "Palais Royaux d'Abomey",
            localisation: "Zou",
            periode: "Saison sèche (Nov-Mars)",
            acces: "Route goudronnée (2h30 de Cotonou)",
            conseils: "Classé à l'UNESCO. Guide obligatoire pour comprendre la complexité du royaume Danxomé.",
            contact: "Direction du Musée d'Abomey",
            hotel: "Hôtel Sun City",
            hotelLoc: "Abomey",
            hotelFonct: "Hôtel moderne avec vue sur la ville historique",
            hotelContact: "+229 22 50 01 02",
            hotelRestau: "Spécialité Dakouin (plat local)",
            guide: "Koffi Adjibi",
            guideContact: "+229 90 11 22 33"
        },
        pendjari: {
            titre: "Parc National de la Pendjari",
            localisation: "Atacora",
            periode: "Décembre à Mai",
            acces: "Véhicule 4x4 indispensable",
            conseils: "Réservez votre safari à l'avance. Prévoyez des vêtements de couleur neutre.",
            contact: "African Parks - Pendjari",
            hotel: "Pendjari Lodge",
            hotelLoc: "Cœur du Parc",
            hotelFonct: "Éco-lodge de luxe, immersion totale dans la savane",
            hotelContact: "+229 61 00 22 33",
            hotelRestau: "Gastronomie de brousse raffinée",
            guide: "Bio Bata",
            guideContact: "+229 62 44 55 66"
        },
        grand_popo: {
            titre: "Grand-Popo & Bouche du Roy",
            localisation: "Mono",
            periode: "Octobre à Avril",
            acces: "Route Cotonou-Lomé",
            conseils: "Sortie en pirogue à la Bouche du Roy pour voir la rencontre fleuve-mer.",
            contact: "Mairie de Grand-Popo",
            hotel: "Auberge de Grand-Popo",
            hotelLoc: "Bord de mer",
            hotelFonct: "Charme colonial, jardins tropicaux, pieds dans l'eau",
            hotelContact: "+229 22 44 11 00",
            hotelRestau: "Langoustes grillées",
            guide: "Sika Almeida",
            guideContact: "+229 97 00 11 22"
        },
        porto_novo: {
            titre: "Porto-Novo (La Capitale)",
            localisation: "Ouémé",
            periode: "Toute l'année",
            acces: "Route (1h de Cotonou)",
            conseils: "Visitez le Jardin des Plantes et de la Nature et le Musée Da Silva.",
            contact: "Direction du Tourisme Ouémé",
            hotel: "Hôtel Freedom",
            hotelLoc: "Porto-Novo Centre",
            hotelFonct: "Hôtel de standing, calme et central",
            hotelContact: "+229 20 22 33 44",
            hotelRestau: "Plats traditionnels Goun",
            guide: "Koffi Adjibi",
            guideContact: "+229 90 11 22 33"
        },
        cotonou_marche: {
            titre: "Marché Dantokpa",
            localisation: "Littoral, Cotonou",
            periode: "Toute l'année",
            acces: "Taxi ou Zémidjan",
            conseils: "Plus grand marché d'Afrique de l'Ouest. Attention aux pickpockets.",
            contact: "Administration SOGEMA",
            hotel: "Golden Tulip Le Diplomate",
            hotelLoc: "Cotonou",
            hotelFonct: "Luxe international, centre d'affaires, spa",
            hotelContact: "+229 21 30 52 22",
            hotelRestau: "Restaurant panoramique",
            guide: "Sika Almeida",
            guideContact: "+229 97 00 11 22"
        },
        temple_pythons: {
            titre: "Temple des Pythons",
            localisation: "Ouidah",
            periode: "Toute l'année",
            acces: "Centre-ville de Ouidah",
            conseils: "Lieu sacré du Vaudou. Possibilité de porter un python autour du cou.",
            contact: "Communauté Vaudou Ouidah",
            hotel: "Hôtel de la Plage",
            hotelLoc: "Ouidah",
            hotelFonct: "Historique, proche des sites",
            hotelContact: "N/A",
            hotelRestau: "Bar-Restaurant convivial",
            guide: "Koffi Gado",
            guideContact: "+229 95 66 77 88"
        },
        route_esclaves: {
            titre: "Route des Esclaves",
            localisation: "Ouidah",
            periode: "Toute l'année",
            acces: "Marche à pied recommandée",
            conseils: "Mémorial poignant. Prenez un guide pour l'histoire des 4 étapes.",
            contact: "Office Ouidah",
            hotel: "Bungalows de la Mer",
            hotelLoc: "Porte du Non-Retour",
            hotelFonct: "Éco-lodges face à l'Océan",
            hotelContact: "N/A",
            hotelRestau: "Plats de mer",
            guide: "Koffi Gado",
            guideContact: "+229 95 66 77 88"
        },
        tanougou: {
            titre: "Chutes de Tanougou",
            localisation: "Atacora",
            periode: "Toute l'année (Surtout fin de saison des pluies)",
            acces: "Piste depuis Natitingou",
            conseils: "Baignade possible. Portez des sandales d'eau.",
            contact: "Syndicat local d'initiative",
            hotel: "Hôtel Tata Somba",
            hotelLoc: "Natitingou",
            hotelFonct: "Piscine, base de départ pour l'Atacora",
            hotelContact: "+229 23 83 11 22",
            hotelRestau: "Ignames pilées",
            guide: "Bio Bata",
            guideContact: "+229 62 44 55 66"
        },
        natitingou: {
            titre: "Natitingou / Tata Somba",
            localisation: "Atacora",
            periode: "Octobre à Mars",
            acces: "Route goudronnée (8h de Cotonou)",
            conseils: "Le pays Somba offre des paysages de châteaux de terre uniques au monde.",
            contact: "Office Atacora",
            hotel: "Hôtel Tata Somba",
            hotelLoc: "Natitingou",
            hotelFonct: "Hôtel emblématique de l'Atacora, architecture inspirée des Tata",
            hotelContact: "+229 23 82 11 22",
            hotelRestau: "Spécialités du Nord-Bénin",
            guide: "Bio Bata",
            guideContact: "+229 62 44 55 66"
        },
        zinsou: {
            titre: "Fondation Zinsou (Ouidah)",
            localisation: "Atlantique",
            periode: "Toute l'année",
            acces: "Centre-ville Ouidah",
            conseils: "Entrée gratuite. Art contemporain africain de classe mondiale.",
            contact: "Fondation Zinsou",
            hotel: "Hôtels Ouidah",
            hotelLoc: "Ouidah",
            hotelFonct: "Diverses options",
            hotelContact: "N/A",
            hotelRestau: "Café de la Fondation",
            guide: "Interne",
            guideContact: "N/A"
        },
        bouche_du_roy: {
            titre: "La Bouche du Roy",
            localisation: "Mono",
            periode: "Toute l'année",
            acces: "Bateau depuis Grand-Popo",
            conseils: "Réserve de biosphère de l'UNESCO. Mangroves et oiseaux migrateurs.",
            contact: "Association de gestion locale",
            hotel: "Auberge Grand-Popo",
            hotelLoc: "Grand-Popo",
            hotelFonct: "Cadre idyllique",
            hotelContact: "N/A",
            hotelRestau: "Local",
            guide: "Sika Almeida",
            guideContact: "+229 97 00 11 22"
        },
        parc_w: {
            titre: "Parc National du W (Bénin)",
            localisation: "Alibori / Atacora",
            periode: "Décembre à Avril",
            acces: "Route depuis Kandi ou Banikoara",
            conseils: "Zone transfrontalière sauvage. Guide armé/certifié souvent nécessaire.",
            contact: "CENAGREF Bénin",
            hotel: "Campement Ecomax",
            hotelLoc: "Aux abords du parc",
            hotelFonct: "Hébergement rustique pour aventuriers",
            hotelContact: "N/A",
            hotelRestau: "Repas de brousse",
            guide: "Bio Bata",
            guideContact: "+229 62 44 55 66"
        },
        possotome: {
            titre: "Possotomé",
            localisation: "Mono, Lac Ahémé",
            periode: "Toute l'année",
            acces: "Route goudronnée",
            conseils: "Faites le circuit de l'eau. Sources thermales naturelles.",
            contact: "Office local de tourisme",
            hotel: "Hôtel Chez Théo",
            hotelLoc: "Bord du lac Ahémé",
            hotelFonct: "Paillotes sur l'eau, calme, thermalisme",
            hotelContact: "+229 97 13 04 31",
            hotelRestau: "Moyen (pêche locale)",
            guide: "Sika Almeida",
            guideContact: "+229 97 00 11 22"
        }
    };

    // 5. GESTION MODALE (MODÈLE ALGÉRIE)
    const modal = document.getElementById('visit-modal');
    const modalBody = document.getElementById('visit-modal-body');
    const closeBtn = document.querySelector('.visit-modal-close');

    function openModal(siteKey) {
        if (!modal || !modalBody) return;

        const data = infos[siteKey];
        if (!data) {
            console.error("Données manquantes pour:", siteKey);
            return;
        }

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
                <div class="info-item"><i class="fas fa-calendar-check"></i><div><strong>Période</strong><br>${data.periode}</div></div>
                <div class="info-item"><i class="fas fa-car"></i><div><strong>Accès</strong><br>${data.acces}</div></div>
                <div class="info-item"><i class="fas fa-lightbulb"></i><div><strong>Conseils</strong><br>${data.conseils}</div></div>
                <div class="info-item"><i class="fas fa-headset"></i><div><strong>Contact</strong><br>${data.contact}</div></div>
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
                    <div><strong>Guide Expert :</strong> ${data.guide}<br><span class="guide-tel">${data.guideContact}</span></div>
                </div>
            </div>
            <hr>
            <form id="visit-form" class="visit-form-styled">
                <div class="form-header"><h4><i class="fas fa-paper-plane"></i> Réserver mon séjour</h4></div>
                <div class="form-group"><label>Nom complet</label><input type="text" name="nom" required><i class="fas fa-user input-icon"></i></div>
                <div class="form-row">
                    <div class="form-group"><label>Date souhaitée</label><input type="date" name="date" required></div>
                    <div class="form-group"><label>Voyageurs</label><input type="number" name="guests" min="1" value="2" required><i class="fas fa-users input-icon"></i></div>
                </div>
                <div class="form-group"><label>Contact (Email/WhatsApp)</label><input type="text" name="contact" required><i class="fas fa-envelope input-icon"></i></div>
                <button type="submit" class="btn-submit">Confirmer ma demande <i class="fas fa-chevron-right"></i></button>
            </form>
            <div id="visit-confirm" style="display:none;" class="alert-success-styled">
                <i class="fas fa-check-circle"></i> Demande envoyée ! Notre équipe vous contactera rapidement.
            </div>
        `;

        if (imgSrc) {
            const content = document.querySelector('.visit-modal-content');
            if (content) {
                content.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.98)), url("${imgSrc}")`;
                content.style.backgroundSize = 'cover';
            }
        }

        modal.style.display = 'block';

        const form = document.getElementById('visit-form');
        if (form) {
            form.onsubmit = async function (e) {
                e.preventDefault();
                const formData = new FormData(form);
                const payload = {
                    site_name: data.titre,
                    full_name: formData.get('nom'),
                    email: formData.get('contact'),
                    date_visit: formData.get('date'),
                    guests: parseInt(formData.get('guests')),
                    country: "Bénin"
                };

                try {
                    const response = await fetch('/api/reservations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (response.ok) {
                        form.style.display = 'none';
                        document.getElementById('visit-confirm').style.display = 'block';
                    } else {
                        alert("Erreur lors de l'envoi.");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Serveur injoignable.");
                }
            };
        }
    }

    const triggerButtons = document.querySelectorAll('.visit-btn, .btn-decouvrir');
    triggerButtons.forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const key = this.getAttribute('data-site');
            openModal(key);
        };
    });

    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    // 6. HOTEL BOOKING FORM HANDLER
    const bookingForm = document.getElementById('hotel-booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const hotel = document.getElementById('hotel-select').options[document.getElementById('hotel-select').selectedIndex].text;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const userName = document.getElementById('user-name').value;
            const userContact = document.getElementById('user-contact').value;
            const guests = document.getElementById('guests').value;

            if (new Date(checkIn) >= new Date(checkOut)) {
                alert("La date de départ doit être après la date d'arrivée.");
                return;
            }

            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;

            const data = {
                hotel_name: hotel,
                full_name: userName,
                email: userContact,
                check_in: checkIn,
                check_out: checkOut,
                guests: guests + " Personne(s)",
                country: "Bénin"
            };

            try {
                const response = await fetch('/api/hotel_reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert(`Félicitations ${userName} ! Votre demande pour l'hôtel ${hotel} a été enregistrée avec succès.`);
                    bookingForm.reset();
                } else {
                    alert("Erreur lors de l'envoi de la réservation.");
                }
            } catch (error) {
                console.error("Erreur:", error);
                alert("Impossible de contacter le serveur.");
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 7. RECHERCHE ET FILTRAGE (MODÈLE ALGÉRIE)
    const searchInput = document.getElementById('attractionSearch');
    const filterTags = document.querySelectorAll('.filter-tag');
    const attractions = document.querySelectorAll('.attraction');

    function performFiltering() {
        const q = searchInput ? searchInput.value.toLowerCase() : '';
        const activeTag = document.querySelector('.filter-tag.active');
        const activeFilter = activeTag ? activeTag.getAttribute('data-filter') : 'all';

        attractions.forEach(card => {
            const h3 = card.querySelector('h3');
            const category = card.getAttribute('data-category');
            if (!h3) return;

            const title = h3.textContent.toLowerCase();
            const matchesSearch = title.includes(q);
            const matchesFilter = activeFilter === 'all' || category === activeFilter;

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex'; // Use flex to maintain card layout
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', performFiltering);
    }

    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            performFiltering();
        });
    });
});
