<div align="center">
  <h1>Demo MOD 01: Ingeniería vs Producto</h1>
  <p><strong>Desarrollado por: Ing. José Rojas</strong></p>
</div>

Bienvenido al repositorio de la **Demostración Interactiva - Módulo 01**. Esta aplicación está construida utilizando React, Vite y MediaPipe, permitiendo explorar las capacidades de visión artificial en tiempo real.

El sistema divide la pantalla para mostrar dos perspectivas simultáneas:
1. **Lado de Ingeniería:** Visualización de la malla matemática cruda, trazado esquelético de manos y tracking de nodos en tiempo real.
2. **Lado de Producto (Comercial):** Aplicación estética de los datos crudos a través de filtros dinámicos (Cyberpunk Plexus, Bioluminiscencia, Fuego dinámico, etc.).

Esta demostración cuenta con soporte **multi-usuario**, procesando fluidamente hasta 3 personas y 6 manos simultáneamente de manera local en el navegador, sin necesidad de conexión a internet para la inferencia.

## 🚀 Inicio Rápido

Sigue estos pasos para ejecutar la demostración en tu entorno local.

### Prerrequisitos

- **Node.js** (versión 16 o superior recomendada)
- Una cámara web conectada al equipo.

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/sargas1717-bit/Demo-VA-Stand01.git
   cd Demo-VA-Stand01
   ```

2. **Ejecutar el Lanzador Rápido (Windows):**
   Puedes simplemente hacer doble clic en el archivo `start.bat` incluido en la carpeta. Este script instalará automáticamente las dependencias (si no lo están) y abrirá la demostración en tu navegador.

   **Alternativa manual (Terminal):**
   ```bash
   npm install
   npm run dev
   ```
   La aplicación estará disponible localmente, generalmente en `http://localhost:3001`.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, TypeScript, Vite
- **Visión Artificial:** Google MediaPipe (FaceMesh, Hands, Camera Utils) procesado localmente mediante WebAssembly (WASM).
- **Renderizado:** Canvas 2D API optimizado para 60 FPS.
