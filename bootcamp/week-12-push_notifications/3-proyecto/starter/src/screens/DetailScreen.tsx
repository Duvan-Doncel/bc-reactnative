// ============================================
// SCREEN: DetailScreen
// Detalle de un item + gestión de recordatorio
// ============================================
// NOTA PARA EL APRENDIZ:
// Adapta esta pantalla a tu dominio asignado.
// El botón "Programar recordatorio" debe usar una fecha/hora
// relevante para tu dominio (fecha próxima dosis, fecha devol., etc.)

import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, RADII } from '../theme';
import { RootStackParamList } from '../types/navigation';
import { Item } from '../types';
import { useNotifications } from '../hooks/useNotifications';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

// En una app real, esto vendría de un store Zustand o TanStack Query
const SAMPLE_ITEMS: Record<string, Item> = {
  '1': { id: '1', name: 'Item 1 — adaptar al dominio', scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
  '2': { id: '2', name: 'Item 2 — adaptar al dominio', scheduledAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() },
  '3': { id: '3', name: 'Item 3 — sin recordatorio' },
};

export function DetailScreen({ route }: Props): React.JSX.Element {
  const { itemId } = route.params;
  const item = SAMPLE_ITEMS[itemId];

  const [localNotifId, setLocalNotifId] = useState<string | null>(
    item?.notificationId ?? null,
  );

  const { scheduleReminder, cancelReminder } = useNotifications();

  async function handleScheduleReminder(): Promise<void> {
    if (!item) return;

    // TODO: Calcular cuántos segundos quedan hasta el evento del dominio
    // Ejemplo: si item.scheduledAt está en el futuro
    // const secondsUntil = Math.floor(
    //   (new Date(item.scheduledAt!).getTime() - Date.now()) / 1000 - 3600
    // );
    // if (secondsUntil <= 0) { Alert.alert('...'); return; }
    const secondsUntil = 10; // Demo: 10 segundos para probar

    // TODO: Personalizar el contenido de la notificación según el dominio
    const notifId = await scheduleReminder(
      item.id,
      `Recordatorio: ${item.name}`,
      'Tienes un evento próximo en tu app.', // Adaptar al dominio
      secondsUntil,
    );

    if (notifId) {
      setLocalNotifId(notifId);
      Alert.alert('✅ Recordatorio programado', `Recibirás una notificación en ${secondsUntil} segundos.`);
    }
  }

  async function handleCancelReminder(): Promise<void> {
    if (!localNotifId) return;
    await cancelReminder(localNotifId);
    setLocalNotifId(null);
    Alert.alert('Cancelado', 'Recordatorio eliminado.');
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Item info */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{item.name}</Text>

        {item.scheduledAt && (
          <>
            <Text style={styles.label}>Fecha programada</Text>
            <Text style={styles.value}>
              {new Date(item.scheduledAt).toLocaleString('es')}
            </Text>
          </>
        )}

        {/* TODO: Mostrar propiedades adicionales del dominio */}
        {/* Ejemplo (Biblioteca):
        <Text style={styles.label}>Autor</Text>
        <Text style={styles.value}>{item.author}</Text> */}
      </View>

      {/* Notification status */}
      <View style={styles.notifCard}>
        <View style={styles.notifRow}>
          <Text style={styles.notifLabel}>Estado del recordatorio</Text>
          <View
            style={[
              styles.notifDot,
              { backgroundColor: localNotifId ? COLORS.success : COLORS.border },
            ]}
          />
        </View>
        <Text style={styles.notifStatus}>
          {localNotifId ? '🔔 Recordatorio activo' : '🔕 Sin recordatorio'}
        </Text>
      </View>

      {/* Actions */}
      {!localNotifId ? (
        <Pressable style={styles.button} onPress={handleScheduleReminder}>
          <Text style={styles.buttonText}>Programar recordatorio</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, styles.buttonDanger]}
          onPress={handleCancelReminder}
        >
          <Text style={styles.buttonText}>Cancelar recordatorio</Text>
        </Pressable>
      )}

      {/* Hint */}
      <Text style={styles.hint}>
        Demo: el recordatorio se dispara en 10 segundos.{'\n'}
        Adapta el tiempo real al evento de tu dominio.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 2,
    marginTop: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  notifCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  notifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notifLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  notifDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  notifStatus: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADII.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 15,
  },
  hint: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: SPACING.sm,
  },
  errorText: {
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: SPACING.xl,
    fontSize: 16,
  },
});
