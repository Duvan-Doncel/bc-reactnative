import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { DetailScreenProps } from '../navigation/types';
import { PhotoPicker } from '../components/PhotoPicker';
import { useLocation } from '../hooks/useLocation';
import { COLORS, RADII, SPACING } from '../theme';

// ============================================
// SCREEN: DetailScreen
// ============================================
// Muestra el detalle de un ítem. Integra:
// - PhotoPicker: capturar o seleccionar foto
// - CameraScreen: ir a pantalla fullscreen de cámara
// - useLocation: mostrar coordenadas y dirección del ítem
//
// TODO: Adapta el contenido de detalle a tu dominio.

export function DetailScreen({ navigation, route }: DetailScreenProps): React.JSX.Element {
  const { itemId } = route.params;
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  // Hook de ubicación
  const { location, isLoading, permissionGranted, error, fetchLocation, fetchAddress } =
    useLocation();

  // ============================================
  // TODO: Obtener el ítem por itemId desde tu store/estado global
  // ============================================
  // Por ahora usamos datos placeholder
  const item = {
    id: itemId,
    name: `Ítem ${itemId}`,
    description: 'Descripción detallada del ítem. Adapta este contenido a tu dominio.',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Nombre del ítem */}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* ---- Sección de foto ---- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📷 Foto del ítem</Text>

        <PhotoPicker
          onPhoto={setPhotoUri}
          currentUri={photoUri}
          label="Agregar foto del ítem"
        />

        {/* Botón para ir a CameraScreen (cámara fullscreen) */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => navigation.navigate('Camera', { itemId })}
          activeOpacity={0.8}
        >
          <Text style={styles.cameraButtonText}>📷 Abrir cámara completa</Text>
        </TouchableOpacity>
      </View>

      {/* ---- Sección de ubicación ---- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Ubicación</Text>

        {/* ============================================
            TODO: Integrar PermissionGate para ubicación
            ============================================
            Envuelve el contenido de ubicación con PermissionGate:
            - permission={{ granted: permissionGranted }}
            - onRequest={fetchLocation}
            - title="Permiso de ubicación"
            - description="Necesitamos tu ubicación para mostrar dónde está este ítem."
        */}

        {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

        {location ? (
          <View style={styles.locationCard}>
            <Text style={styles.coords}>
              Lat: {location.latitude.toFixed(6)}{'\n'}
              Lng: {location.longitude.toFixed(6)}
            </Text>
            {location.accuracy !== null && (
              <Text style={styles.accuracy}>±{location.accuracy.toFixed(0)} m</Text>
            )}
            {location.address && (
              <Text style={styles.address}>📬 {location.address}</Text>
            )}
            <TouchableOpacity style={styles.geocodeButton} onPress={fetchAddress}>
              <Text style={styles.geocodeButtonText}>
                {isLoading ? 'Cargando...' : '🗺️ Obtener dirección'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.locationButton}
            onPress={fetchLocation}
            disabled={isLoading || !permissionGranted}
            activeOpacity={0.8}
          >
            <Text style={styles.locationButtonText}>
              {isLoading ? '⏳ Obteniendo ubicación...' : '📍 Obtener ubicación actual'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ============================================
          TODO: Agregar información específica del dominio
          ============================================
          Ejemplo (Biblioteca):
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📖 Información del libro</Text>
              <Text style={styles.infoText}>Autor: {item.author}</Text>
              <Text style={styles.infoText}>ISBN: {item.isbn}</Text>
              <Text style={styles.infoText}>Disponible: {item.available ? 'Sí' : 'No'}</Text>
            </View>
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACING.lg, gap: SPACING.lg },
  title: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '700' },
  description: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  sectionTitle: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  cameraButton: {
    backgroundColor: COLORS.surfaceHigh,
    borderRadius: RADII.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  cameraButtonText: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '600' },
  locationButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  locationButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  locationCard: {
    backgroundColor: COLORS.bg,
    borderRadius: RADII.md,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  coords: { color: COLORS.textPrimary, fontSize: 13, fontFamily: 'monospace', lineHeight: 20 },
  accuracy: { color: COLORS.textMuted, fontSize: 11 },
  address: { color: COLORS.accent, fontSize: 13, lineHeight: 20 },
  geocodeButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADII.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignSelf: 'flex-start',
  },
  geocodeButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  errorText: { color: COLORS.danger, fontSize: 13 },
});
