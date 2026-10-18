/**
 * PROJET: VISIT AFRIKA
 * FICHIER: script.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = (window.location.port === '5502' || window.location.port === '5500') 
        ? 'http://127.0.0.1:8000/api' 
        : '/api';

    /**
     * Utilitaire pour effectuer des appels API sécurisés avec le Token JWT.
     */
    // Fonction: callApi
async function callApi(endpoint, options = {}) {
        const token = localStorage.getItem('access_token');
        const headers = options.headers || {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: headers
        });

        if (response.status === 401) {
            // Token expiré ou invalide
            localStorage.removeItem('access_token');
            console.warn('Session expirée, redirection...');
            // window.location.href = '../formulaires/connection.html';
        }

        return response;
    }

    // --- FORMULAIRE D'INSCRIPTION ---
    const inscriptionForm = document.querySelector('.inscription-form');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(inscriptionForm);
            
            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (response.ok) {
                    alert('🎉 Compte créé ! Connectez-vous.');
                    window.location.href = 'connection.html';
                } else {
                    alert('❌ Erreur : ' + (data.detail || 'Inscription échouée'));
                }
            } catch (error) {
                alert('🔌 Serveur Backend non atteint.');
            }
        });
    }

    // --- FORMULAIRE DE CONNEXION ---
    const connectionForm = document.querySelector('.connection-form');
    if (connectionForm) {
        connectionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(connectionForm);
            
            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (response.ok) {
                    // Sauvegarde du Token JWT dans localStorage
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    alert('✅ Connexion réussie !');
                    
                    // Redirection basée sur le rôle
                    if (data.user.role && data.user.role.toLowerCase() === 'admin') {
                        window.location.href = '../admin/admin.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                } else {
                    alert('❌ Identifiants incorrects');
                }
            } catch (error) {
                alert('🔌 Serveur Backend non atteint.');
            }
        });
    }

    // --- LOGIQUE COMMUNE : VISIBILITÉ MOT DE PASSE ---
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            const icon = btn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // --- GESTION DU MOT DE PASSE OUBLIÉ (MODAL) ---
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const resetModal = document.getElementById('resetModal');
    const closeResetModal = document.getElementById('closeResetModal');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    if (forgotPasswordLink && resetModal) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            resetModal.classList.add('active');
        });
    }

    if (closeResetModal && resetModal) {
        closeResetModal.addEventListener('click', () => {
            resetModal.classList.remove('active');
        });
    }

    if (resetModal) {
        window.addEventListener('click', (e) => {
            if (e.target === resetModal) {
                resetModal.classList.remove('active');
            }
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(resetPasswordForm);

            try {
                const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                if (response.ok) {
                    alert('🔑 ' + (data.message || 'Mot de passe réinitialisé !'));
                    resetModal.classList.remove('active');
                    resetPasswordForm.reset();
                } else {
                    alert('❌ Erreur : ' + (data.detail || 'Impossible de réinitialiser.'));
                }
            } catch (error) {
                alert('🔌 Serveur Backend non atteint.');
            }
        });
    }
});
