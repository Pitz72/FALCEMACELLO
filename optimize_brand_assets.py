#!/usr/bin/env python3
"""
Script per ottimizzare gli asset del brand FALCE e MACELLO:
- Favicon da icona social
- Logo con sfondo trasparente
"""

import os
from PIL import Image, ImageOps

def color_similar(color1, color2, tolerance=30):
    """
    Verifica se due colori sono simili entro una certa tolleranza
    """
    return all(abs(c1 - c2) <= tolerance for c1, c2 in zip(color1, color2))

def create_favicon_from_social_icon(input_path, output_dir):
    """
    Crea favicon ottimizzati dall'icona social
    """
    try:
        with Image.open(input_path) as img:
            # Converti in RGBA per gestire la trasparenza
            img = img.convert('RGBA')
            
            # Dimensioni standard per favicon
            favicon_sizes = [16, 32, 48, 64, 128, 256]
            
            created_files = []
            
            for size in favicon_sizes:
                # Ridimensiona mantenendo la qualità
                favicon = img.resize((size, size), Image.Resampling.LANCZOS)
                
                # Salva come PNG per mantenere la trasparenza
                output_path = os.path.join(output_dir, f'favicon-{size}x{size}.png')
                favicon.save(output_path, 'PNG', optimize=True)
                created_files.append(output_path)
                print(f"✓ Favicon creato: {size}x{size}px -> {os.path.basename(output_path)}")
            
            # Crea anche un ICO file per compatibilità
            ico_path = os.path.join(output_dir, 'favicon.ico')
            # Usa le dimensioni più comuni per ICO
            ico_sizes = [(16, 16), (32, 32), (48, 48)]
            ico_images = []
            
            for size in ico_sizes:
                ico_img = img.resize(size, Image.Resampling.LANCZOS)
                ico_images.append(ico_img)
            
            # Salva come ICO
            ico_images[0].save(ico_path, format='ICO', sizes=[(img.width, img.height) for img in ico_images])
            created_files.append(ico_path)
            print(f"✓ Favicon ICO creato: {os.path.basename(ico_path)}")
            
            return created_files
            
    except Exception as e:
        print(f"Errore nella creazione del favicon: {e}")
        return []

def remove_background_and_optimize_logo(input_path, output_dir):
    """
    Rimuove lo sfondo dal logo e crea versioni ottimizzate
    """
    try:
        with Image.open(input_path) as img:
            # Converti in RGBA
            img = img.convert('RGBA')
            
            # Metodo semplificato: identifica il colore di sfondo dagli angoli
            width, height = img.size
            
            # Prendi i pixel degli angoli
            corners = [
                img.getpixel((0, 0))[:3],           # top-left
                img.getpixel((width-1, 0))[:3],     # top-right
                img.getpixel((0, height-1))[:3],    # bottom-left
                img.getpixel((width-1, height-1))[:3] # bottom-right
            ]
            
            # Trova il colore di sfondo più comune
            from collections import Counter
            bg_color = Counter(corners).most_common(1)[0][0]
            
            print(f"Colore di sfondo identificato: RGB{bg_color}")
            
            # Crea una nuova immagine con sfondo trasparente
            transparent_img = Image.new('RGBA', img.size, (0, 0, 0, 0))
            
            # Copia i pixel che non sono del colore di sfondo
            for x in range(width):
                for y in range(height):
                    pixel = img.getpixel((x, y))
                    # Se il pixel non è simile al colore di sfondo, copialo
                    if not color_similar(pixel[:3], bg_color, tolerance=30):
                        transparent_img.putpixel((x, y), pixel)
            
            print("Sfondo rimosso con successo!")
            
            # Salva versioni ottimizzate
            created_files = []
            
            # Logo principale per il sito (dimensione originale)
            logo_main_path = os.path.join(output_dir, 'logo-transparent.png')
            transparent_img.save(logo_main_path, 'PNG', optimize=True)
            created_files.append(logo_main_path)
            print(f"✓ Logo trasparente creato: {os.path.basename(logo_main_path)}")
            
            # Logo per hero section (dimensione ottimizzata)
            hero_logo = transparent_img.resize((400, 400), Image.Resampling.LANCZOS)
            hero_logo_path = os.path.join(output_dir, 'logo-hero.png')
            hero_logo.save(hero_logo_path, 'PNG', optimize=True)
            created_files.append(hero_logo_path)
            print(f"✓ Logo hero creato: 400x400px -> {os.path.basename(hero_logo_path)}")
            
            # Logo piccolo per navbar
            nav_logo = transparent_img.resize((120, 120), Image.Resampling.LANCZOS)
            nav_logo_path = os.path.join(output_dir, 'logo-nav.png')
            nav_logo.save(nav_logo_path, 'PNG', optimize=True)
            created_files.append(nav_logo_path)
            print(f"✓ Logo navbar creato: 120x120px -> {os.path.basename(nav_logo_path)}")
            
            return created_files
            
    except Exception as e:
        print(f"Errore nella rimozione dello sfondo: {e}")
        return []

def main():
    print("=== OTTIMIZZAZIONE ASSET BRAND FALCE e MACELLO ===")
    print("=" * 60)
    
    # Percorsi file
    social_icon_path = "import_jpeg/Icona Profilo Social.jpg"
    logo_path = "import_jpeg/Logo Falce e Macello - Geometrico Puro.jpg"
    output_dir = "images"
    
    # Verifica che i file esistano
    if not os.path.exists(social_icon_path):
        print(f"❌ File non trovato: {social_icon_path}")
        return
    
    if not os.path.exists(logo_path):
        print(f"❌ File non trovato: {logo_path}")
        return
    
    # Crea cartella output se non esiste
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    print("\n🔸 CREAZIONE FAVICON...")
    print("-" * 30)
    favicon_files = create_favicon_from_social_icon(social_icon_path, output_dir)
    
    print("\n🔸 OTTIMIZZAZIONE LOGO...")
    print("-" * 30)
    logo_files = remove_background_and_optimize_logo(logo_path, output_dir)
    
    # Riepilogo
    print("\n" + "=" * 60)
    print("✅ OTTIMIZZAZIONE COMPLETATA!")
    print(f"\nFile favicon creati: {len(favicon_files)}")
    for file in favicon_files:
        print(f"  - {os.path.basename(file)}")
    
    print(f"\nFile logo creati: {len(logo_files)}")
    for file in logo_files:
        print(f"  - {os.path.basename(file)}")
    
    print("\n📝 PROSSIMI PASSI:")
    print("1. Aggiorna index.html per usare i nuovi asset")
    print("2. Aggiungi i link favicon nel <head>")
    print("3. Sostituisci il logo nella hero section")
    print("4. Testa su diversi browser e dispositivi")

if __name__ == "__main__":
    main()