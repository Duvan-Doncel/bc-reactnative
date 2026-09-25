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
  const { item } = route.params;

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnim, translateYAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          style={{ opacity: opacityAnim, transform: [{ translateY: translateYAnim }] }}
        >
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Stock disponible</Text>
            <ProgressBar progress={item.progress ?? 0} label="Completado" />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Detalles del producto</Text>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>ID: </Text>
              <Text style={styles.detailValue}>{item.id}</Text>
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Categoría: </Text>
              <Text style={styles.detailValue}>{item.category}</Text>
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Precio: </Text>
              <Text style={styles.detailValue}>${item.price.toLocaleString('es-CO')} COP</Text>
            </Text>
          </View>
        </Animated.View>
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
