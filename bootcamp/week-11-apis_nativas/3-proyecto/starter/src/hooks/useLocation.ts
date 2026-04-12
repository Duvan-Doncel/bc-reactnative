import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import type { LocationData } from '../types';

// ============================================
// HOOK: useLocation
// ============================================
// Encapsula toda la lógica de expo-location:
// 1. Solicitar permiso (requestForegroundPermissionsAsync)
// 2. Obtener posición puntual (getCurrentPositionAsync)
// 3. Opcionalmente seguir la posición (watchPositionAsync + cleanup)
// 4. Geocodificación inversa (reverseGeocodeAsync)
//
// Retorna: { location, isLoading, permissionGranted, error, fetchLocation, fetchAddress }

interface UseLocationReturn {
  location: LocationData | null;
  isLoading: boolean;
  permissionGranted: boolean;
  error: string | null;
  /** Obtiene la posición puntual actual. */
  fetchLocation: () => Promise<void>;
  /** Convierte la posición actual a dirección textual. */
  fetchAddress: () => Promise<void>;
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referencia a la suscripción de watchPositionAsync para limpiarla en cleanup
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  // ============================================
  // TODO: Solicitar permiso al montar
  // ============================================
  // En useEffect (deps: []):
  //   - Llamar Location.requestForegroundPermissionsAsync()
  //   - Si status === 'granted' → setPermissionGranted(true)
  //   - Si no → setError('Permiso de ubicación denegado')
  useEffect(() => {
    // TODO: Implement permission request
  }, []);

  // ============================================
  // TODO: Limpiar suscripción al desmontar
  // ============================================
  // En useEffect (deps: []):
  //   return () => { subscriptionRef.current?.remove(); }
  useEffect(() => {
    return () => {
      subscriptionRef.current?.remove();
    };
  }, []);

  // ============================================
  // TODO: Implementar fetchLocation
  // ============================================
  // - setIsLoading(true)
  // - Llamar getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
  // - setLocation({ latitude, longitude, accuracy, address: null })
  // - setIsLoading(false)
  // - Wrapping en try/catch con setError en el catch
  const fetchLocation = async (): Promise<void> => {
    // TODO: Implement
    console.warn('useLocation: fetchLocation no implementado');
  };

  // ============================================
  // TODO: Implementar fetchAddress
  // ============================================
  // - Verificar que location no sea null
  // - Llamar Location.reverseGeocodeAsync({ latitude, longitude })
  // - Construir string: `${addr.street}, ${addr.city}, ${addr.country}`
  // - Actualizar location.address con setLocation({ ...location, address })
  // - Wrapping en try/catch
  const fetchAddress = async (): Promise<void> => {
    // TODO: Implement
    console.warn('useLocation: fetchAddress no implementado');
  };

  return { location, isLoading, permissionGranted, error, fetchLocation, fetchAddress };
}
