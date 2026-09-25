import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.card, style, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        {children}
      </Pressable>
    </Animated.View>
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
