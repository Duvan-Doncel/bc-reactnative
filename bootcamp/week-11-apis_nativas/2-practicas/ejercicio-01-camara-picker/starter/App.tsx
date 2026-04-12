import React, { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// ============================================
// PASO 1: Permiso de cámara con useCameraPermissions
// ============================================
// useCameraPermissions() → [permissionObject, requestFn]
// permission === null  → aún cargando
// permission.granted   → acceso concedido
// !permission.granted  → pedir permiso con requestPermission()

// Descomenta para usar la cámara:
// import { CameraView, useCameraPermissions } from 'expo-camera';

// ============================================
// PASO 2: CameraView + takePictureAsync
// ============================================
// CameraView ocupa el espacio del contenedor (necesita flex: 1 o altura fija)
// takePictureAsync({ quality, base64 }) → { uri, width, height }
// Requiere useRef<CameraView>(null) para llamar al método

// ============================================
// PASO 3: ImagePicker — galería
// ============================================
// launchImageLibraryAsync — NO necesita permiso de cámara
// Compatible con iOS Simulator (no tiene cámara pero sí galería)
// result.canceled → true si el usuario cerró el picker
// result.assets[0].uri → URI local de la imagen seleccionada

// ============================================
// PASO 4: Mostrar la foto con <Image source={{ uri }} />
// ============================================
// La URI puede venir de takePictureAsync o de ImagePicker

export default function App(): React.JSX.Element {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // ---- Paso 1: permiso de cámara ----
  // Descomenta la siguiente línea:
  // const [permission, requestPermission] = useCameraPermissions();

  // ---- Paso 2: ref de la cámara ----
  // Descomenta la siguiente línea:
  // const cameraRef = useRef<CameraView>(null);

  // ---- Paso 2: función de captura ----
  // Descomenta el siguiente bloque:
  // const takePicture = async () => {
  //   const photo = await cameraRef.current?.takePictureAsync({
  //     quality: 0.8,
  //     base64: false,
  //   });
  //   if (photo) setPhotoUri(photo.uri);
  // };

  // ---- Paso 3: función de galería ----
  // Descomenta el siguiente bloque:
  // const pickFromGallery = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ['images'],
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 0.8,
  //   });
  //   // Verificar canceled ANTES de acceder a assets
  //   if (!result.canceled) {
  //     setPhotoUri(result.assets[0].uri);
  //   }
  // };

  // ---- Paso 1 completo: pantalla de permiso ----
  // Descomenta este bloque (va ANTES del return principal):
  // if (!permission) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Text style={styles.text}>Verificando permisos...</Text>
  //     </SafeAreaView>
  //   );
  // }
  // if (!permission.granted) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Text style={styles.title}>📷 Permiso de cámara</Text>
  //       <Text style={styles.text}>Necesitamos acceso a la cámara para este ejercicio.</Text>
  //       <TouchableOpacity style={styles.button} onPress={requestPermission}>
  //         <Text style={styles.buttonText}>Conceder permiso</Text>
  //       </TouchableOpacity>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Week 11 — Ejercicio 01</Text>
      <Text style={styles.subheader}>expo-camera · expo-image-picker · permisos</Text>

      {/* ---- Paso 2: CameraView ---- */}
      {/* Descomenta el siguiente bloque: */}
      {/* <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back">
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.captureIcon}>📸</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View> */}

      {/* Placeholder hasta descomentar el Paso 2 */}
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.placeholderText}>👁️ Paso 2 — Monta CameraView aquí</Text>
        <Text style={styles.placeholderSub}>En simulador iOS usa el Paso 3 (galería)</Text>
      </View>

      {/* ---- Paso 3: botón de galería ---- */}
      {/* Reemplaza este button por la versión con pickFromGallery: */}
      <TouchableOpacity
        style={[styles.button, styles.galleryButton]}
        onPress={() => {
          // TODO cuando completes Paso 3: onPress={pickFromGallery}
          console.log('Paso 3 — descomenta pickFromGallery');
        }}
      >
        <Text style={styles.buttonText}>🖼️ Elegir de la galería (Paso 3)</Text>
      </TouchableOpacity>

      {/* ---- Paso 4: mostrar foto ---- */}
      {/* Descomenta el siguiente bloque: */}
      {/* {photoUri && (
        <View style={styles.preview}>
          <Text style={styles.previewLabel}>📷 Foto capturada:</Text>
          <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode="cover" />
          <Text style={styles.uriText} numberOfLines={2}>{photoUri}</Text>
        </View>
      )} */}

      {/* Indicador de estado para Paso 4 */}
      <View style={styles.statusBox}>
        <Text style={styles.status}>
          {photoUri ? `✅ URI: ${photoUri.slice(-30)}` : '⬜ Sin foto aún (completa los pasos)'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
    gap: 12,
  },
  header: {
    color: '#61DAFB',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  subheader: {
    color: '#64748b',
    fontSize: 11,
    textAlign: 'center',
  },
  title: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  text: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  cameraContainer: {
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
  },
  camera: {
    flex: 1,
  },
  cameraPlaceholder: {
    height: 200,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  placeholderText: {
    color: '#64748b',
    fontSize: 13,
  },
  placeholderSub: {
    color: '#475569',
    fontSize: 11,
  },
  cameraControls: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff22',
    borderWidth: 3,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureIcon: {
    fontSize: 28,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  galleryButton: {
    backgroundColor: '#7c3aed',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  preview: {
    gap: 6,
  },
  previewLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#1e293b',
  },
  uriText: {
    color: '#475569',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  statusBox: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
  },
  status: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
