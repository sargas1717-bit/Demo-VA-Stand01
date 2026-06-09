<div align="center">
  <h1>Demo MOD 01: Ingeniería vs Producto</h1>
  <p><strong>Desarrollado por: Ing. José Rojas</strong></p>
</div>

Bienvenido al repositorio de la **Demostración Interactiva - Módulo 01**. Esta aplicación está construida utilizando React, Vite y MediaPipe, permitiendo explorar las capacidades de visión artificial en tiempo real.

El sistema divide la pantalla para mostrar dos perspectivas simultáneas:
1. **Lado de Ingeniería:** Visualización de la malla matemática cruda, trazado esquelético de manos y tracking de nodos en tiempo real.
2. **Lado de Producto (Comercial):** Aplicación estética de los datos crudos a través de filtros dinámicos (Cyberpunk Plexus, Bioluminiscencia, Fuego dinámico, etc.).

Esta demostración cuenta con soporte **multi-usuario**, procesando fluidamente hasta 3 personas y 6 manos simultáneamente de manera local en el navegador, sin necesidad de conexión a internet para la inferencia.

## 🌟 Funciones del Sistema

La demostración incluye un conjunto robusto de características diseñadas para mostrar la potencia y versatilidad de la visión artificial:

*   **Inferencia Local y Privada (Offline)**: Todo el procesamiento de Google MediaPipe se ejecuta en el navegador mediante WebAssembly (WASM), lo que significa que no se envían datos biométricos a ningún servidor y la aplicación puede funcionar sin conexión a internet.
*   **Detección Multi-Usuario**: Capacidad para trackear hasta 3 personas (FaceMesh) y 6 manos simultáneamente a 60 FPS.
*   **Pantalla Dividida e Interfaces Adaptables**: Cambia dinámicamente entre vistas de "Ingeniería" (datos crudos), "Comercial" (producto final estético) o "Ambos" para comparar la tecnología de fondo con la experiencia de usuario.
*   **Mallas de Ingeniería Avanzadas (Lado Izquierdo)**:
    *   **Clásico (🧬)**: Malla alámbrica facial estándar de 468 puntos.
    *   **Biolum (🦠)**: Esporas orgánicas y nodos con pulso cromático.
    *   **CyberMask (🤖)**: Placas complejas de escáner tecnológico y ojos láser cian.
    *   **Plexus Cyber (💠)**: Red neuronal conectiva en tiempo real con temas de color dinámicos.
    *   **Fuego (🔥)**: Simulación de magma fluyente, llamas ascendentes y ojos de lava.
    *   **Electro (⚡)**: Red de alto voltaje con rayos y relámpagos fluorescentes reactivos.
*   **Filtros Comerciales Dinámicos (Lado Derecho)**:
    *   **Lentes de Sol (👓)**: Montura oscura con simulación de brillos y reflejos.
    *   **Conejo (🐰)**: Filtro facial con orejas animadas, nariz rosa y bigotes 3D.
    *   **Sombrero de Copa (🎩)**: Integración espacial de un sombrero de mago con cinta de satín.
    *   **Rastro Luminoso (💫)**: Generación de partículas arcoíris y lluvia de destellos al mover las manos.
    *   **Arte Clásico (🎨)**: Patrones artísticos generativos en vivo (Arte Pop, Puntillismo, Óleo).
    *   **Todo Junto (✨)**: Renderizado superpuesto de todos los filtros simultáneamente manteniendo la tasa de fotogramas.
*   **Interacción Sin Contacto (Touchless)**: Uso de detección de manos para interactuar con botones de la interfaz apuntando el dedo índice al visor.

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
