import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolation,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

// ============================================
// PASO 1: Fade in con withTiming
// ============================================
// useSharedValue(0) → equivale a useRef(new Animated.Value(0)).current
// opacity.value = withTiming(1) → anima en lugar de asignar directamente
// useAnimatedStyle corre en el hilo UI (worklet)

function FadeInCard(): React.JSX.Element {
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Descomenta la siguiente línea:
    // opacity.value = withTiming(1, { duration: 700 });
  }, [opacity]);

  // Descomenta el animated style:
  // const animStyle = useAnimatedStyle(() => ({
  //   opacity: opacity.value,
  // }));

  return (
    // Reemplaza View por Animated.View y usa animStyle:
    // <Animated.View style={[styles.card, animStyle]}>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>👋 Paso 1 — withTiming</Text>
      <Text style={styles.cardSub}>Descomenta el código del Paso 1</Text>
    </View>
  );
}

// ============================================
// PASO 2: Tap feedback con Gesture.Tap + withSpring
// ============================================
// Parámetros de spring en Reanimated 3: damping y stiffness
// (no friction y tension como en el Animated API clásico)

function SpringTapButton(): React.JSX.Element {
  const scale = useSharedValue(1);

  // Descomenta el gesto tap:
  // const tap = Gesture.Tap()
  //   .onBegin(() => {
  //     scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  //   })
  //   .onFinalize(() => {
  //     scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  //   });

  // Descomenta el animated style:
  // const animStyle = useAnimatedStyle(() => ({
  //   transform: [{ scale: scale.value }],
  // }));

  return (
    // Reemplaza View y Pressable por GestureDetector + Animated.View:
    // <GestureDetector gesture={tap}>
    //   <Animated.View style={[styles.button, animStyle]}>
    //     <Text style={styles.buttonText}>💬 Tócame (spring) — Paso 2</Text>
    //   </Animated.View>
    // </GestureDetector>
    <View style={styles.button}>
      <Text style={styles.buttonText}>💬 Paso 2 — Descomenta el Gesture.Tap</Text>
    </View>
  );
}

// ============================================
// PASO 3: Spinner con withRepeat + interpolate
// ============================================
// withRepeat(animation, -1, false) → repite infinitamente sin inversión
// Extrapolation.CLAMP ≡ extrapolate: 'clamp' del Animated API

function SpinnerSection(): React.JSX.Element {
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Descomenta las siguientes líneas:
    // rotation.value = withRepeat(
    //   withTiming(1, { duration: 900, easing: Easing.linear }),
    //   -1,
    //   false,
    // );
  }, [rotation]);

  // Descomenta el animated style:
  // const animStyle = useAnimatedStyle(() => {
  //   const rotate = interpolate(
  //     rotation.value,
  //     [0, 1],
  //     [0, 360],
  //     Extrapolation.CLAMP,
  //   );
  //   return { transform: [{ rotate: `${rotate}deg` }] };
  // });

  return (
    <View style={styles.section}>
      <Text style={styles.cardSub}>Paso 3 — withRepeat (spinner)</Text>
      {/* Reemplaza View por Animated.View con animStyle: */}
      {/* <Animated.View style={animStyle}> */}
      <View>
        <Text style={styles.spinner}>⚙️</Text>
      </View>
    </View>
  );
}

// ============================================
// PASO 4: Bounce con withSequence
// ============================================
// withSequence ejecuta las animaciones en serie (una tras otra).
// runOnJS permite llamar funciones JS desde el hilo UI.

function BounceSection(): React.JSX.Element {
  const bounceY = useSharedValue(0);

  const doBounce = () => {
    // Descomenta las siguientes líneas:
    // bounceY.value = withSequence(
    //   withSpring(-22, { damping: 6, stiffness: 250 }),
    //   withSpring(0,   { damping: 8, stiffness: 180 }),
    // );
  };

  // Descomenta el gesto y el animated style:
  // const tap = Gesture.Tap().onEnd(() => runOnJS(doBounce)());
  // const animStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: bounceY.value }],
  // }));

  return (
    <View style={styles.section}>
      <Text style={styles.cardSub}>Paso 4 — withSequence</Text>
      {/* Reemplaza View por GestureDetector + Animated.View: */}
      {/* <GestureDetector gesture={tap}> */}
      {/*   <Animated.View style={[styles.bounceBox, animStyle]}> */}
      <View style={styles.bounceBox}>
        <Text style={styles.cardTitle}>🔔 Toca para bounce (Paso 4)</Text>
      </View>
    </View>
  );
}

// ============================================
// App principal
// ============================================
// GestureHandlerRootView es obligatorio para que los gestos funcionen.
// Sin esto, los gestos fallan silenciosamente en iOS y crashean en Android.

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Week 10 — Ejercicio 01</Text>
        <Text style={styles.subheader}>useSharedValue · withTiming · withSpring · withRepeat · withSequence</Text>

        <FadeInCard />
        <SpringTapButton />
        <SpinnerSection />
        <BounceSection />
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
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '600',
  },
  cardSub: {
    color: '#64748b',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  spinner: {
    fontSize: 40,
  },
  bounceBox: {
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
});
