import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { RADII } from '../theme';
import type { ViewStyle } from 'react-native';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export function AnimatedCard({
  children,
  onPress,
  style,
}: AnimatedCardProps): React.JSX.Element {
  // TODO: Crear el Animated.Value para la escala.
  // Valor inicial: 1 (tamaño normal)
  // const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    // TODO: Usar Animated.spring para comprimir la card a 0.95.
    // Parámetros sugeridos:
    //   toValue: 0.95
    //   useNativeDriver: true
  };

  const handlePressOut = () => {
    // TODO: Usar Animated.spring para volver a escala 1 con rebote.
    // Parámetros sugeridos:
    //   toValue: 1
    //   tension: 300
    //   friction: 10
    //   useNativeDriver: true
  };

  return (
    // TODO: Reemplazar el View externo por Animated.View con transform: [{ scale: scaleAnim }]
    <View style={[styles.card, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: RADII.lg,
    overflow: 'hidden',
  },
  pressable: {
    padding: 16,
  },
});
