// ============================================================
// EJERCICIO 02 — Flexbox Layouts
// ============================================================
// Instrucciones: descomenta CADA SECCIÓN (Layout 1, 2, 3, 4)
// de arriba hacia abajo. Verifica en Expo Go antes de continuar.
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

// Label component to identify each layout on screen
function LayoutLabel({ num, title }: { num: number; title: string }): React.JSX.Element {
  return (
    <View style={styles.label}>
      <Text style={styles.labelNumber}>Layout {num}</Text>
      <Text style={styles.labelTitle}>{title}</Text>
    </View>
  );
}

export default function App(): React.JSX.Element {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <Text style={styles.title}>Ejercicio 02 — Flexbox</Text>

      {/* ============================================
          LAYOUT 1: Header con título y botón
          justifyContent: 'space-between' + flexDirection: 'row'
          ============================================ */}
      {/* Descomenta las siguientes líneas: */}
      {/* <LayoutLabel num={1} title="Header: space-between" />
      <View style={styles.layout1}>
        <Text style={styles.headerTitle}>Inicio</Text>
        <Pressable style={styles.headerBtn} onPress={() => {}}>
          <Text style={styles.headerBtnText}>+ Nuevo</Text>
        </Pressable>
      </View> */}

      {/* ============================================
          LAYOUT 2: Tab bar — 4 ítems distribuidos
          justifyContent: 'space-evenly' + flexDirection: 'row'
          ============================================ */}
      {/* Descomenta las siguientes líneas: */}
      {/* <LayoutLabel num={2} title="Tab Bar: space-evenly" />
      <View style={styles.layout2}>
        {['Inicio', 'Buscar', 'Perfil', 'Config'].map((tab) => (
          <View key={tab} style={styles.tabItem}>
            <Text style={styles.tabIcon}>○</Text>
            <Text style={styles.tabLabel}>{tab}</Text>
          </View>
        ))}
      </View> */}

      {/* ============================================
          LAYOUT 3: Tarjeta con avatar e información
          flexDirection: 'row' + alignItems: 'center' + flex: 1
          ============================================ */}
      {/* Descomenta las siguientes líneas: */}
      {/* <LayoutLabel num={3} title="Tarjeta: row + alignItems center" />
      <View style={styles.layout3}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/56' }}
          style={styles.cardAvatar}
          resizeMode="cover"
        />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardName}>Alan Turing</Text>
          <Text style={styles.cardSubtitle}>Padre de la computación</Text>
        </View>
        <Text style={styles.cardTimestamp}>2h</Text>
      </View> */}

      {/* ============================================
          LAYOUT 4: Pantalla dividida en proporciones
          flex: 1 vs flex: 2 — proporción 1/3 : 2/3
          ============================================ */}
      {/* Descomenta las siguientes líneas: */}
      {/* <LayoutLabel num={4} title="Proporciones: flex: 1 vs flex: 2" />
      <View style={styles.layout4}>
        <View style={styles.panel1}>
          <Text style={styles.panelTexto}>1/3</Text>
          <Text style={styles.panelHint}>flex: 1</Text>
        </View>
        <View style={styles.panel2}>
          <Text style={styles.panelTexto}>2/3</Text>
          <Text style={styles.panelHint}>flex: 2</Text>
        </View>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },

  // Label helper
  label: {
    marginTop: 16,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  labelNumber: {
    fontSize: 12,
    color: '#61DAFB',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  labelTitle: {
    fontSize: 14,
    color: '#8b949e',
    fontFamily: 'monospace',
  },

  // LAYOUT 1 — Header
  layout1: {
    flexDirection: 'row',           // hijos en fila
    justifyContent: 'space-between', // título izquierda, botón derecha
    alignItems: 'center',
    backgroundColor: '#161b22',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerBtn: {
    backgroundColor: '#21262d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  headerBtnText: {
    color: '#61DAFB',
    fontSize: 14,
    fontWeight: '600',
  },

  // LAYOUT 2 — Tab bar
  layout2: {
    flexDirection: 'row',     // tabs en fila
    justifyContent: 'space-evenly', // espacio igual incluyendo extremos
    alignItems: 'center',
    backgroundColor: '#161b22',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    color: '#8b949e',
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    color: '#8b949e',
  },

  // LAYOUT 3 — Tarjeta con avatar
  layout3: {
    flexDirection: 'row',  // imagen y texto en fila
    alignItems: 'center',  // vertically centered
    backgroundColor: '#161b22',
    padding: 16,
    borderRadius: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  cardTextContainer: {
    flex: 1,  // ocupa todo el espacio entre el avatar y el timestamp
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#8b949e',
    marginTop: 2,
  },
  cardTimestamp: {
    fontSize: 12,
    color: '#8b949e',
  },

  // LAYOUT 4 — Proporciones
  layout4: {
    flexDirection: 'row',  // paneles en fila
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  panel1: {
    flex: 1,  // ocupa 1/3 del espacio total
    backgroundColor: '#21262d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel2: {
    flex: 2,  // ocupa 2/3 del espacio total
    backgroundColor: '#161b22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelTexto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  panelHint: {
    fontSize: 12,
    color: '#8b949e',
    fontFamily: 'monospace',
    marginTop: 4,
  },
});
