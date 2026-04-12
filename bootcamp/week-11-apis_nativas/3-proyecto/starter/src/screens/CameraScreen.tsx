import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { PermissionGate } from '../components/PermissionGate';
import type { CameraScreenProps } from '../navigation/types';
import { COLORS, RADII, SPACING } from '../theme';

// ============================================
// SCREEN: CameraScreen
// ============================================
// Pantalla de cámara fullscreen.
// Usa PermissionGate para manejar el flujo de permisos.
// Al capturar, navega de vuelta a DetailScreen pasando la URI.
//
// ⚠️ En iOS Simulator no hay hardware de cámara.
//    Usa el simulador Android o un dispositivo físico para probar.

export function CameraScreen({ navigation, route }: CameraScreenProps): React.JSX.Element {
  const { itemId } = route.params;
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [isTaking, setIsTaking] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  // ============================================
  // TODO: Implementar captura de foto
  // ============================================
  // - setIsTaking(true)
  // - const photo = await cameraRef.current?.takePictureAsync({ quality: 0.85 })
  // - Si photo → navigation.navigate('Detail', { itemId }) con la URI
  //   (usa navigation.goBack() y pasa la URI via route params o estado global)
  // - setIsTaking(false)
  const takePicture = async () => {
    if (isTaking) return;
    setIsTaking(true);
    try {
      // TODO: Implement
      console.warn('CameraScreen: takePicture no implementado');
    } finally {
      setIsTaking(false);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  return (
    <PermissionGate
      permission={permission}
      onRequest={requestPermission}
      title="Permiso de cámara"
      description="Necesitamos acceso a la cámara para fotografiar elementos de tu dominio."
    >
      <View style={styles.container}>
        {/* ============================================
            TODO: Montar CameraView con ref y facing
            ============================================
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              ... controles
            </CameraView>
        */}

        {/* Placeholder — reemplazar con CameraView */}
        <View style={styles.preview}>
          <Text style={styles.previewText}>📷 Monta CameraView aquí</Text>
          <Text style={styles.previewSub}>facing="{facing}"</Text>
        </View>

        {/* Controles de la cámara */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.controlText}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.captureBtn, isTaking && styles.captureBtnDisabled]}
            onPress={takePicture}
            disabled={isTaking}
          >
            <View style={styles.captureBtnInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn} onPress={toggleFacing}>
            <Text style={styles.controlText}>🔄</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>⚠️ iOS Simulator no tiene cámara — usar dispositivo físico</Text>
      </View>
    </PermissionGate>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  preview: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  previewText: { color: COLORS.textSecondary, fontSize: 16 },
  previewSub: { color: COLORS.textMuted, fontSize: 12 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.xxl,
    backgroundColor: '#00000088',
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: { fontSize: 20 },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnDisabled: { opacity: 0.5 },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
  hint: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
    paddingBottom: SPACING.md,
    backgroundColor: '#00000088',
  },
});
