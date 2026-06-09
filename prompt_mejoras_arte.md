# Contexto para Modificación de Estilos de Arte Generativo

Hola. Este documento contiene el código actual de un renderizador de Arte Generativo (Arte Pop, Puntillismo y Óleo) que funciona en tiempo real sobre una malla facial (FaceMesh de MediaPipe) usando Canvas 2D en React.
Tu objetivo es **mejorar las paletas de colores, los patrones de renderizado o la estética visual** de estos estilos.

## ⚠️ REGLAS ESTRICTAS E INDISPENSABLES (NO MODIFICAR ESTO)

Para que tu código sea compatible con el sistema actual, **debes respetar obligatoriamente** lo siguiente:

1. **Variables de Paleta / Tema:** El sistema usa 3 temas visuales rotativos basados en un módulo dinámico. Conserva la estructura condicional para definir colores:
   ```javascript
   if (isFemale) { /* Colores 1 */ }
   else if (isMale) { /* Colores 2 */ }
   else { /* Colores 3 */ }
   ```
2. **Funciones del Sistema de Trazado:** No intentes reescribir la lógica de conexión de puntos con `ctx.lineTo()` si es para rellenar formas estándar. **Debes** usar las funciones auxiliares inyectadas del sistema:
   * `fillPath(ctx, face, ARR_PUNTOS, color_o_patron, width, height)`
   * `strokePath(ctx, face, ARR_PUNTOS, color, grosor, width, height)`
   * `strokeDottedPath(ctx, face, ARR_PUNTOS, color, grosor, segmento, width, height)`
3. **Constantes de la Cara (MediaPipe):** Los arrays de regiones faciales ya vienen dados y **no deben ser alterados**:
   * `F_OVAL` (silueta de la cara)
   * `F_LEYE`, `F_REYE` (ojos)
   * `F_LIPS` (labios)
   * `F_LBRW`, `F_RBRW` (cejas)
   * `F_LIRIS`, `F_RIRIS` (iris)
   * `F_TESS` (malla de triangulación completa, usado en el Óleo)
4. **Coordenadas y Escala:** Cualquier matemática custom que uses sobre `face[index]` debe escalar con el ancho y alto del canvas: `(1 - pt.x) * width` (se invierte X por modo espejo) y `pt.y * height`.

---

## 🎨 CÓDIGO ACTUAL DE LOS ESTILOS (PARA MEJORAR)

Aquí tienes el bloque de código que se encarga de pintar. Puedes alterar los colores, grosores de línea, añadir degradados (`ctx.createLinearGradient`), sombras o lógica de patrones, **siempre y cuando respetes las reglas de arriba**.

```javascript
if (arteThemeIdx === 0) {
    // --- ARTE POP (Estilo Cómic / Ben-Day Dots) ---
    let baseColor, shadowDot, shadowBg, lipColor, eyeShadowColor;
    if (isFemale) {
        baseColor = '#ffe3e0'; shadowDot = '#ff4757'; shadowBg = '#ff6b81'; lipColor = '#ff0000'; eyeShadowColor = '#1e90ff';
    } else if (isMale) {
        baseColor = '#f5cd79'; shadowDot = '#e15f41'; shadowBg = '#f3a683'; lipColor = '#cf6a87'; eyeShadowColor = null;
    } else {
        baseColor = '#f1dbce'; shadowDot = '#e66767'; shadowBg = '#ea8685'; lipColor = '#e66767'; eyeShadowColor = null;
    }

    // Pinta la base de la cara
    fillPath(ctx, face, F_OVAL, baseColor, width, height);

    // (...) El sistema usa createHalftonePattern internamente para dar efecto cómic
    const rightShadowArea = [ /* arrays de puntos de sombra... */ ];
    const popPattern = createHalftonePattern(ctx, shadowDot, shadowBg, 10);
    if (popPattern) {
      fillPath(ctx, face, rightShadowArea, popPattern, width, height);
      // Sombra barbilla...
    }

    // Ojos y boca
    strokePath(ctx, face, F_OVAL, '#000', 4, width, height); 
    fillPath(ctx, face, F_LEYE, '#fff', width, height);
    fillPath(ctx, face, F_REYE, '#fff', width, height);
    strokePath(ctx, face, F_LEYE, '#000', isFemale ? 5 : 3, width, height);
    strokePath(ctx, face, F_REYE, '#000', isFemale ? 5 : 3, width, height);
    fillPath(ctx, face, F_LIPS, lipColor, width, height);
    strokePath(ctx, face, F_LIPS, '#000', 3, width, height);
    
    // Iris
    if (F_LIRIS.length) {
        fillPath(ctx, face, F_LIRIS, isFemale ? '#1e90ff' : '#2ed573', width, height);
        // ...
    }
} else if (arteThemeIdx === 1) {
    // --- PUNTILLISMO (Puntos y trazos discontinuos) ---
    let bgBase, dot1, dot2, dot3, lipColor, eyeColor;
    if (isFemale) {
        bgBase = '#fff0f5'; dot1 = '#ff1493'; dot2 = '#00ced1'; dot3 = '#ffd700'; lipColor = '#dc143c'; eyeColor = '#191970';
    } else if (isMale) {
        bgBase = '#f5f5dc'; dot1 = '#000080'; dot2 = '#8b0000'; dot3 = '#2e8b57'; lipColor = '#8b4513'; eyeColor = '#000000';
    } else {
        bgBase = '#faf0e6'; dot1 = '#ff8c00'; dot2 = '#4682b4'; dot3 = '#9acd32'; lipColor = '#cd5c5c'; eyeColor = '#4682b4';
    }

    const mainPattern = createPointillismPattern(ctx, dot1, dot2, dot3, bgBase);
    if (mainPattern) fillPath(ctx, face, F_OVAL, mainPattern, width, height);

    fillPath(ctx, face, F_LEYE, '#ffffff', width, height);
    fillPath(ctx, face, F_REYE, '#ffffff', width, height);
    
    strokeDottedPath(ctx, face, F_OVAL, dot2, 4, 8, width, height);
    strokeDottedPath(ctx, face, F_LIPS, lipColor, 4, 6, width, height);
    strokeDottedPath(ctx, face, F_LBRW, eyeColor, 5, 5, width, height);
    strokeDottedPath(ctx, face, F_RBRW, eyeColor, 5, 5, width, height);
    // ...
} else if (arteThemeIdx === 2) {
    // --- ÓLEO (Triangulación estilo espátula) ---
    let palette;
    if (isFemale) {
        palette = ['#ff007f', '#00e5ff', '#ffea00', '#ff5e00', '#d500f9', '#ffffff'];
    } else if (isMale) {
        palette = ['#ff3d00', '#2962ff', '#d50000', '#00c853', '#ffab00', '#3e2723'];
    } else {
        palette = ['#ff6d00', '#00bfa5', '#ffd600', '#c51162'];
    }

    fillPath(ctx, face, F_OVAL, '#212121', width, height); 

    ctx.save();
    for (let i = 0; i < F_TESS.length; i++) {
        const triangle = F_TESS[i];
        const pt1 = face[triangle[0]];
        const pt2 = face[triangle[1]];
        if (!pt1 || !pt2) continue;

        const color = palette[i % palette.length];

        ctx.beginPath();
        ctx.moveTo((1 - pt1.x) * width, pt1.y * height);
        ctx.lineTo((1 - pt2.x) * width, pt2.y * height);
        
        ctx.lineWidth = 14; 
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Brillo espatulado
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
    }
    ctx.restore();
}
```
