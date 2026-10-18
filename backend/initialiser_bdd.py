# -*- coding: utf-8 -*-
# PROJET: VISIT AFRIKA
# FICHIER: seed_db.py
# DESCRIPTION: Script pour initialiser la base de données avec des données par défaut.

import sys
import os
from sqlalchemy.orm import Session
from base_de_donnees import SessionLocal, engine, Base
import modeles as models
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Fonction: seed
def seed():
    # Créer les tables si elles n'existent pas
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 1. Créer un administrateur par défaut
        admin = db.query(models.User).filter(models.User.email == "admin@visitafrika.com").first()
        if not admin:
            admin = models.User(
                nom="Admin",
                prenom="Visit",
                email="admin@visitafrika.com",
                hashed_password=pwd_context.hash("admin123"),
                role="admin"
            )
            db.add(admin)
            db.commit()
            print("Admin cree (admin@visitafrika.com / admin123)")
        
        # 2. Ajouter les pays (depuis pays.js - échantillon)
        countries_to_add = [
            {"name": "Algérie", "region": "Afrique du Nord", "capital": "Alger", "slug": "algerie", "desc": "Grand pays d'Afrique du Nord.", "img": "images/pays/Afrique_Nord/algerie.jpg"},
            {"name": "Angola", "region": "Afrique Centrale", "capital": "Luanda", "slug": "angola", "desc": "Pays d'Afrique australe.", "img": "images/pays/Afrique_Centrale/angola.jpg"},
            {"name": "Bénin", "region": "Afrique de l'Ouest", "capital": "Porto-Novo", "slug": "benin", "desc": "Pays d'Afrique de l'Ouest.", "img": "images/pays/Afrique_Ouest/benin.jpg"},
            {"name": "Botswana", "region": "Afrique Australe", "capital": "Gaborone", "slug": "botswana", "desc": "Pays célèbre pour le delta de l'Okavango.", "img": "images/pays/Afrique_Australe/botswana.jpg"},
            {"name": "Guinée", "region": "Afrique de l'Ouest", "capital": "Conakry", "slug": "guinee", "desc": "Château d'eau de l'Afrique de l'Ouest.", "img": "images/pays/Afrique_Ouest/guinee.jpg"},
            {"name": "Sénégal", "region": "Afrique de l'Ouest", "capital": "Dakar", "slug": "senegal", "desc": "Pays de la Teranga.", "img": "images/pays/Afrique_Ouest/senegal.jpg"},
            {"name": "Côte d'Ivoire", "region": "Afrique de l'Ouest", "capital": "Yamoussoukro", "slug": "cote_ivoire", "desc": "Puissance économique d'Afrique de l'Ouest.", "img": "images/pays/Afrique_Ouest/cote_ivoire.jpg"},
            {"name": "Maroc", "region": "Afrique du Nord", "capital": "Rabat", "slug": "maroc", "desc": "Royaume du couchant.", "img": "images/pays/Afrique_Nord/maroc.jpg"},
            {"name": "Égypte", "region": "Afrique du Nord", "capital": "Le Caire", "slug": "egypte", "desc": "Terre des Pharaons.", "img": "images/pays/Afrique_Nord/egypte.jpg"},
            {"name": "Afrique du Sud", "region": "Afrique Australe", "capital": "Pretoria", "slug": "afrique_du_sud", "desc": "La nation arc-en-ciel.", "img": "images/pays/Afrique_Australe/afrique_du_sud.jpg"},
            {"name": "Burkina Faso", "region": "Afrique de l'Ouest", "capital": "Ouagadougou", "slug": "burkina_faso", "desc": "Pays des hommes intègres.", "img": "images/pays/Afrique_Ouest/burkina_faso.jpg"},
            {"name": "Burundi", "region": "Afrique de l'Est", "capital": "Gitega", "slug": "burundi", "desc": "Cœur de l'Afrique.", "img": "images/pays/Afrique_Est/burundi.jpg"},
            {"name": "Cameroun", "region": "Afrique Centrale", "capital": "Yaoundé", "slug": "cameroun", "desc": "Afrique en miniature.", "img": "images/pays/Afrique_Centrale/cameroun.jpg"},
            {"name": "Cap Vert", "region": "Afrique de l'Ouest", "capital": "Praia", "slug": "cap_vert", "desc": "Archipel volcanique.", "img": "images/pays/Afrique_Ouest/cap_vert.jpg"},
            {"name": "Comores", "region": "Afrique de l'Est", "capital": "Moroni", "slug": "comores", "desc": "Îles de la lune.", "img": "images/pays/Afrique_Est/comores.jpg"},
            {"name": "Congo (Brazzaville)", "region": "Afrique Centrale", "capital": "Brazzaville", "slug": "congo_brazza", "desc": "République du Congo.", "img": "images/pays/Afrique_Centrale/congo.jpg"},
            {"name": "Djibouti", "region": "Afrique de l'Est", "capital": "Djibouti", "slug": "djibouti", "desc": "Carrefour maritime.", "img": "images/pays/Afrique_Est/djibouti.jpg"},
            {"name": "Érythrée", "region": "Afrique de l'Est", "capital": "Asmara", "slug": "erythree", "desc": "Perle de la mer Rouge.", "img": "images/pays/Afrique_Est/erythree.jpg"},
            {"name": "Eswatini", "region": "Afrique Australe", "capital": "Mbabane", "slug": "eswatini", "desc": "Ancien Swaziland.", "img": "images/pays/Afrique_Australe/eswatini.jpg"},
            {"name": "Éthiopie", "region": "Afrique de l'Est", "capital": "Addis-Abeba", "slug": "ethiopie", "desc": "Toit de l'Afrique.", "img": "images/pays/Afrique_Est/ethiopie.jpg"},
            {"name": "Gabon", "region": "Afrique Centrale", "capital": "Libreville", "slug": "gabon", "desc": "Bassin du Congo.", "img": "images/pays/Afrique_Centrale/gabon.jpg"},
            {"name": "Gambie", "region": "Afrique de l'Ouest", "capital": "Banjul", "slug": "gambie", "desc": "Sourire de l'Afrique.", "img": "images/pays/Afrique_Ouest/gambie.jpg"},
            {"name": "Ghana", "region": "Afrique de l'Ouest", "capital": "Accra", "slug": "ghana", "desc": "Pays de l'Or.", "img": "images/pays/Afrique_Ouest/ghana.jpg"},
            {"name": "Mali", "region": "Afrique de l'Ouest", "capital": "Bamako", "slug": "mali", "desc": "Empire Mandingue.", "img": "images/pays/Afrique_Ouest/mali.jpg"},
            {"name": "Mauritanie", "region": "Afrique de l'Ouest", "capital": "Nouakchott", "slug": "mauritanie", "desc": "Porte du Sahara.", "img": "images/pays/Afrique_Ouest/mauritanie.jpg"},
            {"name": "Niger", "region": "Afrique de l'Ouest", "capital": "Niamey", "slug": "niger", "desc": "Fleuve Niger.", "img": "images/pays/Afrique_Ouest/niger.jpg"},
            {"name": "Nigeria", "region": "Afrique de l'Ouest", "capital": "Abuja", "slug": "nigeria", "desc": "Géant de l'Afrique.", "img": "images/pays/Afrique_Ouest/nigeria.jpg"},
            {"name": "Rwanda", "region": "Afrique de l'Est", "capital": "Kigali", "slug": "rwanda", "desc": "Pays des mille collines.", "img": "images/pays/Afrique_Est/rwanda.jpg"},
            {"name": "Tchad", "region": "Afrique Centrale", "capital": "N'Djamena", "slug": "tchad", "desc": "Cœur mort de l'Afrique.", "img": "images/pays/Afrique_Centrale/tchad.jpg"},
            {"name": "Togo", "region": "Afrique de l'Ouest", "capital": "Lomé", "slug": "togo", "desc": "Petit pays côtier.", "img": "images/pays/Afrique_Ouest/togo.jpg"},
            {"name": "Tunisie", "region": "Afrique du Nord", "capital": "Tunis", "slug": "tunisie", "desc": "Perle de la Méditerranée.", "img": "images/pays/Afrique_Nord/tunisie.jpg"},
            {"name": "Zambie", "region": "Afrique Australe", "capital": "Lusaka", "slug": "zambie", "desc": "Chutes Victoria.", "img": "images/pays/Afrique_Australe/zambie.jpg"},
            {"name": "Zimbabwe", "region": "Afrique Australe", "capital": "Harare", "slug": "zimbabwe", "desc": "Grand Zimbabwe.", "img": "images/pays/Afrique_Australe/zimbabwe.jpg"},
            {"name": "Mozambique", "region": "Afrique Australe", "capital": "Maputo", "slug": "mozambique", "desc": "Perle de l'Océan Indien.", "img": "images/pays/Afrique_Australe/mozambique.jpg"},
            {"name": "République démocratique du Congo", "region": "Afrique Centrale", "capital": "Kinshasa", "slug": "republique_democratique_du_congo", "desc": "Géant au cœur de l'Afrique.", "img": "images/pays/Afrique_Centrale/rd_congo.jpg"},
            {"name": "Sao Tomé-et-Principe", "region": "Afrique Centrale", "capital": "São Tomé", "slug": "sao_tome_et_principe", "desc": "Îles chocolat de l'Atlantique.", "img": "images/pays/Afrique_Centrale/sao_tome_principe.jpg"},
            {"name": "Somalie", "region": "Afrique de l'Est", "capital": "Mogadiscio", "slug": "somalie", "desc": "La Corne de l'Afrique.", "img": "images/pays/Afrique_Est/somalie.jpg"}
        ]
        
        # On vide la table Country pour repartir sur des slugs propres
        # db.query(models.Country).delete() # Optionnel si on veut tout écraser
        
        for c_data in countries_to_add:
            country = db.query(models.Country).filter(models.Country.name == c_data["name"]).first()
            if not country:
                country = models.Country(
                    name=c_data["name"],
                    description=c_data["desc"],
                    slug=c_data["slug"],
                    image_url=c_data["img"],
                    region=c_data["region"],
                    capital=c_data["capital"]
                )
                db.add(country)
                print(f"Pays ajoute : {c_data['name']}")
            else:
                country.slug = c_data["slug"]
                country.image_url = c_data["img"]
                country.region = c_data["region"]
                country.capital = c_data["capital"]
                print(f"Informations (Slug, Image, Region, Capitale) mises a jour pour : {c_data['name']}")
            db.commit()

        # 3. Ajouter des sites (échantillon depuis sites.js)
        # On récupère les IDs des pays créés
        egypt = db.query(models.Country).filter(models.Country.slug == "egypt").first()
        guinea = db.query(models.Country).filter(models.Country.slug == "guinea").first()
        senegal = db.query(models.Country).filter(models.Country.slug == "senegal").first()

        sites_data = [
            {"name": "Pyramides de Gizeh", "location": "Gizeh, Égypte", "description": "Les grandes pyramides et le Sphinx.", "country_id": egypt.id if egypt else None, "image_url": "images/sites_populaires/pyramides_de_gizeh.jpg"},
            {"name": "Mont Loura", "location": "Mali, Guinée", "description": "Point culminant de la Guinée et Dame de Mali.", "country_id": guinea.id if guinea else None, "image_url": "images/sites des pays/guinee/loura.png"},
            {"name": "Île de Gorée", "location": "Dakar, Sénégal", "description": "Maison des Esclaves et lieu de mémoire.", "country_id": senegal.id if senegal else None, "image_url": "images/sites_populaires/ile_de_goree.jpg"},
        ]
        
        for s_data in sites_data:
            site = db.query(models.Site).filter(models.Site.name == s_data["name"]).first()
            if not site:
                site = models.Site(**s_data)
                db.add(site)
                print(f"Site ajoute : {s_data['name']}")
            else:
                site.image_url = s_data["image_url"]
                print(f"Image mise a jour pour le site : {s_data['name']}")
            db.commit()

        # 4. Ajouter des articles de blog pour chaque domaine
        articles_data = [
            {
                "title": "Trésors et traditions d'Afrique : Un patrimoine culturel d'une richesse inestimable",
                "slug": "culture-et-patrimoine-africain",
                "category": "Culture & Patrimoine",
                "resume": "Des récits des grands griots sous l'arbre à palabres aux sculptures royales et danses rituelles, découvrez l'âme vivante des traditions africaines.",
                "image_url": "images/articles/culture_patrimoine.jpg",
                "content": "Le continent africain est un berceau culturel d'une diversité fascinante.",
                "author_id": admin.id
            },
            {
                "title": "Les plus beaux safaris d'Afrique : À la rencontre de la faune sauvage",
                "slug": "faune-et-safaris-afrique",
                "category": "Faune & Safaris",
                "resume": "Partez explorer le Serengeti, le cratère du Ngorongoro et le delta de l'Okavango pour une immersion spectaculaire au cœur du règne animal.",
                "image_url": "images/articles/faune_safari.jpg",
                "content": "L'Afrique est la terre sacrée du safari animalier.",
                "author_id": admin.id
            },
            {
                "title": "Gastronomie africaine : Les 12 plats emblématiques à déguster absolument",
                "slug": "gastronomie-et-saveurs-africaines",
                "category": "Gastronomie",
                "resume": "Du Thiéboudienne du Sénégal au Jollof Rice nigérian, en passant par le Ndolé camerounais et les tajines parfumés du Maghreb, un festival de saveurs.",
                "image_url": "images/articles/gastronomie.jpg",
                "content": "La cuisine africaine est une symphonie de parfums, d'épices vibrantes et d'ingrédients authentiques du terroir.",
                "author_id": admin.id
            },
            {
                "title": "Rythmes et vibrations du continent : La Rumba, l'Afrobeats et l'essor culturel mondial",
                "slug": "musique-danse-et-art-africain",
                "category": "Musique & Art",
                "resume": "Comment la créativité musicale africaine, de Kinshasa à Lagos et Johannesburg, fait vibrer les scènes et festivals de la planète.",
                "image_url": "images/articles/musique_art.jpg",
                "content": "La musique est le véritable pouls de l'Afrique.",
                "author_id": admin.id
            },
            {
                "title": "Des volcans majestueux aux déserts infinis : Les merveilles naturelles d'Afrique",
                "slug": "merveilles-naturelles-afrique",
                "category": "Nature & Paysages",
                "resume": "Du sommet enneigé du Kilimandjaro aux spectaculaires Chutes Victoria et dunes rouges du Namib, explorez des géants de la nature.",
                "image_url": "images/articles/nature_paysages.jpg",
                "content": "Les paysages d'Afrique offrent des reliefs d'une grandeur monumentale qui dépassent l'imagination.",
                "author_id": admin.id
            },
            {
                "title": "L'Afrique de demain : Silicon Savannah, hubs d'innovation et dynamisme de la jeunesse",
                "slug": "economie-et-innovation-afrique",
                "category": "Économie & Tech",
                "resume": "Paiement mobile, énergies renouvelables et écosystème numérique : comment les entrepreneurs africains façonnent le futur.",
                "image_url": "images/articles/innovation_tech.jpg",
                "content": "L'Afrique connaît une transformation technologique et économique sans précédent.",
                "author_id": admin.id
            },
            {
                "title": "Mode et élégance africaine : De la SAPE mythique aux étoffes traditionnelles",
                "slug": "mode-artisanat-et-elegance",
                "category": "Mode & Artisanat",
                "resume": "Découvrez l'art du dandyzme congolais avec la SAPE, les textiles d'exception comme le Kente et le Bogolan, et la haute couture contemporaine.",
                "image_url": "images/articles/festivals.jpg",
                "content": "La mode en Afrique est bien plus qu'une parure : c'est un langage, une identité et un art de vivre universellement célébré.",
                "author_id": admin.id
            },
            {
                "title": "Top des plus belles plages et îles paradisiaques du continent africain",
                "slug": "plages-et-iles-paradisiaques",
                "category": "Plages & Îles",
                "resume": "Zanzibar, Maurice, les Seychelles et le Cap-Vert : conseils et secrets pour des vacances balnéaires d'exception.",
                "image_url": "images/articles/plages.jpg",
                "content": "Bordée par l'Océan Indien, l'Océan Atlantique, la Mer Rouge et la Méditerranée, l'Afrique abrite des littoraux et des archipels d'une beauté féerique.",
                "author_id": admin.id
            },
            {
                "title": "L'héritage des royaumes africains : De l'Égypte antique aux empires du Mali et du Ghana",
                "slug": "histoire-et-grands-empires",
                "category": "Histoire",
                "resume": "Une traversée passionnante à travers l'histoire du continent, des cités médiévales de Tombouctou aux murailles royales du Grand Zimbabwe.",
                "image_url": "images/articles/pays_accueillants.jpg",
                "content": "L'histoire de l'Afrique est riche d'empires puissants, d'universités médiévales et d'architectures monumentales qui ont marqué l'humanité.",
                "author_id": admin.id
            },
            {
                "title": "La passion du sport en Afrique : Du football légendaire aux rois du marathon",
                "slug": "sports-et-athletes-africains",
                "category": "Sports",
                "resume": "Ferveur de la Coupe d'Afrique des Nations (CAN), suprématie des marathoniens des hauts plateaux et traditions de luttes ancestrales.",
                "image_url": "images/articles/sport.jpg",
                "content": "Le sport est en Afrique une passion vibrante qui rassemble les peuples et transcende les frontières.",
                "author_id": admin.id
            }
        ]
        for a_data in articles_data:
            art = db.query(models.Article).filter(models.Article.slug == a_data["slug"]).first()
            if not art:
                art = models.Article(**a_data)
                db.add(art)
                print(f"Article ajoute : {a_data['title']}")
            else:
                art.image_url = a_data["image_url"]
                art.category = a_data.get("category", "Général")
                art.resume = a_data.get("resume", "")
                print(f"Article mis a jour : {a_data['title']}")
            db.commit()

        print("\nMigration des donnees terminee avec succes !")

    except Exception as e:
        print(f"Erreur lors du seeding : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
