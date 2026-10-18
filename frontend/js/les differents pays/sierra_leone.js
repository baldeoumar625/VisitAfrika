/**
 * PROJET: VISIT AFRIKA
 * FICHIER: sierra_leone.js
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Visit Afrika: Script Le Sierra Leone loaded.");

    // ANIMATIONS
    const cards = document.querySelectorAll('.attraction');
    cards.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + i * 100);
    });

    // MAP
    let map = null;
    const toggleMapBtn = document.getElementById('toggleMap');
    const mapContainer = document.getElementById('map-container');

    if (toggleMapBtn && mapContainer) {
        toggleMapBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (mapContainer.style.display === 'none') {
                mapContainer.style.display = 'block';
                if (!map) {
                    map = L.map('sierra_leone-map').setView([12.0, -10.0], 6);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                }
                mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                mapContainer.style.display = 'none';
            }
        });
    }

    // MODAL & INFO
    const infos = {
    "site1": {
        "titre": "Site Naturel",
        "loc": "R\u00e9gion 1",
        "desc": "Un paysage \u00e9poustouflant."
    },
    "site2": {
        "titre": "Site Culturel",
        "loc": "Ville 1",
        "desc": "Un haut lieu de la tradition locale."
    }
};

    const modal = document.getElementById('visit-modal');
    const modalBody = document.getElementById('visit-modal-body');
    const closeBtn = document.querySelector('.visit-modal-close');

    document.querySelectorAll('.btn-decouvrir').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const key = this.getAttribute('data-site');
            const data = infos[key] || { titre: 'Site Touristique', loc: 'Le Sierra Leone' };
            modalBody.innerHTML = `
                <h3>${data.titre}</h3>
                <p><strong>Localisation :</strong> ${data.loc}</p>
                <p>${data.desc}</p>
                <hr>
                <button class='btn-ajouter' style='width:100%' onclick='alert("Demande envoyée !")'>Réserver une visite</button>
            `;
            modal.style.display = 'block';
        });
    });

    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
});
