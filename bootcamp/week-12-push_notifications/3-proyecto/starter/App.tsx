import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { RootNavigator } from './src/navigation/RootNavigator';

// ============================================
// CONFIGURACIÓN GLOBAL — nivel de módulo
// ============================================
// setNotificationHandler DEBE estar fuera del componente App.
// Define cómo se comportan las notificaciones cuando la app está en FOREGROUND.
// Sin esto, los banners no aparecerán mientras la app está abierta.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // Mostrar banner visual
    shouldPlaySound: true,   // Reproducir sonido del sistema
    shouldSetBadge: false,   // No modificar badge (lo gestionamos manualmente)
  }),
});

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
