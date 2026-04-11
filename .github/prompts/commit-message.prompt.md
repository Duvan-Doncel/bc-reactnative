---
description: "Genera un mensaje de commit Conventional Commits con cuerpo pedagógico (What/For/Impact) a partir de los cambios realizados. Usar antes de hacer git commit."
name: "Mensaje de commit"
argument-hint: "Describe brevemente los cambios realizados, o usa #changes para que el agente los analice"
mode: "agent"
---

# Generar mensaje de commit — Bootcamp React Native

Analiza los cambios del workspace y genera un mensaje de commit siguiendo las
convenciones **Conventional Commits** del proyecto con cuerpo pedagógico.

## Formato requerido

```
type(scope): short description in english  ← máx 72 caracteres, sin punto final

For: <razón por la que se necesitaba este cambio>
Impact: <qué habilita o qué afecta este cambio en el bootcamp>
```

**Regla crítica**: la línea de asunto (primera línea) debe estar en **inglés**.
El cuerpo (`For:` / `Impact:`) puede estar en inglés o español.

## Tipos permitidos

| Tipo       | Cuándo usarlo                                         |
| ---------- | ----------------------------------------------------- |
| `feat`     | Nuevo contenido o funcionalidad de semana             |
| `fix`      | Corrección de código, typos o instrucciones erróneas  |
| `docs`     | Solo cambios de documentación (README, teoría)        |
| `style`    | Formato, espacios (sin cambio de lógica)              |
| `refactor` | Reestructuración de contenido sin cambiar aprendizaje |
| `test`     | Agregar o corregir ejercicios/proyectos con tests     |
| `chore`    | Mantenimiento, configuración, assets                  |
| `ci`       | Cambios en GitHub Actions / workflows                 |
| `perf`     | Mejoras de rendimiento en código de ejemplos          |

## Scopes del proyecto

| Scope      | Uso                                                |
| ---------- | -------------------------------------------------- |
| `week-XX`  | Contenido de una semana específica (ej. `week-01`) |
| `teoria`   | Archivos de teoría (1-teoria/)                     |
| `practica` | Ejercicios guiados (2-practicas/)                  |
| `proyecto` | Proyecto semanal (3-proyecto/)                     |
| `recursos` | Recursos adicionales (4-recursos/)                 |
| `glosario` | Glosario de términos (5-glosario/)                 |
| `assets`   | Recursos visuales (SVG, imágenes)                  |
| `github`   | Configuración de .github/ (prompts, workflows)     |
| `vscode`   | Configuración de .vscode/                          |
| `docs`     | Documentación general (docs/)                      |
| `rubrica`  | Rúbricas de evaluación                             |
| `deps`     | Dependencias de proyectos starter/solution         |

## Ejemplos del proyecto

```bash
# Nuevo contenido de semana
feat(week-01): add core components theory and FlatList practice

For: Week 01 was missing theory files and the guided FlatList exercise
Impact: Students can now learn View, Text, Image and FlatList with uncomment exercises

# Corrección de código en ejercicio
fix(practica): fix keyExtractor type in FlatList exercise step 3

For: The keyExtractor was returning a number instead of string, causing TS error
Impact: Exercise now compiles without errors on RN 0.79+

# Asset SVG
feat(assets): add navigation-stack-flow diagram for week-03

For: Visual diagram helps students understand Stack navigator lifecycle
Impact: Theory file now links to the SVG for a clearer mental model

# Rúbrica de evaluación
feat(rubrica): add week-05 evaluation rubric with 30/40/30 breakdown

For: Instructors need clear criteria to evaluate Zustand stores
Impact: Consistent grading across groups using different domains

# Mantenimiento de configuración
chore(github): add nueva-semana.prompt.md for week scaffolding

For: Speed up week creation by providing a standard Copilot prompt
Impact: Instructors can scaffold a full week structure in one command
```

## Instrucciones para el agente

1. Analizar los cambios realizados en el workspace (archivos modificados, creados o eliminados)
2. Determinar el tipo y scope más apropiados según las tablas anteriores
3. Redactar la línea de asunto en inglés, en tiempo imperativo ("add", "fix", "update"), máx 72 chars
4. Completar `For:` con la motivación del cambio (por qué era necesario)
5. Completar `Impact:` con el efecto concreto en el bootcamp o en los estudiantes
6. Si hay múltiples cambios independientes, sugerir separarlos en commits distintos
7. Presentar el mensaje listo para copiar/pegar

## Cambios a describir

$input
