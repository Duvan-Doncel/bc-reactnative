// src/screens/SettingsScreen.tsx
// Preferencias persistidas con MMKV (vía usePreferences)
// y un dato sensible del dominio persistido con Expo SecureStore.

import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { usePreferences } from '../hooks/usePreferences';

// Dato sensible del dominio mercado campesino: código de acceso del vendedor
const SENSITIVE_KEY = 'vendor_access_code';
const DANGER_COLOR = '#ef4444';

export function SettingsScreen(): React.JSX.Element {
  const {
    sortOrder,
    setSortOrder,
    compactMode,
    setCompactMode,
    itemsPerPage,
    setItemsPerPage,
  } = usePreferences();

  const [code, setCode] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleSaveSensitive(): Promise<void> {
    if (code.trim().length < 4) {
      setStatus('El código debe tener mínimo 4 caracteres');
      return;
    }
    try {
      await SecureStore.setItemAsync(SENSITIVE_KEY, code.trim());
      setCode('');
      setStatus('✅ Código guardado de forma segura');
    } catch (error) {
      console.log('Error guardando en SecureStore:', error);
      setStatus('No se pudo guardar el código');
    }
  }

  async function handleReadSensitive(): Promise<void> {
    try {
      const value = await SecureStore.getItemAsync(SENSITIVE_KEY);
      // Nunca mostramos el valor, solo confirmamos si existe
      setStatus(
        value ? '🔒 Hay un código guardado (oculto)' : 'No hay código guardado aún',
      );
    } catch (error) {
      console.log('Error leyendo de SecureStore:', error);
      setStatus('No se pudo leer el código');
    }
  }

  async function handleDeleteSensitive(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SENSITIVE_KEY);
      setStatus('🗑️ Código eliminado');
    } catch (error) {
      console.log('Error eliminando de SecureStore:', error);
      setStatus('No se pudo eliminar el código');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Preferencias de la app</Text>
      <Text style={styles.sectionHint}>
        Estos valores se guardan con MMKV y cambian en tiempo real, sin botón de guardar.
      </Text>

      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel}>Modo compacto</Text>
          <Text style={styles.rowDesc}>Muestra menos información por vendedor</Text>
        </View>
        <Switch
          value={compactMode}
          onValueChange={setCompactMode}
          trackColor={{ false: COLORS.border, true: COLORS.accent }}
          thumbColor={COLORS.background}
        />
      </View>

      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Orden de la lista</Text>
        <View style={styles.segmented}>
          {(['asc', 'desc'] as const).map((opt) => (
            <Pressable
              key={opt}
              style={[styles.segment, sortOrder === opt && styles.segmentActive]}
              onPress={() => setSortOrder(opt)}
            >
              <Text
                style={[styles.segmentText, sortOrder === opt && styles.segmentTextActive]}
              >
                {opt === 'asc' ? 'A → Z' : 'Z → A'}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{sortOrder}</Text>
        </Text>
      </View>

      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Ítems por página</Text>
        <View style={styles.segmented}>
          {([5, 10, 20] as const).map((n) => (
            <Pressable
              key={n}
              style={[styles.segment, itemsPerPage === n && styles.segmentActive]}
              onPress={() => setItemsPerPage(n)}
            >
              <Text
                style={[styles.segmentText, itemsPerPage === n && styles.segmentTextActive]}
              >
                {n}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{itemsPerPage}</Text>
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: SPACING.lg }]}>
        Seguridad (SecureStore)
      </Text>
      <Text style={styles.sectionHint}>
        El código de acceso del vendedor se cifra en Keychain (iOS) o Keystore (Android).
        Nunca se muestra en pantalla.
      </Text>

      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Código de acceso del vendedor"
        placeholderTextColor={COLORS.border}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.secureActions}>
        <Pressable style={styles.btnSecure} onPress={handleSaveSensitive}>
          <Text style={styles.btnSecureText}>💾 Guardar</Text>
        </Pressable>
        <Pressable style={[styles.btnSecure, styles.btnSecureAlt]} onPress={handleReadSensitive}>
          <Text style={[styles.btnSecureText, { color: COLORS.accent }]}>🔍 Verificar</Text>
        </Pressable>
        <Pressable style={[styles.btnSecure, styles.btnDanger]} onPress={handleDeleteSensitive}>
          <Text style={[styles.btnSecureText, { color: DANGER_COLOR }]}>🗑️ Eliminar</Text>
        </Pressable>
      </View>

      {status && <Text style={styles.status}>{status}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: SPACING.lg * 2, gap: SPACING.sm },

  sectionTitle: { ...TYPOGRAPHY.title, marginBottom: 4 },
  sectionHint: { ...TYPOGRAPHY.caption, marginBottom: SPACING.md, fontStyle: 'italic' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },
  rowColumn: { flexDirection: 'column', alignItems: 'flex-start', gap: SPACING.sm },
  rowInfo: { flex: 1, marginRight: SPACING.md },
  rowLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowDesc: { ...TYPOGRAPHY.caption, marginTop: 2 },
  mono: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  segmented: { flexDirection: 'row', gap: SPACING.sm },
  segment: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  segmentActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  segmentText: { ...TYPOGRAPHY.caption },
  segmentTextActive: { color: COLORS.background, fontWeight: '700' },

  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  secureActions: { flexDirection: 'row', gap: SPACING.sm },
  btnSecure: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  btnSecureAlt: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnDanger: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: DANGER_COLOR,
  },
  btnSecureText: { ...TYPOGRAPHY.caption, fontWeight: '700', color: COLORS.background },

  status: { ...TYPOGRAPHY.caption, marginTop: SPACING.sm },
});
