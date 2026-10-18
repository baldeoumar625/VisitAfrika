# -*- coding: utf-8 -*-
# PROJET: VISIT AFRIKA
# FICHIER: models.py
# DESCRIPTION: Définitions des modèles SQLAlchemy pour la base de données (Pays, Sites, Blogs, etc.).

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from base_de_donnees import Base

# Classe: User
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(50))
    prenom = Column(String(50))
    email = Column(String(100), unique=True, index=True)
    telephone = Column(String(20), nullable=True)
    hashed_password = Column(String(255), nullable=True) # None si OAuth
    role = Column(String(20), default="user") # admin, editor, user
    social_provider = Column(String(50), nullable=True) # google, etc.
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relations
    articles = relationship("Article", back_populates="author")

# Classe: Country
class Country(Base):
    __tablename__ = "countries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)
    description = Column(Text)
    image_url = Column(String(255), nullable=True)
    slug = Column(String(100), unique=True) # pour l'URL (ex: botswana)
    region = Column(String(50), nullable=True) # Ex: Afrique de l'Ouest
    capital = Column(String(100), nullable=True)

    # Relations
    sites = relationship("Site", back_populates="country")

# Classe: Site
class Site(Base):
    __tablename__ = "sites"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    location = Column(String(100))
    description = Column(Text)
    image_url = Column(String(255), nullable=True)
    country_id = Column(Integer, ForeignKey("countries.id"))

    # Relations
    country = relationship("Country", back_populates="sites")

# Classe: Article
class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    slug = Column(String(200), unique=True)
    content = Column(Text)
    image_url = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    resume = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    author_id = Column(Integer, ForeignKey("users.id"))

    # Relations
    author = relationship("User", back_populates="articles")

# Classe: ContactMessage
class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    subject = Column(String(200))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_read = Column(Integer, default=0) # SQLite n'a pas de bool pur (0 ou 1)

# Classe: Reservation
class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Optionnel
    site_id = Column(Integer, ForeignKey("sites.id"), nullable=True)
    site_name = Column(String(100), nullable=True) # Nom brut (pour backup)
    full_name = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20))
    date_visit = Column(String(50))
    guests = Column(Integer, default=1)
    status = Column(String(20), default="En attente") # En attente, Confirmé, Annulé
    details = Column(Text, nullable=True) # Pour le type d'expérience, guide, etc.
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relations
    user = relationship("User")
    site = relationship("Site")

# Classe: GalleryItem
class GalleryItem(Base):
    __tablename__ = "gallery"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=True)
    image_url = Column(String(255))
    category = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Classe: HotelReservation
class HotelReservation(Base):
    __tablename__ = "hotel_reservations"
    id = Column(Integer, primary_key=True, index=True)
    hotel_name = Column(String(100))
    full_name = Column(String(100))
    email = Column(String(100))
    check_in = Column(String(50))
    check_out = Column(String(50))
    guests = Column(String(50))
    status = Column(String(20), default="En attente") # En attente, Confirmé, Annulé
    country = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
