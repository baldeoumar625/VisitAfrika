/**
 * PROJET: VISIT AFRIKA
 * FICHIER: admin_users.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

/**
 * Gestion dynamique des utilisateurs - Visit Afrika
 */
document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('.activity-table tbody');
    const API_URL = (window.location.port === '5502' || window.location.port === '5500') 
        ? 'http://127.0.0.1:8000/api/users' 
        : '/api/users';
    const token = localStorage.getItem('access_token');

    if (!tableBody) return;

    // Charger les utilisateurs
    // Fonction: loadUsers
async function loadUsers() {
        try {
            const response = await fetch(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error("Erreur chargement utilisateurs:", error);
        }
    }

    // Fonction: renderUsers
function renderUsers(users) {
        tableBody.innerHTML = '';
        users.forEach(user => {
            const initials = `${user.prenom ? user.prenom[0] : ''}${user.nom ? user.nom[0] : ''}`.toUpperCase() || '??';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <div class="avatar-sm bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:32px; height:32px;">${initials}</div>
                        <div>
                            <div class="fw-bold">${user.prenom || ''} ${user.nom || ''}</div>
                            <div class="text-muted small">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>${user.role}</td>
                <td>${new Date(user.created_at).toLocaleDateString()}</td>
                <td><span class="badge-status status-completed">Actif</span></td>
                <td>
                    <button class="btn btn-sm btn-light edit-user" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-light text-danger delete-user" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add Event Listeners for actions
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.onclick = () => deleteUser(btn.getAttribute('data-id'));
        });

        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.onclick = () => editUser(btn.getAttribute('data-id'));
        });
    }

    // Fonction: deleteUser
async function deleteUser(id) {
        if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
        
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                loadUsers();
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    }

    // Fonction: editUser
async function editUser(id) {
        const newRole = prompt('Entrez le nouveau rôle (admin, editor, user) :');
        if (!newRole) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ role: newRole })
            });
            if (response.ok) {
                loadUsers();
            } else {
                alert('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error("Erreur mise à jour:", error);
        }
    }

    loadUsers();

    // -- Gestion Modal Ajout Utilisateur --
    const btnAddUser = document.getElementById('btnAddUser');
    const modal = document.getElementById('addUserModal');
    const closeUserModal = document.getElementById('closeUserModal');
    const cancelUserBtn = document.getElementById('cancelUserBtn');
    const form = document.getElementById('addUserForm');

    // Fonction: hideModal
function hideModal() {
        if(modal) modal.style.display = 'none';
        if(form) form.reset();
    }

    if (btnAddUser && modal) {
        btnAddUser.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeUserModal) closeUserModal.addEventListener('click', hideModal);
    if (cancelUserBtn) cancelUserBtn.addEventListener('click', hideModal);

    // Click outside to close
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const prenom = document.getElementById('addPrenom').value;
            const nom = document.getElementById('addNom').value;
            const email = document.getElementById('addEmail').value;
            const password = document.getElementById('addPassword').value;

            // Préparation des données en FormData car FastAPI attend Form(...)
            const formData = new FormData();
            formData.append('prenom', prenom);
            formData.append('nom', nom);
            formData.append('email', email);
            formData.append('telephone', ''); // Optionnel
            formData.append('password', password);
            formData.append('confirmPassword', password); // Validation interne

            // Détection Live Server pour l'API
            const registerApiUrl = (window.location.port === '5502' || window.location.port === '5500') 
                ? 'http://127.0.0.1:8000/api/register' 
                : '/api/register';

            try {
                const response = await fetch(registerApiUrl, {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    hideModal();
                    loadUsers(); // Rafraîchir la table
                } else {
                    alert('Erreur: ' + (result.detail || 'Impossible de créer le compte.'));
                }
            } catch (error) {
                console.error("Erreur lors de la création de l'utilisateur:", error);
                alert("Une erreur de connexion au serveur s'est produite.");
            }
        });
    }
});
