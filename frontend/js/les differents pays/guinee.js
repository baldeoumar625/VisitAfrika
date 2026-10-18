/**
 * PROJET: VISIT AFRIKA
 * FICHIER: guinee.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

/**
 * VISIT AFRIKA - GUINEA PAGE SCRIPT
 * Handles animations, modals, and interactive map.
 */

document.addEventListener('DOMContentLoaded', // Fonction: 
    function () {
        console.log("Visit Afrika: Script Guinea loaded.");

        // 1. MOBILE MENU TOGGLE
        const menuToggle = document.getElementById('menuToggle');
        const navbarMenu = document.getElementById('navbarMenu');
        if (menuToggle && navbarMenu) {
            menuToggle.addEventListener('click', // Fonction: 
                function () {
                    this.classList.toggle('active');
                    navbarMenu.classList.toggle('active');
                });

            // Close menu when a link is clicked
            navbarMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', // Fonction: 
                    function () {
                        menuToggle.classList.remove('active');
                        navbarMenu.classList.remove('active');
                    });
            });
        }

        // 2. ATTRACTIO CARDS ANIMATION
        const attractionCards = document.querySelectorAll('.attraction');
        attractionCards.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            setTimeout(() => {
                item.style.transition = 'opacity 0.7s cubic-bezier(.4,1.7,.6,.95), transform 0.7s cubic-bezier(.4,1.7,.6,.95)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + i * 180);
        });

        // 3. TITLE ANIMATION
        const heroTitle = document.querySelector('.hero-title h1');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'scale(0.8)';
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s cubic-bezier(.4,1.7,.6,.95)';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'scale(1)';
            }, 300);
        }

        // 4. INTERACTIVE MAP (LEAFLET)
        let guineeMap = null;

        // Fonction: initGuineeMap
        function initGuineeMap() {
            console.log("Initializing map...");
            try {
                // Centered on Guinea [Lat, Lng]
                guineeMap = L.map('guinee-map').setView([10.5, -11.5], 7);

                L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 18
                }).addTo(guineeMap);

                const points = [
                    { name: "Conakry (Îles de Loos & Musée)", coords: [9.509, -13.712], description: "Capitale vibrante et archipel paradisiaque." },
                    { name: "Voile de la Mariée (Kindia)", coords: [10.056, -12.864], description: "Chute d'eau emblématique de la région de Kindia." },
                    { name: "Mont Loura (Dame du Mali)", coords: [11.324, -12.283], description: "Le plus haut sommet du Fouta Djalon." },
                    { name: "Chutes de Kinkon (Pita)", coords: [11.050, -12.400], description: "Spectaculaires cascades dans le Fouta." },
                    { name: "Parc du Haut Niger (Faranah)", coords: [10.040, -10.743], description: "Sanctuaire sauvage du fleuve Niger." }
                ];

                points.forEach(point => {
                    L.marker(point.coords).addTo(guineeMap)
                        .bindPopup(`
                        <div style="font-family: 'Segoe UI', sans-serif; padding: 5px; min-width: 150px;">
                            <strong style="color: #1a9c6c; font-size: 15px;">${point.name}</strong>
                            <p style="margin: 5px 0 0; font-size: 13px; color: #666;">${point.description}</p>
                        </div>
                    `);
                });
                console.log("Map initialized successfully.");
            } catch (error) {
                console.error("Leaflet initialization failed: ", error);
            }
        }

        // Consolidated Map Toggle Logic
        const toggleMapBtn = document.getElementById('toggleMap');
        const mapContainer = document.getElementById('map-container');

        if (toggleMapBtn && mapContainer) {
            toggleMapBtn.addEventListener('click', // Fonction: 
                function (e) {
                    e.preventDefault();
                    console.log("Map Button Clicked");

                    const isHidden = (window.getComputedStyle(mapContainer).display === 'none');

                    if (isHidden) {
                        mapContainer.style.display = 'block';
                        this.innerHTML = '<i class="fas fa-times"></i> <span class="btn-text">Masquer la carte</span>';
                        this.style.backgroundColor = '#e74c3c';

                        if (!guineeMap) {
                            initGuineeMap();
                        } else {
                            setTimeout(() => { guineeMap.invalidateSize(); }, 200);
                        }
                        mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        mapContainer.style.display = 'none';
                        this.innerHTML = '<i class="fas fa-map"></i> <span class="btn-text">Afficher la carte</span>';
                        this.style.backgroundColor = '';
                    }
                });
        }

        // 5. MODAL MANAGEMENT (VISIT)
        const modal = document.getElementById('visit-modal');
        const modalContent = document.querySelector('.visit-modal-content');
        const modalBody = document.getElementById('visit-modal-body');
        const closeBtn = document.querySelector('.visit-modal-close');

        // Data for attractions
        const infos = {
            loura: { titre: 'Mont Loura', localisation: 'Près de Mali, Fouta Djalon', hotel: 'Hôtel Mali', guide: 'Mamadou Diallo' },
            loos: { titre: 'Îles de Loos', localisation: 'Large de Conakry', hotel: 'Le Sorbier', guide: 'Fatou Camara' },
            // ... abbreviated for brevity, logic remains the same
        };

        // Generic show modal function
        // Fonction: openModal
        function openModal(siteKey, imgSrc) {
            if (!modal || !modalBody) return;

            const data = infos[siteKey] || { titre: 'Attraction', localisation: 'Guinée' };

            modalBody.innerHTML = `
            <h3>${data.titre}</h3>
            <p><strong>Localisation :</strong> ${data.localisation}</p>
            <p><strong>Hôtel suggéré :</strong> ${data.hotel || 'Disponible sur demande'}</p>
            <hr>
            <form id="visit-form">
                <div class="form-group">
                    <label>Votre Nom</label>
                    <input type="text" required class="form-control">
                </div>
                <button type="submit" class="btn-ajouter" style="width:100%">Réserver ma visite</button>
            </form>
            <div id="confirm-msg" style="display:none; color: green; font-weight: bold; margin-top: 15px;">Demande transmise !</div>
        `;

            if (imgSrc && modalContent) {
                modalContent.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('${imgSrc}')`;
                modalContent.style.backgroundSize = 'cover';
            }

            modal.style.display = 'block';

            const form = document.getElementById('visit-form');
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    form.style.display = 'none';
                    document.getElementById('confirm-msg').style.display = 'block';
                };
            }
        }

        // Bind all buttons with 'visit-btn' OR 'btn-decouvrir'
        document.querySelectorAll('.btn-decouvrir, .visit-btn').forEach(btn => {
            btn.addEventListener('click', // Fonction: 
                function (e) {
                    e.preventDefault();
                    const siteKey = this.getAttribute('data-site');
                    const parent = this.closest('.attraction');
                    const imgEl = parent ? parent.querySelector('img') : null;
                    openModal(siteKey, imgEl ? imgEl.src : '');
                });
        });

        if (closeBtn) {
            closeBtn.onclick = () => modal.style.display = 'none';
        }

        // 6. FILTERING AND SEARCH LOGIC
        const searchInput = document.querySelector('.search-input-wrapper input');
        const filterTags = document.querySelectorAll('.filter-tag');
        const attractions = document.querySelectorAll('.attractions-grid .attraction');

        // Fonction: filterAttractions
        function filterAttractions() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const activeTag = document.querySelector('.filter-tag.active');
            const activeFilter = activeTag ? activeTag.textContent.trim() : 'Tous';

            let visibleCount = 0;

            attractions.forEach(attraction => {
                const title = attraction.querySelector('h3') ? attraction.querySelector('h3').textContent.toLowerCase() : '';
                const locationText = attraction.querySelector('.location-text') ? attraction.querySelector('.location-text').textContent.toLowerCase() : '';
                const badgeLocation = attraction.querySelector('.badge-location') ? attraction.querySelector('.badge-location').textContent.trim() : '';

                const matchesSearch = title.includes(searchTerm) || locationText.includes(searchTerm);

                let matchesFilter = false;
                if (activeFilter.startsWith('Tous')) {
                    matchesFilter = true;
                } else {
                    matchesFilter = badgeLocation.includes(activeFilter);
                }

                if (matchesSearch && matchesFilter) {
                    attraction.style.display = '';
                    visibleCount++;
                } else {
                    attraction.style.display = 'none';
                }
            });

            // Update the "Tous" count text if it exists
            const tousTag = Array.from(filterTags).find(t => t.textContent.startsWith('Tous'));
            if (tousTag && !tousTag.classList.contains('active')) {
                // Keep original text
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterAttractions);
        }

        if (filterTags.length > 0) {
            filterTags.forEach(tag => {
                tag.addEventListener('click', function () {
                    filterTags.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    filterAttractions();
                });
            });
        }

        window.onclick = (e) => {
            if (typeof modal !== 'undefined' && e.target === modal) modal.style.display = 'none';
        };

        // 7. HOTEL BOOKING FORM HANDLER
        const bookingForm = document.getElementById('hotel-booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', async function (e) {
                e.preventDefault();

                const hotel = document.getElementById('hotel-select').options[document.getElementById('hotel-select').selectedIndex].text;
                const checkIn = document.getElementById('check-in').value;
                const checkOut = document.getElementById('check-out').value;
                const travelers = document.getElementById('guests').value;

                // Simple validation
                if (new Date(checkIn) >= new Date(checkOut)) {
                    alert("La date de départ doit être après la date d'arrivée.");
                    return;
                }

                // UI Feedback
                const submitBtn = this.querySelector('button');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';
                submitBtn.disabled = true;

                const data = {
                    hotel_name: hotel,
                    full_name: "Client Visit Afrika",
                    email: "visiteur@visitafrika.com",
                    check_in: checkIn,
                    check_out: checkOut,
                    guests: travelers + " Voyageur(s)"
                };

                console.log("Sending booking data:", data);

                const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
                    ? `http://127.0.0.1:8000${path}` 
                    : path;

                try {
                    const response = await fetch(getApiUrl('/api/hotel_reservations'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log("Success:", result);
                        alert(`Félicitations ! Votre demande de réservation au ${hotel} a été enregistrée.`);
                        bookingForm.reset();
                    } else {
                        const errorMsg = await response.text();
                        console.error("Server Error:", errorMsg);
                        alert("Le serveur a refusé la réservation. Veuillez vérifier les dates.");
                    }
                } catch (error) {
                    console.error("Fetch Error:", error);
                    alert("Impossible de contacter le serveur.");
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    });

