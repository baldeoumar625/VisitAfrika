/**
 * PROJET: VISIT AFRIKA
 * FICHIER: admin_protection.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

/**
 * Protection des pages d'administration - Visit Afrika
 * Ce script vérifie la présence et la validité du Token JWT avant d'afficher la page.
 */
(async function() {
    const token = localStorage.getItem('access_token');

    // 1. Vérification basique de la présence du token
    if (!token) {
        console.warn('Accès refusé : Aucun token trouvé.');
        window.location.href = '../formulaires/connection.html';
        return;
    }

    // 2. Vérification de la validité du token auprès du serveur (Optionnel mais recommandé)
    try {
        const apiUrl = (window.location.port === '5502' || window.location.port === '5500') ? 'http://127.0.0.1:8000/api/auth/profile' : '/api/auth/profile';
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Validation de session échouée:', response.status);
            throw new Error('Session expirée ou Token invalide');
        }

        // Session valide : On vérifie le rôle
        const userData = await response.json();
        console.log('Données utilisateur reçues:', userData);
        const user = userData.user;

        if (!user || user.role.toLowerCase() !== 'admin') {
            const currentRole = user ? user.role : 'aucun';
            console.warn('Accès refusé : Rôle insuffisant.', currentRole);
            
            // On efface la session actuelle pour permettre de se reconnecter avec le bon compte
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            
            alert('Accès refusé : Votre session actuelle a le rôle "' + currentRole + '".\n\nVous allez être redirigé vers la page de connexion pour utiliser un compte administrateur.');
            window.location.href = '../formulaires/connection.html';
            return;
        }

        console.log('Accès autorisé pour:', user.email);
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            el.textContent = `${user.prenom} ${user.nom}`;
        });

    } catch (error) {
        console.error('Erreur de validation de session:', error);
        // On ne supprime le token que si c'est vraiment une erreur d'auth (401)
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('user');
        alert('Erreur de connexion au serveur. Veuillez vous reconnecter.');
        window.location.href = '../formulaires/connection.html';
    }
})();
