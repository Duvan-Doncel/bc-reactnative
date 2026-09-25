import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, RADII } from '../theme';

interface AnimatedButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'success';
}

export function AnimatedButton({
  label,
  onPress,
  variant = 'primary',
}: AnimatedButtonProps): React.JSX.Element {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.96,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 400,
      friction: 12,
      useNativeDriver: true,
    }).start();
  };

  const bgColor =
    variant === 'success' ? COLORS.success : COLORS.primary;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[styles.button, { backgroundColor: bgColor }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: RADII.md,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  label: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
