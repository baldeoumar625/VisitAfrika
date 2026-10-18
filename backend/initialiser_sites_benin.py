# -*- coding: utf-8 -*-
import os
import sys
from sqlalchemy.orm import Session
# Ajouter le dossier parent au path pour importer database et models
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from backend.base_de_donnees import SessionLocal
from backend import modeles as models

def seed_benin_sites():
    db = SessionLocal()
    try:
        # Trouver le pays Benin
        # On va tenter de récupérer juste l'ID pour éviter les colonnes manquantes potentielles si la base n'est pas à jour
        benin = db.query(models.Country).filter(models.Country.slug == "benin").first()
        if not benin:
            print("Pays 'benin' non trouve dans la base de donnees.")
            return

        print(f"Pays trouve : {benin.name} (ID: {benin.id})")

        sites_data = [
            {"name": "Ganvie", "location": "Lac Nokoue", "description": "La 'Venise de l'Afrique', une cite lacustre sur pilotis.", "image_url": "images/sites des pays/benin/ganvie.jpg"},
            {"name": "Palais Royaux d'Abomey", "location": "Abomey", "description": "Ancien centre du pouvoir du royaume de Dahomey.", "image_url": "images/sites des pays/benin/abomey.jpg"},
            {"name": "Temple des Pythons", "location": "Ouidah", "description": "Ville historique et centre spirituel majeur.", "image_url": "images/sites des pays/benin/ouidah.jpg"},
            {"name": "Parc National de la Pendjari", "location": "Nord Benin", "description": "L'une des plus belles reserves de faune d'Afrique de l'Ouest.", "image_url": "images/sites des pays/benin/pendjari.jpg"},
            {"name": "Porto-Novo", "location": "Capitale Politique", "description": "Capitale politique aux influences coloniales et architecturales.", "image_url": "images/sites des pays/benin/porto_novo.jpg"},
            {"name": "Tata Somba", "location": "Atacora", "description": "Maisons-forteresses uniques au monde du peuple Somba.", "image_url": "images/sites des pays/benin/somba.jpg"},
            {"name": "Grand-Popo", "location": "Bouches du Roy", "description": "Plages infinies et rencontre entre le fleuve Mono et l'ocean.", "image_url": "images/sites des pays/benin/grand_popo.jpg"},
            {"name": "Marche Dantokpa", "location": "Cotonou", "description": "Le plus grand marche a ciel ouvert d'Afrique de l'Ouest.", "image_url": "images/sites des pays/benin/cotonou.jpg"},
            {"name": "Villages Taneka", "location": "Djougou", "description": "Villages de montagne aux traditions seculaires preservees.", "image_url": "images/sites des pays/benin/taneka.jpg"},
            {"name": "Route des Esclaves", "location": "Ouidah", "description": "Un parcours memoriel retracant l'histoire de la traite.", "image_url": "https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=600"},
            {"name": "Porte du Non-Retour", "location": "Plage d'Ouidah", "description": "Monument emblematique commemorant la deportation des esclaves.", "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600"},
            {"name": "Musee Homme", "location": "Porto-Novo", "description": "Ancien palais royal devenu musee d'histoire.", "image_url": "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=600"},
            {"name": "Foret Sacree Kpasse", "location": "Ouidah", "description": "Lieu sacre du Vaudou abritant des divinites ancestrales.", "image_url": "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=600"},
            {"name": "Chutes de Kota", "location": "Natitingou", "description": "Cascades rafraichissantes nichees dans la verdure de l'Atacora.", "image_url": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=600"},
            {"name": "Fondation Zinsou", "location": "Cotonou / Ouidah", "description": "Centre d'art contemporain africain de renommee internationale.", "image_url": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=600"}
        ]

        for s_data in sites_data:
            existing_site = db.query(models.Site).filter(models.Site.name == s_data["name"]).first()
            if not existing_site:
                new_site = models.Site(
                    name=s_data["name"],
                    location=s_data["location"],
                    description=s_data["description"],
                    image_url=s_data["image_url"],
                    country_id=benin.id
                )
                db.add(new_site)
                print(f"Site ajoute : {s_data['name']}")
            else:
                existing_site.country_id = benin.id
                existing_site.location = s_data["location"]
                existing_site.image_url = s_data["image_url"]
                print(f"Site mis a jour : {s_data['name']}")
        
        db.commit()
        print("\nConfiguration des sites du Benin terminee !")

    except Exception as e:
        print(f"Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_benin_sites()
