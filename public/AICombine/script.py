import os

# Basisverzeichnis anpassen oder "." für aktuelles Verzeichnis lassen
BASE_DIR = "."

deleted = 0

for root, dirs, files in os.walk(BASE_DIR):
    for file in files:
        if file.lower().endswith((".jpg", ".jpeg")):
            path = os.path.join(root, file)
            try:
                os.remove(path)
                deleted += 1
                print(f"🗑️  Gelöscht: {path}")
            except Exception as e:
                print(f"❌ Fehler bei {path}: {e}")

print(f"\n✅ Fertig! Insgesamt {deleted} JPG-Dateien gelöscht.")
