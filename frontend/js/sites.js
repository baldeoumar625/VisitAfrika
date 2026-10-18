/**
 * PROJET: VISIT AFRIKA
 * FICHIER: sites.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

// Sites data - Global
let sitesData = [];
let filteredSites = [];
let currentPage = 1;
let itemsPerPage = 9;
let searchTerm = '';
let countryFilter = 'all';
let typeFilter = 'all';

// Constants
const allAfricanCountries = [
    "Afrique du Sud", "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi",
    "Cameroun", "Cap Vert", "Comores", "Congo (Brazzaville)", "Côte d'Ivoire", "Djibouti",
    "Égypte", "Érythrée", "Eswatini", "Éthiopie", "Gabon", "Gambie", "Ghana", "Guinée",
    "Guinée-Bissau", "Guinée équatoriale", "Kenya", "Lesotho", "Liberia", "Libye",
    "Madagascar", "Malawi", "Mali", "Maroc", "Maurice", "Mauritanie", "Mozambique",
    "Namibie", "Niger", "Nigeria", "Ouganda", "République centrafricaine",
    "République démocratique du Congo", "Rwanda", "Sao Tomé-et-Principe", "Sénégal",
    "Seychelles", "Sierra Leone", "Somalie", "Soudan", "Soudan du Sud", "Tanzanie",
    "Tchad", "Togo", "Tunisie", "Zambie", "Zimbabwe"
].sort();

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

// Initialisation unique
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Fetch data
        const response = await fetch(getApiUrl('/api/sites'));
        const data = await response.json();

        // 2. Map data
        sitesData = data.map(s => ({
            id: s.id.toString(),
            name: s.name,
            country: s.location || "Inconnu",
            type: "Destination",
            img: s.image_url || "images/sites_populaires/default.jpg",
            excerpt: s.description ? s.description.substring(0, 100) + "..." : "",
            description: s.description || "",
            access: "Consulter l'agence",
            best: "Toute l'année",
            slug: s.name.toLowerCase().replace(/ /g, '-'),
            coords: [s.lat || 0, s.lng || 0],
            countryId: s.country_id
        }));

        filteredSites = [...sitesData];

        // 3. Setup UI
        setupEventListeners();
        populateCountrySelect();
        renderSites();
        updatePagination();
        renderFeaturedSites();

    } catch (error) {
        console.error("Erreur chargement sites:", error);
    }
});

// Render Featured Sites
// Fonction: renderFeaturedSites
function renderFeaturedSites() {
    const featuredGrid = document.getElementById('featuredSites');
    if (!featuredGrid) return;

    // Pick 3 random sites as featured or specific ones
    const featured = sitesData.slice(0, 3); // For now just first 3

    featuredGrid.innerHTML = '';
    featured.forEach((site, index) => {
        const card = document.createElement('article');
        card.className = 'card featured-card';
        card.style.animation = `cardAppear 0.5s ease-out ${index * 0.1}s forwards`;
        card.innerHTML = `
            <div class="card-media">
                <img src="${site.img}" alt="${site.name}" loading="lazy">
                <div class="card-badge">Coup de cœur</div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${site.name}</h3>
                <p class="card-meta">${site.country} • ${site.type}</p>
                <p class="card-desc">${site.excerpt}</p>
                <div class="card-actions">
                    <button class="btn primary" onclick="openModal('${site.id}')">Détails</button>
                    <a href="pays.html?country=${site.countryId}" class="btn outline">Visiter</a>
                </div>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}



// Initialize sites display
// Fonction: initializeSites
function initializeSites() {
    renderSites();
    updatePagination();
}

// Setup event listeners
// Fonction: setupEventListeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('siteSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Country filter
    const countrySelect = document.getElementById('siteCountry');
    if (countrySelect) {
        countrySelect.addEventListener('change', handleCountryFilter);
    }

    // Type filter
    const typeSelect = document.getElementById('siteType');
    if (typeSelect) {
        typeSelect.addEventListener('change', handleTypeFilter);
    }

    // Per page
    const perPageSelect = document.getElementById('sitePerPage');
    if (perPageSelect) {
        perPageSelect.addEventListener('change', handlePerPageChange);
    }

    // Pagination
    const prevBtn = document.getElementById('sitePrev');
    const nextBtn = document.getElementById('siteNext');
    if (prevBtn) prevBtn.addEventListener('click', () => changePage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changePage(1));

    // Modal
    const modal = document.getElementById('siteModal');
    const modalClose = document.getElementById('siteModalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', // Fonction: 
function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', // Fonction: 
function (e) {
        if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', // Fonction: 
function () {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', // Fonction: 
function () {
                menuToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }
}

// Populate country select
// Fonction: populateCountrySelect
function populateCountrySelect() {
    const countrySelect = document.getElementById('siteCountry');
    if (!countrySelect) return;

    // Use the complete list instead of just sites-based countries
    allAfricanCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Handle search
// Fonction: handleSearch
function handleSearch(e) {
    searchTerm = e.target.value.toLowerCase();
    applyFilters();
}

// Handle country filter
// Fonction: handleCountryFilter
function handleCountryFilter(e) {
    countryFilter = e.target.value;
    applyFilters();
}

// Handle type filter
// Fonction: handleTypeFilter
function handleTypeFilter(e) {
    typeFilter = e.target.value;
    applyFilters();
}

// Handle per page change
// Fonction: handlePerPageChange
function handlePerPageChange(e) {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderSites();
    updatePagination();
}

// Apply all filters
// Fonction: applyFilters
function applyFilters() {
    filteredSites = sitesData.filter(site => {
        const matchesSearch = searchTerm === '' ||
            site.name.toLowerCase().includes(searchTerm) ||
            site.country.toLowerCase().includes(searchTerm) ||
            site.excerpt.toLowerCase().includes(searchTerm);

        const matchesCountry = countryFilter === 'all' || site.country.includes(countryFilter);
        const matchesType = typeFilter === 'all' || site.type === typeFilter;

        return matchesSearch && matchesCountry && matchesType;
    });

    currentPage = 1;
    renderSites();
    updatePagination();
}

// Render sites
// Fonction: renderSites
function renderSites() {
    const grid = document.getElementById('sitesGrid');
    if (!grid) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const sitesToShow = filteredSites.slice(startIndex, endIndex);

    grid.innerHTML = '';

    if (sitesToShow.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">Aucun site trouvé.</p>';
        return;
    }

    sitesToShow.forEach((site, index) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.animation = `cardAppear 0.5s ease-out ${index * 0.1}s forwards`;

        card.innerHTML = `
            <div class="card-media">
                <img src="${site.img}" alt="${site.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h3 class="card-title">${site.name}</h3>
                <p class="card-meta">${site.country} • ${site.type}</p>
                <p class="card-desc">${site.excerpt}</p>
                <div class="card-actions">
                    <button class="btn primary" onclick="openModal('${site.id}')">Détails</button>
                    <a href="pays.html?country=${site.countryId}" class="btn outline">Visiter</a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Change page
// Fonction: changePage
function changePage(direction) {
    const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderSites();
        updatePagination();

        // Scroll to top of grid
        const grid = document.getElementById('sitesGrid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Update pagination
// Fonction: updatePagination
function updatePagination() {
    const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
    const prevBtn = document.getElementById('sitePrev');
    const nextBtn = document.getElementById('siteNext');
    const pagesDiv = document.getElementById('sitePages');

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    if (pagesDiv) {
        pagesDiv.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = currentPage === i ? 'active' : '';
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderSites();
                updatePagination();
                const grid = document.getElementById('sitesGrid');
                if (grid) {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            pagesDiv.appendChild(pageBtn);
        }
    }
}

// Open modal
// Fonction: openModal
function openModal(siteId) {
    const site = sitesData.find(s => s.id === siteId);
    if (!site) return;

    const modal = document.getElementById('siteModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCountryType = document.getElementById('modalCountryType');
    const modalDesc = document.getElementById('modalDesc');
    const modalAccess = document.getElementById('modalAccess');
    const modalBest = document.getElementById('modalBest');
    const modalMore = document.getElementById('modalMore');

    if (modalImage) modalImage.src = site.img;
    if (modalTitle) modalTitle.textContent = site.name;
    if (modalCountryType) modalCountryType.textContent = `${site.country} • ${site.type}`;
    if (modalDesc) modalDesc.textContent = site.description;
    if (modalAccess) modalAccess.textContent = site.access;
    if (modalBest) modalBest.textContent = site.best;
    if (modalMore) {
        modalMore.href = `pays.html?country=${site.countryId}`;
        modalMore.textContent = `Plus sur le pays : ${site.country}`;
        modalMore.classList.add('nav-to-country');
    }

    if (modal) {
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
// Fonction: closeModal
function closeModal() {
    const modal = document.getElementById('siteModal');
    if (modal) {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// RESERVATION LOGIC
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'btnOpenBooking') {
        const modalTitle = document.getElementById('modalTitle').textContent;
        // On récupère l'ID du site stocké quelque part (on peut le mettre en data-id sur le bouton lors de l'ouverture du modal)
        // Pour faire simple ici, on va chercher dans sitesData par nom
        const site = sitesData.find(s => s.name === modalTitle);
        if (site) {
             openBookingModal(site.id, site.name);
        }
    }
});

// Fonction: openBookingModal
function openBookingModal(id, name) {
    const overlay = document.getElementById('bookingOverlay');
    if (!overlay) return;
    
    document.getElementById('bookingSiteId').value = id;
    document.getElementById('bookingSiteName').textContent = name;
    overlay.style.display = 'flex';
}

// Close booking modal
document.addEventListener('click', function(e) {
    if (e.target && (e.target.id === 'closeBooking' || e.target.id === 'bookingOverlay')) {
        document.getElementById('bookingOverlay').style.display = 'none';
    }
});

// Submit booking
document.addEventListener('submit', async function(e) {
    if (e.target && e.target.id === 'siteBookingForm') {
        e.preventDefault();
        const data = {
            site_id: parseInt(document.getElementById('bookingSiteId').value),
            full_name: document.getElementById('bookingName').value,
            email: document.getElementById('bookingEmail').value,
            date_visit: document.getElementById('bookingDate').value,
            phone: "",
            guests: 1
        };

        try {
            const res = await fetch(getApiUrl('/api/reservations'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                alert("Votre réservation pour " + document.getElementById('bookingSiteName').textContent + " a été reçue !");
                document.getElementById('bookingOverlay').style.display = 'none';
                e.target.reset();
            } else {
                alert("Erreur lors de la réservation.");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur de connexion au serveur.");
        }
    }
});
