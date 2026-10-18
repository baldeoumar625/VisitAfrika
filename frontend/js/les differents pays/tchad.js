/**
 * PROJET: VISIT AFRIKA
 * FICHIER: tchad.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

﻿
// Gestion modale Visiter (infos pour chaque site)
// Données spécifiques pour le Tchad
const infos = {
    zakouma: {
        titre: 'Parc National de Zakouma',
        localisation: 'Sud-Est (Salamat)',
        periode: 'Décembre à avril (fermé saison pluies)',
        acces: 'Avion chartérisé depuis N Djamena',
        conseils: 'Meilleur parc d\'Afrique centrale, éléphants par centaines',
        contact: 'African Parks Network',
        hotel: 'Camp Nomade / Tinga Camp',
        hotelLoc: 'Dans le parc',
        hotelFonct: 'Luxe éco-touristique (Nomade) ou Standard (Tinga)',
        hotelContact: 'zakouma@africanparks.org',
        hotelRestau: 'Inclus dans le forfait safari',
        guide: 'Guides APN',
        guideContact: 'Inclus'
    },
    ennedi: {
        titre: 'Massif de l\'Ennedi',
        localisation: 'Nord-Est (Sahara)',
        periode: 'Octobre à mars',
        acces: 'Expédition 4x4 (plusieurs jours)',
        conseils: 'UNESCO, Guelta d\'Archei, peintures rupestres, arches',
        contact: 'Point Afrique / Agences locales',
        hotel: 'Bivouac sous les étoiles',
        hotelLoc: 'Désert',
        hotelFonct: 'Camping sauvage organisé',
        hotelContact: 'Agences voyage',
        hotelRestau: 'Cuisine au feu de bois',
        guide: 'Toubou local obligatoire',
        guideContact: 'Via agence'
    },
    ounianga: {
        titre: 'Lacs d\'Ounianga',
        localisation: 'Grand Nord',
        periode: 'Hiver (fraîcheur relative)',
        acces: 'Expédition 4x4 très longue',
        conseils: 'Lacs en plein désert, couleurs uniques, UNESCO',
        contact: 'Agences spécialisées',
        hotel: 'Bivouac',
        hotelLoc: 'Bord des lacs',
        hotelFonct: 'Tentes',
        hotelContact: 'N/A',
        hotelRestau: 'Expédition',
        guide: 'Guide désert',
        guideContact: 'Via agence'
    },
    ndjamena: {
        titre: 'N\'Djamena',
        localisation: 'Capitale (Ouest)',
        periode: 'Toute l’année',
        acces: 'Aéroport Hassan Djamous',
        conseils: 'Musée National, Grand Marché, Mosquée',
        contact: 'Office Tourisme',
        hotel: 'Hilton N\'Djamena',
        hotelLoc: 'Bord du Chari',
        hotelFonct: 'Luxe international',
        hotelContact: '+235 22 51 40 40',
        hotelRestau: 'Divers restaurants',
        guide: 'Guides urbains',
        guideContact: 'Hôtel'
    },
    tibesti: {
        titre: 'Monts Tibesti & Emi Koussi',
        localisation: 'Extrême Nord',
        periode: 'Hiver',
        acces: 'Expédition difficile',
        conseils: 'Volcanisme, plus haut sommet du Sahara, peintures',
        contact: 'Agences expéditions',
        hotel: 'Bivouac',
        hotelLoc: 'Montagne',
        hotelFonct: 'Aventure totale',
        hotelContact: 'N/A',
        hotelRestau: 'Autonomie',
        guide: 'Guide Toubou expert',
        guideContact: 'Agence'
    }
};

document.addEventListener('DOMContentLoaded', // Fonction: 
function () {
    const items = document.querySelectorAll('.attraction');
    items.forEach((item, i) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(40px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.7s cubic-bezier(.4,1.7,.6,.95), transform 0.7s cubic-bezier(.4,1.7,.6,.95)';
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 200 + i * 180);
    });

    const h1 = document.querySelector('h1');
    if (h1) {
        h1.style.opacity = 0;
        h1.style.transform = 'scale(0.8)';
        setTimeout(() => {
            h1.style.transition = 'opacity 0.7s, transform 0.7s cubic-bezier(.4,1.7,.6,.95)';
            h1.style.opacity = 1;
            h1.style.transform = 'scale(1)';
        }, 100);
    }

    const modal = document.getElementById('visit-modal');
    const modalBody = document.getElementById('visit-modal-body');

    document.querySelectorAll('.visit-btn').forEach(btn => {
        btn.addEventListener('click', // Fonction: 
function () {
            const key = this.getAttribute('data-site');
            const data = infos[key];
            const attractionCard = this.closest('.attraction');
            let imgSrc = '';
            if (attractionCard) {
                const imgEl = attractionCard.querySelector('img');
                if (imgEl) imgSrc = imgEl.src;
            }
            if (data) {
                modalBody.innerHTML = `
                    <h3>${data.titre}</h3>
                    <ul>
                        <li><strong>Localisation :</strong> ${data.localisation}</li>
                        <li><strong>Meilleure période :</strong> ${data.periode}</li>
                        <li><strong>Accès :</strong> ${data.acces}</li>
                        <li><strong>Conseils :</strong> ${data.conseils}</li>
                        <li><strong>Contact :</strong> ${data.contact}</li>
                        <li><strong>Hôtel recommandé :</strong> ${data.hotel}</li>
                        <li style="margin-left:18px;list-style:circle;">
                            <strong>Localisation hôtel :</strong> ${data.hotelLoc}<br>
                            <strong>Fonctionnement :</strong> ${data.hotelFonct}<br>
                            <strong>Contact hôtel :</strong> <span style="color:#0a7c2f;">${data.hotelContact}</span><br>
                            <strong>Restauration :</strong> ${data.hotelRestau}
                        </li>
                        <li><strong>Guide local :</strong> ${data.guide} (<span style="color:#0a7c2f;">${data.guideContact}</span>)</li>
                    </ul>
                    <hr style="margin:18px 0;">
                    <form id="visit-form" class="visit-form-styled">
    <div class="form-header">
        <h4><i class="fas fa-calendar-alt"></i> Organiser ma visite</h4>
    </div>
    <div class="form-row">
        <div class="form-group">
            <label>Date de visite *</label>
            <input type="date" name="date" required>
        </div>
        <div class="form-group">
            <label>Personnes *</label>
            <input type="number" name="personnes" min="1" max="50" value="1" required>
        </div>
    </div>
    <div class="form-group">
        <label>Email ou téléphone *</label>
        <input type="text" name="contact" required>
    </div>
    <div class="form-group">
        <label>Commentaire</label>
        <textarea name="commentaire" rows="2" placeholder="Demande particulière ?"></textarea>
    </div>
    <button type="submit" class="btn-submit">Envoyer la demande</button>
</form>
                    <div id="visit-confirm" style="display:none;padding:12px 0 0 0;color:#0a7c2f;font-weight:bold;text-align:center;">Votre demande a bien été envoyée !<br>Nous vous contacterons rapidement.</div>
                `;
                if (imgSrc) {
                    const modalContentEl = document.querySelector('.visit-modal-content');
                    if (modalContentEl) {
                        modalContentEl.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)), url("' + imgSrc + '")';
                        modalContentEl.style.backgroundSize = 'cover';
                        modalContentEl.style.backgroundAttachment = 'fixed';
                        modalContentEl.style.backgroundPosition = 'center';
                    }
                }
                modal.style.display = 'block';

                setTimeout(() => {
                    const form = document.getElementById('visit-form');
                    if (form) {
                        form.onsubmit = // Fonction: 
function (e) {
                            e.preventDefault();
                            form.style.display = 'none';
                            document.getElementById('visit-confirm').style.display = 'block';
                        };
                    }
                }, 100);
            }
        });
    });

    document.querySelector('.visit-modal-close').onclick = // Fonction: 
function () {
        modal.style.display = 'none';
    };

    window.onclick = // Fonction: 
function (event) {
        if (event.target === modal) modal.style.display = 'none';
    };
});


