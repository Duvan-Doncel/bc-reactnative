// ============================================
// HOOK: useNotifications
// Centraliza permisos, token y listeners de push notifications
// ============================================

import { useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import { Subscription } from 'expo-modules-core';
import { NotificationPayload } from '../types';

interface UseNotificationsResult {
  pushToken: string | null;
  permissionGranted: boolean;
  isPhysicalDevice: boolean;
  registerForPush: () => Promise<void>;
  scheduleReminder: (
    itemId: string,
    title: string,
    body: string,
    secondsFromNow: number,
  ) => Promise<string | null>;
  cancelReminder: (notificationId: string) => Promise<void>;
}

export function useNotifications(
  // Callback llamado cuando el usuario toca una notificación
  onNotificationTap?: (payload: NotificationPayload) => void,
): UseNotificationsResult {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [isPhysicalDevice] = useState<boolean>(Device.isDevice);

  const responseSubscription = useRef<Subscription | null>(null);

  useEffect(() => {
    // Listener de respuesta: usuario toca el banner (foreground o background)
    responseSubscription.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data as NotificationPayload;
        if (onNotificationTap && data?.screen) {
          onNotificationTap(data);
        }
      });

    return () => {
      // CLEANUP obligatorio — sin esto hay memory leak
      responseSubscription.current?.remove();
    };
  }, [onNotificationTap]);

  /**
   * Solicita permisos y obtiene el Expo Push Token.
   * Debe llamarse desde un botón o al montar la pantalla de Settings.
   */
  async function registerForPush(): Promise<void> {
    // TODO: Implementar el flujo completo:
    // 1. Verificar Device.isDevice (solo físico)
    // 2. Obtener permisos existentes con getPermissionsAsync()
    // 3. Si denegado → Alert + Linking.openSettings()
    // 4. Si no concedido → requestPermissionsAsync()
    // 5. getExpoPushTokenAsync({ projectId }) y guardar en estado
    //
    // Ejemplo de estructura:
    // if (!Device.isDevice) { Alert.alert(...); return; }
    // const { status: existing } = await Notifications.getPermissionsAsync();
    // if (existing === 'denied') { ... llevar a Settings ... return; }
    // if (existing !== 'granted') {
    //   const { status } = await Notifications.requestPermissionsAsync();
    //   if (status !== 'granted') { setPermissionGranted(false); return; }
    // }
    // setPermissionGranted(true);
    // const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    // const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
    // setPushToken(tokenData.data);
  }

  /**
   * Programa una notificación local con delay en segundos.
   * Retorna el ID de la notificación para poder cancelarla después.
   *
   * Returns: notificationId string | null (si falla)
   */
  async function scheduleReminder(
    itemId: string,
    title: string,
    body: string,
    secondsFromNow: number,
  ): Promise<string | null> {
    // TODO: Implementar scheduleNotificationAsync con:
    // - content: { title, body, data: { screen: 'Detail', itemId }, sound: true }
    // - trigger: { type: TIME_INTERVAL, seconds: secondsFromNow, repeats: false }
    // - Retornar el notificationId
    //
    // Ejemplo:
    // const id = await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title,
    //     body,
    //     data: { screen: 'Detail', itemId } satisfies NotificationPayload,
    //     sound: true,
    //   },
    //   trigger: {
    //     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //     seconds: secondsFromNow,
    //     repeats: false,
    //   },
    // });
    // return id;
    return null;
  }

  /**
   * Cancela una notificación programada por su ID.
   */
  async function cancelReminder(notificationId: string): Promise<void> {
    // TODO: Implementar cancelScheduledNotificationAsync(notificationId)
  }

  return {
    pushToken,
    permissionGranted,
    isPhysicalDevice,
    registerForPush,
    scheduleReminder,
    cancelReminder,
  };
}
