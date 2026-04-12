import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';

// ============================================
// PASO 1: Permiso de ubicación
// ============================================
// Location NO tiene hook propio → usar useEffect + función async
// requestForegroundPermissionsAsync() → { status: 'granted' | 'denied' | 'undetermined' }
// Foreground = mientras la app está activa en pantalla

// ============================================
// PASO 2: Posición puntual con getCurrentPositionAsync
// ============================================
// Una sola lectura del GPS.
// accuracy: Location.Accuracy.Balanced → ~100 metros, bajo consumo
// location.coords.latitude  →  número (ej: 4.7110)
// location.coords.longitude →  número (ej: -74.0721)
// location.timestamp        →  Unix ms

// ============================================
// PASO 3: Seguimiento con watchPositionAsync
// ============================================
// Llama al callback cada timeInterval ms O cuando el device se mueve distanceInterval metros.
// Devuelve una suscripción que DEBE limpiarse con subscription.remove() en cleanup.
// Sin cleanup → memory leak y setState en componente desmontado.

// ============================================
// PASO 4: Geocodificación inversa
// ============================================
// reverseGeocodeAsync({ latitude, longitude }) → [{ street, city, region, country }]
// Requiere internet. Usar try/catch.

export default function App(): React.JSX.Element {
  const [granted, setGranted] = useState(false);
  const [position, setPosition] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState(false);

  // Guardamos la suscripción para poder limpiarla
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  // ---- Paso 1: solicitar permiso al montar ----
  // Descomenta el siguiente useEffect:
  // useEffect(() => {
  //   async function requestPermission() {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     setGranted(status === 'granted');
  //   }
  //   requestPermission();
  // }, []);

  // ---- Paso 2: obtener posición puntual ----
  // Descomenta la siguiente función:
  // const getOncePosition = async () => {
  //   if (!granted) return;
  //   const loc = await Location.getCurrentPositionAsync({
  //     accuracy: Location.Accuracy.Balanced,
  //   });
  //   setPosition(loc);
  // };

  // ---- Paso 3: seguimiento en tiempo real ----
  // Descomenta las siguientes funciones:
  // const startWatching = async () => {
  //   if (!granted || isWatching) return;
  //   setIsWatching(true);
  //   subscriptionRef.current = await Location.watchPositionAsync(
  //     {
  //       accuracy: Location.Accuracy.High,
  //       timeInterval: 3000,
  //       distanceInterval: 5,
  //     },
  //     (newLoc) => setPosition(newLoc),
  //   );
  // };
  //
  // const stopWatching = () => {
  //   subscriptionRef.current?.remove();
  //   subscriptionRef.current = null;
  //   setIsWatching(false);
  // };

  // ---- Cleanup del Paso 3 ----
  // Descomenta el siguiente useEffect:
  // useEffect(() => {
  //   return () => {
  //     subscriptionRef.current?.remove();
  //   };
  // }, []);

  // ---- Paso 4: geocodificación inversa ----
  // Descomenta la siguiente función:
  // const fetchAddress = async () => {
  //   if (!position) return;
  //   try {
  //     const [addr] = await Location.reverseGeocodeAsync({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //     setAddress(`${addr.street ?? ''}, ${addr.city ?? ''}, ${addr.country ?? ''}`);
  //   } catch {
  //     setAddress('No se pudo obtener la dirección (¿sin internet?)');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Week 11 — Ejercicio 02</Text>
        <Text style={styles.subheader}>expo-location · permisos · watchPosition · geocoding</Text>

        {/* Estado del permiso */}
        <View style={[styles.badge, granted ? styles.badgeOk : styles.badgeWarn]}>
          <Text style={styles.badgeText}>
            {granted ? '✅ Permiso concedido' : '⚠️ Paso 1 — descomenta requestForegroundPermissionsAsync'}
          </Text>
        </View>

        {/* Paso 2: botón posición puntual */}
        <TouchableOpacity
          style={[styles.button, !granted && styles.disabled]}
          onPress={() => {
            // TODO Paso 2: onPress={getOncePosition}
            console.log('Paso 2 — descomenta getOncePosition');
          }}
          disabled={!granted}
        >
          <Text style={styles.buttonText}>📍 Obtener posición (Paso 2)</Text>
        </TouchableOpacity>

        {/* Paso 3: botones de seguimiento */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.buttonHalf, !granted && styles.disabled]}
            onPress={() => {
              // TODO Paso 3: onPress={startWatching}
              console.log('Paso 3 — descomenta startWatching');
            }}
            disabled={!granted || isWatching}
          >
            <Text style={styles.buttonText}>▶ Seguir (Paso 3)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonHalf, styles.buttonDanger, !isWatching && styles.disabled]}
            onPress={() => {
              // TODO Paso 3: onPress={stopWatching}
              console.log('Paso 3 — descomenta stopWatching');
            }}
            disabled={!isWatching}
          >
            <Text style={styles.buttonText}>⏹ Parar</Text>
          </TouchableOpacity>
        </View>

        {/* Mostrar posición */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌐 Posición actual</Text>
          {position ? (
            <>
              <Text style={styles.coord}>Lat: {position.coords.latitude.toFixed(6)}</Text>
              <Text style={styles.coord}>Lng: {position.coords.longitude.toFixed(6)}</Text>
              <Text style={styles.coordSub}>
                Precisión: ±{position.coords.accuracy?.toFixed(0) ?? '?'} m
              </Text>
              <Text style={styles.coordSub}>
                {isWatching ? '🟢 Siguiendo en tiempo real' : '⚪ Posición puntual'}
              </Text>
            </>
          ) : (
            <Text style={styles.coordSub}>Sin datos aún — completa los pasos 1 y 2</Text>
          )}
        </View>

        {/* Paso 4: geocodificación */}
        <TouchableOpacity
          style={[styles.button, styles.buttonGreen, !position && styles.disabled]}
          onPress={() => {
            // TODO Paso 4: onPress={fetchAddress}
            console.log('Paso 4 — descomenta fetchAddress');
          }}
          disabled={!position}
        >
          <Text style={styles.buttonText}>🗺️ Obtener dirección (Paso 4)</Text>
        </TouchableOpacity>

        {address && (
          <View style={styles.addressCard}>
            <Text style={styles.cardTitle}>📬 Dirección</Text>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        )}

        <View style={styles.hints}>
          <Text style={styles.hint}>📌 Paso 1: requestForegroundPermissionsAsync</Text>
          <Text style={styles.hint}>📌 Paso 2: getCurrentPositionAsync (puntual)</Text>
          <Text style={styles.hint}>📌 Paso 3: watchPositionAsync + cleanup</Text>
          <Text style={styles.hint}>📌 Paso 4: reverseGeocodeAsync</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scroll: {
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
  badge: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'center',
  },
  badgeOk: { backgroundColor: '#14532d' },
  badgeWarn: { backgroundColor: '#422006' },
  badgeText: { color: '#f1f5f9', fontSize: 12 },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonHalf: { flex: 1 },
  buttonDanger: { backgroundColor: '#dc2626' },
  buttonGreen: { backgroundColor: '#16a34a' },
  disabled: { opacity: 0.4 },
  buttonText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 8 },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  cardTitle: { color: '#94a3b8', fontSize: 12, fontWeight: '600', marginBottom: 4 },
  coord: { color: '#f1f5f9', fontSize: 15, fontFamily: 'monospace', fontWeight: '600' },
  coordSub: { color: '#64748b', fontSize: 11 },
  addressCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    gap: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#22c55e',
  },
  addressText: { color: '#f1f5f9', fontSize: 14, lineHeight: 20 },
  hints: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    gap: 3,
  },
  hint: { color: '#64748b', fontSize: 11 },
});
