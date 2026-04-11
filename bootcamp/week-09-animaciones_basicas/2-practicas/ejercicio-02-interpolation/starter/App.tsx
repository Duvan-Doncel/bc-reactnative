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
// PASO 1: Spinner con loop + interpolate
// ============================================
// Animated.loop repite la animación indefinidamente.
// interpolate convierte 0→1 en '0deg'→'360deg'.
// useNativeDriver: true → rotate es una transformación nativa.

function SpinnerSection(): React.JSX.Element {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Descomenta las siguientes líneas:
    // Animated.loop(
    //   Animated.timing(spinAnim, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   })
    // ).start();
  }, [spinAnim]);

  // Descomenta las siguientes líneas:
  // const rotate = spinAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Paso 1 — Spinner (loop + rotate)</Text>
      {/* Descomenta y usa rotate en el Animated.View: */}
      {/* <Animated.View style={{ transform: [{ rotate }] }}> */}
      <View>
        <Text style={styles.spinner}>⚙️</Text>
      </View>
      {/* </Animated.View> */}
    </View>
  );
}

// ============================================
// PASO 2 + 3: Barra de progreso (ancho + color)
// ============================================
// useNativeDriver: false → requerido para 'width' y 'backgroundColor'.
// Ambas propiedades son de layout, no de transformación.

function ProgressBarSection(): React.JSX.Element {
  const progressAnim = useRef(new Animated.Value(0)).current;

  const startProgress = () => {
    progressAnim.setValue(0); // reinicia la barra

    // Descomenta las siguientes líneas (PASO 2):
    // Animated.timing(progressAnim, {
    //   toValue: 1,
    //   duration: 2000,
    //   useNativeDriver: false, // ← width y backgroundColor no son nativas
    // }).start();
  };

  // PASO 2 — interpolate de ancho
  // Descomenta las siguientes líneas:
  // const widthInterp = progressAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0%', '100%'],
  //   extrapolate: 'clamp',
  // });

  // PASO 3 — interpolate de color (inputRange con 3 puntos)
  // Descomenta las siguientes líneas:
  // const colorInterp = progressAnim.interpolate({
  //   inputRange: [0, 0.5, 1],
  //   outputRange: ['#ef4444', '#facc15', '#22c55e'],
  //   extrapolate: 'clamp',
  // });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pasos 2+3 — Barra de progreso</Text>
      <View style={styles.progressTrack}>
        {/* Paso 2: Reemplaza el View por Animated.View y usa widthInterp */}
        {/* Paso 3: Agrega colorInterp al backgroundColor */}
        {/* <Animated.View
          style={[
            styles.progressBar,
            {
              width: widthInterp,          // PASO 2
              backgroundColor: colorInterp, // PASO 3
            },
          ]}
        /> */}
        <View style={[styles.progressBar, { width: '0%' }]} />
      </View>
      <Pressable style={styles.button} onPress={startProgress}>
        <Text style={styles.buttonText}>▶ Iniciar progreso</Text>
      </Pressable>
    </View>
  );
}

// ============================================
// PASO 4: Stagger — entrada en cascada
// ============================================
// Animated.stagger(delay, [anims]) inicia cada animación con
// delay acumulativo: item[0] en t=0, item[1] en t=80ms, item[2] en t=160ms, etc.

const LIST_ITEMS = ['Elemento A', 'Elemento B', 'Elemento C', 'Elemento D'];

function StaggerListSection(): React.JSX.Element {
  const itemAnims = useRef(LIST_ITEMS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Descomenta las siguientes líneas:
    // Animated.stagger(
    //   80,
    //   itemAnims.map(anim =>
    //     Animated.timing(anim, {
    //       toValue: 1,
    //       duration: 400,
    //       useNativeDriver: true,
    //     })
    //   )
    // ).start();
  }, [itemAnims]);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Paso 4 — Stagger (cascada)</Text>
      {LIST_ITEMS.map((label, index) => {
        // Descomenta el animated style y cambia View por Animated.View:
        // const animatedStyle = {
        //   opacity: itemAnims[index],
        //   transform: [
        //     {
        //       translateX: itemAnims[index].interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [-20, 0],
        //       }),
        //     },
        //   ],
        // };
        return (
          // Reemplaza View con Animated.View y añade style={animatedStyle}:
          <View key={label} style={styles.listItem}>
            <Text style={styles.listItemText}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

// ============================================
// App principal
// ============================================
export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Week 09 — Ejercicio 02</Text>
      <Text style={styles.subheader}>interpolate · loop · stagger</Text>

      <SpinnerSection />
      <ProgressBarSection />
      <StaggerListSection />
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
  section: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  spinner: {
    fontSize: 40,
    textAlign: 'center',
  },
  progressTrack: {
    height: 18,
    backgroundColor: '#0f172a',
    borderRadius: 9,
    overflow: 'hidden',
  },
  progressBar: {
    height: 18,
    backgroundColor: '#ef4444',
    borderRadius: 9,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  listItem: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  listItemText: {
    color: '#f1f5f9',
    fontSize: 14,
  },
});
