/**
 * PROJET: VISIT AFRIKA
 * FICHIER: home_dynamic.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Mise à jour des statistiques
    const statsContainer = document.querySelector('.about-stats');
    if (statsContainer) {
        try {
            const [countriesRes, sitesRes, articlesRes] = await Promise.all([
                fetch(getApiUrl('/api/countries')),
                fetch(getApiUrl('/api/sites')),
                fetch(getApiUrl('/api/articles'))
            ]);

            const countries = await countriesRes.json();
            const sites = await sitesRes.json();
            const articles = await articlesRes.json();

            const statCards = statsContainer.querySelectorAll('.stat-number');
            if (statCards.length >= 3) {
                statCards[0].textContent = countries.length; // Pays
            }
        } catch (e) { console.error("Stats error:", e); }
    }

    // 2. Derniers articles
    const blogGridMinimal = document.querySelector('.blog-grid-minimal');
    if (blogGridMinimal) {
        try {
            const response = await fetch(getApiUrl('/api/articles'));
            const articles = await response.json();
            
            if (articles.length > 0) {
                blogGridMinimal.innerHTML = '';
                // Prendre les 4 derniers
                articles.slice(0, 4).forEach(art => {
                    const item = document.createElement('a');
                    item.href = `blogs.html#${art.slug}`;
                    item.className = 'blog-card-minimal';
                    item.innerHTML = `
                        <div class="blog-img-container">
                            <img src="${art.image_url || 'images/articles/default.jpg'}" alt="${art.title}" class="blog-img">
                        </div>
                        <div class="blog-content-minimal">
                            <span class="blog-category-minimal">Conseils · Culture</span>
                            <h3 class="blog-title-minimal">${art.title}</h3>
                            <span class="blog-date-minimal">${new Date(art.created_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                    `;
                    blogGridMinimal.appendChild(item);
                });
            }
        } catch (e) { console.error("Blog partial error:", e); }
    }

    // 3. Aperçu Galerie (depuis les sites)
    const galleryGrid = document.querySelector('.gallery-preview-grid');
    if (galleryGrid) {
        try {
            const response = await fetch(getApiUrl('/api/sites'));
            const sites = await response.json();
            
            if (sites.length > 0) {
                galleryGrid.innerHTML = '';
                // Prendre 6 sites aléatoires ou les premiers
                sites.slice(0, 6).forEach(site => {
                    const item = document.createElement('div');
                    item.className = 'gallery-preview-item';
                    item.onclick = () => window.location.href='galerie.html';
                    item.innerHTML = `
                        <img src="${site.image_url || 'images/sites_populaires/default.jpg'}" alt="${site.name}">
                        <div class="gallery-preview-overlay">
                            <div class="gallery-preview-title">${site.name}</div>
                            <div class="gallery-preview-category">${site.location}</div>
                        </div>
                    `;
                    galleryGrid.appendChild(item);
                });
            }
        } catch (e) { console.error("Gallery preview error:", e); }
    }
});
