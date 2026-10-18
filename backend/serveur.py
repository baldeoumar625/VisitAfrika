# -*- coding: utf-8 -*-
# PROJET: VISIT AFRIKA
# FICHIER: main.py
# DESCRIPTION: Serveur principal FastAPI - Gère les routes API et le service des fichiers statiques.

import uuid
import os
from datetime import datetime, timedelta
from typing import Optional, List

from fastapi import FastAPI, Depends, HTTPException, Request, Response, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from itsdangerous import URLSafeTimedSerializer

# SQLAlchemy / Database
from sqlalchemy.orm import Session
from base_de_donnees import engine, get_db, Base
import modeles as models

# Authlib
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware

# Création des tables au démarrage (si elles n'existent pas)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Visit Afrika - API Dynamique")

# --- Configuration & Middleware ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
ENV_PATH = os.path.join(PROJECT_ROOT, ".env") if os.path.exists(os.path.join(PROJECT_ROOT, ".env")) else (
    os.path.join(BASE_DIR, ".env") if os.path.exists(os.path.join(BASE_DIR, ".env")) else ".env"
)

config = Config(ENV_PATH)
SECRET_KEY = config("SECRET_KEY", default="une-cle-secrete-tres-longue-et-securisee-pour-le-projet-visit-afrika")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# --- Configuration Google OAuth ---
oauth = OAuth(config)
oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

# --- Fonctions Utilitaires JWT ---

# Fonction: create_access_token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Fonction: verify_token
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")

# Fonction: get_current_user
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = verify_token(token)
    email_val = payload.get("sub")
    if not email_val:
        raise HTTPException(status_code=401, detail="Token invalide")
    
    email = email_val.lower()
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        # Fallback pour OAuth local simulation
        return {"email": email, "nom": payload.get("name", "Utilisateur"), "role": "user", "prenom": ""}
    return user

# --- ROUTES D'AUTHENTIFICATION & MOT DE PASSE OUBLIÉ ---

@app.get("/api/auth/google/login")
# Fonction: google_login
async def google_login(request: Request, db: Session = Depends(get_db)):
    client_id = config("GOOGLE_CLIENT_ID", default="")
    
    # Si les clés Google ne sont pas configurées ou sont par défaut, mode démo/simulation
    if not client_id or "VOTRE_CLIENT_ID" in client_id:
        email = "google.user@visitafrika.com"
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            user = models.User(
                email=email,
                nom="Google",
                prenom="Utilisateur",
                role="user",
                social_provider="google"
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        access_token = create_access_token(data={"sub": email, "name": user.nom})
        html_content = f"""
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="utf-8"><title>Connexion Google Visit Afrika</title></head>
        <body>
            <script>
                localStorage.setItem('access_token', '{access_token}');
                localStorage.setItem('user', JSON.stringify({{
                    'email': '{user.email}',
                    'name': '{user.nom}',
                    'prenom': '{user.prenom}',
                    'role': '{user.role}'
                }}));
                alert('✅ Connexion avec Google réussie !');
                window.location.href = '/index.html';
            </script>
        </body>
        </html>
        """
        return HTMLResponse(content=html_content)

    redirect_uri = "http://localhost:8000/api/auth/google/callback"
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/api/auth/google/callback")
# Fonction: google_callback
async def google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get("userinfo")
        if not user_info:
            raise HTTPException(status_code=400, detail="Échec Google Auth")
        
        email = user_info["email"].lower()
        name = user_info.get("name", "Utilisateur")
        
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            user = models.User(
                email=email,
                nom=user_info.get("family_name", name),
                prenom=user_info.get("given_name", ""),
                role="user",
                social_provider="google"
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        access_token = create_access_token(data={"sub": email, "name": user.nom})
        html_content = f"""
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="utf-8"><title>Connexion Google Visit Afrika</title></head>
        <body>
            <script>
                localStorage.setItem('access_token', '{access_token}');
                localStorage.setItem('user', JSON.stringify({{
                    'email': '{user.email}',
                    'name': '{user.nom}',
                    'prenom': '{user.prenom}',
                    'role': '{user.role}'
                }}));
                alert('✅ Connexion avec Google réussie !');
                window.location.href = '/index.html';
            </script>
        </body>
        </html>
        """
        return HTMLResponse(content=html_content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erreur d'authentification Google : {str(e)}")

@app.post("/api/auth/forgot-password")
async def forgot_password(email: str = Form(...), db: Session = Depends(get_db)):
    email = email.lower()
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Aucun compte trouvé avec cette adresse email.")
    return {"status": "success", "message": "Compte trouvé ! Vous pouvez définir un nouveau mot de passe.", "email": email}

@app.post("/api/auth/reset-password")
async def reset_password(
    email: str = Form(...),
    new_password: str = Form(...),
    confirm_password: str = Form(...),
    db: Session = Depends(get_db)
):
    if new_password != confirm_password:
        raise HTTPException(status_code=400, detail="Les mots de passe ne correspondent pas.")
    if len(new_password) < 4:
        raise HTTPException(status_code=400, detail="Le mot de passe doit contenir au moins 4 caractères.")
    
    email = email.lower()
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé.")
    
    user.hashed_password = pwd_context.hash(new_password)
    db.commit()
    return {"status": "success", "message": "Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter."}

@app.post("/api/register")
async def register(
    nom: str = Form(...),
    prenom: str = Form(...),
    email: str = Form(...),
    telephone: Optional[str] = Form(None),
    password: str = Form(...),
    confirmPassword: str = Form(...),
    db: Session = Depends(get_db)
):
    if password != confirmPassword:
        raise HTTPException(status_code=400, detail="Mots de passe différents")
    
    email = email.lower()
    existing_user = db.query(models.User).filter(models.User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    
    user = models.User(
        nom=nom,
        prenom=prenom,
        email=email,
        telephone=telephone,
        hashed_password=pwd_context.hash(password)
    )
    db.add(user)
    db.commit()
    return {"status": "success", "message": "Compte créé dans la base de données !"}

@app.post("/api/auth/login")
# Fonction: login
async def login(response: Response, email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    email = email.lower()
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not user.hashed_password or not pwd_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Identifiants invalides")
    
    token = create_access_token(data={"sub": email, "name": user.nom})
    return {
        "access_token": token, 
        "token_type": "bearer", 
        "user": {
            "nom": user.nom, 
            "prenom": user.prenom, 
            "email": user.email,
            "role": user.role
        }
    }

@app.get("/api/auth/profile")
# Fonction: profile
async def profile(current_user = Depends(get_current_user)):
    # Si c'est un modèle SQLAlchemy, on extrait les données proprement
    if hasattr(current_user, "email"):
        user_data = {
            "nom": current_user.nom,
            "prenom": current_user.prenom,
            "email": current_user.email,
            "role": current_user.role
        }
    else:
        # Cas du dict fallback
        user_data = current_user
        
    return {"user": user_data, "message": "Profil récupéré avec succès"}

# --- GESTION DES DONNÉES (PAYS, SITES, BLOG) ---

def ensure_country_files_and_db(db: Session):
    try:
        import shutil
        frontend_dir = os.path.join(PROJECT_ROOT, "frontend")
        
        moz_src = os.path.join(frontend_dir, "images", "pays", "Afrique_Australe", "mozambie1.jpg")
        moz_tgt1 = os.path.join(frontend_dir, "images", "pays", "Afrique_Australe", "mozambique.jpg")
        moz_tgt2 = os.path.join(frontend_dir, "images", "pays", "Afrique_Est", "mozambique.jpg")
        
        rdc_src = r"C:\Users\hp\.gemini\antigravity-ide\brain\fd70832d-753f-4238-a494-e2155bc1e3b8\rd_congo_landscape_1791254855272.jpg"
        rdc_fallback_src = os.path.join(frontend_dir, "images", "pays", "Afrique_Centrale", "congo.jpg")
        rdc_tgt1 = os.path.join(frontend_dir, "images", "pays", "Afrique_Centrale", "rd_congo.jpg")
        rdc_tgt2 = os.path.join(frontend_dir, "images", "pays", "Afrique_Centrale", "republique_democratique_du_congo.jpg")
        
        st_src = os.path.join(frontend_dir, "images", "pays", "Afrique_Centrale", "saotome.jpg")
        st_tgt1 = os.path.join(frontend_dir, "images", "pays", "Afrique_Centrale", "sao_tome_principe.jpg")
        st_tgt2 = os.path.join(frontend_dir, "images", "pays", "Afrique_Centrale", "sao_tome_et_principe.jpg")
        
        som_src = os.path.join(frontend_dir, "images", "pays", "Afrique_Est", "somali.jpg")
        som_tgt1 = os.path.join(frontend_dir, "images", "pays", "Afrique_Est", "somalie.jpg")
        
        def_tgt = os.path.join(frontend_dir, "images", "pays", "default.jpg")

        if os.path.exists(moz_src):
            if not os.path.exists(moz_tgt1): shutil.copyfile(moz_src, moz_tgt1)
            if not os.path.exists(moz_tgt2): shutil.copyfile(moz_src, moz_tgt2)
            if not os.path.exists(def_tgt): shutil.copyfile(moz_src, def_tgt)
        
        if os.path.exists(rdc_src):
            shutil.copyfile(rdc_src, rdc_tgt1)
            shutil.copyfile(rdc_src, rdc_tgt2)
        elif os.path.exists(rdc_fallback_src):
            if not os.path.exists(rdc_tgt1): shutil.copyfile(rdc_fallback_src, rdc_tgt1)
            if not os.path.exists(rdc_tgt2): shutil.copyfile(rdc_fallback_src, rdc_tgt2)

        if os.path.exists(st_src):
            if not os.path.exists(st_tgt1): shutil.copyfile(st_src, st_tgt1)
            if not os.path.exists(st_tgt2): shutil.copyfile(st_src, st_tgt2)

        if os.path.exists(som_src):
            if not os.path.exists(som_tgt1): shutil.copyfile(som_src, som_tgt1)

        updates = {
            "mozambique": ("images/pays/Afrique_Australe/mozambique.jpg", "Afrique Australe", "Maputo"),
            "republique_democratique_du_congo": ("images/pays/Afrique_Centrale/rd_congo.jpg", "Afrique Centrale", "Kinshasa"),
            "sao_tome_et_principe": ("images/pays/Afrique_Centrale/sao_tome_principe.jpg", "Afrique Centrale", "São Tomé"),
            "somalie": ("images/pays/Afrique_Est/somalie.jpg", "Afrique de l'Est", "Mogadiscio")
        }
        
        changed = False
        for slug, (img, reg, cap) in updates.items():
            country = db.query(models.Country).filter(models.Country.slug == slug).first()
            if country:
                if country.image_url != img or country.region != reg:
                    country.image_url = img
                    country.region = reg
                    country.capital = cap
                    changed = True
        if changed:
            db.commit()
    except Exception as e:
        print("Error ensuring country files/db:", e)

@app.get("/api/countries")
# Fonction: list_countries
async def list_countries(db: Session = Depends(get_db)):
    ensure_country_files_and_db(db)
    countries = db.query(models.Country).all()
    result = []
    for c in countries:
        # Convertir en dict et ajouter le compte des sites
        c_dict = {
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "slug": c.slug,
            "image_url": c.image_url,
            "region": c.region,
            "capital": getattr(c, "capital", ""), # On vérifie si le champ existe dans le modèle
            "site_count": len(c.sites)
        }
        result.append(c_dict)
    return result

@app.post("/api/countries")
# Fonction: create_country
async def create_country(c_data: dict, db: Session = Depends(get_db)):
    new_country = models.Country(
        name=c_data["name"],
        description=c_data["description"],
        slug=c_data["slug"],
        image_url=c_data.get("image_url", ""),
        region=c_data.get("region", "Afrique"),
        capital=c_data.get("capital", "")
    )
    db.add(new_country)
    db.commit()
    db.refresh(new_country)
    return new_country

@app.get("/api/sites")
# Fonction: list_sites
async def list_sites(country_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.Site)
    if country_id:
        query = query.filter(models.Site.country_id == country_id)
    sites = query.all()
    result = []
    for s in sites:
        img = s.image_url or ""
        if "images/pays/les different pays/" in img:
            img = img.replace("images/pays/les different pays/", "images/sites des pays/")
        result.append({
            "id": s.id,
            "name": s.name,
            "location": s.location,
            "description": s.description,
            "country_id": s.country_id,
            "image_url": img
        })
    return result

def ensure_articles_seed(db: Session):
    try:
        import shutil
        frontend_dir = os.path.join(PROJECT_ROOT, "frontend")
        articles_dir = os.path.join(frontend_dir, "images", "articles")
        os.makedirs(articles_dir, exist_ok=True)
        
        brain_dir = r"C:\Users\hp\.gemini\antigravity-ide\brain\fd70832d-753f-4238-a494-e2155bc1e3b8"
        copy_map = {
            "culture_patrimoine_1791256097732.jpg": "culture_patrimoine.jpg",
            "faune_safari_1791256133260.jpg": "faune_safari.jpg",
            "musique_art_1791256165006.jpg": "musique_art.jpg",
            "nature_paysages_1791256230520.jpg": "nature_paysages.jpg",
            "innovation_tech_1791256279168.jpg": "innovation_tech.jpg"
        }
        for src_name, tgt_name in copy_map.items():
            src_path = os.path.join(brain_dir, src_name)
            tgt_path = os.path.join(articles_dir, tgt_name)
            if os.path.exists(src_path):
                shutil.copyfile(src_path, tgt_path)

        def_img_src = os.path.join(articles_dir, "gastronomie.jpg")
        def_img_tgt = os.path.join(articles_dir, "default.jpg")
        if os.path.exists(def_img_src) and not os.path.exists(def_img_tgt):
            shutil.copyfile(def_img_src, def_img_tgt)

        admin = db.query(models.User).filter(models.User.email == "admin@visitafrika.com").first()
        admin_id = admin.id if admin else 1

        valid_slugs = [
            "culture-et-patrimoine-africain", "faune-et-safaris-afrique", "gastronomie-et-saveurs-africaines",
            "musique-danse-et-art-africain", "merveilles-naturelles-afrique", "economie-et-innovation-afrique",
            "mode-artisanat-et-elegance", "plages-et-iles-paradisiaques", "histoire-et-grands-empires", "sports-et-athletes-africains"
        ]
        db.query(models.Article).filter(~models.Article.slug.in_(valid_slugs)).delete(synchronize_session=False)

        domain_articles = [
            {
                "title": "Trésors et traditions d'Afrique : Un patrimoine culturel d'une richesse inestimable",
                "slug": "culture-et-patrimoine-africain",
                "category": "Culture & Patrimoine",
                "resume": "Des récits des grands griots sous l'arbre à palabres aux sculptures royales et danses rituelles, découvrez l'âme vivante des traditions africaines.",
                "image_url": "images/articles/culture_patrimoine.jpg",
                "content": "Le continent africain est un berceau culturel d'une diversité fascinante. À travers plus de 2000 langues et groupes ethniques, les traditions se transmettent depuis des millénaires par la parole, les chants et l'art plastique.\n\nEn Afrique de l'Ouest, les griots sont les gardiens vivants de l'histoire et de la généalogie des familles royales. Accompagnés de la kora ou du balafon, leurs récitations transmettent sagesse, philosophie et contes ancestraux. Au centre et au sud du continent, l'art des masques rituels et des sculptures sur bois Makonde ou Baoulé incarne la spiritualité et le lien sacré entre le monde visible et les ancêtres.\n\nLa culture africaine contemporaine ne cesse d'évoluer tout en honorant ses racines profondes. Participer aux cérémonies traditionnelles, visiter les musées nationaux ou partager un moment avec les anciens au village offre un voyage humain d'une profondeur rare."
            },
            {
                "title": "Les plus beaux safaris d'Afrique : À la rencontre de la faune sauvage",
                "slug": "faune-et-safaris-afrique",
                "category": "Faune & Safaris",
                "resume": "Partez explorer le Serengeti, le cratère du Ngorongoro et le delta de l'Okavango pour une immersion spectaculaire au cœur du règne animal.",
                "image_url": "images/articles/faune_safari.jpg",
                "content": "L'Afrique est la terre sacrée du safari animalier. Des vastes savanes herbeuses de Tanzanie aux méandres aquatiques du Botswana, le continent abrite les animaux les plus emblématiques de la planète.\n\nLe terme 'Big Five' — réunissant le lion, le léopard, l'éléphant, le rhinocéros et le buffle — tire son origine de la grande époque des explorateurs. Aujourd'hui, ces espèces fascinantes sont au cœur d'initiatives majeures d'écotourisme et de conservation de la biodiversité.\n\nAssister à la Grande Migration dans le Serengeti et le Maasai Mara, où des millions de gnous et de zèbres traversent les rivières au péril de leur vie, est l'un des spectacles naturels les plus saisissants au monde. En Ouganda et en RDC, la randonnée dans les forêts de montagne à la rencontre des gorilles procure une émotion inoubliable."
            },
            {
                "title": "Gastronomie africaine : Les 12 plats emblématiques à déguster absolument",
                "slug": "gastronomie-et-saveurs-africaines",
                "category": "Gastronomie",
                "resume": "Du Thiéboudienne du Sénégal au Jollof Rice nigérian, en passant par le Ndolé camerounais et les tajines parfumés du Maghreb, un festival de saveurs.",
                "image_url": "images/articles/gastronomie.jpg",
                "content": "La cuisine africaine est une symphonie de parfums, d'épices vibrantes et d'ingrédients authentiques du terroir. Chaque région possède ses spécialités cuisinées avec passion et générosité.\n\nEn Afrique de l'Ouest, le Thiéboudienne (riz au poisson mijoté aux légumes) est le plat national sénégalais inscrit au patrimoine de l'UNESCO. À ses côtés, le fameux Jollof Rice déchaîne les passions entre le Nigeria et le Ghana. En Afrique Centrale, le Ndolé camerounais (feuilles d'amidon sautées aux arachides et crevettes) et le Poulet Moambé séduisent les gourmets.\n\nDu côté du Maghreb, le couscous et les tajines mijotés aux pruneaux et amandes révèlent l'art culinaire arabo-berbère. Enfin, en Afrique de l'Est et Australe, le Braai sudafricain et le poisson grillé au lait de coco comorien complètent ce panorama gustatif d'une variété infinie."
            },
            {
                "title": "Rythmes et vibrations du continent : La Rumba, l'Afrobeats et l'essor culturel mondial",
                "slug": "musique-danse-et-art-africain",
                "category": "Musique & Art",
                "resume": "Comment la créativité musicale africaine, de Kinshasa à Lagos et Johannesburg, fait vibrer les scènes et festivals de la planète.",
                "image_url": "images/articles/musique_art.jpg",
                "content": "La musique est le véritable pouls de l'Afrique. Qu'elle soit traditionnelle ou urbaine, elle accompagne chaque moment de la vie quotidienne, les festivités et la création artistique.\n\nLa Rumba congolaise, inscrite au patrimoine culturel immatériel de l'UNESCO, fait danser des générations entières avec ses guitares chantantes et son élégance poétique. Au Nigeria, l'Afrobeats – hérité du légendaire Fela Kuti et réinventé par Burna Boy et Wizkid – domine désormais les classements mondiaux de la musique.\n\nParallèlement, la scène Amapiano sudafricaine et le Coupé-Décalé ivoirien propagent des ondes festives uniques. Les festivals de musique comme le FESPAM, le Festival au Désert du Mali ou le Lake of Stars au Malawi offrent des expériences scéniques intenses et inoubliables."
            },
            {
                "title": "Des volcans majestueux aux déserts infinis : Les merveilles naturelles d'Afrique",
                "slug": "merveilles-naturelles-afrique",
                "category": "Nature & Paysages",
                "resume": "Du sommet enneigé du Kilimandjaro aux spectaculaires Chutes Victoria et dunes rouges du Namib, explorez des géants de la nature.",
                "image_url": "images/articles/nature_paysages.jpg",
                "content": "Les paysages d'Afrique offrent des reliefs d'une grandeur monumentale qui dépassent l'imagination. Du Nord au Sud, la terre africaine déploie des décors d'une diversité spectaculaire.\n\nLe mont Kilimandjaro en Tanzanie, surnommé le toit de l'Afrique avec ses 5 895 mètres d'altitude, attire les randonneurs du monde entier désireux d'atteindre ses neiges éternelles. En Zambie et au Zimbabwe, les Chutes Victoria projettent leur rideau d'eau assourdissant sur plus d'un kilomètre de large dans des gorges vertigineuses.\n\nLe désert du Namib présente les dunes de sable rouge les plus hautes du monde à Sossusvlei, tandis qu'en République Démocratique du Congo, le volcan Nyiragongo abrite l'un des lacs de lave actifs les plus grands et les plus fascinants du globe."
            },
            {
                "title": "L'Afrique de demain : Silicon Savannah, hubs d'innovation et dynamisme de la jeunesse",
                "slug": "economie-et-innovation-afrique",
                "category": "Économie & Tech",
                "resume": "Paiement mobile, énergies renouvelables et écosystème numérique : comment les entrepreneurs africains façonnent le futur.",
                "image_url": "images/articles/innovation_tech.jpg",
                "content": "L'Afrique connaît une transformation technologique et économique sans précédent. Porté par la population la plus jeune de la planète, le continent est un laboratoire d'innovations à fort impact social.\n\nNairobi au Kenya, surnommée la Silicon Savannah, a révolutionné la finance mondiale en inventant M-Pesa, le système de paiement par téléphonie mobile adopté par des dizaines de millions de citoyens. De Lagos à Abidjan, Le Caire et Kigali, les incubateurs et start-up hubs créent des solutions novatrices dans l'agritech, la santé et les énergies solaires.\n\nL'entrepreneuriat jeune, dynamique et connecté réinvente le commerce local et attire les investissements internationaux, faisant de l'Afrique le moteur d'innovation du XXIe siècle."
            },
            {
                "title": "Mode et élégance africaine : De la SAPE mythique aux étoffes traditionnelles",
                "slug": "mode-artisanat-et-elegance",
                "category": "Mode & Artisanat",
                "resume": "Découvrez l'art du dandyzme congolais avec la SAPE, les textiles d'exception comme le Kente et le Bogolan, et la haute couture contemporaine.",
                "image_url": "images/articles/festivals.jpg",
                "content": "La mode en Afrique est bien plus qu'une parure : c'est un langage, une identité et un art de vivre universellement célébré.\n\nAu Congo-Brazzaville et en RD Congo, la SAPE (Société des Ambianceurs et des Personnes Élégantes) élève le dandyzme au rang d'institution. Les Sapeurs défilent avec une assurance et une maîtrise des couleurs d'un raffinement spectaculaire, transformant la rue en podium de haute couture.\n\nSur le plan des textiles, le continent regorge de trésors faits main : le Kente ghanéen tissé d'or, le Bogolan malien teinté à la terre, le Manjak sénégalais et le tissu Wax aux motifs narratifs. Aujourd'hui, les créateurs africains défilent à Paris, Milan et New York, imposant leur style unique sur la scène internationale."
            },
            {
                "title": "Top des plus belles plages et îles paradisiaques du continent africain",
                "slug": "plages-et-iles-paradisiaques",
                "category": "Plages & Îles",
                "resume": "Zanzibar, Maurice, les Seychelles et le Cap-Vert : conseils et secrets pour des vacances balnéaires d'exception.",
                "image_url": "images/articles/plages.jpg",
                "content": "Bordée par l'Océan Indien, l'Océan Atlantique, la Mer Rouge et la Méditerranée, l'Afrique abrite des littoraux et des archipels d'une beauté féerique.\n\nL'archipel de Zanzibar en Tanzanie séduit par ses cités historiques en pierre de corail et ses plages de sable blanc poudré baignées par des eaux turquoise. Aux Seychelles et à l'Île Maurice, les blocs de granit poli et les lagons cristallins offrent un cadre idyllique pour le repos et la plongée sous-marine.\n\nSur la côte atlantique, le Cap-Vert propose des paysages volcaniques mariés à la culture de la Morna, tandis qu'au Mozambique, l'archipel de Bazaruto dévoile des dunes de sable immergées où nagent les dugongs et les raies mantas."
            },
            {
                "title": "L'héritage des royaumes africains : De l'Égypte antique aux empires du Mali et du Ghana",
                "slug": "histoire-et-grands-empires",
                "category": "Histoire",
                "resume": "Une traversée passionnante à travers l'histoire du continent, des cités médiévales de Tombouctou aux murailles royales du Grand Zimbabwe.",
                "image_url": "images/articles/pays_accueillants.jpg",
                "content": "L'histoire de l'Afrique est riche d'empires puissants, d'universités médiévales et d'architectures monumentales qui ont marqué l'humanité.\n\nL'Égypte pharaonique et le royaume de Koush en Nubie ont légué des pyramides et des temples grandioses. Au Moyen Âge, l'Empire du Mali sous le règne de Kankou Moussa – l'homme le plus riche de l'histoire – était le centre mondial du commerce de l'or et du savoir avec les manuscrits de Tombouctou.\n\nLe Royaume du Bénin et ses bronzes royaux d'une précision inégalée, ainsi que les cités en pierre du Grand Zimbabwe, témoignent du génie architectural et artistique des civilisations africaines avant la colonisation."
            },
            {
                "title": "La passion du sport en Afrique : Du football légendaire aux rois du marathon",
                "slug": "sports-et-athletes-africains",
                "category": "Sports",
                "resume": "Ferveur de la Coupe d'Afrique des Nations (CAN), suprématie des marathoniens des hauts plateaux et traditions de luttes ancestrales.",
                "image_url": "images/articles/sport.jpg",
                "content": "Le sport est en Afrique une passion vibrante qui rassemble les peuples et transcende les frontières dans un esprit de fête et de fierté.\n\nLe football occupe une place reine. La Coupe d'Afrique des Nations (CAN) déchaîne les foules dans une ambiance festive et colorée inégalée. Les stars africaines qui brillent dans les plus grands clubs européens inspirent des millions de jeunes dans tous les quartiers du continent.\n\nEn athlétisme, les coureurs de fond de l'Éthiopie et du Kenya dominent sans partage les marathons mondiaux et les Jeux Olympiques grâce à leur endurance légendaire sur les hauts plateaux de la Vallée du Rift. Enfin, les luttes traditionnelles sénégalaises et nigériennes préservent des rituels sportifs et mystiques captivants."
            }
        ]

        for item in domain_articles:
            art = db.query(models.Article).filter(models.Article.slug == item["slug"]).first()
            if not art:
                art = models.Article(
                    title=item["title"],
                    slug=item["slug"],
                    category=item["category"],
                    resume=item["resume"],
                    image_url=item["image_url"],
                    content=item["content"],
                    author_id=admin_id
                )
                db.add(art)
            else:
                art.title = item["title"]
                art.category = item["category"]
                art.resume = item["resume"]
                art.image_url = item["image_url"]
                art.content = item["content"]
        db.commit()
    except Exception as e:
        print("Error seeding articles:", e)

@app.get("/api/articles")
# Fonction: list_articles
async def list_articles(db: Session = Depends(get_db)):
    ensure_articles_seed(db)
    return db.query(models.Article).order_by(models.Article.created_at.desc()).all()

@app.get("/api/stats")
# Fonction: get_stats
async def get_stats(db: Session = Depends(get_db)):
    return {
        "countries": db.query(models.Country).count(),
        "sites": db.query(models.Site).count(),
        "articles": db.query(models.Article).count(),
        "users": db.query(models.User).count(),
        "reservations": db.query(models.Reservation).count()
    }

# --- ADMIN ENDPOINTS (POST) ---

@app.post("/api/sites")
# Fonction: create_site
async def create_site(site: dict, db: Session = Depends(get_db)):
    new_site = models.Site(
        name=site["name"],
        location=site.get("location", ""),
        description=site["description"],
        image_url=site.get("image_url", ""),
        country_id=site.get("country_id")
    )
    db.add(new_site)
    db.commit()
    db.refresh(new_site)
    return new_site

@app.post("/api/gallery")
async def upload_gallery(
    title: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    saved_items = []
    # Créer le dossier si nécessaire
    upload_dir = os.path.join(FRONTEND_DIR, "images", "gallery")
    os.makedirs(upload_dir, exist_ok=True)
    
    for img in images:
        file_name = f"gallery_{int(datetime.utcnow().timestamp())}_{img.filename}"
        file_path = os.path.join(upload_dir, file_name)
        
        with open(file_path, "wb") as buffer:
            buffer.write(await img.read())
            
        new_item = models.GalleryItem(
            title=title,
            category=category,
            description=description,
            image_url=f"images/gallery/{file_name}"
        )
        db.add(new_item)
        saved_items.append(new_item)
        
    db.commit()
    return {"message": f"{len(saved_items)} images uploadées", "items": [i.id for i in saved_items]}

@app.post("/api/articles")
# Fonction: create_article
async def create_article(
    title: str = Form(...),
    content: str = Form(...),
    slug: str = Form(...),
    category: str = Form(""),
    resume: str = Form(""),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    image_url = "images/articles/default.jpg"
    if image and image.filename:
        # Save image file to frontend/images/articles
        articles_dir = os.path.join(FRONTEND_DIR, "images", "articles")
        os.makedirs(articles_dir, exist_ok=True)
        file_name = f"article_{int(datetime.utcnow().timestamp())}_{image.filename}"
        file_path = os.path.join(articles_dir, file_name)
        with open(file_path, "wb") as buffer:
            buffer.write(await image.read())
        image_url = f"images/articles/{file_name}"

    new_art = models.Article(
        title=title,
        content=content,
        image_url=image_url,
        slug=slug,
        category=category,
        resume=resume
    )
    db.add(new_art)
    db.commit()
    db.refresh(new_art)
    return new_art

# --- UPDATES & DELETES ---

@app.put("/api/articles/{id}")
# Fonction: update_article
async def update_article(id: int, data: dict, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    for key, value in data.items():
        if hasattr(article, key):
            setattr(article, key, value)
    db.commit()
    return article

@app.delete("/api/articles/{id}")
# Fonction: delete_article
async def delete_article(id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    db.delete(article)
    db.commit()
    return {"message": "Success"}


@app.put("/api/countries/{id}")
# Fonction: update_country
async def update_country(id: int, data: dict, db: Session = Depends(get_db)):
    country = db.query(models.Country).filter(models.Country.id == id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Pays non trouvé")
    for key, value in data.items():
        if hasattr(country, key):
            setattr(country, key, value)
    db.commit()
    return country

@app.delete("/api/countries/{id}")
# Fonction: delete_country
async def delete_country(id: int, db: Session = Depends(get_db)):
    country = db.query(models.Country).filter(models.Country.id == id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Pays non trouvé")
    db.delete(country)
    db.commit()
    return {"message": "Success"}

@app.put("/api/sites/{id}")
# Fonction: update_site
async def update_site(id: int, data: dict, db: Session = Depends(get_db)):
    site = db.query(models.Site).filter(models.Site.id == id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site non trouvé")
    for key, value in data.items():
        if hasattr(site, key):
            setattr(site, key, value)
    db.commit()
    return site

@app.delete("/api/sites/{id}")
# Fonction: delete_site
async def delete_site(id: int, db: Session = Depends(get_db)):
    site = db.query(models.Site).filter(models.Site.id == id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site non trouvé")
    db.delete(site)
    db.commit()
    return {"message": "Success"}

# --- USER MANAGEMENT ENDPOINTS ---

@app.get("/api/users")
# Fonction: list_users
async def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.put("/api/users/{user_id}")
# Fonction: update_user
async def update_user(user_id: int, user_data: dict, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    if "role" in user_data:
        user.role = user_data["role"]
    if "nom" in user_data:
        user.nom = user_data["nom"]
    
    db.commit()
    return {"status": "success"}

@app.delete("/api/users/{user_id}")
# Fonction: delete_user
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    db.delete(user)
    db.commit()
    return {"status": "success"}

# --- RESERVATION ENDPOINTS ---

@app.get("/api/reservations")
# Fonction: list_reservations
async def list_reservations(db: Session = Depends(get_db)):
    reservations = db.query(models.Reservation).all()
    return reservations

@app.post("/api/reservations")
# Fonction: create_reservation
async def create_reservation(res: dict, db: Session = Depends(get_db)):
    site_id = res.get("site_id")
    
    # Fallback: find site by name if id is missing
    if not site_id and res.get("site_name"):
        site = db.query(models.Site).filter(models.Site.name.ilike(res["site_name"])).first()
        if site:
            site_id = site.id

    new_res = models.Reservation(
        user_id=res.get("user_id"),
        site_id=site_id,
        site_name=res.get("site_name") or (db.query(models.Site).filter(models.Site.id == site_id).first().name if site_id else "Site Inconnu"),
        full_name=res["full_name"],
        email=res["email"],
        phone=res.get("phone", ""),
        date_visit=res["date_visit"],
        guests=res.get("guests", 1) or res.get("personnes", 1),
        status=res.get("status", "En attente"),
        details=res.get("details", "")
    )
    db.add(new_res)
    db.commit()
    db.refresh(new_res)
    return new_res

@app.put("/api/reservations/{res_id}")
# Fonction: update_reservation
async def update_reservation(res_id: int, data: dict, db: Session = Depends(get_db)):
    res = db.query(models.Reservation).filter(models.Reservation.id == res_id).first()
    if not res:
        raise HTTPException(status_code=404, detail="Réservation non trouvée")
    for key, value in data.items():
        if hasattr(res, key):
            setattr(res, key, value)
    db.commit()
    return res

@app.delete("/api/reservations/{res_id}")
# Fonction: delete_reservation
async def delete_reservation(res_id: int, db: Session = Depends(get_db)):
    res = db.query(models.Reservation).filter(models.Reservation.id == res_id).first()
    if not res:
        raise HTTPException(status_code=404, detail="Réservation non trouvée")
    db.delete(res)
    db.commit()
    return {"status": "success"}

# --- HOTEL RESERVATION ENDPOINTS ---

@app.get("/api/hotel_reservations")
# Fonction: list_hotel_reservations
async def list_hotel_reservations(db: Session = Depends(get_db)):
    return db.query(models.HotelReservation).all()

@app.post("/api/hotel_reservations")
# Fonction: create_hotel_reservation
async def create_hotel_reservation(request: Request, db: Session = Depends(get_db)):
    res = await request.json()
    new_res = models.HotelReservation(
        hotel_name=res["hotel_name"],
        full_name=res["full_name"],
        email=res["email"],
        check_in=res["check_in"],
        check_out=res["check_out"],
        guests=res.get("guests", "2 Adultes"),
        status=res.get("status", "En attente"),
        country=res.get("country", "Inconnu")
    )
    db.add(new_res)
    db.commit()
    db.refresh(new_res)
    return new_res

@app.put("/api/hotel_reservations/{res_id}")
# Fonction: update_hotel_reservation
async def update_hotel_reservation(res_id: int, data: dict, db: Session = Depends(get_db)):
    res = db.query(models.HotelReservation).filter(models.HotelReservation.id == res_id).first()
    if not res:
        raise HTTPException(status_code=404, detail="Réservation d'hôtel non trouvée")
    for key, value in data.items():
        if hasattr(res, key):
            setattr(res, key, value)
    db.commit()
    return res

@app.delete("/api/hotel_reservations/{res_id}")
# Fonction: delete_hotel_reservation
async def delete_hotel_reservation(res_id: int, db: Session = Depends(get_db)):
    res = db.query(models.HotelReservation).filter(models.HotelReservation.id == res_id).first()
    if not res:
        raise HTTPException(status_code=404, detail="Réservation d'hôtel non trouvée")
    db.delete(res)
    db.commit()
    return {"status": "success"}

# --- CONTACT MESSAGES ENDPOINTS ---

@app.get("/api/contact_messages")
async def list_contact_messages(db: Session = Depends(get_db)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()

@app.post("/api/contact_messages")
async def create_contact_message(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    msg = models.ContactMessage(
        name=data.get("name", "Anonyme"),
        email=data.get("email", ""),
        subject=data.get("subject", "Nouveau message"),
        message=data.get("message", "")
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

@app.put("/api/contact_messages/{msg_id}")
async def update_contact_message(msg_id: int, data: dict, db: Session = Depends(get_db)):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message non trouvé")
    for key, value in data.items():
        if hasattr(msg, key):
            setattr(msg, key, value)
    db.commit()
    return msg

@app.delete("/api/contact_messages/{msg_id}")
async def delete_contact_message(msg_id: int, db: Session = Depends(get_db)):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message non trouvé")
    db.delete(msg)
    db.commit()
    return {"status": "success"}

# --- SERVICE DES FICHIERS STATIQUES ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "../frontend")

@app.get("/images/pays/les different pays/{file_path:path}")
async def serve_legacy_pays_image(file_path: str):
    target = os.path.join(FRONTEND_DIR, "images", "sites des pays", file_path)
    if os.path.exists(target):
        return FileResponse(target)
    fallback = os.path.join(FRONTEND_DIR, "images", "pays", "les different pays", file_path)
    if os.path.exists(fallback):
        return FileResponse(fallback)
    return Response(status_code=404)

app.mount("/css", StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")
app.mount("/images", StaticFiles(directory=os.path.join(FRONTEND_DIR, "images")), name="images")
app.mount("/formulaires", StaticFiles(directory=os.path.join(FRONTEND_DIR, "formulaires")), name="formulaires")

@app.get("/")
# Fonction: read_index
async def read_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return HTMLResponse("Frontend not found", status_code=404)

@app.get("/les differents pays/{slug}.html")
# Fonction: read_country_detail
async def read_country_detail(slug: str, db: Session = Depends(get_db)):
    # On cherche le pays en base
    country = db.query(models.Country).filter(models.Country.slug == slug).first()
    
    # Si le fichier physique existe, on le sert (priorité aux anciens fichiers)
    physical_path = os.path.join(FRONTEND_DIR, f"les differents pays/{slug}.html")
    if os.path.exists(physical_path):
        return FileResponse(physical_path)
    
    # Sinon, si le pays est en base, on génère une page dynamique
    if country:
        template = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link rel="stylesheet" href="../css/vendors/bootstrap.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/pays/les_differents_pays.css">
    <title>Visit Afrika - {country.name}</title>
    <link rel="icon" type="image/jpg" href="../images/logo/logo.png">
</head>
<body>
    <header class="navbar">
        <div class="navbar-container">
            <div class="navbar-brand">
                <a href="../index.html" class="logo-link">
                    <img src="../images/logo/carte-afrique.jpg" alt="Logo" class="logo-img">
                    <span class="logo-text">VISIT AFRIKA</span>
                </a>
            </div>
            <nav class="navbar-menu">
                <ul class="nav-list">
                    <li class="nav-item"><a href="../index.html" class="nav-link">Accueil</a></li>
                    <li class="nav-item"><a href="../pays.html" class="nav-link active">Pays</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="hero">
        <img src="../{country.image_url}" alt="{country.name}" onerror="this.src='/images/pays/default.jpg'">
        <a href="../pays.html" class="btn-retour">Retourner</a>
        <h1 class="hero-title">{country.name}</h1>
    </section>

    <section class="content container py-5">
        <div class="row">
            <div class="col-lg-8">
                <h2>Présentation générale</h2>
                <p class="lead" style="white-space: pre-line;">{country.description}</p>
                
                <h2 class="mt-5">Sites Touristiques</h2>
                <div id="dynamicSitesList" class="row g-3 mt-3">
                    <p class="text-muted">Chargement des attractions...</p>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card p-4 bg-light border-0 rounded-4 shadow-sm">
                    <h3 class="fw-bold mb-3">🔍 Infos Clés</h3>
                    <ul class="list-unstyled mt-2">
                        <li class="mb-2"><i class="fas fa-map-pin text-primary me-2"></i> <strong>Région :</strong> {country.region}</li>
                        <li class="mb-2"><i class="fas fa-city text-primary me-2"></i> <strong>Capitale :</strong> {country.capital or ''}</li>
                        <li class="mb-2"><i class="fas fa-tag text-primary me-2"></i> <strong>Code :</strong> {country.slug}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal Réservation -->
    <div class="modal fade" id="reservationModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content rounded-4 border-0 shadow">
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold">Réserver une visite</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted small mb-4">Réservez votre visite pour <strong id="resSiteName"></strong></p>
            <form id="resForm">
                <input type="hidden" id="resSiteId">
                <div class="mb-3">
                    <label class="form-label small fw-bold">Nom complet</label>
                    <input type="text" class="form-control" id="resName" required>
                </div>
                <div class="mb-3">
                    <label class="form-label small fw-bold">Email</label>
                    <input type="email" class="form-control" id="resEmail" required>
                </div>
                <div class="mb-3">
                    <label class="form-label small fw-bold">Date de visite</label>
                    <input type="date" class="form-control" id="resDate" required>
                </div>
                <button type="submit" class="btn btn-primary w-100 py-2">Confirmer la demande</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const resModal = new bootstrap.Modal(document.getElementById('reservationModal'));

        function openResModal(id, name) {{
            document.getElementById('resSiteId').value = id;
            document.getElementById('resSiteName').innerText = name;
            resModal.show();
        }}

        document.getElementById('resForm').addEventListener('submit', async (e) => {{
            e.preventDefault();
            const data = {{
                site_id: document.getElementById('resSiteId').value,
                full_name: document.getElementById('resName').value,
                email: document.getElementById('resEmail').value,
                date_visit: document.getElementById('resDate').value,
                phone: "",
                guests: 1
            }};
            try {{
                const res = await fetch('/api/reservations', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify(data)
                }});
                if (res.ok) {{
                    alert("Votre demande a été envoyée avec succès !");
                    resModal.hide();
                    e.target.reset();
                }}
            }} catch(e) {{ alert("Erreur lors de l'envoi."); }}
        }});

        async function loadSites() {{
            try {{
                const res = await fetch('/api/sites?country_id={country.id}');
                const sites = await res.json();
                const list = document.getElementById('dynamicSitesList');
                list.innerHTML = '';
                if (sites.length === 0) {{
                    list.innerHTML = '<p>Aucun site enregistré pour le moment.</p>';
                    return;
                }}
                sites.forEach(s => {{
                    list.innerHTML += `
                        <div class="col-md-6">
                            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                <div class="card-body p-4">
                                    <h5 class="fw-bold mb-2"><i class="fas fa-location-dot text-primary me-2"></i> ${{s.name}}</h5>
                                    <p class="small text-muted mb-4">${{s.description.substring(0, 100)}}...</p>
                                    <button class="btn btn-primary btn-sm rounded-pill px-4" onclick="openResModal(${{s.id}}, '${{s.name}}')">
                                        <i class="fas fa-calendar-plus me-1"></i> Réserver
                                    </button>
                                </div>
                            </div>
                        </div>`;
                }});
            }} catch(e) {{ console.error(e); }}
        }}
        loadSites();
    </script>
</body>
</html>"""
        return HTMLResponse(content=template)

    # Si rien n'est trouvé, index
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    return FileResponse(index_path) if os.path.exists(index_path) else HTMLResponse("Frontend not found", status_code=404)

@app.get("/admin/{page_name}.html")
async def read_admin_html(page_name: str):
    file_path = os.path.join(FRONTEND_DIR, "admin", f"{page_name}.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return HTMLResponse("Admin page not found", status_code=404)

@app.get("/{page_name}.html")
# Fonction: read_html
async def read_html(page_name: str):
    target_name = "propos" if page_name in ["a_propos", "propos"] else page_name
    file_path = os.path.join(FRONTEND_DIR, f"{target_name}.html")
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    return FileResponse(file_path) if os.path.exists(file_path) else (FileResponse(index_path) if os.path.exists(index_path) else HTMLResponse("Not found", status_code=404))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("serveur:app", host="0.0.0.0", port=8000, reload=True)
