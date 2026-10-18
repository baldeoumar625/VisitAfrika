/**
 * PROJET: VISIT AFRIKA
 * FICHIER: algerie.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

/**
 * VISIT AFRIKA - ALGERIE PAGE SCRIPT
 * Fully operational: Menu, Animations, Map, Modals, and Filters.
 */

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

document.addEventListener('DOMContentLoaded', // Fonction: 
    function () {
        console.log("Visit Afrika: Script algerie loaded.");

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
                        map = L.map('algerie-map').setView([25, 10], 5);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                    }
                    setTimeout(() => map.invalidateSize(), 100);
                } else {
                    mapContainer.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-map"></i> <span class="btn-text">Afficher la carte</span>';
                    this.style.background = '';
                }
            };
        }

        // Données détaillées des sites pour l'Algérie
        const infos = {
            casbah: {
                titre: "Casbah d'Alger",
                localisation: "Alger, Littoral",
                periode: "Toute l'année",
                acces: "Bus, Métro ou Taxi depuis le centre d'Alger",
                conseils: "Porter des chaussures confortables, guide recommandé pour les ruelles",
                contact: "Office du Tourisme d'Alger",
                hotel: "Hôtel El Djazaïr",
                hotelLoc: "Alger, Quartier des Ambassades",
                hotelFonct: "Palais historique, jardins luxueux, piscine, calme absolu",
                hotelContact: "+213 21 23 09 33",
                hotelRestau: "Gastronomie algérienne et internationale",
                guide: "Leila Benali",
                guideContact: "+213 555 12 34 56"
            },
            tassili: {
                titre: "Tassili n'Ajjer",
                localisation: "Sud-Est Algérien, Djanet",
                periode: "Octobre à Avril",
                acces: "Vol vers Djanet puis expédition 4x4",
                conseils: "Prévoir vêtements chauds pour la nuit, gourde, guide certifié obligatoire",
                contact: "Parc National du Tassili",
                hotel: "Hôtel des Zéribas",
                hotelLoc: "Djanet",
                hotelFonct: "Architecture traditionnelle, confort saharien, vue sur palmeraie",
                hotelContact: "+213 29 47 50 00",
                hotelRestau: "Couscous traditionnel et plats locaux",
                guide: "Amine Sahraoui",
                guideContact: "+213 666 98 76 54"
            },
            ghardaia: {
                titre: "Ghardaïa (Vallée du M'zab)",
                localisation: "Nord du Sahara",
                periode: "Septembre à Mai",
                acces: "Vol direct ou Route Transsaharienne",
                conseils: "Respecter les coutumes locales, photos limitées dans certains quartiers",
                contact: "Office du Tourisme du M'zab",
                hotel: "M'Zab Hotel",
                hotelLoc: "Ghardaïa",
                hotelFonct: "Hôtel de charme, piscine, architecture intégrée",
                hotelContact: "+213 29 88 15 15",
                hotelRestau: "Plats traditionnels mozabites",
                guide: "Youcef Brahimi",
                guideContact: "+213 550 11 22 33"
            },
            oran: {
                titre: "Oran la Radieuse",
                localisation: "Ouest Algérien, Littoral",
                periode: "Avril à Octobre",
                acces: "Aéroport international Ahmed Ben Bella",
                conseils: "Monter au Fort Santa Cruz pour la vue, flâner sur le front de mer",
                contact: "Tourisme Oranie",
                hotel: "Four Points by Sheraton",
                hotelLoc: "Oran, Front de Mer",
                hotelFonct: "Luxe moderne, vue sur mer, piscine sur le toit",
                hotelContact: "+213 41 59 02 02",
                hotelRestau: "Restaurant panoramique, cuisine fusion",
                guide: "Karim Meziane",
                guideContact: "+213 770 44 55 66"
            },
            djanet: {
                titre: "Oasis de Djanet",
                localisation: "Illizi, Grand Sud",
                periode: "Novembre à Mars",
                acces: "Vol Air Algérie vers Djanet",
                conseils: "Visiter le marché local, prévoir un sac de couchage premium",
                contact: "Agence Saharienne Djanet",
                hotel: "Camping de Luxe (Bivouac)",
                hotelLoc: "Dunes de l'Erg Admer",
                hotelFonct: "Expérience sous les étoiles, tentes équipées",
                hotelContact: "+213 661 00 11 22",
                hotelRestau: "Dîner au feu de camp, Taguella (pain de sable)",
                guide: "Brahim Touareg",
                guideContact: "+213 662 33 44 55"
            },
            djemila: {
                titre: "Ruines de Djemila (Cuicul)",
                localisation: "Wilaya de Sétif",
                periode: "Mars à Novembre",
                acces: "1h de route depuis Sétif",
                conseils: "Ne pas manquer le musée des mosaïques à l'entrée",
                contact: "Musée de Djemila",
                hotel: "Hôtel Novotel Sétif",
                hotelLoc: "Centre-ville de Sétif",
                hotelFonct: "Moderne, business, proche des sites d'intérêt",
                hotelContact: "+213 36 66 16 16",
                hotelRestau: "Cuisine internationale et locale",
                guide: "Ahmed Historien",
                guideContact: "+213 540 88 77 66"
            },
            hoggar: {
                titre: "Massif du Hoggar & Assekrem",
                localisation: "Tamanrasset",
                periode: "Hiver saharien (Oct-Avr)",
                acces: "Vol vers Tamanrasset puis 4x4 (80km de piste)",
                conseils: "Coucher de soleil à l'Assekrem incontournable",
                contact: "ONPS Tamanrasset",
                hotel: "Refuge de l'Assekrem",
                hotelLoc: "Sommet du massif",
                hotelFonct: "Confort spartiate mais vue divine, historique",
                hotelContact: "+213 29 34 44 44",
                hotelRestau: "Thé à la menthe et repas de montagne",
                guide: "Moussa du Hoggar",
                guideContact: "+213 664 22 33 11"
            },
            timgad: {
                titre: "Cité de Timgad",
                localisation: "Province de Batna",
                periode: "Printemps et Automne",
                acces: "Route depuis Batna (35 km)",
                conseils: "Visiter tôt le matin pour éviter la chaleur",
                contact: "Office Culturel de Batna",
                hotel: "Hôtel Chelia",
                hotelLoc: "Batna",
                hotelFonct: "Confortable, bien situé pour explorer les Aurès",
                hotelContact: "+213 33 80 50 50",
                hotelRestau: "Spécialités de la région des Aurès",
                guide: "Selma Archéo",
                guideContact: "+213 790 12 34 56"
            },
            constantine: {
                titre: "Ponts de Constantine",
                localisation: "Constantine, Ville des Ponts",
                periode: "Toute l'année",
                acces: "Aéroport Mohamed Boudiaf",
                conseils: "Traverser le pont de Sidi M'Cid à pied",
                contact: "Tourisme Cirta",
                hotel: "Marriott Constantine",
                hotelLoc: "Surplombant les gorges",
                hotelFonct: "Luxe international, vue spectaculaire",
                hotelContact: "+213 31 73 10 00",
                hotelRestau: "Gastronomie raffinée, buffet varié",
                guide: "Omar Ponts",
                guideContact: "+213 661 55 66 77"
            },
            tipaza: {
                titre: "Ruines de Tipaza",
                localisation: "Littoral, 70km d'Alger",
                periode: "Toute l'année, idéal au printemps",
                acces: "Autoroute de l'Ouest depuis Alger",
                conseils: "Lire Camus sur place, déguster des sardines au port",
                contact: "Parc Archéologique de Tipaza",
                hotel: "Hôtel la Corne d'Or",
                hotelLoc: "Bord de mer, Tipaza",
                hotelFonct: "Architecture Pouillon, accès plage, calme",
                hotelContact: "+213 24 47 00 00",
                hotelRestau: "Poissons frais du jour",
                guide: "Fatiha Guide",
                guideContact: "+213 551 22 33 44"
            },
            bejaia: {
                titre: "Cap Carbon & Gouraya",
                localisation: "Béjaïa, Kabylie Maritime",
                periode: "Mai à Septembre",
                acces: "Route ou Vol vers Béjaïa",
                conseils: "Randonnée vers le phare le plus haut du monde",
                contact: "Parc National de Gouraya",
                hotel: "Hôtel Atlantis",
                hotelLoc: "Akbou/Béjaïa",
                hotelFonct: "Moderne, grand confort, services complets",
                hotelContact: "+213 34 10 10 10",
                hotelRestau: "Spécialités kabyles",
                guide: "Malik Gouraya",
                guideContact: "+213 772 33 44 55"
            },
            annaba: {
                titre: "Basilique Saint-Augustin",
                localisation: "Annaba (Hippone)",
                periode: "Toute l'année",
                acces: "Route vers la colline d'Hippone",
                conseils: "Visiter les ruines romaines au pied de la basilique",
                contact: "Diocèse d'Annaba",
                hotel: "Hôtel Sheraton Annaba",
                hotelLoc: "Centre-ville, vue sur le port",
                hotelFonct: "Luxe, tour emblématique, piscine",
                hotelContact: "+213 38 45 20 00",
                hotelRestau: "Restaurant italien et méditerranéen",
                guide: "Sofiane Hippone",
                guideContact: "+213 663 11 22 33"
            },
            timimoun: {
                titre: "Oasis de Timimoun",
                localisation: "Gourara, Sahara",
                periode: "Décembre à Février",
                acces: "Vol direct depuis Alger",
                conseils: "Assister au lever de soleil sur les dunes rouges",
                contact: "Office du Tourisme de Timimoun",
                hotel: "Hôtel Gourara",
                hotelLoc: "Bord de la palmeraie",
                hotelFonct: "Architecture de terre (Pouillon), vue oasis",
                hotelContact: "+213 49 90 22 22",
                hotelRestau: "Plats sahariens traditionnels",
                guide: "Hamid Rouge",
                guideContact: "+213 661 44 55 66"
            },
            kalaa_beni_hammad: {
                titre: "Kalaa des Beni Hammad",
                localisation: "M'Sila, Hauts Plateaux",
                periode: "Automne et Printemps",
                acces: "Route depuis M'Sila (30 km)",
                conseils: "Site escarpé, prévoir de bonnes chaussures",
                contact: "Ministère de la Culture - Site Kalaa",
                hotel: "Hôtel Kerdada",
                hotelLoc: "Bou Saâda (proche)",
                hotelFonct: "Hôtel historique, charme oriental",
                hotelContact: "+213 35 52 11 11",
                hotelRestau: "Cuisine traditionnelle des hauts plateaux",
                guide: "Rachid Hammadi",
                guideContact: "+213 552 66 77 88"
            },
            chrea: {
                titre: "Parc National de Chréa",
                localisation: "Blida, Atlas Blidéen",
                periode: "Hiver (Ski) / Été (Fraîcheur)",
                acces: "Route sinueuse depuis Blida (Télécabine dispo)",
                conseils: "Prudence sur la route en hiver, neige fréquente",
                contact: "Parc National de Chréa",
                hotel: "Les Cèdres",
                hotelLoc: "Station de Chréa",
                hotelFonct: "Auberge de montagne, boisée, chaleureuse",
                hotelContact: "+213 25 21 11 22",
                hotelRestau: "Soupes chaudes et grillades",
                guide: "Karim Montagne",
                guideContact: "+213 770 11 22 33"
            }
        };

        // --- GESTION MODALE PREMIUM ---
        const modal = document.getElementById('visit-modal');
        const modalBody = document.getElementById('visit-modal-body');
        const closeBtn = document.querySelector('.visit-modal-close');

        function openModal(siteKey) {
            if (!modal || !modalBody) return;

            const data = infos[siteKey];
            if (!data) return;

            // Récupération de l'image de la carte correspondante
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
                        email: formData.get('contact'),
                        phone: formData.get('contact'),
                        date_visit: formData.get('date'),
                        guests: parseInt(formData.get('personnes')),
                        details: detailsStr
                    };

                    try {
                        const response = await fetch(getApiUrl('/api/reservations'), {
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

        const boutonsDecouvrir = document.querySelectorAll('.btn-decouvrir, .visit-btn');
        boutonsDecouvrir.forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                const siteKey = this.getAttribute('data-site');
                openModal(siteKey);
            };
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

                if (new Date(checkIn) >= new Date(checkOut)) {
                    alert("La date de départ doit être après la date d'arrivée.");
                    return;
                }

                const submitBtn = this.querySelector('button');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
                submitBtn.disabled = true;

                const guests = document.getElementById('guests').value;

                const data = {
                    hotel_name: hotel,
                    full_name: userName,
                    email: userContact,
                    check_in: checkIn,
                    check_out: checkOut,
                    guests: guests + " Personne(s)",
                    country: "Algérie"
                };

                try {
                    const response = await fetch(getApiUrl('/api/hotel_reservations'), {
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

        // 7. SEARCH & FILTERS
        const searchInput = document.querySelector('.search-input-wrapper input');
        const filterTags = document.querySelectorAll('.filter-tag');
        const attractions = document.querySelectorAll('.attraction');

        // Fonction: filterAttractions
        function filterAttractions() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const activeTag = document.querySelector('.filter-tag.active');
            const activeFilter = activeTag ? activeTag.textContent.trim() : 'Tous';

            attractions.forEach(card => {
                const h3 = card.querySelector('h3');
                const badge = card.querySelector('.badge-location');
                if (!h3 || !badge) return;

                const title = h3.textContent.toLowerCase();
                const badgeText = badge.textContent.trim();

                const matchesSearch = title.includes(searchTerm);
                const matchesFilter = activeFilter.startsWith('Tous') || badgeText.includes(activeFilter);

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        if (searchInput) searchInput.oninput = filterAttractions;

        filterTags.forEach(tag => {
            tag.onclick = function () {
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                filterAttractions();
            };
        });
    });
