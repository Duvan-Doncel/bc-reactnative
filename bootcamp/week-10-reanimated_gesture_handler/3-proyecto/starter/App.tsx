import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';

// GestureHandlerRootView es OBLIGATORIO para que los gestos funcionen.
// Envuelve toda la app. Sin esto, los gestos fallan silenciosamente en iOS
// y causan un crash en Android.
// Debe tener style={{ flex: 1 }} para ocupar toda la pantalla.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <RootNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
