import shutil
import sqlite3
import os

workspace = r"f:\Nouveau dossier\MA PAGE"

# 1. Mozambique
src_moz = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Australe", "mozambie1.jpg")
tgt_moz1 = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Australe", "mozambique.jpg")
tgt_moz2 = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Est", "mozambique.jpg")
shutil.copyfile(src_moz, tgt_moz1)
shutil.copyfile(src_moz, tgt_moz2)
print("Mozambique images copied.")

# 2. RD Congo
src_rdc = r"C:\Users\hp\.gemini\antigravity-ide\brain\fd70832d-753f-4238-a494-e2155bc1e3b8\rd_congo_landscape_1791254855272.jpg"
tgt_rdc1 = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Centrale", "rd_congo.jpg")
tgt_rdc2 = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Centrale", "republique_democratique_du_congo.jpg")
shutil.copyfile(src_rdc, tgt_rdc1)
shutil.copyfile(src_rdc, tgt_rdc2)
print("RD Congo images copied.")

# 3. Sao Tome
src_st = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Centrale", "saotome.jpg")
tgt_st1 = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Centrale", "sao_tome_principe.jpg")
tgt_st2 = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Centrale", "sao_tome_et_principe.jpg")
shutil.copyfile(src_st, tgt_st1)
shutil.copyfile(src_st, tgt_st2)
print("Sao Tome images copied.")

# 4. Somalie
src_som = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Est", "somali.jpg")
tgt_som1 = os.path.join(workspace, "frontend", "images", "pays", "Afrique_Est", "somalie.jpg")
shutil.copyfile(src_som, tgt_som1)
print("Somalie image copied.")

# 5. Default fallback image
tgt_def = os.path.join(workspace, "frontend", "images", "pays", "default.jpg")
shutil.copyfile(src_moz, tgt_def)
print("Default fallback image created.")

# Update DB
db_path = os.path.join(workspace, "backend", "visit_afrika.db")
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("UPDATE countries SET image_url = ?, region = ?, capital = ? WHERE slug = ?",
          ("images/pays/Afrique_Australe/mozambique.jpg", "Afrique Australe", "Maputo", "mozambique"))

c.execute("UPDATE countries SET image_url = ?, region = ?, capital = ? WHERE slug = ?",
          ("images/pays/Afrique_Centrale/rd_congo.jpg", "Afrique Centrale", "Kinshasa", "republique_democratique_du_congo"))

c.execute("UPDATE countries SET image_url = ?, region = ?, capital = ? WHERE slug = ?",
          ("images/pays/Afrique_Centrale/sao_tome_principe.jpg", "Afrique Centrale", "São Tomé", "sao_tome_et_principe"))

c.execute("UPDATE countries SET image_url = ?, region = ?, capital = ? WHERE slug = ?",
          ("images/pays/Afrique_Est/somalie.jpg", "Afrique de l'Est", "Mogadiscio", "somalie"))

conn.commit()
conn.close()
print("Database updated successfully.")
