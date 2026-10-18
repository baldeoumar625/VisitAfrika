/**
 * PROJET: VISIT AFRIKA
 * FICHIER: admin_galerie.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

document.addEventListener('DOMContentLoaded', () => {
    const galleryForm = document.querySelector('form');
    
    if (galleryForm) {
        galleryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const token = localStorage.getItem('access_token');
            if (!token) return alert("Session expirée. Connectez-vous.");

            const formData = new FormData();
            const fileInput = document.getElementById('fichiersImages');
            const titreInput = document.getElementById('titreImage');
            const lieuSelect = document.getElementById('lieuAssocie');
            const descText = document.getElementById('descriptionImage');

            if (fileInput.files.length === 0) {
                return alert("Veuillez sélectionner au moins une image.");
            }

            // Ajout des fichiers
            for (let i = 0; i < fileInput.files.length; i++) {
                formData.append('images', fileInput.files[i]);
            }

            if (titreInput.value) formData.append('title', titreInput.value);
            if (lieuSelect.value) formData.append('category', lieuSelect.value);
            if (descText.value) formData.append('description', descText.value);

            try {
                const response = await fetch(getApiUrl('/api/gallery'), {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('✨ ' + result.message);
                    galleryForm.reset();
                } else {
                    const data = await response.json();
                    alert('❌ Erreur: ' + (data.detail || 'Échec de l\'upload'));
                }
            } catch (error) {
                console.error(error);
                alert('🔌 Erreur de connexion au serveur.');
            }
        });
    }
});
