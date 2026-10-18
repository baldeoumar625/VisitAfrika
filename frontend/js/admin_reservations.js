/**
 * PROJET: VISIT AFRIKA
 * FICHIER: admin_reservations.js
 * DESCRIPTION: Gestion des réservations (Sites & Hôtels) pour le panneau admin.
 */

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

document.addEventListener('DOMContentLoaded', () => {
    const sitesTableBody = document.getElementById('reservationsTableBody');
    const hotelsTableBody = document.getElementById('hotelReservationsTableBody');
    const tableSites = document.getElementById('tableSites');
    const tableHotels = document.getElementById('tableHotels');
    const statusFilter = document.getElementById('filterStatus');
    const searchInput = document.getElementById('resSearch');
    const tabBtns = document.querySelectorAll('.tab-btn');

    let currentTab = 'sites';
    let sitesData = [];
    let hotelsData = [];
    let sitesMap = {};

    // --- INITIALISATION ---
    async function init() {
        await loadSitesMap();
        await refreshData();
        setupTabs();
    }

    async function loadSitesMap() {
        try {
            const res = await fetch(getApiUrl('/api/sites'));
            const sites = await res.json();
            sites.forEach(s => sitesMap[s.id] = s.name);
        } catch (e) { console.error("Erreur chargement sites:", e); }
    }

    async function refreshData() {
        if (currentTab === 'sites') {
            await fetchSitesReservations();
        } else {
            await fetchHotelReservations();
        }
    }

    // --- FETCH DATA ---
    async function fetchSitesReservations() {
        try {
            const response = await fetch(getApiUrl('/api/reservations?t=' + Date.now()));
            sitesData = await response.json();
            renderSitesTable();
        } catch (error) {
            sitesTableBody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Erreur.</td></tr>';
        }
    }

    async function fetchHotelReservations() {
        try {
            const response = await fetch(getApiUrl('/api/hotel_reservations?t=' + Date.now()));
            hotelsData = await response.json();
            renderHotelsTable();
        } catch (error) {
            hotelsTableBody.innerHTML = '<tr><td colspan="8" class="text-center text-danger">Erreur.</td></tr>';
        }
    }

    // --- RENDERING ---
    function renderSitesTable() {
        const query = searchInput.value.toLowerCase();
        const status = statusFilter.value;

        const filtered = sitesData.filter(r => {
            const matchesQuery = r.full_name.toLowerCase().includes(query) || r.email.toLowerCase().includes(query);
            const matchesStatus = status === 'all' || r.status === status;
            return matchesQuery && matchesStatus;
        });

        sitesTableBody.innerHTML = filtered.length ? '' : '<tr><td colspan="7" class="text-center py-4">Aucune réservation.</td></tr>';
        
        filtered.forEach((res, index) => {
            const statusClass = getStatusClass(res.status);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="fw-bold text-muted">${index + 1}</td>
                <td>
                    <div class="fw-bold">${res.full_name}</div>
                    <div class="text-muted small">${res.email}</div>
                </td>
                <td>
                    <div class="fw-bold"><i class="fas fa-location-dot text-primary me-1"></i> ${res.site_name || sitesMap[res.site_id] || 'Site inconnu'}</div>
                    <div class="text-muted extra-small" style="font-size: 11px; font-style: italic;">${res.details || ''}</div>
                </td>
                <td>${res.date_visit}</td>
                <td>${res.guests}</td>
                <td><span class="badge-status ${statusClass}">${res.status}</span></td>
                <td>${getActionDropdown(res.id, 'sites')}</td>
            `;
            sitesTableBody.appendChild(tr);
        });
    }

    function guessCountry(hotel_name) {
        if (!hotel_name) return "Inconnu";
        const name = hotel_name.toLowerCase();
        if (name.includes("aurassi") || name.includes("sofitel") || name.includes("sheraton") || name.includes("renaissance") || name.includes("onomo")) return "Algérie";
        if (name.includes("sana") || name.includes("baía") || name.includes("baia") || name.includes("talatona") || name.includes("presidente") || name.includes("pululukwa") || name.includes("intercontinental") || name.includes("miramar")) return "Angola";
        if (name.includes("papa") || name.includes("azala") || name.includes("diplomate") || name.includes("rouge") || name.includes("orisha") || name.includes("somba")) return "Bénin";
        if (name.includes("belmond") || name.includes("chobe game") || name.includes("sandibe") || name.includes("jack's") || name.includes("xaranna")) return "Botswana";
        return "Inconnu";
    }

    function renderHotelsTable() {
        const query = searchInput.value.toLowerCase();
        const status = statusFilter.value;

        const filtered = hotelsData.filter(r => {
            const matchesQuery = r.full_name.toLowerCase().includes(query) || r.hotel_name.toLowerCase().includes(query);
            const matchesStatus = status === 'all' || r.status === status;
            return matchesQuery && matchesStatus;
        });

        hotelsTableBody.innerHTML = filtered.length ? '' : '<tr><td colspan="8" class="text-center py-4">Aucune réservation.</td></tr>';

        filtered.forEach((res, index) => {
            const statusClass = getStatusClass(res.status);
            const tr = document.createElement('tr');
            const displayCountry = res.country && res.country !== "Inconnu" ? res.country : guessCountry(res.hotel_name);
            
            tr.innerHTML = `
                <td class="fw-bold text-muted">${index + 1}</td>
                <td><div class="fw-bold">${res.full_name}</div><div class="text-muted small">${res.email}</div></td>
                <td><i class="fas fa-hotel text-success me-1"></i> ${res.hotel_name}</td>
                <td><i class="fas fa-globe-africa text-info me-1"></i> ${displayCountry}</td>
                <td>${res.check_in} au ${res.check_out}</td>
                <td>${res.guests}</td>
                <td><span class="badge-status ${statusClass}">${res.status}</span></td>
                <td>${getActionDropdown(res.id, 'hotels')}</td>
            `;
            hotelsTableBody.appendChild(tr);
        });
    }

    // --- HELPERS ---
    function showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `admin-toast ${type}`;
        const icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
        
        toast.innerHTML = `
            <div class="toast-icon text-${type === 'success' ? 'success' : (type === 'error' ? 'danger' : 'primary')}">
                <i class="fas ${icon}"></i>
            </div>
            <div class="toast-content">${message}</div>
        `;
        
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    function getStatusClass(status) {
        if (status === 'Confirmé') return 'status-completed';
        if (status === 'Annulé') return 'status-cancelled text-danger';
        return 'status-pending';
    }

    function getActionDropdown(id, type) {
        return `
            <div class="dropdown">
                <button class="btn btn-sm btn-light border shadow-sm rounded-3" type="button" data-bs-toggle="dropdown" data-bs-boundary="viewport" data-bs-popper-config='{"strategy":"fixed"}'>
                    <i class="fas fa-ellipsis-v text-muted"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2">
                    <li><a class="dropdown-item py-2" href="javascript:void(0)" onclick="updateStatus(${id}, 'Confirmé', '${type}')">
                        <i class="fas fa-check text-success me-2"></i> Confirmer
                    </a></li>
                    <li><a class="dropdown-item py-2" href="javascript:void(0)" onclick="updateStatus(${id}, 'Annulé', '${type}')">
                        <i class="fas fa-times text-warning me-2"></i> Annuler
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item py-2 text-danger" href="javascript:void(0)" onclick="deleteReservation(${id}, '${type}')">
                        <i class="fas fa-trash-can me-2"></i> Supprimer
                    </a></li>
                </ul>
            </div>
        `;
    }

    // --- ACTIONS ---
    window.updateStatus = async (id, newStatus, type) => {
        const path = type === 'sites' ? `/api/reservations/${id}` : `/api/hotel_reservations/${id}`;
        try {
            const res = await fetch(getApiUrl(path), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                showToast(`Réservation ${newStatus.toLowerCase()}e avec succès !`);
                refreshData();
            } else {
                showToast("Erreur lors de la mise à jour.", "error");
            }
        } catch (e) { 
            console.error(e);
            showToast("Erreur serveur.", "error");
        }
    };

    window.deleteReservation = async (id, type) => {
        if (!confirm("Voulez-vous vraiment supprimer cette réservation ? Cette action est irréversible.")) return;
        
        const path = type === 'sites' ? `/api/reservations/${id}` : `/api/hotel_reservations/${id}`;
        try {
            const res = await fetch(getApiUrl(path), { method: 'DELETE' });
            if (res.ok) {
                showToast("Réservation supprimée définitivement.");
                refreshData();
            } else {
                showToast("Erreur lors de la suppression.", "error");
            }
        } catch (e) { 
            console.error(e);
            showToast("Erreur serveur.", "error");
        }
    };

    function setupTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentTab = this.dataset.tab;
                
                if (currentTab === 'sites') {
                    tableSites.classList.remove('d-none');
                    tableHotels.classList.add('d-none');
                } else {
                    tableSites.classList.add('d-none');
                    tableHotels.classList.remove('d-none');
                }
                refreshData();
            });
        });
    }

    statusFilter.addEventListener('change', refreshData);
    searchInput.addEventListener('input', refreshData);

    init();
});
