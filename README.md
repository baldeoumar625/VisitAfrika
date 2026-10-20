# 🌍 Visit Afrika — Plateforme Touristique & Culturelle Africaine

<p align="center">
  <img src="frontend/logo/carte-afrique.jpg" alt="Visit Afrika Logo" width="180" style="border-radius: 50%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" />
</p>

<p align="center">
  <b>Explorez la richesse, l'histoire, la faune et les merveilles des 54 pays du continent africain.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

---

## 📖 Sommaire

- [À Propos du Projet](#-à-propos-du-projet)
- [Fonctionnalités Principales](#-fonctionnalités-principales)
- [Stack Technique](#-stack-technique)
- [Structure du Projet](#-structure-du-projet)
- [Prérequis & Installation](#-prérequis--installation)
- [Configuration (.env)](#-configuration-env)
- [Initialisation de la Base de Données](#-initialisation-de-la-base-de-données)
- [Lancement de l'Application](#-lancement-de-lapplication)
- [Comptes par Défaut (Test & Démo)](#-comptes-par-défaut-test--démo)
- [Documentation de l'API](#-documentation-de-lapi)
- [Auteur & Licence](#-auteur--licence)

---

## 🌟 À Propos du Projet

**Visit Afrika** est une plateforme web interactive et moderne dédiée à la valorisation touristique, culturelle et historique de l'Afrique. Elle permet aux voyageurs du monde entier de découvrir chaque pays, d'explorer des sites touristiques incontournables sur une carte interactive, de réserver des visites et de s'informer via un blog dynamique.

La plateforme intègre également un espace d'administration complet permettant la gestion des pays, des sites, des articles, des réservations et des utilisateurs.

---

## ✨ Fonctionnalités Principales

### 🗺️ Espace Visiteur & Voyageur
- **Exploration des 54 Pays d'Afrique** : Filtres interactifs par région (Afrique du Nord, Ouest, Centrale, Est, Australe), recherche dynamique et pagination.
- **Fiches Détaillées par Pays** : Histoire, capitales, population, galeries photographiques et sites touristiques incontournables.
- **Carte Interactive d'Afrique (Leaflet.js)** : Visualisation cartographique de chaque site avec marqueurs géolocalisés et aperçu photos.
- **Blog & Culture Africaine** : Articles sur la faune, les safaris, les traditions, les innovations technologiques et le patrimoine.
- **Système de Réservation** : Formulaire de réservation d'excursions et de séjours touristiques avec suivi de statut.
- **Formulaire de Contact & Messagerie** : Prise de contact directe avec l'équipe Visit Afrika.
- **Authentification & Sécurité** :
  - Inscription et Connexion par email / mot de passe sécurisé (hachage Bcrypt + tokens JWT).
  - Connexion via Google OAuth2.
  - Récupération et réinitialisation de mot de passe sécurisée.

### 🛠️ Espace Administration (Dashboard)
- **Gestion des Utilisateurs** : Attribution des rôles (`admin`, `editor`, `user`), gestion des accès et suppression.
- **Gestion des Pays & Régions** : Ajout, modification, description et mise à jour des images de couverture.
- **Gestion des Sites Touristiques** : Ajout de nouveaux sites avec coordonnées géographiques (latitude/longitude) et images.
- **Gestion du Blog & Articles** : Éditeur d'articles avec téléversement d'images (`Upload`).
- **Gestion des Réservations** : Tableau de bord pour confirmer, mettre en attente ou annuler les réservations de séjours.
- **Boîte de Réception** : Consultation et traitement des messages de contact reçus des utilisateurs.

---

## 💻 Stack Technique

| Domaine | Technologies |
|---|---|
| **Backend** | Python 3.10+, FastAPI, Uvicorn, Starlette, Pydantic |
| **Base de Données** | SQLite, SQLAlchemy ORM |
| **Sécurité & Auth** | JWT (`python-jose`), Passlib (Bcrypt), Authlib (Google OAuth2) |
| **Frontend** | HTML5 sémantique, CSS3 moderne (Glassmorphism, Flexbox/Grid), JavaScript (ES6+ Vanilla) |
| **Cartographie & UI** | Leaflet.js, OpenStreetMap / CartoDB, FontAwesome 6, Bootstrap 5 |

---

## 📁 Structure du Projet

```text
VisitAfrika/
│
├── backend/                        # Serveur API FastAPI & Base de données
│   ├── base_de_donnees.py          # Configuration SQLAlchemy & session DB
│   ├── initialiser_bdd.py          # Script de seed (admin, pays et articles initiaux)
│   ├── initialiser_botswana.py     # Données complémentaires Botswana
│   ├── initialiser_sites_benin.py  # Données complémentaires Bénin
│   ├── modeles.py                  # Modèles de données (User, Country, Site, Article, etc.)
│   ├── serveur.py                  # Serveur principal FastAPI, routes API & fichiers statiques
│   ├── update_countries_images.py  # Script de mise à jour des chemins d'images
│   └── visit_afrika.db             # Fichier base de données SQLite (généré)
│
├── frontend/                       # Interface utilisateur Web
│   ├── admin/                      # Pages d'administration (Dashboard)
│   │   ├── admin_blog.html         # Gestion des articles
│   │   ├── admin_galerie.html      # Gestion de la galerie
│   │   ├── admin_messages.html     # Messages de contact reçus
│   │   ├── admin_parametres.html   # Paramètres généraux
│   │   ├── admin_pays.html         # Gestion des pays & sites
│   │   ├── admin_reservations.html # Gestion des réservations
│   │   └── admin_utilisateurs.html # Gestion des comptes utilisateurs
│   ├── css/                        # Feuilles de styles CSS
│   ├── formulaires/                # Pages de connexion, inscription, réinitialisation
│   ├── images/                     # Images des pays, sites, bannières et articles
│   ├── js/                         # Scripts JavaScript côté client
│   │   ├── admin_*.js              # Logique des modules d'administration
│   │   ├── home_dynamic.js         # Dynamisation de la page d'accueil
│   │   ├── pays.js                 # Logique d'affichage et filtres des pays
│   │   └── sites.js                # Affichage des sites touristiques
│   ├── les differents pays/        # Pages HTML individuelles par pays
│   ├── logo/                       # Identité visuelle et logos
│   ├── index.html                  # Page d'accueil principale
│   ├── pays.html                   # Page de découverte des pays
│   ├── blogs.html                  # Page du blog
│   ├── contact.html                # Page de contact
│   └── propos.html                 # Page À propos
│
├── .env.example                    # Modèle des variables d'environnement
├── .gitignore                      # Fichiers et dossiers ignorés par Git
├── requirements.txt                # Dépendances Python du projet
└── README.md                       # Documentation du projet
```

---

## ⚙️ Prérequis & Installation

### 1. Prérequis
- [Python 3.10+](https://www.python.org/downloads/) installé sur votre système.
- [Git](https://git-scm.com/) pour le versionnement.

### 2. Cloner le Dépôt
```bash
git clone https://github.com/baldeoumar625/VisitAfrika.git
cd VisitAfrika
```

### 3. Créer et Activer l'Environnement Virtuel

- **Sur Windows (PowerShell) :**
  ```powershell
  python -m venv .venv
  .venv\Scripts\Activate.ps1
  ```

- **Sur macOS / Linux :**
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

### 4. Installer les Dépendances
```bash
pip install -r requirements.txt
```

---

## 🔑 Configuration (.env)

Créez un fichier `.env` à la racine du projet en vous basant sur `.env.example` :

```bash
cp .env.example .env
```

Contenu recommandé :
```env
# Clé secrète pour le chiffrement des tokens JWT
SECRET_KEY=votre_cle_secrete_ultra_securisee_visitafrka_2026

# Configuration Google OAuth (Optionnel pour tester en local)
GOOGLE_CLIENT_ID=votre_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre_client_secret
```

---

## 🗄️ Initialisation de la Base de Données

Pour initialiser la base de données SQLite avec les tables, les pays par défaut et le compte administrateur initial, exécutez :

```powershell
python backend/initialiser_bdd.py
```

---

## 🚀 Lancement de l'Application

### Démarrer le Serveur Backend (FastAPI + Uvicorn)
À la racine du projet, lancez :

```powershell
python backend/serveur.py
```
*ou via Uvicorn directement :*
```powershell
uvicorn backend.serveur:app --reload --host 127.0.0.1 --port 8000
```

### Accéder à la Plateforme Web
Une fois le serveur lancé :
- 🌐 **Site Web Principal** : [http://127.0.0.1:8000/index.html](http://127.0.0.1:8000/index.html)
- 🧭 **Exploration des Pays** : [http://127.0.0.1:8000/pays.html](http://127.0.0.1:8000/pays.html)
- 🔐 **Panneau d'Administration** : [http://127.0.0.1:8000/admin/admin_utilisateurs.html](http://127.0.0.1:8000/admin/admin_utilisateurs.html)

*(Note : Vous pouvez également utiliser l'extension VS Code **Live Server** sur le port `5500` ou `5502`, le frontend est configuré pour communiquer automatiquement avec l'API sur le port `8000`).*

---

## 👤 Comptes par Défaut (Test & Démo)

Après exécution du script `backend/initialiser_bdd.py`, vous pouvez vous connecter avec l'administrateur pré-configuré :

| Rôle | Adresse Email | Mot de Passe |
|---|---|---|
| **Administrateur** | `admin@visitafrika.com` | `admin123` |

---

## 📡 Documentation de l'API

FastAPI génère automatiquement la documentation interactive des endpoints :

- **Swagger UI** : [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc** : [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### Aperçu des Principaux Endpoints :

| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Inscription d'un nouvel utilisateur |
| `POST` | `/api/auth/login` | Connexion et génération de token JWT |
| `GET` | `/api/countries` | Liste complète des pays avec filtres |
| `GET` | `/api/sites` | Liste des sites touristiques (avec filtre `country_id`) |
| `GET` | `/api/articles` | Liste des articles de blog |
| `POST` | `/api/reservations` | Création d'une demande de réservation |
| `POST` | `/api/contact` | Envoi d'un message via le formulaire de contact |
| `GET` | `/api/admin/users` | Liste des utilisateurs (réservé aux admins) |

---

## 🤝 Auteur & Contributions

Projet développé avec passion pour célébrer la beauté et la diversité du continent africain.
Les contributions, suggestions et retours d'expérience sont les bienvenus !

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Committez vos modifications (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez votre branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer.
