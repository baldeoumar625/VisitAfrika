/**
 * PROJET: VISIT AFRIKA
 * FICHIER: admin_countries.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

/**
 * Gestion des pays - Visit Afrika Admin
 */
const API_BASE_URL = (window.location.port === '5502' || window.location.port === '5500') 
    ? 'http://127.0.0.1:8000/api' 
    : '/api';

document.addEventListener('DOMContentLoaded', () => {
    const addCountryForm = document.getElementById('addCountryForm');
    
    // 1. Initial Load
    fetchCountries();

    // 2. Form Submission (Create)
    if (addCountryForm) {
        addCountryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('access_token');
            if (!token) return alert("Reconnectez-vous.");

            const name = document.getElementById('nomPays').value;
            const region = document.getElementById('region').value;
            const description = document.getElementById('description').value;
            const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '_').replace(/[^\w\s]/gi, '');

            const payload = {
                name: name,
                region: region,
                capital: document.getElementById('capitale')?.value || "",
                description: description,
                slug: slug,
                image_url: `images/pays/${region.replace(/ /g, '_')}/${slug}.jpg`
            };

            try {
                const res = await fetch(`${API_BASE_URL}/countries`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    alert('🌍 Pays ajouté !');
                    addCountryForm.reset();
                    fetchCountries();
                } else {
                    const err = await res.json();
                    alert('❌ ' + (err.detail || 'Erreur'));
                }
            } catch (err) { alert('🔌 Backend non atteint.'); }
        });
    }
});

// 3. Fetch & Render Countries
// Fonction: fetchCountries
async function fetchCountries() {
    const tbody = document.getElementById('countriesTableBody');
    if (!tbody) return;

    try {
        const res = await fetch(`${API_BASE_URL}/countries`);
        const countries = await res.json();
        tbody.innerHTML = '';

        if (countries.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">Aucun pays trouvé.</td></tr>';
            return;
        }

        countries.forEach((c, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="ps-3 fw-bold text-muted">${index + 1}</td>
                <td><span class="fw-bold text-dark">${c.name}</span></td>
                <td>${c.capital || 'N/A'}</td>
                <td><span class="badge bg-light text-dark border">${c.region}</span></td>
                <td><span class="badge bg-info text-white">${c.site_count || 0} sites</span></td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editCountry(${c.id}, '${c.name.replace(/'/g, "\\'")}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCountry(${c.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) { console.error(err); }
}

// 4. Delete Country
// Fonction: deleteCountry
async function deleteCountry(id) {
    if (!confirm("Supprimer ce pays ? Tous les sites rattachés pourraient être orphelins.")) return;
    
    const token = localStorage.getItem('access_token');
    try {
        const res = await fetch(`${API_BASE_URL}/countries/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            fetchCountries();
        } else {
            alert("Erreur lors de la suppression.");
        }
    } catch (err) { console.error(err); }
}

// 5. Edit Country (Simplifié par prompt)
window.editCountry = (id, currentName) => {
    const newName = prompt("Nom du pays :", currentName);
    if (!newName) return;
    
    const currentCapital = prompt("Capitale :");
    const currentRegion = prompt("Région :");
    
    const token = localStorage.getItem('access_token');
    fetch(`${API_BASE_URL}/countries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ 
            name: newName,
            capital: currentCapital,
            region: currentRegion
        })
    }).then(res => {
        if (res.ok) fetchCountries();
        else alert("Erreur lors de la modification.");
    });
};
