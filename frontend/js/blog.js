/**
 * PROJET: VISIT AFRIKA
 * FICHIER: blog.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

// menu toggle (shared)
    document.getElementById('menuToggle').addEventListener('click', function() {
      this.classList.toggle('active');
      document.getElementById('navbarMenu').classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', function(){
      document.getElementById('menuToggle').classList.remove('active');
      document.getElementById('navbarMenu').classList.remove('active');
    }));

    // Simple client-side search for blog cards
    document.getElementById('blogSearch').addEventListener('input', function(e){
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('#blogGrid .blog-card').forEach(card => {
        const txt = (card.querySelector('.blog-title').textContent + ' ' + card.querySelector('.blog-desc').textContent).toLowerCase();
        card.style.display = txt.includes(q) ? '' : 'none';
      });
    });