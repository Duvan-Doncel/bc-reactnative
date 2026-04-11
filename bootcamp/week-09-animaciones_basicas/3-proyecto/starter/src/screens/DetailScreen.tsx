import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgressBar } from '../components/ProgressBar';
import { COLORS, SPACING } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export function DetailScreen({ route }: Props): React.JSX.Element {
  const { itemId } = route.params;

  // TODO: Create Animated.Values for the entrance animation.
  // Two values needed:
  //   opacityAnim = useRef(new Animated.Value(0)).current
  //   translateYAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    // TODO: Use Animated.parallel to run fade in + slide up simultaneously.
    //
    // Animated.parallel([
    //   Animated.timing(opacityAnim, {
    //     toValue: 1,
    //     duration: 500,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(translateYAnim, {
    //     toValue: 0,
    //     duration: 500,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  }, []);

  // Simulated item data — replace with useQuery in a real implementation.
  const item = {
    id: itemId,
    name: `Item ${itemId}`,
    description:
      'Esta es la descripción detallada del item. Adapta esta pantalla a tu dominio mostrando la información relevante de cada elemento.',
    progress: 0.72,
    // TODO: Add domain-specific fields
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* TODO: Wrap this View in an Animated.View and apply the entrance animation.
            animated style:
              opacity: opacityAnim,
              transform: [{ translateY: translateYAnim }]
        */}
        <View>
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Progreso</Text>
            <ProgressBar progress={item.progress} label="Completado" />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Detalles técnicos</Text>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>ID: </Text>
              <Text style={styles.detailValue}>{item.id}</Text>
            </Text>
            {/* TODO: Add domain-specific detail rows */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailRow: {
    fontSize: 14,
  },
  detailLabel: {
    color: COLORS.textMuted,
  },
  detailValue: {
    color: COLORS.text,
  },
});
