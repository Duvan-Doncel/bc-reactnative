import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ============================================
// PASO 1: Animated.timing — fade in al montar
// ============================================
// Anima la opacidad de 0 a 1 cuando el componente se monta.
// useNativeDriver: true → la animación corre en el hilo nativo (60 fps).

function FadeInCard(): React.JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Descomenta las siguientes líneas:
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 800,
    //   useNativeDriver: true,
    // }).start();
  }, [fadeAnim]);

  return (
    // Descomenta las siguientes líneas y elimina el View:
    // <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
    //   <Text style={styles.cardTitle}>👋 Hola, Animated.timing</Text>
    //   <Text style={styles.cardSubtitle}>Este fade in usa useNativeDriver: true</Text>
    // </Animated.View>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>👋 Hola, Animated.timing</Text>
      <Text style={styles.cardSubtitle}>Descomenta el Paso 1</Text>
    </View>
  );
}

// ============================================
// PASO 2: Animated.spring — scale feedback
// ============================================
// Al presionar el botón, se comprime a 0.92 y al soltar rebota a 1.
// tension y friction controlan la "rigidez" y "amortiguación" del resorte.

function SpringButton(): React.JSX.Element {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    // Descomenta las siguientes líneas:
    // Animated.spring(scaleAnim, {
    //   toValue: 0.92,
    //   useNativeDriver: true,
    // }).start();
  };

  const handlePressOut = () => {
    // Descomenta las siguientes líneas:
    // Animated.spring(scaleAnim, {
    //   toValue: 1,
    //   tension: 300,
    //   friction: 10,
    //   useNativeDriver: true,
    // }).start();
  };

  return (
    // Descomenta el Animated.View y elimina el View:
    // <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
    //   <Pressable
    //     style={styles.button}
    //     onPressIn={handlePressIn}
    //     onPressOut={handlePressOut}
    //   >
    //     <Text style={styles.buttonText}>💬 Presióname (spring)</Text>
    //   </Pressable>
    // </Animated.View>
    <View>
      <Pressable style={styles.button} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Text style={styles.buttonText}>💬 Presióname (spring) — Paso 2</Text>
      </Pressable>
    </View>
  );
}

// ============================================
// PASO 3: Animated.parallel — fade + slide
// ============================================
// Ambas animaciones (opacity y translateY) inician al mismo tiempo.
// La tarjeta sube desde y=30 a y=0 mientras hace fade in.

function SlideUpFadeCard(): React.JSX.Element {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Descomenta las siguientes líneas:
    // Animated.parallel([
    //   Animated.timing(opacityAnim, {
    //     toValue: 1,
    //     duration: 600,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(translateYAnim, {
    //     toValue: 0,
    //     duration: 600,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  }, [opacityAnim, translateYAnim]);

  return (
    // Descomenta el Animated.View y elimina el View:
    // <Animated.View
    //   style={[
    //     styles.card,
    //     styles.cardBlue,
    //     {
    //       opacity: opacityAnim,
    //       transform: [{ translateY: translateYAnim }],
    //     },
    //   ]}
    // >
    //   <Text style={styles.cardTitle}>⚡ Parallel: fade + slide up</Text>
    //   <Text style={styles.cardSubtitle}>opacity + translateY al mismo tiempo</Text>
    // </Animated.View>
    <View style={[styles.card, styles.cardBlue]}>
      <Text style={styles.cardTitle}>⚡ Parallel — Paso 3</Text>
      <Text style={styles.cardSubtitle}>Descomenta el Paso 3</Text>
    </View>
  );
}

// ============================================
// PASO 4: Animated.sequence — bounce vertical
// ============================================
// La animación SUBE (translateY = -20), espera a que termine,
// y luego BAJA de vuelta (translateY = 0).

function BounceButton(): React.JSX.Element {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const startBounce = () => {
    // Descomenta las siguientes líneas:
    // Animated.sequence([
    //   Animated.timing(bounceAnim, {
    //     toValue: -20,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(bounceAnim, {
    //     toValue: 0,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  };

  return (
    // Descomenta el Animated.View y elimina el View:
    // <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
    //   <Pressable style={[styles.button, styles.buttonGreen]} onPress={startBounce}>
    //     <Text style={styles.buttonText}>🔔 Bounce (sequence)</Text>
    //   </Pressable>
    // </Animated.View>
    <View>
      <Pressable style={[styles.button, styles.buttonGreen]} onPress={startBounce}>
        <Text style={styles.buttonText}>🔔 Bounce (sequence) — Paso 4</Text>
      </Pressable>
    </View>
  );
}

// ============================================
// App principal
// ============================================
export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Week 09 — Ejercicio 01</Text>
      <Text style={styles.subheader}>timing · spring · parallel · sequence</Text>

      <FadeInCard />
      <SpringButton />
      <SlideUpFadeCard />
      <BounceButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    gap: 16,
  },
  header: {
    color: '#61DAFB',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subheader: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  cardBlue: {
    backgroundColor: '#1e3a5f',
  },
  cardTitle: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: '#16a34a',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
