#!/usr/bin/env python3
"""
Script per analizzare le immagini ufficiali di FALCE e MACELLO
e estrarre informazioni utili per il design del sito web
"""

import os
from PIL import Image
import colorsys
from collections import Counter

def get_dominant_colors(image_path, num_colors=5):
    """
    Estrae i colori dominanti da un'immagine
    """
    try:
        with Image.open(image_path) as img:
            # Ridimensiona per velocizzare l'analisi
            img = img.resize((150, 150))
            # Converti in RGB
            img = img.convert('RGB')
            
            # Ottieni tutti i pixel
            pixels = list(img.getdata())
            
            # Conta i colori più frequenti
            color_count = Counter(pixels)
            dominant_colors = color_count.most_common(num_colors)
            
            return dominant_colors
    except Exception as e:
        print(f"Errore nell'analisi dei colori di {image_path}: {e}")
        return []

def rgb_to_hex(rgb):
    """
    Converte RGB in formato esadecimale
    """
    return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

def analyze_image(image_path):
    """
    Analizza un'immagine e restituisce informazioni dettagliate
    """
    try:
        with Image.open(image_path) as img:
            # Informazioni base
            width, height = img.size
            mode = img.mode
            format_img = img.format
            
            # Colori dominanti
            dominant_colors = get_dominant_colors(image_path)
            
            # Calcola il rapporto aspetto
            aspect_ratio = width / height
            
            return {
                'path': image_path,
                'filename': os.path.basename(image_path),
                'dimensions': (width, height),
                'aspect_ratio': round(aspect_ratio, 2),
                'mode': mode,
                'format': format_img,
                'dominant_colors': dominant_colors
            }
    except Exception as e:
        print(f"Errore nell'analisi di {image_path}: {e}")
        return None

def generate_css_colors(colors):
    """
    Genera variabili CSS dai colori dominanti
    """
    css_vars = []
    for i, (color, count) in enumerate(colors[:5]):
        hex_color = rgb_to_hex(color)
        css_vars.append(f"    --brand-color-{i+1}: {hex_color}; /* RGB{color} - {count} occorrenze */")
    return "\n".join(css_vars)

def main():
    print("=== ANALISI GRAFICA UFFICIALE FALCE e MACELLO ===")
    print("=" * 60)
    
    # Cartella con i file JPEG convertiti
    jpeg_folder = "import_jpeg"
    
    if not os.path.exists(jpeg_folder):
        print(f"Errore: La cartella {jpeg_folder} non esiste!")
        return
    
    # File principali da analizzare
    key_files = [
        "Logo Falce e Macello - Geometrico Puro.jpg",
        "Icona Profilo Social.jpg",
        "Elementi Grafici Sito Web.jpg",
        "Header Sito Falce e Macello.jpg",
        "Pattern Brand.jpg"
    ]
    
    # Analizza i file principali
    print("\n🎨 ANALISI FILE PRINCIPALI:")
    print("-" * 40)
    
    all_colors = []
    
    for filename in key_files:
        filepath = os.path.join(jpeg_folder, filename)
        if os.path.exists(filepath):
            print(f"\n📁 {filename}")
            analysis = analyze_image(filepath)
            
            if analysis:
                print(f"   Dimensioni: {analysis['dimensions'][0]}x{analysis['dimensions'][1]}px")
                print(f"   Rapporto: {analysis['aspect_ratio']}:1")
                print(f"   Formato: {analysis['format']} ({analysis['mode']})")
                
                if analysis['dominant_colors']:
                    print("   Colori dominanti:")
                    for i, (color, count) in enumerate(analysis['dominant_colors'][:3]):
                        hex_color = rgb_to_hex(color)
                        print(f"     {i+1}. {hex_color} (RGB{color}) - {count} pixel")
                        all_colors.extend([color] * count)
        else:
            print(f"   ❌ File non trovato: {filename}")
    
    # Analizza l'EP
    print("\n\n🎵 ANALISI GRAFICA EP:")
    print("-" * 40)
    
    ep_files = [
        "GRAFICA/The Hopeful Children of Mr. Brandt - EP Cover Corretta.jpg",
        "GRAFICA/Brandt EP - Banner Digitale.jpg",
        "GRAFICA/Brandt EP - Formato Vinile.jpg"
    ]
    
    for filename in ep_files:
        filepath = os.path.join(jpeg_folder, filename)
        if os.path.exists(filepath):
            print(f"\n📀 {os.path.basename(filename)}")
            analysis = analyze_image(filepath)
            
            if analysis:
                print(f"   Dimensioni: {analysis['dimensions'][0]}x{analysis['dimensions'][1]}px")
                print(f"   Rapporto: {analysis['aspect_ratio']}:1")
                
                if analysis['dominant_colors']:
                    print("   Colori principali:")
                    for i, (color, count) in enumerate(analysis['dominant_colors'][:2]):
                        hex_color = rgb_to_hex(color)
                        print(f"     {hex_color} (RGB{color})")
    
    # Genera palette colori globale
    if all_colors:
        print("\n\n🎨 PALETTE COLORI BRAND GLOBALE:")
        print("-" * 40)
        
        global_color_count = Counter(all_colors)
        top_brand_colors = global_color_count.most_common(8)
        
        print("\n/* Variabili CSS per i colori del brand */")
        print(":root {")
        print(generate_css_colors(top_brand_colors))
        print("}")
        
        print("\n📊 Colori più utilizzati nel brand:")
        for i, (color, count) in enumerate(top_brand_colors[:5]):
            hex_color = rgb_to_hex(color)
            print(f"   {i+1}. {hex_color} - {count} occorrenze totali")
    
    print("\n" + "=" * 60)
    print("✅ Analisi completata! Usa questi dati per aggiornare il design del sito.")

if __name__ == "__main__":
    main()