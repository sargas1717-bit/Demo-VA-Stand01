/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * DEMO - MOD_01: Ingeniería vs Producto
 * Realizado por Ing. José Rojas
 *
 * Esta versión de demostración arranca directamente en el módulo FILTERS (MOD_01)
 * y añade un borde azul distintivo junto con el crédito del autor.
 */

import { useState, useEffect } from "react";
import { SavedEmotion } from "./types";
import { useVision } from "./hooks/useVision";
import { Workspace } from "./components/Workspace";
import { Cpu, Wifi, WifiOff } from "lucide-react";

export default function App() {
  // La demo arranca siempre en FILTERS — sin menú de inicio
  const [savedSamples] = useState<SavedEmotion[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const {
    isLoaded,
    isLoading,
    error,
    faceLandmarks,
    handLandmarks,
    videoElement,
    detectionConfidence,
  } = useVision("FILTERS");

  return (
    /* Contenedor raíz con borde azul demo */
    <div
      id="main-portal"
      className="h-full flex flex-col overflow-hidden selection:bg-blue-500 selection:text-black bg-[#0A0A0B]"
      style={{
        boxShadow: "inset 0 0 0 3px rgba(59, 130, 246, 0.85), inset 0 0 40px rgba(59, 130, 246, 0.12)",
        border: "3px solid rgba(59, 130, 246, 0.85)",
      }}
    >

      {/* CABECERA PRINCIPAL */}
      <header className="h-14 border-b px-6 flex items-center justify-between shrink-0 z-10"
        style={{ borderColor: "rgba(59,130,246,0.4)", backgroundColor: "#0d1117" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-1.5 rounded-md shadow-sm active:scale-95 transition-all"
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.5)",
              color: "#60a5fa",
            }}
          >
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#60a5fa" }}>
                DEMO · MOD_01
              </h1>
              <span
                className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  color: "#93c5fd",
                }}
              >
                Ingeniería vs Producto
              </span>
            </div>
          </div>
        </div>

        {/* Indicadores de estado */}
        <div className="flex items-center gap-4">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded border text-[10px] font-mono"
            style={
              error
                ? { background: "rgba(239,68,68,0.1)", color: "#f87171", borderColor: "rgba(239,68,68,0.2)" }
                : isLoaded
                ? { background: "rgba(59,130,246,0.08)", color: "#60a5fa", borderColor: "rgba(59,130,246,0.25)", boxShadow: "0 0 8px rgba(59,130,246,0.2)" }
                : { background: "rgba(251,191,36,0.1)", color: "#fbbf24", borderColor: "rgba(251,191,36,0.2)" }
            }
          >
            <span
              className={`h-1.5 w-1.5 rounded-full mr-2 ${error ? "" : isLoaded ? "" : "animate-pulse"}`}
              style={{
                background: error ? "#f87171" : isLoaded ? "#60a5fa" : "#fbbf24",
                boxShadow: isLoaded && !error ? "0 0 6px #60a5fa" : undefined,
              }}
            />
            {error ? "FAIL" : isLoaded ? "LIVE_FEED" : "SYNCING"}
          </span>

          <span
            className="inline-flex items-center px-2 py-0.5 rounded border text-[9px] font-mono"
            style={
              isOnline
                ? { background: "rgba(59,130,246,0.08)", color: "#60a5fa", borderColor: "rgba(59,130,246,0.25)" }
                : { background: "rgba(251,191,36,0.08)", color: "#fbbf24", borderColor: "rgba(251,191,36,0.25)" }
            }
          >
            {isOnline ? (
              <Wifi className="w-2.5 h-2.5 mr-1" />
            ) : (
              <WifiOff className="w-2.5 h-2.5 mr-1" />
            )}
            {isOnline ? "ONLINE" : "OFFLINE LOCAL"}
          </span>

          <div className="hidden md:block text-[10px] font-mono text-[#636366]">
            Soporta: Plexus · CyberMask · Fuego Dinámico
          </div>
        </div>
      </header>

      {/* WORKSPACE */}
      <main className="flex-1 relative overflow-hidden flex flex-col bg-[#0A0A0B]">
        <Workspace
          activeModule="FILTERS"
          onExitToMenu={() => {}}   // No hay menú en la demo
          faceLandmarks={faceLandmarks}
          handLandmarks={handLandmarks}
          videoElement={videoElement}
          isLoading={isLoading}
          error={error}
          savedEmotions={savedSamples}
          onSaveSample={() => {}}
          onDeleteSample={() => {}}
          detectionConfidence={detectionConfidence}
        />
      </main>

      {/* CRÉDITO FIJO — esquina inferior izquierda */}
      <div
        id="demo-credit"
        style={{
          position: "fixed",
          bottom: "14px",
          left: "18px",
          zIndex: 9999,
          background: "rgba(10,15,30,0.75)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(59,130,246,0.45)",
          borderRadius: "8px",
          padding: "6px 12px",
          boxShadow: "0 0 16px rgba(59,130,246,0.15)",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "9px",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#93c5fd",
            fontWeight: 700,
          }}
        >
          Realizado por&nbsp;
          <span style={{ color: "#60a5fa" }}>Ing. José Rojas</span>
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "7.5px",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.05em",
            color: "rgba(147,197,253,0.55)",
          }}
        >
          Demo MOD_01 · Visión Artificial Lab
        </p>
      </div>
    </div>
  );
}
