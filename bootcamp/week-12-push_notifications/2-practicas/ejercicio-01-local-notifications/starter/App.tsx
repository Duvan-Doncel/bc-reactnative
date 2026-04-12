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
import { Subscription } from 'expo-modules-core';

// ============================================
// PASO 1: Configurar el handler de foreground
// ============================================
// En React Native, a diferencia del web, las notificaciones en foreground
// no se muestran por defecto. Este handler define el comportamiento.
// IMPORTANTE: debe estar a nivel de módulo, fuera del componente.
// Descomenta las siguientes líneas:
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,  // Mostrar banner visual
//     shouldPlaySound: true,  // Reproducir sonido
//     shouldSetBadge: false,  // No actualizar badge (lo haremos manualmente)
//   }),
// });

// ============================================
// TIPOS
// ============================================
interface NotificationLog {
  id: string;
  type: 'received' | 'response';
  title: string;
  timestamp: string;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function App(): React.JSX.Element {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);

  // useRef para subscriptions: no queremos re-render al guardar la referencia
  // Equivalente a guardar un eventListener en web sin setState
  const receivedSubscription = useRef<Subscription | null>(null);
  const responseSubscription = useRef<Subscription | null>(null);

  const addLog = (type: 'received' | 'response', title: string): void => {
    setLogs((prev) => [
      {
        id: Date.now().toString(),
        type,
        title,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 9), // Mostrar solo los últimos 10 logs
    ]);
  };

  // ============================================
  // PASO 1: Solicitar permisos al montar
  // ============================================
  useEffect(() => {
    // Descomenta las siguientes líneas:
    // async function requestPerms(): Promise<void> {
    //   // iOS: diálogo nativo de permisos
    //   // Android 13+: también requiere permiso explícito
    //   const { status } = await Notifications.requestPermissionsAsync();
    //   setPermissionGranted(status === 'granted');
    //   if (status !== 'granted') {
    //     Alert.alert(
    //       'Permisos requeridos',
    //       'Habilita las notificaciones en Ajustes para usar esta función.',
    //     );
    //   }
    // }
    // requestPerms();
  }, []);

  // ============================================
  // PASO 3: Listener de notificaciones recibidas (foreground)
  // ============================================
  useEffect(() => {
    // Descomenta las siguientes líneas:
    // // Se dispara cuando llega una notificación con la app abierta
    // receivedSubscription.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     const title = notification.request.content.title ?? 'Sin título';
    //     addLog('received', title);
    //     console.log('Notificación recibida en foreground:', title);
    //   });
    //
    // // CLEANUP obligatorio: igual que removeEventListener en web
    // return () => {
    //   receivedSubscription.current?.remove();
    // };
  }, []);

  // ============================================
  // PASO 4: Listener de respuesta (tap del usuario)
  // ============================================
  useEffect(() => {
    // Descomenta las siguientes líneas:
    // // Se dispara cuando el usuario toca el banner (foreground o background)
    // responseSubscription.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     const title =
    //       response.notification.request.content.title ?? 'Sin título';
    //     const data = response.notification.request.content.data;
    //     addLog('response', `Tap: ${title}`);
    //     console.log('Usuario tapó la notificación. Data:', data);
    //     // En una app real: navigation.navigate(data.screen, { id: data.id })
    //   });
    //
    // return () => {
    //   responseSubscription.current?.remove();
    // };
  }, []);

  // ============================================
  // PASO 2: Programar notificaciones locales
  // ============================================
  async function sendImmediateNotification(): Promise<void> {
    // Descomenta las siguientes líneas:
    // if (!permissionGranted) {
    //   Alert.alert('Sin permisos', 'Permisos no concedidos.');
    //   return;
    // }
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: '¡Notificación inmediata!',
    //     body: 'Esta notificación se disparó al instante.',
    //     data: { screen: 'Home', type: 'immediate' },
    //     sound: true,
    //   },
    //   trigger: null, // null = disparar inmediatamente
    // });
  }

  async function scheduleIn5Seconds(): Promise<void> {
    // Descomenta las siguientes líneas:
    // if (!permissionGranted) return;
    // const id = await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: '⏱ 5 segundos después',
    //     body: 'Esta notificación se programó con TIME_INTERVAL.',
    //     data: { screen: 'Detail', itemId: '42' },
    //     sound: true,
    //   },
    //   trigger: {
    //     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //     seconds: 5,
    //     repeats: false,
    //   },
    // });
    // console.log('Notificación programada con ID:', id);
    // await refreshPendingCount();
  }

  async function refreshPendingCount(): Promise<void> {
    // Descomenta las siguientes líneas:
    // const pending = await Notifications.getAllScheduledNotificationsAsync();
    // setPendingCount(pending.length);
  }

  async function cancelAllNotifications(): Promise<void> {
    // Descomenta las siguientes líneas:
    // await Notifications.cancelAllScheduledNotificationsAsync();
    // await refreshPendingCount();
    // Alert.alert('Listo', 'Todas las notificaciones Cancel programadas.');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Ejercicio 01</Text>
        <Text style={styles.subtitle}>Notificaciones Locales</Text>

        {/* Status */}
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: permissionGranted ? '#10B981' : '#F87171' },
            ]}
          />
          <Text style={styles.statusText}>
            {permissionGranted ? 'Permisos concedidos' : 'Permisos pendientes (Paso 1)'}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Pendientes: {pendingCount}</Text>

        {/* Buttons */}
        <Pressable style={styles.button} onPress={sendImmediateNotification}>
          <Text style={styles.buttonText}>Enviar ahora (Paso 2)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={scheduleIn5Seconds}
        >
          <Text style={styles.buttonText}>Programar en 5 seg (Paso 2)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={refreshPendingCount}
        >
          <Text style={styles.buttonText}>Actualizar pendientes</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonDanger]}
          onPress={cancelAllNotifications}
        >
          <Text style={styles.buttonText}>Cancelar todas</Text>
        </Pressable>

        {/* Logs */}
        {logs.length > 0 && (
          <View style={styles.logContainer}>
            <Text style={styles.sectionLabel}>Actividad (Pasos 3 y 4):</Text>
            {logs.map((log) => (
              <View key={log.id} style={styles.logItem}>
                <Text style={styles.logBadge}>
                  {log.type === 'received' ? '📩 recibida' : '👆 tap'}
                </Text>
                <Text style={styles.logTitle}>{log.title}</Text>
                <Text style={styles.logTime}>{log.timestamp}</Text>
              </View>
            ))}
          </View>
        )}
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    color: '#D1D5DB',
    fontSize: 13,
  },
  sectionLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 8,
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
  buttonDanger: {
    backgroundColor: '#F87171',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 14,
  },
  logContainer: {
    marginTop: 16,
    backgroundColor: '#1F2937',
    borderRadius: 10,
    padding: 12,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    gap: 8,
  },
  logBadge: {
    fontSize: 10,
    color: '#61DAFB',
    minWidth: 70,
  },
  logTitle: {
    color: '#F9FAFB',
    fontSize: 12,
    flex: 1,
  },
  logTime: {
    color: '#6B7280',
    fontSize: 10,
  },
});
