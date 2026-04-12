// ============================================
// SCREEN: SettingsScreen
// Push token + toggle de notificaciones del sistema
// ============================================

import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, RADII } from '../theme';
import { useNotifications } from '../hooks/useNotifications';

export function SettingsScreen(): React.JSX.Element {
  const { pushToken, permissionGranted, isPhysicalDevice, registerForPush } =
    useNotifications();

  async function handleRegister(): Promise<void> {
    await registerForPush();
  }

  function handleShowToken(): void {
    if (!pushToken) {
      Alert.alert('Sin token', 'Primero registra el dispositivo.');
      return;
    }
    // Mostrar el token completo en un Alert para copiarlo
    Alert.alert('Expo Push Token', pushToken, [{ text: 'OK' }]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Estado del dispositivo</Text>

      {/* Device type */}
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Tipo</Text>
        <Text
          style={[
            styles.rowValue,
            { color: isPhysicalDevice ? COLORS.success : COLORS.warning },
          ]}
        >
          {isPhysicalDevice ? '📱 Dispositivo físico' : '💻 Simulador'}
        </Text>
      </View>

      {/* Permission status */}
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Permisos</Text>
        <Text
          style={[
            styles.rowValue,
            { color: permissionGranted ? COLORS.success : COLORS.danger },
          ]}
        >
          {permissionGranted ? '✅ Concedidos' : '❌ Sin permisos'}
        </Text>
      </View>

      {/* Push token */}
      <View style={styles.tokenBox}>
        <Text style={styles.rowLabel}>Expo Push Token</Text>
        <Text style={styles.tokenText} numberOfLines={3}>
          {pushToken ?? 'No registrado — presiona el botón abajo'}
        </Text>
      </View>

      {/* Register button */}
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          {permissionGranted ? 'Actualizar token' : 'Registrar para push'}
        </Text>
      </Pressable>

      {pushToken && (
        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleShowToken}
        >
          <Text style={styles.buttonText}>Ver token completo</Text>
        </Pressable>
      )}

      {/* Info box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Sobre el Push Token</Text>
        <Text style={styles.infoText}>
          El Expo Push Token identifica tu app en este dispositivo.{'\n\n'}
          Formato: ExponentPushToken[...]{'\n\n'}
          Para recibir push reales desde un servidor, envía este token a tu
          backend al iniciar sesión.{'\n\n'}
          {!isPhysicalDevice &&
            '⚠️ Los push tokens NO funcionan en simuladores. Prueba en un dispositivo físico.'}
        </Text>
      </View>
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
  sectionTitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.sm,
  },
  row: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.sm,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  tokenBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  tokenText: {
    color: COLORS.warning,
    fontSize: 11,
    fontFamily: 'monospace',
    marginTop: 6,
    lineHeight: 18,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADII.md,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  infoTitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 20,
  },
});
