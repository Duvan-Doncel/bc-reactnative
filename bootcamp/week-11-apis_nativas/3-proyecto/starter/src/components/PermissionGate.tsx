import React from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { PermissionResponse } from 'expo-camera';
import { COLORS, RADII, SPACING } from '../theme';

// ============================================
// COMPONENT: PermissionGate
// ============================================
// Componente reutilizable que abstrae el flujo de permisos.
// Muestra diferentes UI según el estado del permiso:
// - null     → loading spinner (aún verificando)
// - !granted → pantalla de solicitud de permiso
// - granted  → renderiza los children normalmente
//
// Funciona con cualquier tipo de permiso (cámara, ubicación, etc.)
// siempre que el objeto tenga la forma PermissionResponse de Expo.

interface PermissionGateProps {
  /**
   * El objeto permiso devuelto por useCameraPermissions()
   * o construido manualmente ({ granted: boolean }).
   * null = aún cargando.
   */
  permission: PermissionResponse | { granted: boolean } | null;

  /** Función para solicitar el permiso (se usa en el botón). */
  onRequest: () => void;

  /** Descripción del permiso para mostrar al usuario. */
  description?: string;

  /** Título de la pantalla de solicitud. */
  title?: string;

  /** Contenido a mostrar cuando el permiso está concedido. */
  children: React.ReactNode;
}

export function PermissionGate({
  permission,
  onRequest,
  description = 'Necesitamos este permiso para continuar.',
  title = 'Permiso requerido',
  children,
}: PermissionGateProps): React.JSX.Element {
  // Estado: cargando (null)
  if (permission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={COLORS.primary} size="large" />
        <Text style={styles.loadingText}>Verificando permisos...</Text>
      </View>
    );
  }

  // Estado: permiso no concedido
  if (!permission.granted) {
    // 'canAskAgain' solo existe en PermissionResponse completo (expo-camera/expo-location)
    const canAskAgain = 'canAskAgain' in permission ? permission.canAskAgain : true;

    return (
      <View style={styles.center}>
        <Text style={styles.lockIcon}>🔒</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {canAskAgain ? (
          <TouchableOpacity style={styles.button} onPress={onRequest}>
            <Text style={styles.buttonText}>Conceder permiso</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.deniedNote}>
              El permiso fue denegado. Debes habilitarlo manualmente en Configuración.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.settingsButton]}
              onPress={() => Linking.openSettings()}
            >
              <Text style={styles.buttonText}>Abrir Configuración</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  // Estado: permiso concedido → renderizar contenido
  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg,
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  lockIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.md,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: SPACING.sm,
  },
  settingsButton: {
    backgroundColor: COLORS.warning,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  deniedNote: {
    color: COLORS.danger,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingText: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: SPACING.sm,
  },
});
