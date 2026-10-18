/**
 * PROJET: VISIT AFRIKA
 * FICHIER: blog_dynamic.js
 * DESCRIPTION: Gestion dynamique des blogs et modal de lecture d'article pour chaque domaine d'Afrique.
 */

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

document.addEventListener('DOMContentLoaded', async () => {
    const blogGrid = document.getElementById('blogGrid');
    const blogSearch = document.getElementById('blogSearch');

    if (!blogGrid) return;

    // Modal DOM setup
    const modalHtml = `
        <div id="articleModal" class="modal" aria-hidden="true" style="display:none; position:fixed; z-index:10000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); backdrop-filter:blur(5px); justify-content:center; align-items:center; padding:20px; box-sizing:border-box;">
            <div style="background:#fff; width:100%; max-width:800px; max-height:90vh; border-radius:16px; overflow-y:auto; position:relative; box-shadow:0 20px 50px rgba(0,0,0,0.3); animation:modalSlideIn 0.3s ease-out;">
                <button id="closeArticleModal" style="position:absolute; top:15px; right:15px; background:rgba(0,0,0,0.6); color:#fff; border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; font-size:22px; display:flex; align-items:center; justify-content:center; z-index:10; transition:0.2s;">&times;</button>
                <div id="modalArticleHeader" style="position:relative; height:300px; width:100%; overflow:hidden;">
                    <img id="modalArticleImg" src="" alt="" style="width:100%; height:100%; object-fit:cover;">
                    <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(transparent, rgba(0,0,0,0.85)); padding:20px; color:#fff;">
                        <span id="modalArticleCategory" style="background:#ffc107; color:#111; font-weight:bold; font-size:12px; padding:4px 12px; border-radius:12px; text-transform:uppercase; display:inline-block; margin-bottom:8px;"></span>
                        <h2 id="modalArticleTitle" style="margin:0; font-size:22px; font-weight:bold; line-height:1.3; color:#fff;"></h2>
                    </div>
                </div>
                <div style="padding:25px; color:#333; line-height:1.7; font-size:15px;">
                    <div id="modalArticleDate" style="color:#777; font-size:13px; margin-bottom:15px;"><i class="fas fa-calendar-alt me-1"></i> <span></span></div>
                    <p id="modalArticleResume" style="font-weight:bold; font-size:16px; color:#222; background:#f8f9fa; border-left:4px solid #ffc107; padding:12px 15px; border-radius:0 8px 8px 0; margin-bottom:20px;"></p>
                    <div id="modalArticleBody" style="white-space:pre-line; font-size:15px; color:#444; line-height:1.8;"></div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const articleModal = document.getElementById('articleModal');
    const closeBtn = document.getElementById('closeArticleModal');
    
    closeBtn.addEventListener('click', () => {
        articleModal.style.display = 'none';
        articleModal.setAttribute('aria-hidden', 'true');
    });

    articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) {
            articleModal.style.display = 'none';
            articleModal.setAttribute('aria-hidden', 'true');
        }
    });

    function openArticleModal(art) {
        document.getElementById('modalArticleImg').src = art.image_url || 'images/articles/default.jpg';
        document.getElementById('modalArticleCategory').textContent = art.category || 'Domaine';
        document.getElementById('modalArticleTitle').textContent = art.title;
        document.getElementById('modalArticleDate').querySelector('span').textContent = art.created_at ? new Date(art.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Octobre 2026';
        document.getElementById('modalArticleResume').textContent = art.resume || '';
        document.getElementById('modalArticleBody').textContent = art.content || art.desc || '';
        
        articleModal.style.display = 'flex';
        articleModal.setAttribute('aria-hidden', 'false');
    }

    try {
        const response = await fetch(getApiUrl('/api/articles'));
        const articles = await response.json();

        if (articles.length > 0) {
            blogGrid.innerHTML = '';
            articles.forEach(art => {
                const card = document.createElement('article');
                card.className = 'blog-card';
                card.id = art.slug;
                
                const categoryRaw = art.category || 'Domaine';
                const categoryText = categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1);
                const desc = art.resume ? art.resume : (art.content ? art.content.substring(0, 140) + '...' : '');

                card.innerHTML = `
                    <div class="blog-image">
                        <img src="${art.image_url || 'images/articles/default.jpg'}" alt="${art.title}" onerror="this.src='images/articles/default.jpg'">
                        <span class="blog-category">${categoryText}</span>
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">${art.title}</h3>
                        <p class="blog-desc">${desc}</p>
                        <div class="blog-footer">
                            <span class="blog-date"><i class="fas fa-calendar"></i> ${art.created_at ? new Date(art.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Octobre 2026'}</span>
                            <a href="javascript:void(0)" class="blog-link read-article-btn">Lire l'article →</a>
                        </div>
                    </div>
                `;

                card.querySelector('.read-article-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    openArticleModal(art);
                });

                blogGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Erreur chargement blog:", error);
    }

    // Modal click support for static cards if API is offline
    document.querySelectorAll('#blogGrid .blog-card').forEach(card => {
        const link = card.querySelector('.blog-link');
        if (link && !link.classList.contains('read-article-btn')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const title = card.querySelector('.blog-title') ? card.querySelector('.blog-title').textContent : '';
                const desc = card.querySelector('.blog-desc') ? card.querySelector('.blog-desc').textContent : '';
                const category = card.querySelector('.blog-category') ? card.querySelector('.blog-category').textContent : '';
                const img = card.querySelector('img') ? card.querySelector('img').src : '';
                openArticleModal({
                    title: title,
                    category: category,
                    resume: desc,
                    content: desc + "\n\nCet article offre un aperçu complet des traditions, des pratiques et des richesses extraordinaires liées à ce domaine à travers le continent africain. Découvrez nos guides spécialisés et nos conseils pour vivre une expérience inoubliable.",
                    image_url: img
                });
            });
        }
    });

    // Recherche dynamique
    if (blogSearch) {
        blogSearch.addEventListener('input', function(e) {
            const q = e.target.value.trim().toLowerCase();
            document.querySelectorAll('#blogGrid .blog-card').forEach(card => {
                const txt = (card.querySelector('.blog-title').textContent + ' ' + card.querySelector('.blog-desc').textContent + ' ' + (card.querySelector('.blog-category') ? card.querySelector('.blog-category').textContent : '')).toLowerCase();
                card.style.display = txt.includes(q) ? '' : 'none';
            });
        });
    }
});
