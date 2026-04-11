---
description: "Genera un diagrama SVG educativo para 0-assets/ siguiendo los estándares visuales del bootcamp: dark theme, sin degradés, fuente sans-serif, paleta React Native. Usar cuando la teoría o práctica necesite un diagrama visual."
name: "Nuevo diagrama SVG"
argument-hint: "Describe el diagrama: qué concepto ilustra, qué elementos debe tener, semana y nombre de archivo sugerido (ej: week-03/navigation-stack-flow.svg)"
mode: "agent"
---

# Generar diagrama SVG educativo — Bootcamp React Native

Crea un diagrama SVG para `0-assets/` que ilustre conceptos de React Native de
forma visual y educativa, siguiendo los estándares del bootcamp.

## Estándares visuales obligatorios

### Tema

- 🌙 **Fondo oscuro**: `#0d1117` (GitHub dark)
- ❌ **Sin degradés** (`linearGradient`, `radialGradient` están **PROHIBIDOS**)
- ✅ Colores sólidos únicamente

### Paleta de colores

| Rol                 | Color     | Uso                                  |
| ------------------- | --------- | ------------------------------------ |
| Fondo base          | `#0d1117` | Background principal del SVG         |
| Acento React Native | `#61DAFB` | Títulos, acciones, bordes de énfasis |
| Texto principal     | `#ffffff` | Texto sobre fondo oscuro             |
| Texto secundario    | `#8b949e` | Subtítulos, descripciones            |
| Superficie card     | `#161b22` | Cajas, paneles, contenedores         |
| Borde sutil         | `#30363d` | Bordes de cajas y separadores        |
| Éxito / positivo    | `#3fb950` | Flujos exitosos, checkmarks          |
| Error / negativo    | `#f85149` | Errores, rechazos, x-marks           |
| Advertencia         | `#d29922` | Notas de precaución                  |

### Tipografía

- ✅ **Sans-serif exclusivamente**: `font-family="system-ui, -apple-system, sans-serif"`
- ❌ **NO usar fuentes serif**: `Times`, `Georgia`, etc.
- ❌ **NO usar monospace** salvo para fragmentos de código dentro del diagrama
- Jerarquía de tamaños: título 20-24px, subtítulo 14-16px, cuerpo 11-13px

### Dimensiones recomendadas

- **Diagrama de flujo**: 800×500px o 1000×600px
- **Comparativa iOS vs Android**: 900×400px
- **Arquitectura de capas**: 700×600px
- **Timeline / secuencia**: 900×350px

## Tipos de diagrama más usados en el bootcamp

### Diagrama de flujo de navegación

```svg
<!-- Ejemplo: Stack Navigator flow -->
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#0d1117"/>
  <!-- Pantalla A -->
  <rect x="50" y="150" width="160" height="100" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="130" y="205" fill="#ffffff" font-size="14" text-anchor="middle" font-family="system-ui, sans-serif">HomeScreen</text>
  <!-- Flecha -->
  <line x1="210" y1="200" x2="290" y2="200" stroke="#61DAFB" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- ... -->
</svg>
```

### Diagrama de arquitectura en capas

Mostrar la separación:

```
UI (components/screens)
    ↕
State (Zustand stores / TanStack Query)
    ↕
Services (API calls / Axios)
    ↕
Storage (SecureStore / MMKV / AsyncStorage)
```

### Comparativa iOS vs Android

Dos columnas con los mismos componentes mostrando diferencias visuales:

- Columna izquierda: iOS
- Columna derecha: Android
- Fila central: código React Native compartido

### Diagrama de ciclo de vida / secuencia

Timeline izquierda→derecha con pasos numerados y actores (App, API, Store).

## Reglas de vinculación (obligatorio)

Todo SVG creado debe estar vinculado en al menos un archivo de teoría o práctica:

```markdown
![Descripción accesible del diagrama](../0-assets/nombre-del-diagrama.svg)
```

Nombrar descriptivamente en kebab-case:

- ✅ `navigation-stack-flow.svg`
- ✅ `zustand-store-lifecycle.svg`
- ✅ `jwt-auth-flow.svg`
- ❌ `diagrama1.svg`
- ❌ `image.svg`

## Accesibilidad

Incluir siempre `<title>` y `<desc>` en el SVG raíz:

```svg
<svg ...>
  <title>Diagrama del Stack Navigator de React Navigation</title>
  <desc>Flujo de pantallas en un Stack Navigator: HomeScreen → DetailScreen → EditScreen</desc>
  <!-- contenido -->
</svg>
```

## Instrucciones para el agente

1. Crear el SVG en `bootcamp/week-XX/0-assets/nombre-descriptivo.svg`
2. Aplicar estrictamente la paleta de colores — NO usar degradés bajo ninguna circunstancia
3. Fuente `system-ui, -apple-system, sans-serif` en todos los textos
4. Incluir `<title>` y `<desc>` para accesibilidad
5. Verificar que el SVG sea válido (tags cerrados, atributos con comillas)
6. Indicar en qué archivo de teoría o práctica debe vincularse el SVG generado
7. Proporcionar el snippet markdown de vinculación listo para copiar

## Descripción del diagrama a crear

$input
