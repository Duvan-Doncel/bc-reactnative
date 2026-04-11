---
description: "Crea un archivo de teoría completo para 1-teoria/ siguiendo la estructura estándar del bootcamp: ~150 líneas, en español, con ejemplos de código en inglés y referencias a docs oficiales."
name: "Nuevo archivo de teoría"
argument-hint: "Semana (ej: week-04), nombre del tema (ej: zustand-estado-global), conceptos clave a cubrir y nivel de dificultad relativo a la semana anterior"
mode: "agent"
---

# Nuevo archivo de teoría — Bootcamp React Native

Crea un archivo de teoría para `1-teoria/` siguiendo los estándares del bootcamp.

## Reglas de extensión

- **Objetivo**: ~150 líneas por archivo
- **Máximo**: 200 líneas — si se supera, dividir en archivos temáticos
- **Mínimo**: 80 líneas para que el contenido sea completo
- Dividir por sub-temas: `01-introduccion.md`, `02-hooks.md`, `03-avanzado.md`

## Convenciones obligatorias

- **Idioma**: español (explicaciones, títulos, comentarios pedagógicos)
- **Código**: inglés (variables, funciones, tipos, componentes)
- **Comentarios de código**: español cuando explican conceptos de aprendizaje
- **Contexto mobile vs web**: señalar diferencias cuando aplique
- **Sin ASCII art**: usar SVG para diagramas (referenciar desde `../0-assets/`)
- **Fuentes oficiales**: enlazar siempre a docs de Expo/RN/biblioteca

## Estructura requerida del archivo

```markdown
# [Título del Tema]

## 🎯 Objetivos

Al finalizar este archivo, comprenderás:

- Concepto 1
- Concepto 2
- Concepto 3

## 📋 Conceptos Clave

### 1. [Primer concepto]

Explicación en español...

> 💡 **Diferencia con React web**: [Si aplica]

\`\`\`tsx
// Explicación del concepto en comentario
// Código con nombres en inglés
function ExampleComponent(): React.JSX.Element {
// ...
}
\`\`\`

### 2. [Segundo concepto]

...

### 3. Ejemplos Prácticos

Caso de uso real de app móvil conocida (Instagram, Uber, Spotify):

\`\`\`tsx
// Ejemplo del mundo real
\`\`\`

### 4. Casos de Uso Móvil

Cuándo usar [concepto] en una app real...

## ⚠️ Errores Comunes

- Error 1: [descripción + cómo evitarlo]
- Error 2: ...

## 📚 Recursos Adicionales

- [Documentación oficial](https://...)
- [Guía de Expo](https://docs.expo.dev/...)

## ✅ Checklist de Verificación

Antes de continuar a las prácticas, verifica que entiendes:

- [ ] Concepto 1
- [ ] Concepto 2
- [ ] Concepto 3
```

## Estilo de los ejemplos de código

Los ejemplos deben ser **educativos**, no solo descriptivos:

```tsx
// ✅ CORRECTO — comenta para enseñar
import { useState } from "react";

// En React Native, useState funciona igual que en React web.
// La diferencia está en los componentes visuales: en vez de <div> usamos <View>,
// en vez de <p> usamos <Text>.
function Counter(): React.JSX.Element {
  // El estado es local a este componente
  const [count, setCount] = useState<number>(0);

  return (
    // View es el equivalente mobile de <div>
    <View style={styles.container}>
      <Text>{count}</Text>
      {/* Pressable reemplaza a <button> — más control táctil */}
      <Pressable onPress={() => setCount((prev) => prev + 1)}>
        <Text>Incrementar</Text>
      </Pressable>
    </View>
  );
}
```

```tsx
// ❌ INCORRECTO — sin comentarios educativos
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
}
```

## Cómo referenciar assets SVG

Si el tema necesita un diagrama, referenciar el SVG de `0-assets/`:

```markdown
![Diagrama del ciclo de vida](../0-assets/lifecycle-diagram.svg)
```

Si el SVG no existe, indicar que debe crearse con el prompt `svg-diagrama`.

## Convenciones de TypeScript en teoría

```tsx
// interfaces para props (sufijo Props)
interface CardProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

// tipo de retorno explícito
export function Card({ title, onPress }: CardProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
}

// hooks tipados
const [user, setUser] = useState<User | null>(null);
```

## Instrucciones para el agente

1. Crear el archivo en `bootcamp/week-XX/1-teoria/nombre-tema.md`
2. Respetar el límite de ~150 líneas — dividir en múltiples archivos si el tema lo requiere
3. Incluir obligatoriamente: Objetivos, Conceptos Clave, Ejemplos Prácticos, Errores Comunes, Recursos, Checklist
4. Todos los ejemplos de código en TypeScript con tipos explícitos
5. Señalar diferencias con React web en al menos un concepto
6. Referenciar documentación oficial de Expo y/o React Native
7. Si el tema requiere diagrama, indicar nombre del SVG a generar con el prompt `svg-diagrama`

## Datos del archivo de teoría a crear

$input
