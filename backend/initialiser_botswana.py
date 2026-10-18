# -*- coding: utf-8 -*-
import os
import sys
from sqlalchemy.orm import Session
# Ajouter le dossier parent au path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from backend.base_de_donnees import SessionLocal
from backend import modeles as models

def seed_botswana():
    db = SessionLocal()
    try:
        # 1. Ajouter le pays Botswana si non présent
        botswana = db.query(models.Country).filter(models.Country.slug == "botswana").first()
        if not botswana:
            botswana = models.Country(
                name="Botswana",
                slug="botswana",
                description="Le sanctuaire de la vie sauvage en Afrique, célèbre pour le Delta de l'Okavango et ses safaris d'exception.",
                capital="Gaborone",
                region="Afrique Australe",
                image_url="images/pays/Afrique_Australe/botswana.jpg"
            )
            db.add(botswana)
            db.commit()
            db.refresh(botswana)
            print(f"Pays ajoute : Botswana (ID: {botswana.id})")
        else:
            print(f"Pays Botswana existe deja (ID: {botswana.id})")

        # 2. Ajouter les sites touristiques
        sites_data = [
            {"name": "Delta de l'Okavango", "location": "Maun", "description": "L'un des écosystèmes les plus diversifiés au monde, à explorer en mokoro.", "image_url": "images/sites des pays/botswana/okavango.jpg"},
            {"name": "Parc National de Chobe", "location": "Kasane", "description": "Célèbre pour sa concentration massive d'éléphants et ses croisières safari.", "image_url": "images/sites des pays/botswana/chobe.jpg"},
            {"name": "Makgadikgadi Pans", "location": "Central District", "description": "Vastes étendues de sel offrant des paysages lunaires et des migrations de zèbres.", "image_url": "images/sites des pays/botswana/makgadikgadi.jpg"},
            {"name": "Réserve de Moremi", "location": "Okavango", "description": "La première réserve d'Afrique créée par les populations locales.", "image_url": "images/sites des pays/botswana/moremi.jpg"},
            {"name": "Kalahari Central", "location": "Ghanzi", "description": "L'un des plus grands parcs nationaux au monde, terre des Bushmen.", "image_url": "images/sites des pays/botswana/kalahari.jpg"},
            {"name": "Tsodilo Hills", "location": "Nord-Ouest", "description": "Site classé à l'UNESCO abritant des milliers de peintures rupestres.", "image_url": "images/sites des pays/botswana/tsodilo.jpg"},
            {"name": "Gaborone", "location": "Capitale", "description": "Capitale moderne et dynamique, centre économique du pays.", "image_url": "images/sites des pays/botswana/gaborone.jpg"},
            {"name": "Savuti Marsh", "location": "Chobe", "description": "Célèbre pour ses interactions prédateurs-proies intenses.", "image_url": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600"},
            {"name": "Nxai Pan", "location": "Nord", "description": "Connu pour ses baobabs millénaires et ses paysages arides.", "image_url": "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=600"},
            {"name": "Kubum Island", "location": "Sua Pan", "description": "Île de granit entourée de sel, sacrée pour les populations locales.", "image_url": "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=600"},
            {"name": "Khama Rhino Sanctuary", "location": "Serowe", "description": "Projet communautaire dédié à la sauvegarde des rhinocéros.", "image_url": "https://images.unsplash.com/photo-1512100356132-db716bc967f6?auto=format&fit=crop&q=80&w=600"},
            {"name": "Chief's Island", "location": "Okavango", "description": "La plus grande île du Delta, refuge pour les 'Big Five'.", "image_url": "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=600"},
            {"name": "Linyanti Reserve", "location": "Nord", "description": "Région sauvage et reculée, paradis pour l'observation des oiseaux.", "image_url": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600"},
            {"name": "Baines' Baobabs", "location": "Nxai Pan", "description": "Groupe de baobabs immortalisés par le peintre Thomas Baines.", "image_url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=600"},
            {"name": "Kgalagadi Park", "location": "Sud", "description": "Parc transfrontalier entre le Botswana et l'Afrique du Sud.", "image_url": "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=600"}
        ]

        for s_data in sites_data:
            existing_site = db.query(models.Site).filter(models.Site.name == s_data["name"]).first()
            if not existing_site:
                new_site = models.Site(
                    name=s_data["name"],
                    location=s_data["location"],
                    description=s_data["description"],
                    image_url=s_data["image_url"],
                    country_id=botswana.id
                )
                db.add(new_site)
                print(f"Site ajoute : {s_data['name']}")
            else:
                existing_site.country_id = botswana.id
                print(f"Site mis a jour : {s_data['name']}")
        
        db.commit()
        print("\nConfiguration du Botswana terminee !")

    except Exception as e:
        print(f"Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_botswana()
