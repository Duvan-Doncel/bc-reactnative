import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { theme } from '../theme';
import type { DomainItem } from '../types';

// Umbral (en px) a partir del cual el swipe se considera una acción
const SWIPE_THRESHOLD = 120;

interface SwipeableCardProps {
  item: DomainItem;
  onSwipeRight?: (item: DomainItem) => void;
  onSwipeLeft?: (item: DomainItem) => void;
  onPress?: (item: DomainItem) => void;
}

// ============================================
// SwipeableCard — Semana 10
// ============================================
// Tarjeta arrastrable con Gesture.Pan.
// Comportamiento esperado:
// - La tarjeta sigue el dedo horizontalmente (y opcionalmente vertical)
// - Si translationX supera SWIPE_THRESHOLD → ejecuta onSwipeRight
// - Si translationX supera -SWIPE_THRESHOLD → ejecuta onSwipeLeft
// - En cualquier otro caso → snap-back con withSpring(0)
// - La tarjeta rota ligeramente según el desplazamiento (interpolate)
//
// Patrón savedTranslation:
// No es necesario aquí porque usamos event.translationX (relativo al inicio del gesto).
// El savedScale sí se necesita en Gesture.Pinch para acumular entre gestos.

export function SwipeableCard({
  item,
  onSwipeRight,
  onSwipeLeft,
  onPress,
}: SwipeableCardProps): React.JSX.Element {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // TODO: Implementa el gesto Pan con las siguientes etapas:
  //
  // const pan = Gesture.Pan()
  //   // onUpdate: mueve la tarjeta con el dedo
  //   .onUpdate((event) => {
  //     translateX.value = event.translationX;
  //     translateY.value = event.translationY * 0.3; // resistencia vertical
  //   })
  //   // onEnd: decide si swipe o snap-back según threshold
  //   .onEnd(() => {
  //     if (translateX.value > SWIPE_THRESHOLD) {
  //       // Swipe a la derecha
  //       if (onSwipeRight) runOnJS(onSwipeRight)(item);
  //       translateX.value = withSpring(0);
  //       translateY.value = withSpring(0);
  //     } else if (translateX.value < -SWIPE_THRESHOLD) {
  //       // Swipe a la izquierda
  //       if (onSwipeLeft) runOnJS(onSwipeLeft)(item);
  //       translateX.value = withSpring(0);
  //       translateY.value = withSpring(0);
  //     } else {
  //       // Snap-back al centro
  //       translateX.value = withSpring(0, { damping: 12, stiffness: 150 });
  //       translateY.value = withSpring(0, { damping: 12, stiffness: 150 });
  //     }
  //   });

  // TODO: Implementa el animated style:
  //
  // const cardStyle = useAnimatedStyle(() => {
  //   const rotate = interpolate(
  //     translateX.value,
  //     [-200, 0, 200],
  //     [-20, 0, 20],
  //     Extrapolation.CLAMP,
  //   );
  //   // Opacidad de los indicadores de dirección
  //   const rightOpacity = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP);
  //   const leftOpacity  = interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP);
  //   return {
  //     transform: [
  //       { translateX: translateX.value },
  //       { translateY: translateY.value },
  //       { rotate: `${rotate}deg` },
  //     ],
  //   };
  // });

  return (
    // TODO: Reemplaza View por GestureDetector + Animated.View + cardStyle
    // <GestureDetector gesture={pan}>
    //   <Animated.View style={[styles.card, cardStyle]}>
    <View style={styles.card}>
      {/* Indicador de swipe derecha */}
      <View style={[styles.swipeIndicator, styles.swipeRight]}>
        <Text style={styles.swipeText}>
          {/* TODO: Cambia el emoji y texto según la acción de tu dominio */}
          {/* Ejemplo Biblioteca: ✅ Prestar */}
          {/* Ejemplo Gymansio: 💪 Completar */}
          ✅ Acción
        </Text>
      </View>

      {/* Indicador de swipe izquierda */}
      <View style={[styles.swipeIndicator, styles.swipeLeft]}>
        <Text style={styles.swipeText}>
          {/* TODO: Cambia el emoji y texto según la acción de tu dominio */}
          {/* Ejemplo Biblioteca: 📚 Lista de espera */}
          {/* Ejemplo Farmacia: ❌ Sin stock */}
          ❌ Descartar
        </Text>
      </View>

      {/* Contenido principal de la tarjeta */}
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    gap: 4,
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    lineHeight: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primaryLight + '22',
    borderRadius: theme.radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  badgeText: {
    color: theme.colors.primaryLight,
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
  swipeIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  swipeRight: {
    left: 0,
    backgroundColor: theme.colors.success + '33',
  },
  swipeLeft: {
    right: 0,
    backgroundColor: theme.colors.danger + '33',
  },
  swipeText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
    textAlign: 'center',
  },
});
