// ============================================================
// EJERCICIO 01 — Core Components: Tarjeta de Perfil
// ============================================================
// Instrucciones: descomenta CADA SECCIÓN de arriba hacia abajo.
// Verifica en Expo Go que funciona antes de pasar al siguiente paso.
// ============================================================

import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App(): React.JSX.Element {
  return (
    // ScrollView allows the content to scroll if it overflows the screen
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* ============================================
          PASO 1: Estructura base con View y Text
          ============================================ */}
      {/* Descomenta las siguientes líneas: */}
      {/* <View style={styles.card}>
        <Text style={styles.title}>Mi Perfil</Text>
      </View> */}

      {/* ============================================
          PASO 2: Imagen de perfil circular
          ============================================
          Reemplaza el bloque del Paso 1 por este:
      */}
      {/* <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/120' }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={styles.title}>Mi Perfil</Text>
      </View> */}

      {/* ============================================
          PASO 3: Información del perfil
          ============================================
          Reemplaza el bloque anterior por este:
      */}
      {/* <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/120' }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={styles.name}>Ada Lovelace</Text>
        <Text style={styles.role}>Ingeniera de Software</Text>
        <Text style={styles.bio} numberOfLines={3}>
          Primera programadora de la historia. Escribió el primer algoritmo
          diseñado para ser procesado por una máquina.
        </Text>
      </View> */}

      {/* ============================================
          PASO 4: Fila de estadísticas
          ============================================
          Agrega este bloque DENTRO del card, después del bio:
      */}
      {/* <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>1.2k</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>318</Text>
          <Text style={styles.statLabel}>Siguiendo</Text>
        </View>
      </View> */}

      {/* ============================================
          PASO 5: Botón de acción con feedback visual
          ============================================
          Agrega este bloque después del statsRow:
      */}
      {/* <Pressable
        style={({ pressed }) => [
          styles.btnFollow,
          pressed && styles.btnFollowPressed,
        ]}
        onPress={() => console.log('¡Siguiendo!')}
      >
        <Text style={styles.btnText}>Seguir</Text>
      </Pressable> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Screen container — fills the entire available space
  screen: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  // Card — white rounded container
  card: {
    backgroundColor: '#161b22',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30363d',
  },

  // PASO 2 — Avatar circular
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // ancho/2 = círculo perfecto
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#61DAFB',
  },

  // PASO 1 / 3 — Textos
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#61DAFB',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: '#8b949e',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },

  // PASO 4 — Estadísticas en fila
  statsRow: {
    flexDirection: 'row',           // hijos en fila horizontal
    justifyContent: 'space-around', // espacio igual entre ellos
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#30363d',
    paddingTop: 20,
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center', // número y label centrados
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#8b949e',
    marginTop: 2,
  },

  // PASO 5 — Botón con estado presionado
  btnFollow: {
    backgroundColor: '#61DAFB',
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  btnFollowPressed: {
    opacity: 0.7, // feedback visual al presionar
  },
  btnText: {
    color: '#0d1117',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
