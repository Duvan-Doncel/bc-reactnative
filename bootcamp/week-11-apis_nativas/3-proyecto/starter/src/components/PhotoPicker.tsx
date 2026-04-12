import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, RADII, SPACING } from '../theme';

// ============================================
// COMPONENT: PhotoPicker
// ============================================
// Botón que permite seleccionar una foto:
// - Desde la galería (launchImageLibraryAsync)
// - Desde la cámara del sistema (launchCameraAsync) — fallback de CameraScreen
//
// Este componente usa el sistema nativo de picker, NO CameraView.
// Para la cámara del proyecto, el flujo idealmente pasa por CameraScreen.

interface PhotoPickerProps {
  /** Callback cuando se selecciona o captura una foto (recibe la URI). */
  onPhoto: (uri: string) => void;
  /** URI de la foto actual para mostrar preview. */
  currentUri?: string;
  /** Texto del botón principal. */
  label?: string;
}

export function PhotoPicker({
  onPhoto,
  currentUri,
  label = 'Agregar foto',
}: PhotoPickerProps): React.JSX.Element {
  const handlePress = () => {
    Alert.alert('Seleccionar foto', '¿Desde dónde quieres obtener la foto?', [
      {
        text: 'Galería',
        onPress: pickFromGallery,
      },
      {
        text: 'Cámara',
        onPress: pickFromCamera,
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  // ============================================
  // TODO: Implementar pickFromGallery
  // ============================================
  // Usa launchImageLibraryAsync con mediaTypes: ['images']
  // Verifica result.canceled antes de acceder a result.assets[0].uri
  // Llama onPhoto(uri) con la URI obtenida
  const pickFromGallery = async () => {
    // TODO: Implement
    console.warn('PhotoPicker: pickFromGallery no implementado');
  };

  // ============================================
  // TODO: Implementar pickFromCamera
  // ============================================
  // Usa launchCameraAsync con allowsEditing: true
  // Verifica result.canceled antes de acceder a result.assets[0].uri
  // Llama onPhoto(uri) con la URI obtenida
  const pickFromCamera = async () => {
    // TODO: Implement
    console.warn('PhotoPicker: pickFromCamera no implementado');
  };

  return (
    <View style={styles.container}>
      {currentUri ? (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
          <Image source={{ uri: currentUri }} style={styles.preview} resizeMode="cover" />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>✏️ Cambiar foto</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handlePress} activeOpacity={0.8}>
          <Text style={styles.addIcon}>📷</Text>
          <Text style={styles.addLabel}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADII.lg,
    overflow: 'hidden',
  },
  addButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: RADII.lg,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  addIcon: {
    fontSize: 32,
  },
  addLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: RADII.lg,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000088',
    paddingVertical: SPACING.sm,
    borderBottomLeftRadius: RADII.lg,
    borderBottomRightRadius: RADII.lg,
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
