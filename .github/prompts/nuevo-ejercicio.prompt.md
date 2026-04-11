---
description: "Crea un ejercicio guiado completo con patrón uncomment: README con pasos explicados y starter con código comentado para descomentar. Usar cuando se necesite agregar un ejercicio a 2-practicas/."
name: "Nuevo ejercicio guiado"
argument-hint: "Número de ejercicio, semana (ej: week-03), concepto que enseña, pasos a cubrir y componentes/APIs de RN que usa"
mode: "agent"
---

# Nuevo ejercicio guiado — Bootcamp React Native

Crea un ejercicio de práctica guiada siguiendo el **patrón uncomment** del bootcamp.
Los ejercicios son tutoriales, NO tareas con TODOs.

## Patrón obligatorio: uncomment

El estudiante aprende **descomentando** código ya escrito:

**✅ CORRECTO — código comentado para descomentar:**

```tsx
// ============================================
// PASO 1: Título del paso
// ============================================
console.log("--- Paso 1: Título ---");

// Explicación del concepto en español.
// Descomenta las siguientes líneas:
// const [count, setCount] = useState<number>(0);
//
// function handlePress(): void {
//   setCount(prev => prev + 1);
// }
```

**❌ INCORRECTO — no usar TODOs en ejercicios:**

```tsx
// TODO: Implementar contador
const [count, setCount] = useState(0);
```

> ⚠️ Los ejercicios NO tienen carpeta `solution/`. El estudiante aprende
> descomentando y verificando que la app funcione en simulador.

## Estructura que debes crear

```
2-practicas/ejercicio-XX-nombre/
├── README.md       ← instrucciones paso a paso con ejemplos
└── starter/
    ├── App.tsx     ← código comentado por pasos
    └── package.json ← dependencias exactas con pnpm
```

## Convenciones obligatorias

- **Idioma del README**: español (instrucciones, explicaciones)
- **Idioma del código**: inglés (variables, funciones, tipos, nombres)
- **Comentarios educativos**: español, explican conceptos para devs que vienen de web
- **TypeScript**: tipos explícitos, sin `any`, `React.JSX.Element` en componentes
- **pnpm** exclusivamente, versiones exactas (`"expo": "53.0.0"`, sin `^`)
- **Pasos numerados**: de simple a complejo, progresión didáctica clara
- **console.log** al inicio de cada paso para rastrear ejecución
- **Diferencias mobile vs web**: señalar cuando aplique

## README.md del ejercicio

```markdown
# Ejercicio XX — [Nombre del concepto]

> Descripción breve: qué aprenderá el estudiante.

## 🎯 Objetivos

- Objetivo 1
- Objetivo 2

## 📋 Requisitos

- Expo Go instalado en dispositivo o simulador corriendo
- Semana XX completada

## 🚀 Cómo ejecutar

\`\`\`bash
cd starter
pnpm install
pnpm start
\`\`\`

---

## Paso 1: [Título]

Explicación del concepto en español. Analogía con React web si aplica.

\`\`\`tsx
// Ejemplo explicativo completo (no el código del ejercicio)
\`\`\`

**Abre `starter/App.tsx`** y descomenta la sección `PASO 1`.

✅ **Verifica**: [qué debe pasar en el simulador cuando funciona]

---

## Paso 2: [Título]

...

## ✅ Resultado final

[Descripción de qué debe mostrar la app al final del ejercicio]
```

## App.tsx del starter

Estructura esperada:

```tsx
/**
 * Ejercicio XX — [Nombre]
 * Qué: ...
 * Para qué: ...
 * Impacto: ...
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Imports adicionales comentados para descomentar en cada paso

export default function App(): React.JSX.Element {
  // ============================================
  // PASO 1: [Título]
  // ============================================
  // Explicación del concepto.
  // En React web harías X, en React Native se hace Y porque Z.
  // Descomenta las siguientes líneas:
  // const [value, setValue] = useState<string>('');

  // ============================================
  // PASO 2: [Título]
  // ============================================
  // ...

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejercicio XX</Text>

      {/* ============================================
          PASO 1: [Título]
          Descomenta el componente de abajo:
          ============================================ */}
      {/* <Text style={styles.text}>Valor: {value}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#61DAFB",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});
```

## package.json del starter

Siempre usar versiones exactas con pnpm:

```json
{
  "name": "ejercicio-XX-nombre",
  "version": "1.0.0",
  "main": "App.tsx",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios"
  },
  "dependencies": {
    "expo": "53.0.0",
    "react": "19.0.0",
    "react-native": "0.79.0"
  },
  "devDependencies": {
    "@types/react": "19.0.0",
    "typescript": "5.8.2"
  }
}
```

## Instrucciones para el agente

1. Crear `2-practicas/ejercicio-XX-nombre/README.md` con pasos numerados y ejemplos explicativos
2. Crear `starter/App.tsx` con código organizado por pasos, todo comentado listo para descomentar
3. Crear `starter/package.json` con versiones exactas de Expo SDK 53
4. Verificar que el código descomentado sea TypeScript válido (sin `any`, tipos explícitos)
5. Incluir `console.log` al inicio de cada paso para que el estudiante pueda verificar ejecución
6. Señalar diferencias con React web en los comentarios cuando sea relevante
7. NO crear carpeta `solution/`

## Datos del ejercicio a crear

$input
