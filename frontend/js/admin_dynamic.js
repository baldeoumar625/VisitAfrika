/**
 * PROJET: VISIT AFRIKA
 * FICHIER: admin_dynamic.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

// Utility to get auth token
// Fonction: getAuthToken
function getAuthToken() {
    return localStorage.getItem('access_token');
}

const API_BASE = '/api';





document.addEventListener('DOMContentLoaded', () => {
    // populateCountrySelect();
    // fetchSites();
    if(typeof fetchBlogs === 'function') fetchBlogs();
});

// Global form handler
document.addEventListener('submit', async (e) => {
    const form = e.target;
    const token = getAuthToken();

    if (!token) {
        alert("Session expirée. Veuillez vous reconnecter.");
        window.location.href = 'formulaires/connection.html';
        return;
    }



    // --- CASE 2: ADDING A BLOG ARTICLE ---
    if (form.id === 'formAddBlog') {
        e.preventDefault();
        
        const title = document.getElementById('titreArticle').value;
        const category = document.getElementById('categorie').value;
        const resume = document.getElementById('resumeArticle').value;
        const content = document.getElementById('contenuArticle').value;
        const slug = title.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/ /g, '-').replace(/[^\w-]/g, '');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('resume', resume);
        formData.append('content', content);
        formData.append('slug', slug);

        const imageInput = document.getElementById('imageArticle');
        if (imageInput && imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }

        try {
            const res = await fetch(`${API_BASE}/articles`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                alert("📰 Article publié !");
                form.reset();
                const fileStatus = document.getElementById('fileStatusBlog');
                if (fileStatus) fileStatus.classList.add('d-none');
                fetchBlogs();
            } else {
                const err = await res.json();
                alert("❌ Erreur: " + (err.detail || "Inconnue"));
            }
        } catch (err) { console.error(err); }
    }
});



// --- CRUD BLOGS ---
window.fetchBlogs = async function() {
    const tbody = document.getElementById('blogsTableBody');
    if (!tbody) return; // Seulement sur la page admin_blog

    try {
        const res = await fetch(`${API_BASE}/articles`);
        const blogs = await res.json();
        
        tbody.innerHTML = '';
        if (blogs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-muted">Aucun article trouvé.</td></tr>';
            return;
        }

        blogs.forEach((b, index) => {
            const dateStr = b.created_at ? new Date(b.created_at).toLocaleDateString('fr-FR') : 'Inconnue';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="fw-bold text-muted">${index + 1}</td>
                <td><span class="fw-bold">${b.title}</span></td>
                <td><span class="badge bg-light text-dark border">${dateStr}</span></td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="openEditBlogModal(${b.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteBlog(${b.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) { console.error(err); }
}

window.deleteBlog = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    const token = getAuthToken();
    try {
        const res = await fetch(`${API_BASE}/articles/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            alert("Article supprimé !");
            fetchBlogs();
        } else {
            alert("Erreur lors de la suppression");
        }
    } catch (err) { console.error(err); }
};

window.openEditBlogModal = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/articles`);
        const blogs = await res.json();
        const blog = blogs.find(b => b.id === id);
        
        if (blog) {
            document.getElementById('editBlogId').value = blog.id;
            document.getElementById('editBlogTitle').value = blog.title;
            
            if (document.getElementById('editBlogCategory')) {
                document.getElementById('editBlogCategory').value = blog.category || 'destinations';
            }
            if (document.getElementById('editBlogResume')) {
                document.getElementById('editBlogResume').value = blog.resume || '';
            }
            
            document.getElementById('editBlogContent').value = blog.content;
            
            const modalEl = document.getElementById('editBlogModal');
            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            }
        }
    } catch (err) { console.error(err); }
};

document.addEventListener('DOMContentLoaded', () => {
    const formEditBlog = document.getElementById('formEditBlog');
    if (formEditBlog) {
        formEditBlog.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('editBlogId').value;
            const title = document.getElementById('editBlogTitle').value;
            const content = document.getElementById('editBlogContent').value;
            const category = document.getElementById('editBlogCategory') ? document.getElementById('editBlogCategory').value : '';
            const resume = document.getElementById('editBlogResume') ? document.getElementById('editBlogResume').value : '';
            const token = getAuthToken();

            try {
                const res = await fetch(`${API_BASE}/articles/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ title, content, category, resume })
                });

                if (res.ok) {
                    alert("Article mis à jour !");
                    const modalEl = document.getElementById('editBlogModal');
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    if (modal) modal.hide();
                    fetchBlogs();
                } else {
                    alert("Erreur lors de la modification");
                }
            } catch (err) { console.error(err); }
        });
    }
});
