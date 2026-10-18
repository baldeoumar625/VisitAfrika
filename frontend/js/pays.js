/**
 * PROJET: VISIT AFRIKA
 * FICHIER: pays.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

let countriesData = [];
let countriesRaw = [];

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

/* ---------- Initialisation ---------- */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(getApiUrl('/api/countries'));
        const data = await response.json();
        countriesRaw = data; // Stocker les données brutes
        // Mapping des noms et sécurisation des chemins d'images
        countriesData = data.map(c => {
            let img = c.image_url;
            if (!img || img.includes('default.jpg') || img.includes('default.png')) {
                if (c.slug === 'mozambique') img = 'images/pays/Afrique_Australe/mozambique.jpg';
                else if (c.slug === 'republique_democratique_du_congo') img = 'images/pays/Afrique_Centrale/rd_congo.jpg';
                else if (c.slug === 'sao_tome_et_principe' || c.slug === 'sao_tome_principe') img = 'images/pays/Afrique_Centrale/sao_tome_principe.jpg';
                else if (c.slug === 'somalie') img = 'images/pays/Afrique_Est/somalie.jpg';
            }
            return {
                id: c.slug,
                name: c.name,
                region: c.region || "Afrique",
                capital: c.capital || "N/A",
                population: c.population || "N/A",
                img: img,
                desc: c.description,
                more: `les differents pays/${c.slug}.html`
            };
        });
        renderCards();
    } catch (error) {
        console.error("Erreur chargement pays:", error);
        countriesSection.innerHTML = `<div class="error">Impossible de charger les pays depuis la base de données.</div>`;
    }
});

/* ---------- État UI ---------- */
let state = {
  page: 1,
  perPage: 9,
  region: "all",
  query: ""
};

/* ---------- Références DOM ---------- */
const countriesSection = document.getElementById("countriesSection");
const searchInput = document.getElementById("searchInput");
const regionSelect = document.getElementById("regionSelect");
const perPageSelect = document.getElementById("perPage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pagesWrap = document.getElementById("pages");

/* Modal refs */
const modal = document.getElementById("countryModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalFlag = document.getElementById("modalFlag");
const modalRegion = document.getElementById("modalRegion");
const modalCapital = document.getElementById("modalCapital");
const modalPopulation = document.getElementById("modalPopulation");
const modalDesc = document.getElementById("modalDesc");
const moreLink = document.getElementById("moreLink");

/* ---------- Fonctions utilitaires ---------- */
// Fonction: filterData
function filterData() {
  const q = state.query.trim().toLowerCase();
  const r = state.region;

  return countriesData.filter(c => {
    const matchQuery = q === "" || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
    const matchRegion = r === "all" || c.region === r;
    return matchQuery && matchRegion;
  });
}

// Fonction: renderCards
function renderCards() {
  const filtered = filterData();
  const total = filtered.length;
  const start = (state.page - 1) * state.perPage;
  const end = start + state.perPage;
  const pageItems = filtered.slice(start, end);

  countriesSection.innerHTML = "";

  if (pageItems.length === 0) {
    countriesSection.innerHTML = `<div class="no-results">Aucun pays trouvé.</div>`;
    renderPagination(total);
    return;
  }

  for (const c of pageItems) {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");
    card.innerHTML = `
      <div class="card-figure"><img src="${c.img}" alt="Photo ${c.name}" loading="lazy" /></div>
      <div class="card-body">
        <div class="card-title">${c.name}</div>
        <div class="card-region">${c.region} • Capitale: ${c.capital}</div>
        <div class="card-desc">${c.desc}</div>
        <div class="card-actions">
          <button class="btn btn-open" data-id="${c.id}">Voir</button>
          <a class="btn ghost" href="${c.more}" target="_blank" rel="noopener">Visiter</a>
        </div>
      </div>
    `;
    // Ouvrir modal au click ou Enter
    card.querySelector(".btn-open").addEventListener("click", () => openModal(c.id));
    card.addEventListener("keydown", (ev) => { if (ev.key === "Enter") openModal(c.id); });
    countriesSection.appendChild(card);
  }

  renderPagination(total);
}

// Fonction: renderPagination
function renderPagination(totalItems) {
  const totalPages = Math.max(1, Math.ceil(totalItems / state.perPage));
  pagesWrap.innerHTML = "";
  for (let p = 1; p <= totalPages; p++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = (p === state.page) ? "page active" : "page";
    btn.textContent = p;
    btn.addEventListener("click", () => {
      state.page = p;
      renderCards();
      window.scrollTo({ top: 200, behavior: "smooth" });
    });
    pagesWrap.appendChild(btn);
  }
  prevBtn.disabled = state.page <= 1;
  nextBtn.disabled = state.page >= totalPages;
}

/* ---------- Modal ---------- */
// Fonction: openModal
async function openModal(id) {
  // En base l'id est un entier, mais id ici est le slug du paysData
  // On a besoin de l'ID numérique du pays pour filtrer les sites
  const rawCountry = countriesRaw.find(c => c.slug === id);
  if (!rawCountry) return;

  const country = countriesData.find(c => c.id === id);
  if (!country) return;

  modal.setAttribute("aria-hidden", "false");
  modalTitle.textContent = country.name;
  modalSubtitle.textContent = `${country.region} • ${country.capital}`;
  modalFlag.src = country.img;
  modalFlag.alt = `Image de ${country.name}`;
  modalRegion.textContent = country.region;
  modalCapital.textContent = country.capital;
  modalPopulation.textContent = country.population;
  modalDesc.textContent = country.desc;
  moreLink.href = country.more;

  // Charger les sites pour ce pays
  renderModalSites(rawCountry.id);

  modalClose.focus();
}

// Fonction: renderModalSites
async function renderModalSites(countryId) {
    let list = document.getElementById('sitesList');
    
    // Si le conteneur n'existe pas dans le HTML, on le crée dynamiquement
    if (!list) {
        const modalInfo = document.querySelector('.modal-info');
        const desc = document.getElementById('modalDesc');
        if (modalInfo && desc) {
            const container = document.createElement('div');
            container.id = 'modalSites';
            container.style.cssText = 'margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;';
            container.innerHTML = `
                <p style="font-weight: bold; margin-bottom: 8px;"><i class="fas fa-map-location-dot"></i> Sites à découvrir :</p>
                <div id="sitesList" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
            `;
            modalInfo.insertBefore(container, desc);
            list = document.getElementById('sitesList');
        }
    }

    if (!list) return;
    list.innerHTML = '<span class="text-muted small">Chargement...</span>';
    
    try {
        const res = await fetch(getApiUrl(`/api/sites?country_id=${countryId}`));
        const sites = await res.json();
        list.innerHTML = '';
        
        if (sites.length === 0) {
            list.innerHTML = '<span class="text-muted small">Aucun site enregistré.</span>';
            return;
        }

        sites.forEach(s => {
            const badge = document.createElement('span');
            badge.style.cssText = 'background: #f8f9fa; border: 1px solid #dee2e6; padding: 4px 10px; border-radius: 15px; font-size: 0.85rem; color: #555;';
            badge.innerHTML = `<i class="fas fa-location-dot text-primary me-1"></i> ${s.name}`;
            list.appendChild(badge);
        });
    } catch (err) {
        console.error(err);
        list.innerHTML = '<span class="text-danger small">Erreur.</span>';
    }
}

// Fonction: closeModal
function closeModal() {
  modal.setAttribute("aria-hidden", "true");
}

/* Fermer modal au clic sur close ou en dehors */
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------- Events: recherche, filtre, perPage, pagination ---------- */
searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  state.page = 1;
  renderCards();
});

regionSelect.addEventListener("change", (e) => {
  state.region = e.target.value;
  state.page = 1;
  renderCards();
});

perPageSelect.addEventListener("change", (e) => {
  state.perPage = parseInt(e.target.value, 10);
  state.page = 1;
  renderCards();
});

prevBtn.addEventListener("click", () => {
  if (state.page > 1) { state.page--; renderCards(); window.scrollTo({ top: 200, behavior: "smooth" }); }
});
nextBtn.addEventListener("click", () => {
  state.page++; renderCards(); window.scrollTo({ top: 200, behavior: "smooth" });
});

/* ---------- Initialisation ---------- */
// Fonction: init
function init() {
  // S'assurer que select perPage concorde
  perPageSelect.value = String(state.perPage);
  renderCards();

  // Gestion du paramètre URL ?country=id
  const urlParams = new URLSearchParams(window.location.search);
  const countryId = urlParams.get('country');
  if (countryId) {
    // Petit délai pour laisser le rendu se faire ou assurer la visibilité
    setTimeout(() => {
      openModal(countryId);
    }, 100);
  }

  // Initialiser la carte des sites
  initAfricaMap();
}

// Variables pour la carte
let map;
let markers = [];

// Fonction: initAfricaMap
async function initAfricaMap() {
    const mapElement = document.getElementById('africaMap');
    if (!mapElement) return;

    // Initialize map
    map = L.map('africaMap').setView([2, 20], 3.2);

    // Add Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    try {
        const apiUrl = (window.location.port === '5502' || window.location.port === '5500') 
            ? 'http://127.0.0.1:8000/api/sites' 
            : '/api/sites';
            
        const res = await fetch(apiUrl);
        const sites = await res.json();
        
        sites.forEach(site => {
            if (site.lat && site.lng) {
                const marker = L.marker([site.lat, site.lng]).addTo(map);
                const popupContent = `
                    <div class="map-popup">
                        <img src="${site.image_url}" alt="${site.name}" style="width:100%; height:80px; object-fit:cover; border-radius:4px;">
                        <h4 style="margin: 8px 0 4px; font-size: 14px;">${site.name}</h4>
                        <p style="margin: 0; font-size: 12px; color: #666;">${site.location}</p>
                        <div style="display: flex; gap: 5px; margin-top: 8px;">

                        </div>
                    </div>
                `;
                marker.bindPopup(popupContent, { maxWidth: 200 });
                markers.push(marker);
            }
        });
    } catch(e) {
        console.error("Map data error", e);
    }
}

init();
