/**
 * PROJET: VISIT AFRIKA
 * FICHIER: rd_congo.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

﻿// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', // Fonction: 
function () {
    this.classList.toggle('active');
    document.getElementById('navbarMenu').classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', // Fonction: 
function () {
        document.getElementById('menuToggle').classList.remove('active');
        document.getElementById('navbarMenu').classList.remove('active');
    });
});


// Animation d'apparition pour les attractions
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
    // Animation du titre principal
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

    // Gestion modale Visiter
    const infos = {
        virunga: {
            titre: 'Parc National des Virunga',
            localisation: 'Nord-Kivu, Est de la RDC',
            periode: 'Juin à septembre',
            acces: 'Vol vers Goma puis route',
            conseils: 'Permis gorille obligatoire, sécurité stricte',
            contact: 'Fondation Virunga',
            hotel: 'Mikeno Lodge',
            hotelLoc: 'Rumangabo',
            hotelFonct: 'Bungalows de luxe, vue sur la forêt, pension complète',
            hotelContact: '+243 99 11 11 111',
            hotelRestau: 'Restaurant gastronomique du lodge',
            guide: 'Guides officiels du parc (obligatoire)',
            guideContact: 'Via le parc'
        },
        kinshasa: {
            titre: 'Kinshasa',
            localisation: 'Ouest de la RDC, rive du fleuve Congo',
            periode: 'Toute l’année (saison sèche préférable)',
            acces: 'Aéroport international de N\'Djili',
            conseils: 'Découvrir la vie nocturne, visiter le marché d\'art',
            contact: 'Office du tourisme Kinshasa',
            hotel: 'Fleuve Congo Hotel',
            hotelLoc: 'Gombe, Kinshasa',
            hotelFonct: '5 étoiles, tout confort, sécurité maximale',
            hotelContact: '+243 82 00 00 000',
            hotelRestau: 'Plusieurs restaurants et bars',
            guide: 'Patrick Kabeya',
            guideContact: '+243 81 22 33 444'
        },
        zongo: {
            titre: 'Chutes de Zongo',
            localisation: 'Kongo Central, à 130 km de Kinshasa',
            periode: 'Toute l’année',
            acces: '4x4 nécessaire depuis Kinshasa',
            conseils: 'Prévoir maillot de bain et pique-nique',
            contact: 'Seli Safari Zongo',
            hotel: 'Seli Safari Resort',
            hotelLoc: 'Site de Zongo',
            hotelFonct: 'Bungalows, tentes, restaurant, piscine',
            hotelContact: '+243 89 89 89 899',
            hotelRestau: 'Restaurant sur place',
            guide: 'Guide du site',
            guideContact: 'Sur place'
        },
        kahuzi: {
            titre: 'Parc National de Kahuzi-Biega',
            localisation: 'Sud-Kivu, près de Bukavu',
            periode: 'Saison sèche',
            acces: 'Vol vers Bukavu',
            conseils: 'Trek gorilles de plaine',
            contact: 'PNKB',
            hotel: 'Orchids Safari Club',
            hotelLoc: 'Bukavu',
            hotelFonct: 'Hôtel lacustre, vue sur le lac Kivu',
            hotelContact: '+243 99 99 99 999',
            hotelRestau: 'Restaurant raffiné',
            guide: 'Guides du PNKB',
            guideContact: 'Via le parc'
        },
        fleuve_congo: {
            titre: 'Fleuve Congo',
            localisation: 'Traverse tout le pays',
            periode: 'Toute l’année',
            acces: 'Bateau depuis Kinshasa ou Kisangani',
            conseils: 'Balade en pirogue ou croisière organisée',
            contact: 'Agences à Kinshasa',
            hotel: 'N/A',
            hotelLoc: 'N/A',
            hotelFonct: 'N/A',
            hotelContact: 'N/A',
            hotelRestau: 'Restaurants sur berges',
            guide: 'Agences locales',
            guideContact: 'N/A'
        },
        okapi: {
            titre: 'Réserve de faune à okapis',
            localisation: 'Ituri, Nord-Est',
            periode: 'Décembre à février',
            acces: 'Difficile, route depuis Bunia ou Kisangani',
            conseils: 'Zone isolée, bien préparer son voyage',
            contact: 'RFO Epulu',
            hotel: 'Gîte d\'Epulu',
            hotelLoc: 'Epulu',
            hotelFonct: 'Hébergement basique',
            hotelContact: 'N/A',
            hotelRestau: 'Cuisine locale',
            guide: 'Pisteurs Mbuti',
            guideContact: 'Sur place'
        }
    };
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
                // Gestion du formulaire
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


