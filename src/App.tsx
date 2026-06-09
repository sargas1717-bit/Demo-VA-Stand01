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
import { Cpu, Wifi, WifiOff, Maximize, Minimize } from "lucide-react";

export default function App() {
  // La demo arranca siempre en FILTERS — sin menú de inicio
  const [savedSamples] = useState<SavedEmotion[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [viewMode, setViewMode] = useState<"ingenieria" | "comercial" | "ambos">("ambos");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

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
      className="h-full flex flex-col overflow-hidden selection:bg-blue-500 selection:text-black bg-[#0A0A0B] border-[3px] border-blue-500/85 shadow-[inset_0_0_0_3px_rgba(59,130,246,0.85),inset_0_0_40px_rgba(59,130,246,0.12)]"
    >

      {/* CABECERA PRINCIPAL */}
      <header className="h-14 border-b px-6 flex items-center justify-between shrink-0 z-10 border-blue-500/40 bg-[#0d1117]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md shadow-sm active:scale-95 transition-all bg-blue-500/15 border border-blue-500/50 text-blue-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold tracking-widest uppercase text-blue-400">
                DEMO · MOD_01
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Ingeniería vs Producto
              </span>
            </div>
          </div>
        </div>

        {/* Selector de Modo de Vista */}
        <div className="flex bg-[#1e293b] p-1 rounded-lg border border-[#334155] absolute left-1/2 -translate-x-1/2">
          {(["ingenieria", "ambos", "comercial"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                viewMode === mode
                  ? "bg-[#3b82f6] text-white shadow-md"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#334155]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Indicadores de estado */}
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded border text-[10px] font-mono ${
              error
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : isLoaded
                ? "bg-blue-500/10 text-blue-400 border-blue-500/25 shadow-[0_0_8px_rgba(59,130,246,0.2)]"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full mr-2 ${
                error ? "bg-red-400" : isLoaded ? "bg-blue-400 shadow-[0_0_6px_#60a5fa]" : "bg-amber-400 animate-pulse"
              }`}
            />
            {error ? "FAIL" : isLoaded ? "LIVE_FEED" : "SYNCING"}
          </span>

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded border text-[9px] font-mono ${
              isOnline
                ? "bg-blue-500/10 text-blue-400 border-blue-500/25"
                : "bg-amber-500/10 text-amber-400 border-amber-500/25"
            }`}
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
          viewMode={viewMode}
        />
      </main>

      {/* CRÉDITO FIJO — esquina inferior izquierda */}
      <div
        id="demo-credit"
        className="fixed bottom-[14px] left-[18px] z-[9999] bg-[#0A0F1E]/75 backdrop-blur-md border border-blue-500/45 rounded-lg px-3 py-1.5 shadow-[0_0_16px_rgba(59,130,246,0.15)] pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="pointer-events-auto p-1.5 rounded-md hover:bg-blue-500/20 transition-colors border border-blue-500/30 text-blue-400 cursor-pointer"
            title="Pantalla Completa"
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>
          <div>
            <p className="m-0 text-[9px] font-mono tracking-[0.08em] uppercase text-blue-300 font-bold">
              Realizado por&nbsp;
              <span className="text-blue-400">Ing. José Rojas</span>
            </p>
            <p className="mt-[2px] mb-0 text-[7.5px] font-mono tracking-[0.05em] text-blue-300/55">
              Demo MOD_01 · Visión Artificial Lab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
