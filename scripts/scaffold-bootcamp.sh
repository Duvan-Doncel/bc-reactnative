#!/usr/bin/env bash
# ============================================================
# scaffold-bootcamp.sh
# Genera la estructura completa de las 18 semanas del bootcamp.
# Solo crea archivos si no existen (idempotente).
# Uso: bash scripts/scaffold-bootcamp.sh
# ============================================================
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE="$REPO_ROOT/bootcamp"

echo ""
echo "🚀 Scaffold bc-reactnative Bootcamp — 18 semanas"
echo "   Destino: $BASE"
echo ""

# ─── Datos de semanas (índice 1..18, índice 0 vacío) ────────────────────────
NUMS=(   ""   "01" "02" "03" "04" "05" "06" "07" "08" "09"
                "10" "11" "12" "13" "14" "15" "16" "17" "18")

SLUGS=(  ""
  "core_components_y_flexbox"
  "listas_inputs_y_estilos"
  "react_navigation"
  "estado_global_zustand"
  "networking_tanstack_query"
  "formularios_validacion"
  "persistencia_local"
  "autenticacion"
  "animaciones_basicas"
  "reanimated_gesture_handler"
  "apis_nativas"
  "push_notifications"
  "testing"
  "performance"
  "eas_build"
  "app_store_google_play"
  "cicd_ota_updates"
  "proyecto_final"
)

TITLES=( ""
  "Core Components y Flexbox"
  "Listas, Inputs y Estilos"
  "React Navigation 7"
  "Estado Global con Zustand"
  "Networking y TanStack Query v5"
  "Formularios con React Hook Form + Zod"
  "Persistencia Local"
  "Autenticación Completa"
  "Animaciones Básicas"
  "Reanimated 3 y Gesture Handler"
  "APIs Nativas — Cámara, Ubicación y Permisos"
  "Push Notifications"
  "Testing — Jest, RNTL y Maestro"
  "Performance y Optimización"
  "EAS Build y Certificados"
  "App Store y Google Play Console"
  "CI/CD y OTA Updates"
  "Proyecto Final Integrador"
)

PHASES=( ""
  "Fase 1 — Fundamentos RN"
  "Fase 1 — Fundamentos RN"
  "Fase 2 — Core RN"
  "Fase 2 — Core RN"
  "Fase 2 — Core RN"
  "Fase 2 — Core RN"
  "Fase 2 — Core RN"
  "Fase 2 — Core RN"
  "Fase 3 — Avanzado"
  "Fase 3 — Avanzado"
  "Fase 3 — Avanzado"
  "Fase 3 — Avanzado"
  "Fase 3 — Avanzado"
  "Fase 3 — Avanzado"
  "Fase 4 — Producción"
  "Fase 4 — Producción"
  "Fase 4 — Producción"
  "Fase 4 — Producción"
)

# ─── Loop principal ──────────────────────────────────────────────────────────
for I in {1..18}; do
  NUM="${NUMS[$I]}"
  SLUG="${SLUGS[$I]}"
  TITLE="${TITLES[$I]}"
  PHASE="${PHASES[$I]}"

  WEEK_DIR="$BASE/week-${NUM}-${SLUG}"
  echo "  → week-${NUM}: $TITLE"

  # 1. Directorios
  mkdir -p \
    "$WEEK_DIR/0-assets" \
    "$WEEK_DIR/1-teoria" \
    "$WEEK_DIR/2-practicas" \
    "$WEEK_DIR/3-proyecto/starter/src/screens" \
    "$WEEK_DIR/3-proyecto/starter/src/components" \
    "$WEEK_DIR/4-recursos/ebooks-free" \
    "$WEEK_DIR/4-recursos/videografia" \
    "$WEEK_DIR/4-recursos/webgrafia" \
    "$WEEK_DIR/5-glosario"

  # 2. .gitkeep para directorios sin contenido aún
  for D in \
    "$WEEK_DIR/0-assets" \
    "$WEEK_DIR/1-teoria" \
    "$WEEK_DIR/2-practicas" \
    "$WEEK_DIR/3-proyecto/starter/src/screens" \
    "$WEEK_DIR/3-proyecto/starter/src/components" \
    "$WEEK_DIR/4-recursos/ebooks-free" \
    "$WEEK_DIR/4-recursos/videografia" \
    "$WEEK_DIR/4-recursos/webgrafia"; do
    touch "$D/.gitkeep"
  done

  # 3. Navigation links
  if [[ $I -gt 1 ]]; then
    PREV_NUM="${NUMS[$((I-1))]}"
    PREV_SLUG="${SLUGS[$((I-1))]}"
    PREV_TITLE="${TITLES[$((I-1))]}"
    PREV_LINK="[← Semana ${PREV_NUM} — ${PREV_TITLE}](../week-${PREV_NUM}-${PREV_SLUG}/README.md)"
  else
    PREV_LINK="← (primera semana)"
  fi
  if [[ $I -lt 18 ]]; then
    NEXT_NUM="${NUMS[$((I+1))]}"
    NEXT_SLUG="${SLUGS[$((I+1))]}"
    NEXT_TITLE="${TITLES[$((I+1))]}"
    NEXT_LINK="[Semana ${NEXT_NUM} — ${NEXT_TITLE} →](../week-${NEXT_NUM}-${NEXT_SLUG}/README.md)"
  else
    NEXT_LINK="(última semana) →"
  fi

  # 4. README.md principal
  [[ -f "$WEEK_DIR/README.md" ]] || cat > "$WEEK_DIR/README.md" << ENDOFREADME
# Semana ${NUM} — ${TITLE}

> **${PHASE}** | Semana ${I} de 18 | ⏱️ 8 horas

## 🎯 Objetivos de aprendizaje

> 🚧 **Contenido en desarrollo.** Usa el prompt \`nueva-semana\` para generar el contenido completo.

Al finalizar esta semana, el estudiante será capaz de:

- [ ] Objetivo 1
- [ ] Objetivo 2
- [ ] Objetivo 3

## 📚 Requisitos previos

- Semana anterior completada
- Expo Go instalado y simulador configurado

## 🗂️ Estructura de la semana

| Carpeta           | Contenido                    | Tiempo |
| ----------------- | ---------------------------- | ------ |
| \`1-teoria/\`       | Material teórico             | 2h     |
| \`2-practicas/\`    | Ejercicios guiados           | 4h     |
| \`3-proyecto/\`     | Proyecto integrador          | 2h     |

## 📝 Contenidos

### Teoría

> 🚧 Por generar — usa el prompt \`nueva-teoria\`

### Prácticas

> 🚧 Por generar — usa el prompt \`nuevo-ejercicio\`

### Proyecto

> 🚧 Por generar — usa el prompt \`nuevo-proyecto\`

## ⏱️ Distribución del tiempo (8 horas)

| Actividad  | Tiempo | Descripción                |
| ---------- | ------ | -------------------------- |
| Teoría     | 2h     | Lectura y ejemplos         |
| Prácticas  | 4h     | Ejercicios guiados         |
| Proyecto   | 2h     | Implementación propia      |

## 📌 Entregables

- [ ] Ejercicios completados (prácticas descomentadas y funcionando)
- [ ] Proyecto adaptado al dominio asignado
- [ ] App corriendo en simulador iOS y/o Android

## 🔗 Navegación

${PREV_LINK} | ${NEXT_LINK}
ENDOFREADME

  # 5. rubrica-evaluacion.md
  [[ -f "$WEEK_DIR/rubrica-evaluacion.md" ]] || cat > "$WEEK_DIR/rubrica-evaluacion.md" << ENDOFRUBRICA
# Rúbrica de Evaluación — Semana ${NUM}

> 🚧 **Contenido en desarrollo.** Usa el prompt \`nueva-semana\` para generar la rúbrica completa.

## Distribución de Puntaje

| Tipo de Evidencia    | Peso | Instrumento             |
| -------------------- | ---- | ----------------------- |
| Conocimiento 🧠      | 30%  | Cuestionario teórico    |
| Desempeño 💪         | 40%  | Ejercicios en clase     |
| Producto 📦          | 30%  | Proyecto entregable     |

**Mínimo aprobatorio**: 70% en cada tipo de evidencia.

## 🧠 Conocimiento (30%)

> Criterios específicos de *${TITLE}* — por definir.

## 💪 Desempeño (40%)

> Criterios de ejercicios prácticos — por definir.

## 📦 Producto (30%)

> Criterios del proyecto adaptado al dominio — por definir.

### Criterios transversales

- ✅ Implementación coherente con el dominio asignado
- ✅ Sin copia de implementaciones de otros aprendices
- ✅ App funcional en simulador iOS y/o Android
- ✅ TypeScript sin errores de compilación
ENDOFRUBRICA

  # 6. 3-proyecto/README.md
  [[ -f "$WEEK_DIR/3-proyecto/README.md" ]] || cat > "$WEEK_DIR/3-proyecto/README.md" << ENDOFPROYECTO
# Proyecto Semana ${NUM} — ${TITLE}

> 🚧 **Contenido en desarrollo.** Usa el prompt \`nuevo-proyecto\` para generar el proyecto completo.

## 🎯 Objetivo

Implementar los conceptos de **${TITLE}** aplicados a tu dominio asignado.

## 📋 Tu Dominio Asignado

**Dominio**: [El instructor te asignará tu dominio único al inicio del bootcamp]

> 📌 Recuerda: tu implementación debe ser coherente con tu dominio.
> No copies implementaciones de otros aprendices.

## 🚀 Cómo ejecutar

\`\`\`bash
cd starter
pnpm install
pnpm start
\`\`\`

## 🛠️ Entregables

1. App funcional en simulador iOS y/o Android
2. Código adaptado a tu dominio
3. README actualizado con descripción de tu implementación

## 📊 Criterios de Evaluación

Ver [../../rubrica-evaluacion.md](../../rubrica-evaluacion.md)
ENDOFPROYECTO

  # 7. 5-glosario/README.md
  [[ -f "$WEEK_DIR/5-glosario/README.md" ]] || cat > "$WEEK_DIR/5-glosario/README.md" << ENDOFGLOSARIO
# Glosario — Semana ${NUM}: ${TITLE}

> 🚧 **Contenido en desarrollo.** Usa el prompt \`nueva-semana\` para generar el glosario.

Términos técnicos clave introducidos esta semana, ordenados alfabéticamente.

---

> 📚 Glosario global del bootcamp: [docs/glosario-global.md](../../docs/glosario-global.md)
ENDOFGLOSARIO

done

echo ""
echo "✅ Scaffold completo — 18 semanas generadas en bootcamp/"
echo ""
ls "$BASE"
