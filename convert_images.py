#!/usr/bin/env python3
"""
Script per convertire tutti i file PNG della cartella import in JPEG
per permettere una migliore analisi della grafica ufficiale di FALCE e MACELLO
"""

import os
from PIL import Image
import glob

def convert_png_to_jpeg(input_folder, output_folder):
    """
    Converte tutti i file PNG in una cartella in formato JPEG
    """
    # Crea la cartella di output se non esiste
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Trova tutti i file PNG nella cartella input e sottocartelle
    png_files = []
    for root, dirs, files in os.walk(input_folder):
        for file in files:
            if file.lower().endswith('.png'):
                png_files.append(os.path.join(root, file))
    
    print(f"Trovati {len(png_files)} file PNG da convertire...")
    
    converted_files = []
    
    for png_file in png_files:
        try:
            # Apri l'immagine PNG
            with Image.open(png_file) as img:
                # Converti in RGB se necessario (i JPEG non supportano la trasparenza)
                if img.mode in ('RGBA', 'LA', 'P'):
                    # Crea uno sfondo bianco
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Genera il nome del file di output
                relative_path = os.path.relpath(png_file, input_folder)
                jpeg_filename = os.path.splitext(relative_path)[0] + '.jpg'
                output_path = os.path.join(output_folder, jpeg_filename)
                
                # Crea le sottocartelle se necessario
                output_dir = os.path.dirname(output_path)
                if not os.path.exists(output_dir):
                    os.makedirs(output_dir)
                
                # Salva come JPEG con qualità alta
                img.save(output_path, 'JPEG', quality=95, optimize=True)
                
                print(f"✓ Convertito: {os.path.basename(png_file)} -> {os.path.basename(output_path)}")
                converted_files.append(output_path)
                
        except Exception as e:
            print(f"✗ Errore nella conversione di {png_file}: {str(e)}")
    
    print(f"\nConversione completata! {len(converted_files)} file convertiti.")
    return converted_files

def main():
    # Cartelle di input e output
    input_folder = "import"
    output_folder = "import_jpeg"
    
    print("=== CONVERTITORE PNG -> JPEG per FALCE e MACELLO ===")
    print(f"Cartella input: {input_folder}")
    print(f"Cartella output: {output_folder}")
    print("=" * 50)
    
    # Verifica che la cartella input esista
    if not os.path.exists(input_folder):
        print(f"Errore: La cartella {input_folder} non esiste!")
        return
    
    # Esegui la conversione
    converted_files = convert_png_to_jpeg(input_folder, output_folder)
    
    print("\n=== RIEPILOGO ===")
    print(f"File convertiti: {len(converted_files)}")
    print(f"Cartella output: {os.path.abspath(output_folder)}")
    
    # Elenca i file convertiti
    if converted_files:
        print("\nFile convertiti:")
        for file in converted_files:
            print(f"  - {os.path.relpath(file, output_folder)}")

if __name__ == "__main__":
    main()