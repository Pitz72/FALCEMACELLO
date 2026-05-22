import { useEffect, useRef } from "react";
import { useAudioStore } from "@/lib/audioStore";

export default function AudioVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const { audioAnalyzer, isPlaying } = useAudioStore();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Impostiamo la risoluzione reale del canvas per display Retina
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Buffer dati per frequenze
        const bufferLength = audioAnalyzer ? audioAnalyzer.frequencyBinCount : 64;
        const dataArray = new Uint8Array(bufferLength);

        // Variabile per l'effetto rumore di fondo quando è in pausa (onda sinusoidale lenta)
        let noiseOffset = 0;

        const draw = () => {
            const width = canvas.getBoundingClientRect().width;
            const height = canvas.getBoundingClientRect().height;
            
            // Pulisce lo schermo
            ctx.clearRect(0, 0, width, height);

            if (isPlaying && audioAnalyzer) {
                // Recuperiamo i dati delle frequenze audio in tempo reale
                audioAnalyzer.getByteFrequencyData(dataArray);

                const barWidth = (width / bufferLength) * 1.6;
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    // Valore da 0 a 255
                    const value = dataArray[i];
                    // Calcolo dell'altezza barra proporzionata al canvas
                    barHeight = (value / 255) * height * 0.95;

                    // Definiamo il gradiente: rosso neon alla base, oro rivoluzionario sulla punta
                    const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
                    grad.addColorStop(0, "#cc0000"); // Rosso scuro
                    grad.addColorStop(0.6, "#ff1a1a"); // Rosso neon
                    grad.addColorStop(1, "#ffd700"); // Oro

                    ctx.fillStyle = grad;
                    
                    // Effetto bagliore neon sulla punta per le frequenze alte
                    if (value > 150) {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = "#ff1a1a";
                    } else {
                        ctx.shadowBlur = 0;
                    }

                    // Disegniamo la barra con angoli leggermente smussati
                    ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

                    x += barWidth;
                }
            } else {
                // Effetto "Radar di Controllo" / Onda di riposo sinusoidale se l'audio è in pausa
                ctx.shadowBlur = 0;
                ctx.strokeStyle = "rgba(204, 0, 0, 0.4)";
                ctx.lineWidth = 2;
                ctx.beginPath();

                const sliceWidth = width / 100;
                let x = 0;

                for (let i = 0; i <= 100; i++) {
                    const y = height / 2 + Math.sin(i * 0.15 + noiseOffset) * 6;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                    
                    x += sliceWidth;
                }

                ctx.stroke();
                noiseOffset += 0.05; // Velocità dell'oscillazione a riposo
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [audioAnalyzer, isPlaying]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-12 opacity-80"
            style={{ display: "block" }}
        />
    );
}
