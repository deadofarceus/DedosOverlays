import os
import json
import random
from pathlib import Path

# Script liegt in `public/AICombine/` → "." passt normalerweise.
BASE_DIR = Path(".")

# Pfad-Präfix so, wie es in der Webapp genutzt wird (Ordner liegt unter `public/`).
PUBLIC_URL_PREFIX = "/AICombine"

# Ausgabe-Datei (wird in `public/AICombine/` gespeichert).
OUTPUT_FILE = Path("aiCombineImages.json")

IMAGE_EXTS = {".png"}


def normalize_filename_spaces(file_path: Path) -> Path:
    """Ersetzt Leerzeichen im Dateinamen durch '_' und renamed die Datei (falls nötig)."""
    if " " not in file_path.name:
        return file_path

    new_name = file_path.name.replace(" ", "_")
    new_path = file_path.with_name(new_name)
    # Kollision vermeiden (falls Zielname existiert)
    if new_path.exists() and new_path != file_path:
        raise FileExistsError(f"Zieldatei existiert bereits: {new_path}")

    file_path.rename(new_path)
    return new_path


def to_public_url(folder: Path, file_path: Path) -> str:
    # POSIX-Slashes, damit es als URL überall passt
    rel = (folder.name + "/" + file_path.name).replace("\\", "/")
    return f"{PUBLIC_URL_PREFIX}/{rel}"


def is_image(path: Path) -> bool:
    return path.is_file() and path.suffix.lower() in IMAGE_EXTS


def is_combined_image(path: Path) -> bool:
    # "enthält X" → wir prüfen case-insensitiv auf "x" im Namen
    return "x" in path.stem.lower()


def build_entries(base_dir: Path) -> list[dict]:
    entries: list[dict] = []

    for folder in sorted([p for p in base_dir.iterdir() if p.is_dir()]):
        # alle Bilder einsammeln und Namen normalisieren
        images: list[Path] = []
        for p in sorted(folder.iterdir()):
            if not is_image(p):
                continue
            # p2 = normalize_filename_spaces(p)
            # images.append(p2)

        if not images:
            continue

        combined_candidates = [p for p in images if is_combined_image(p)]
        if len(combined_candidates) != 1:
            print(f"[skip] {folder.name}: expected exactly 1 combined (name contains 'x'), got {len(combined_candidates)}")
            continue

        combined = combined_candidates[0]
        others = sorted([p for p in images if p != combined], key=lambda p: p.name.lower())
        if len(others) < 2:
            print(f"[skip] {folder.name}: expected at least 2 non-combined images, got {len(others)}")
            continue

        left, right = others[0], others[1]

        entries.append(
            {
                "left": left,
                "right": right,
                "combined": combined,
            }
        )

    return entries


def main() -> None:
    base_dir = BASE_DIR.resolve()
    print(base_dir)
    entries = build_entries(base_dir)

    random.shuffle(entries)

    out_path = (BASE_DIR / OUTPUT_FILE).resolve()
    out_path.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Done. Wrote {len(entries)} entries to: {out_path}")


if __name__ == "__main__":
    main()

