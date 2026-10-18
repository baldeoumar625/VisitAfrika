/**
 * PROJET: VISIT AFRIKA
 * FICHIER: angola.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

﻿
// Gestion modale Visiter (infos pour chaque site)
// Données spécifiques pour l'Angola
const infos = {
    kalandula: {
        titre: 'Chutes de Kalandula',
        localisation: 'Province de Malanje',
        periode: 'Juin à août (débit idéal)',
        acces: 'Route depuis Malanje (85 km)',
        conseils: 'Prévoir k-way, chaussures antidérapantes, guide local',
        contact: 'Office du tourisme de Malanje',
        hotel: 'Pousada de Calandula',
        hotelLoc: 'Vue sur les chutes',
        hotelFonct: 'Chambres basiques, restaurant, vue panoramique',
        hotelContact: '+244 923 123 456',
        hotelRestau: 'Restaurant de la Pousada, cuisine locale',
        guide: 'Joao Manuel',
        guideContact: '+244 912 345 678'
    },
    kissama: {
        titre: 'Parc National de Kissama',
        localisation: '70 km au sud de Luanda',
        periode: 'Mai à octobre (saison sèche)',
        acces: '4x4 recommandé depuis Luanda',
        conseils: 'Safari tôt le matin, jumelles, vêtements neutres',
        contact: 'Direction du Parc',
        hotel: 'Kawa Camp',
        hotelLoc: 'Cœur du parc',
        hotelFonct: 'Bungalows écologiques, pension complète',
        hotelContact: '+244 934 567 890',
        hotelRestau: 'Repas inclus, cuisine internationale et angolaise',
        guide: 'Maria Costa',
        guideContact: '+244 923 456 789'
    },
    miradouro: {
        titre: 'Miradouro da Lua',
        localisation: '40 km au sud de Luanda',
        periode: 'Toute l’année, coucher de soleil recommandé',
        acces: 'Route nationale vers le sud, facile d\'accès',
        conseils: 'Appareil photo, éviter midi (chaleur)',
        contact: 'Tourisme Luanda',
        hotel: 'Ecolodge Do Bengo',
        hotelLoc: 'Proximité du site',
        hotelFonct: 'Cabanes bois, vue mer, calme',
        hotelContact: '+244 945 678 901',
        hotelRestau: 'Grillades de poissons, fruits de mer',
        guide: 'Antonio Silva',
        guideContact: '+244 912 345 000'
    },
    luanda: {
        titre: 'Luanda & Fortaleza',
        localisation: 'Capitale, côte Atlantique',
        periode: 'Toute l’année',
        acces: 'Aéroport international Quatro de Fevereiro',
        conseils: 'Visiter la forteresse, la Marginal, Ilha do Cabo',
        contact: 'Office du tourisme de Luanda',
        hotel: 'Epic Sana Luanda',
        hotelLoc: 'Centre-ville, Luanda',
        hotelFonct: 'Luxe, spa, piscines, restaurants',
        hotelContact: '+244 222 642 600',
        hotelRestau: 'Plusieurs restaurants, gastronomie fine',
        guide: 'Pedro Santos',
        guideContact: '+244 923 000 111'
    },
    tunda: {
        titre: 'Fissure de Tunda Vala',
        localisation: 'Près de Lubango, Huíla',
        periode: 'Toute l’année, ciel dégagé préférable',
        acces: 'Route goudronnée depuis Lubango',
        conseils: 'Veste (altitude), prudence aux bords',
        contact: 'Tourisme Huíla',
        hotel: 'Pululukwa Resort',
        hotelLoc: 'Lubango',
        hotelFonct: 'Lodge de charme, parc animalier, lac',
        hotelContact: '+244 923 456 123',
        hotelRestau: 'Restaurant avec vue, spécialités viandes',
        guide: 'Sofia Dias',
        guideContact: '+244 912 222 333'
    },
    mussulo: {
        titre: 'Île de Mussulo',
        localisation: 'Au large de Luanda',
        periode: 'Toute l’année, week-ends animés',
        acces: 'Bateau depuis l’embarcadère de Kapossoca',
        conseils: 'Crème solaire, sports nautiques, détente',
        contact: 'Clubs de plage locaux',
        hotel: 'Roça das Mangueiras',
        hotelLoc: 'Mussulo',
        hotelFonct: 'Bungalows plage, piscine, navette privée',
        hotelContact: '+244 923 999 888',
        hotelRestau: 'Fruits de mer frais, bar de plage',
        guide: 'Carlos Mendez',
        guideContact: '+244 934 444 555'
    },
    benguela: {
        titre: 'Plages de Benguela',
        localisation: 'Ville de Benguela',
        periode: 'Mai à Septembre',
        acces: 'Route depuis Luanda ou vol local',
        conseils: 'Visiter la Praia Morena au coucher du soleil',
        contact: 'Office du Tourisme de Benguela',
        hotel: 'Aparthotel Mil Cidades',
        hotelLoc: 'Benguela',
        hotelFonct: 'Confort moderne, piscine, restaurant',
        hotelContact: '+244 272 230 111',
        hotelRestau: 'Cuisine angolaise et internationale',
        guide: 'Isabel Gouveia',
        guideContact: '+244 921 111 222'
    },
    baia_azul: {
        titre: 'Baía Azul',
        localisation: 'Sud de Benguela',
        periode: 'Saison sèche recommandée',
        acces: '20 min de route depuis Benguela',
        conseils: 'Idéal pour la baignade (eaux calmes)',
        contact: 'Tourisme Benguela',
        hotel: 'Hotel Baía Azul',
        hotelLoc: 'Face à la baie',
        hotelFonct: 'Hôtel de plage, vue imprenable',
        hotelContact: '+244 932 333 444',
        hotelRestau: 'Poissons grillés, crevettes de Benguela',
        guide: 'Ricardo Jorge',
        guideContact: '+244 912 333 444'
    },
    namibe: {
        titre: 'Désert du Namibe',
        localisation: 'Province de Namibe',
        periode: 'Avril à Octobre',
        acces: 'Vol vers Moçâmedes (Namibe)',
        conseils: 'Chercher la plante Welwitschia Mirabilis',
        contact: 'Guides du désert Namibe',
        hotel: 'Hotel Infante Sagres',
        hotelLoc: 'Moçâmedes',
        hotelFonct: 'Historique, bien situé près de la côte',
        hotelContact: '+244 264 220 100',
        hotelRestau: 'Spécialités de fruits de mer',
        guide: 'Miguel Vanda',
        guideContact: '+244 923 555 666'
    },
    cabo_ledo: {
        titre: 'Plages de Cabo Ledo',
        localisation: 'Province de Luanda',
        periode: 'Juin à Octobre (pour le surf)',
        acces: '2h de route depuis Luanda',
        conseils: 'Parfait pour le camping de luxe (Glamping)',
        contact: 'Surf Club Angola',
        hotel: 'Carpe Diem Resort',
        hotelLoc: 'Sur la plage',
        hotelFonct: 'Écolodge, cours de surf, yoga',
        hotelContact: '+244 931 777 888',
        hotelRestau: 'Cuisine bio et produits locaux',
        guide: 'Zelia Bento',
        guideContact: '+244 912 888 999'
    },
    pedras_negras: {
        titre: 'Pedras Negras de Pungo Andongo',
        localisation: 'Malanje',
        periode: 'Saison sèche (Mai-Oct)',
        acces: '4x4 conseillé depuis Malanje',
        conseils: 'Voir les empreintes de la Reine Nzinga dans le roc',
        contact: 'Culture Malanje',
        hotel: 'Hotel Palanca',
        hotelLoc: 'Malanje',
        hotelFonct: 'Classique, propre, centre-ville',
        hotelContact: '+244 254 220 333',
        hotelRestau: 'Plats traditionnels angolais',
        guide: 'Domingos Lucas',
        guideContact: '+244 923 000 999'
    },
    serra_leba: {
        titre: 'Serra da Leba',
        localisation: 'Entre Huíla et Namibe',
        periode: 'Toute l\'année',
        acces: 'Route Lubango-Namibe',
        conseils: 'S\'arrêter au point de vue (Miradouro) en haut',
        contact: 'Tourisme Lubango',
        hotel: 'Casas do Campo',
        hotelLoc: 'Près de Lubango',
        hotelFonct: 'Nature, bungalows bois, calme',
        hotelContact: '+244 934 111 000',
        hotelRestau: 'Cuisine familiale du terroir',
        guide: 'Helena Paiva',
        guideContact: '+244 912 444 555'
    },
    lobito: {
        titre: 'Lobito Restinga',
        localisation: 'Ville de Lobito',
        periode: 'Toute l\'année',
        acces: 'Train ou Route depuis Benguela',
        conseils: 'Vie nocturne animée sur la Restinga',
        contact: 'Mairie de Lobito',
        hotel: 'Hotel Terminus Lobito',
        hotelLoc: 'Sur la Restinga',
        hotelFonct: 'Haut de gamme, bord de mer',
        hotelContact: '+244 272 222 100',
        hotelRestau: 'Buffet international réputé',
        guide: 'Paulo Ramos',
        guideContact: '+244 923 222 333'
    },
    mbanza_kongo: {
        titre: 'Mbanza Kongo',
        localisation: 'Province de Zaire',
        periode: 'Saison sèche',
        acces: 'Vol ou longue route depuis Luanda',
        conseils: 'Visiter le musée des Rois du Kongo (UNESCO)',
        contact: 'Musée de Mbanza Kongo',
        hotel: 'Hotel iU Mbanza Kongo',
        hotelLoc: 'Zaire',
        hotelFonct: 'Moderne, fonctionnel, standard international',
        hotelContact: '+244 222 600 700',
        hotelRestau: 'Service rapide, menu varié',
        guide: 'Bakongo Alphonse',
        guideContact: '+244 912 777 666'
    },
    christ_roi: {
        titre: 'Christ Roi (Lubango)',
        localisation: 'Lubango, Huíla',
        periode: 'Coucher de soleil recommandé',
        acces: 'Route sinueuse depuis le centre de Lubango',
        conseils: 'Vue à 360° sur la ville et la vallée',
        contact: 'Tourisme Huíla',
        hotel: 'Hotel Serra da Chela',
        hotelLoc: 'Lubango',
        hotelFonct: 'Piscine, jardins, grand confort',
        hotelContact: '+244 261 225 100',
        hotelRestau: 'Gastronomie portugaise et angolaise',
        guide: 'Teresa Lima',
        guideContact: '+244 923 888 777'
    }
};
document.addEventListener('DOMContentLoaded', function () {
    // --- GESTION DU FILTRAGE ---
    const searchInput = document.getElementById('attractionSearch');
    const filterTags = document.querySelectorAll('.filter-tag');
    const attractions = document.querySelectorAll('.attraction');

    function filterAttractions() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const activeTagEl = document.querySelector('.filter-tag.active');
        const activeTag = activeTagEl ? activeTagEl.getAttribute('data-filter') : 'all';

        attractions.forEach(card => {
            const h3 = card.querySelector('h3');
            const locText = card.querySelector('.location-text');
            
            const title = h3 ? h3.textContent.toLowerCase() : '';
            const location = locText ? locText.textContent.toLowerCase() : '';
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(query) || location.includes(query);
            const matchesTag = activeTag === 'all' || category === activeTag;

            if (matchesSearch && matchesTag) {
                card.style.setProperty('display', 'flex', 'important');
                // Petit délai pour l'animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.setProperty('display', 'none', 'important');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterAttractions);
    }

    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterAttractions();
        });
    });

    // --- GESTION DE LA CARTE ---
    const toggleMapBtn = document.getElementById('toggleMap');
    const mapContainer = document.getElementById('map-container');
    let mapInitialized = false;

    if (toggleMapBtn && mapContainer) {
        toggleMapBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isHidden = mapContainer.style.display === 'none';
            mapContainer.style.display = isHidden ? 'block' : 'none';
            
            const btnText = this.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = isHidden ? 'Masquer la carte' : 'Afficher la carte';
            }
            
            if (isHidden && !mapInitialized) {
                initMap();
                mapInitialized = true;
            }
        });
    }

    function initMap() {
        if (!document.getElementById('angola-map')) return;
        
        const map = L.map('angola-map').setView([-11.2027, 17.8739], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const markers = [
            { pos: [-9.0775, 15.2289], title: "Chutes de Kalandula" },
            { pos: [-9.4219, 13.2044], title: "Parc de Kissama" },
            { pos: [-9.1167, 13.1167], title: "Miradouro da Lua" },
            { pos: [-8.8147, 13.2302], title: "Luanda Historique" },
            { pos: [-14.7333, 13.4833], title: "Fissure de Tunda Vala" },
            { pos: [-8.8719, 13.1758], title: "Île de Mussulo" },
            { pos: [-12.5763, 13.4055], title: "Benguela & Baía Azul" },
            { pos: [-15.1961, 12.1522], title: "Désert du Namibe" },
            { pos: [-9.6892, 13.2094], title: "Cabo Ledo" },
            { pos: [-9.6833, 15.4833], title: "Pedras Negras" },
            { pos: [-14.9167, 13.4833], title: "Lubango (Christ Roi & Leba)" },
            { pos: [-12.3481, 13.5361], title: "Lobito" },
            { pos: [-6.2672, 14.2403], title: "Mbanza Kongo" }
        ];

        markers.forEach(m => {
            L.marker(m.pos).addTo(map).bindPopup(m.title);
        });
    }

    // --- GESTION MODALE ---
    const modal = document.getElementById('visit-modal');
    const modalBody = document.getElementById('visit-modal-body');
    const closeBtn = document.querySelector('.visit-modal-close');

    document.querySelectorAll('.visit-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const key = this.getAttribute('data-site');
            const data = infos[key];
            const attractionCard = this.closest('.attraction');
            let imgSrc = '';
            
            if (attractionCard) {
                const imgEl = attractionCard.querySelector('img');
                if (imgEl) imgSrc = imgEl.src;
            }
            
            if (data && modalBody) {
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
                                <strong>Guide local certifié :</strong> ${data.guide}<br>
                                <span class="guide-tel">${data.guideContact}</span>
                            </div>
                        </div>
                    </div>

                    <hr>
                    <form id="visit-form" class="visit-form-styled">
                        <div class="form-header">
                            <h4><i class="fas fa-paper-plane"></i> Demande de réservation</h4>
                            <p style="font-size: 13px; color: #636e72;">Remplissez ce formulaire pour recevoir un devis gratuit</p>
                        </div>
                        
                        <div class="form-group">
                            <label>Nom complet</label>
                            <input type="text" name="nom" placeholder="Votre nom et prénom" required>
                            <i class="fas fa-user input-icon"></i>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Date souhaitée</label>
                                <input type="date" name="date" required>
                            </div>
                            <div class="form-group">
                                <label>Participants</label>
                                <input type="number" name="personnes" min="1" max="20" value="1" required>
                                <i class="fas fa-users input-icon"></i>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Type d'expérience</label>
                            <select name="type">
                                <option value="standard">Standard (Visite simple)</option>
                                <option value="premium">Premium (Guide + Transport)</option>
                                <option value="all-inclusive">All-Inclusive (Hôtel + Repas + Guide)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Vos coordonnées</label>
                            <input type="text" name="contact" placeholder="Email ou Numéro WhatsApp" required>
                            <i class="fas fa-envelope input-icon"></i>
                        </div>

                        <div class="checkbox-group">
                            <input type="checkbox" id="guide-check" name="guide_needed">
                            <label for="guide-check">Besoin d'un guide local certifié ?</label>
                        </div>

                        <button type="submit" class="btn-submit">
                            <span>Confirmer ma demande</span>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </form>
                    <div id="visit-confirm" style="display:none;" class="alert-success-styled">
                        <i class="fas fa-check-circle"></i> Votre demande a été transmise ! Un conseiller vous contactera par WhatsApp ou Email sous peu.
                    </div>
                `;
                
                if (imgSrc) {
                    const modalContentEl = document.querySelector('.visit-modal-content');
                    if (modalContentEl) {
                        modalContentEl.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.97)), url("' + imgSrc + '")';
                        modalContentEl.style.backgroundSize = 'cover';
                        modalContentEl.style.backgroundPosition = 'center';
                    }
                }
                
                modal.style.display = 'block';

                const form = document.getElementById('visit-form');
                if (form) {
                    form.onsubmit = async function (e) {
                        e.preventDefault();
                        
                        const formData = new FormData(form);
                        const guideNeeded = formData.get('guide_needed') ? 'Oui' : 'Non';
                        const detailsStr = `Type: ${formData.get('type')} | Guide: ${guideNeeded}`;
                        
                        const payload = {
                            site_name: data.titre,
                            full_name: formData.get('nom'),
                            email: formData.get('contact'), // Utilisé comme email par défaut
                            phone: formData.get('contact'), 
                            date_visit: formData.get('date'),
                            guests: parseInt(formData.get('personnes')),
                            details: detailsStr
                        };

                        try {
                            const response = await fetch('/api/reservations', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            });

                            if (response.ok) {
                                form.style.display = 'none';
                                const confirmMsg = document.getElementById('visit-confirm');
                                if (confirmMsg) confirmMsg.style.display = 'block';
                            } else {
                                alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
                            }
                        } catch (error) {
                            console.error("Erreur:", error);
                            alert("Impossible de contacter le serveur.");
                        }
                    };
                }
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function () {
            if (modal) modal.style.display = 'none';
        };
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    // --- GESTION DU FORMULAIRE DE RÉSERVATION D'HÔTEL ---
    const hotelBookingForm = document.getElementById('hotel-booking-form');
    if (hotelBookingForm) {
        hotelBookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const hotel = document.getElementById('hotel-select').options[document.getElementById('hotel-select').selectedIndex].text;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const userName = document.getElementById('user-name').value;
            const userContact = document.getElementById('user-contact').value;
            const guestsNum = document.getElementById('guests').value;

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
                guests: guestsNum + " Personne(s)",
                country: "Angola"
            };

            try {
                const response = await fetch('/api/hotel_reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert(`Félicitations ${userName} ! Votre demande pour l'hôtel ${hotel} en Angola a été enregistrée avec succès.`);
                    hotelBookingForm.reset();
                } else {
                    alert("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
                }
            } catch (error) {
                console.error("Erreur:", error);
                alert("Impossible de contacter le serveur de réservation.");
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});


