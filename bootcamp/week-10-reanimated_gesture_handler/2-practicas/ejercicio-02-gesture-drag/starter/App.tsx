import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';

// ============================================
// PASO 1: Tarjeta que sigue el dedo
// ============================================
// Gesture.Pan() captura el movimiento del toque.
// onUpdate se llama en cada frame mientras el dedo se mueve.
// event.translationX/Y = desplazamiento desde el inicio del gesto (en px).
// Este callback es un worklet (corre en el hilo UI).

// ============================================
// PASO 2: Snap-back con withSpring
// ============================================
// onEnd se llama cuando el dedo se levanta.
// Animar de vuelta a 0 con withSpring da efecto de rebote natural.
// damping controla la amortiguación; stiffness controla la rigidez.

// ============================================
// PASO 3: Rotación dinámica con interpolate
// ============================================
// interpolate mapea offsetX (−150 a +150 px) a rotación (−18 a +18 grados).
// Extrapolation.CLAMP evita que la rotación supere el rango definido.
// Múltiples transforms se encadenan en el mismo array.

// ============================================
// PASO 4: Feedback de estado con runOnJS
// ============================================
// Los worklets no pueden llamar setState directamente.
// runOnJS(setState)(newValue) es el puente UI thread → JS thread.

export default function App(): React.JSX.Element {
  // Estado React que indica si se está arrastrando la tarjeta
  const [isDragging, setIsDragging] = useState(false);

  // Valores compartidos entre hilo JS y hilo UI
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // ---- Paso 1: definir el gesto Pan ----
  // Descomenta las siguientes líneas:
  // const pan = Gesture.Pan()
  //   .onUpdate((event) => {
  //     offsetX.value = event.translationX;
  //     offsetY.value = event.translationY;
  //   });

  // ---- Paso 2: agregar snap-back en onEnd ----
  // Reemplaza el pan del Paso 1 con este:
  // const pan = Gesture.Pan()
  //   .onUpdate((event) => {
  //     offsetX.value = event.translationX;
  //     offsetY.value = event.translationY;
  //   })
  //   .onEnd(() => {
  //     offsetX.value = withSpring(0, { damping: 10, stiffness: 120 });
  //     offsetY.value = withSpring(0, { damping: 10, stiffness: 120 });
  //   });

  // ---- Paso 4: agregar runOnJS para actualizar estado ----
  // Reemplaza el pan anterior con este:
  // const pan = Gesture.Pan()
  //   .onBegin(() => {
  //     runOnJS(setIsDragging)(true);
  //   })
  //   .onUpdate((event) => {
  //     offsetX.value = event.translationX;
  //     offsetY.value = event.translationY;
  //   })
  //   .onEnd(() => {
  //     offsetX.value = withSpring(0, { damping: 10, stiffness: 120 });
  //     offsetY.value = withSpring(0, { damping: 10, stiffness: 120 });
  //     runOnJS(setIsDragging)(false);
  //   });

  // ---- Paso 1+2: animated style básico ----
  // Descomenta el animated style:
  // const cardStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: offsetX.value },
  //     { translateY: offsetY.value },
  //   ],
  // }));

  // ---- Paso 3: reemplazar cardStyle con rotación ----
  // Descomenta este animated style (reemplaza el anterior):
  // const cardStyle = useAnimatedStyle(() => {
  //   const rotate = interpolate(
  //     offsetX.value,
  //     [-150, 0, 150],
  //     [-18, 0, 18],
  //     Extrapolation.CLAMP,
  //   );
  //   return {
  //     transform: [
  //       { translateX: offsetX.value },
  //       { translateY: offsetY.value },
  //       { rotate: `${rotate}deg` },
  //     ],
  //   };
  // });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Week 10 — Ejercicio 02</Text>
        <Text style={styles.subheader}>Gesture.Pan · withSpring · interpolate · runOnJS</Text>

        {/* Indicador de estado — Paso 4 */}
        <View style={[styles.badge, isDragging && styles.badgeActive]}>
          <Text style={styles.badgeText}>
            {isDragging ? '✋ Arrastrando...' : '👆 Toca y arrastra la tarjeta'}
          </Text>
        </View>

        {/* Área de juego centrada */}
        <View style={styles.playground}>
          {/* Reemplaza View + estilos estáticos por GestureDetector + Animated.View + cardStyle: */}
          {/* <GestureDetector gesture={pan}> */}
          {/*   <Animated.View style={[styles.card, cardStyle]}> */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🃏 Arrastrable</Text>
            <Text style={styles.cardSub}>Descomenta el código por pasos</Text>
            <Text style={styles.cardSub}>
              offsetX: {offsetX.value.toFixed(0)}px
            </Text>
            <Text style={styles.cardSub}>
              offsetY: {offsetY.value.toFixed(0)}px
            </Text>
          </View>
        </View>

        <View style={styles.hints}>
          <Text style={styles.hintItem}>📌 Paso 1: La tarjeta sigue el dedo</Text>
          <Text style={styles.hintItem}>📌 Paso 2: Snap-back al soltar</Text>
          <Text style={styles.hintItem}>📌 Paso 3: Rotación con interpolate</Text>
          <Text style={styles.hintItem}>📌 Paso 4: Estado vía runOnJS</Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    gap: 14,
  },
  header: {
    color: '#61DAFB',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subheader: {
    color: '#64748b',
    fontSize: 11,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e3a5f',
  },
  badgeText: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  playground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 28,
    gap: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f6',
    width: 220,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontSize: 22,
    fontWeight: '700',
  },
  cardSub: {
    color: '#64748b',
    fontSize: 12,
  },
  hints: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  hintItem: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
