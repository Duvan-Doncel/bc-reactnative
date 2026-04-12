import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import { Subscription } from 'expo-modules-core';

// ============================================
// PASO 1 (previo): setNotificationHandler en módulo
// ============================================
// Descomenta las siguientes líneas:
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

export default function App(): React.JSX.Element {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [isPhysicalDevice, setIsPhysicalDevice] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');
  const [tapLog, setTapLog] = useState<string | null>(null);

  const responseSubscription = useRef<Subscription | null>(null);

  // ============================================
  // PASO 1: Verificar si es dispositivo físico
  // ============================================
  useEffect(() => {
    // Descomenta las siguientes líneas:
    // // Device.isDevice es true en iPhone/Android físico, false en simulador
    // const physical = Device.isDevice;
    // setIsPhysicalDevice(physical);
    //
    // if (!physical) {
    //   Alert.alert(
    //     'Simulador detectado',
    //     'Los push tokens requieren un dispositivo físico con FCM/APNs.',
    //   );
    // }
  }, []);

  // ============================================
  // PASO 4: Listener de respuesta en foreground/background
  // ============================================
  useEffect(() => {
    // Descomenta las siguientes líneas:
    // responseSubscription.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     const title =
    //       response.notification.request.content.title ?? 'Sin título';
    //     setTapLog(`Tap recibido: "${title}"`);
    //     console.log('Notification tapped, data:', response.notification.request.content.data);
    //   });
    //
    // return () => {
    //   responseSubscription.current?.remove();
    // };
  }, []);

  // ============================================
  // PASO 2 + 3: Solicitar permisos y obtener token
  // ============================================
  async function registerForPushNotifications(): Promise<void> {
    // Descomenta las siguientes líneas:
    //
    // // Paso 1: check dispositivo físico
    // if (!Device.isDevice) {
    //   Alert.alert('Error', 'Necesitas un dispositivo físico para el push token.');
    //   return;
    // }
    //
    // // Paso 2: manejar el caso "ya denegado" — llevar a Ajustes
    // const { status: existing } = await Notifications.getPermissionsAsync();
    // if (existing === 'denied') {
    //   Alert.alert(
    //     'Permisos denegados',
    //     'Activa las notificaciones en Ajustes > Notificaciones.',
    //     [{ text: 'Abrir Ajustes', onPress: () => Linking.openSettings() }],
    //   );
    //   setPermissionStatus('denied');
    //   return;
    // }
    //
    // // Solicitar permisos si no están concedidos
    // if (existing !== 'granted') {
    //   const { status } = await Notifications.requestPermissionsAsync();
    //   setPermissionStatus(status);
    //   if (status !== 'granted') return;
    // } else {
    //   setPermissionStatus('granted');
    // }
    //
    // // Paso 3: obtener el Expo Push Token
    // // El projectId se obtiene de app.json > extra.eas.projectId
    // const projectId =
    //   Constants.expoConfig?.extra?.eas?.projectId ??
    //   Constants.easConfig?.projectId ??
    //   'demo-project-id'; // Solo para ejercicio — en producción usa tu ID real
    //
    // try {
    //   const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
    //   setPushToken(tokenData.data);
    //   // En una app real: enviar tokenData.data a tu backend por usuario
    //   console.log('Expo Push Token obtenido:', tokenData.data);
    // } catch (error) {
    //   console.error('Error obteniendo push token:', error);
    //   Alert.alert('Error', 'No se pudo obtener el push token. Verifica el projectId.');
    // }
  }

  async function copyTokenToClipboard(): Promise<void> {
    // Descomenta cuando tengas el token:
    // if (!pushToken) return;
    // // En una app real usarías expo-clipboard:
    // // await Clipboard.setStringAsync(pushToken);
    // Alert.alert('Token', pushToken ?? '', [{ text: 'OK' }]);
    if (pushToken) {
      Alert.alert('Tu Expo Push Token', pushToken);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Ejercicio 02</Text>
        <Text style={styles.subtitle}>Push Token y Expo Push Tool</Text>

        {/* Device info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Tipo de dispositivo</Text>
          <Text
            style={[
              styles.infoValue,
              { color: isPhysicalDevice ? '#10B981' : '#F87171' },
            ]}
          >
            {isPhysicalDevice ? '📱 Físico' : '💻 Simulador (Paso 1)'}
          </Text>
        </View>

        {/* Permission status */}
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Estado de permisos</Text>
          <Text style={styles.infoValue}>{permissionStatus}</Text>
        </View>

        {/* Token display */}
        <View style={styles.tokenBox}>
          <Text style={styles.infoLabel}>Expo Push Token (Paso 3):</Text>
          <Text style={styles.tokenText} numberOfLines={3}>
            {pushToken ?? 'Sin token — presiona el botón abajo'}
          </Text>
        </View>

        {/* Tap log */}
        {tapLog && (
          <View style={styles.tapLogBox}>
            <Text style={styles.tapLogText}>✅ {tapLog}</Text>
          </View>
        )}

        {/* Buttons */}
        <Pressable style={styles.button} onPress={registerForPushNotifications}>
          <Text style={styles.buttonText}>
            Obtener Push Token (Pasos 1-3)
          </Text>
        </Pressable>

        {pushToken && (
          <Pressable
            style={[styles.button, styles.buttonSecondary]}
            onPress={copyTokenToClipboard}
          >
            <Text style={styles.buttonText}>Ver Token Completo</Text>
          </Pressable>
        )}

        {/* Instructions for step 4 */}
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>Paso 4 — Enviar push manual</Text>
          <Text style={styles.instructionsText}>
            1. Copia el token de arriba{'\n'}
            2. Ve a expo.dev/notifications{'\n'}
            3. Pega el token y envía una notificación{'\n'}
            4. Toca el banner → verás el log aquí
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  infoValue: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '600',
  },
  tokenBox: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
  },
  tokenText: {
    color: '#F59E0B',
    fontSize: 11,
    fontFamily: 'monospace',
    marginTop: 6,
    lineHeight: 18,
  },
  tapLogBox: {
    backgroundColor: '#064E3B',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  tapLogText: {
    color: '#6EE7B7',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#61DAFB',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#6366F1',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 14,
  },
  instructionsBox: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
  },
  instructionsTitle: {
    color: '#61DAFB',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  instructionsText: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 20,
  },
});
