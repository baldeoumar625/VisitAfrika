# -*- coding: utf-8 -*-
# PROJET: VISIT AFRIKA
# FICHIER: base_de_donnees.py
# DESCRIPTION: Configuration de la connexion à la base de données SQLite.

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Pour SQLite, le chemin de la base est un fichier local (toujours dans le dossier backend)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'visit_afrika.db')}"

# Création du moteur (connect_args requis pour SQLite)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Fabrique de sessions pour interagir avec la base
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe de base pour tous les modèles
Base = declarative_base()

# Dépendance pour obtenir une session de base de données
# Fonction: get_db
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
