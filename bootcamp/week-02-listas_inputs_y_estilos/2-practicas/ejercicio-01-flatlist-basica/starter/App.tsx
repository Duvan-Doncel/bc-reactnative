import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

// ============================================
// DATOS MOCK
// ============================================
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Laptop Pro 15"', category: 'Electrónica', price: 1299 },
  { id: '2', name: 'Mouse Inalámbrico', category: 'Periféricos', price: 45 },
  { id: '3', name: 'Teclado Mecánico', category: 'Periféricos', price: 89 },
  { id: '4', name: 'Monitor 4K', category: 'Electrónica', price: 549 },
  { id: '5', name: 'Auriculares BT', category: 'Audio', price: 149 },
  { id: '6', name: 'Webcam HD', category: 'Periféricos', price: 79 },
  { id: '7', name: 'SSD 1TB', category: 'Almacenamiento', price: 119 },
  { id: '8', name: 'Hub USB-C', category: 'Adaptadores', price: 59 },
  { id: '9', name: 'Pad de carga', category: 'Accesorios', price: 35 },
  { id: '10', name: 'Soporte laptop', category: 'Ergonomía', price: 49 },
  { id: '11', name: 'Luz de escritorio', category: 'Accesorios', price: 39 },
  { id: '12', name: 'Cable HDMI 2m', category: 'Cables', price: 18 },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function App(): React.JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ============================================
  // PASO 4: Pull-to-refresh
  // ============================================
  // Descomenta las siguientes líneas:
  // const handleRefresh = useCallback(async () => {
  //   setIsRefreshing(true);
  //   // En una app real, aquí llamarías a la API para recargar datos
  //   await new Promise((resolve) => setTimeout(resolve, 1200));
  //   setIsRefreshing(false);
  // }, []);

  // ============================================
  // PASO 5: renderItem con Pressable
  // ============================================
  // Reemplaza el renderItem básico del Paso 1 con este:
  // const renderItem = ({ item }: { item: Product }) => (
  //   <Pressable
  //     style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
  //     onPress={() => console.log('Seleccionado:', item.name)}
  //   >
  //     <View style={styles.itemContent}>
  //       <Text style={styles.itemName}>{item.name}</Text>
  //       <Text style={styles.itemCategory}>{item.category}</Text>
  //     </View>
  //     <Text style={styles.itemPrice}>${item.price}</Text>
  //   </Pressable>
  // );

  // ============================================
  // PASO 1: renderItem básico
  // ============================================
  // Descomenta las siguientes líneas:
  // const renderItem = ({ item }: { item: Product }) => (
  //   <View style={styles.item}>
  //     <Text style={styles.itemName}>{item.name}</Text>
  //     <Text style={styles.itemCategory}>{item.category}</Text>
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* ============================================
          PASO 1: FlatList básica
          Descomenta el bloque completo:
          ============================================ */}
      {/* <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      /> */}

      {/* ============================================
          PASO 2: Agrega ItemSeparatorComponent al FlatList del Paso 1
          Descomenta la línea del separator:
          ============================================ */}
      {/* ItemSeparatorComponent={() => <View style={styles.separator} />} */}

      {/* ============================================
          PASO 3: Header y estado vacío — descomenta estas dos props:
          ============================================ */}
      {/* ListHeaderComponent={
        <Text style={styles.listHeader}>Catálogo de Productos</Text>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>No hay productos disponibles</Text>
      } */}

      {/* ============================================
          PASO 4: Pull-to-refresh — agrega estas dos props:
          ============================================ */}
      {/* refreshing={isRefreshing}
      onRefresh={handleRefresh} */}

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Descomenta el Paso 1 para ver la lista
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d1117',
  },

  // List
  listHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6edf3',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  // Item (Paso 1)
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#161b22',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e6edf3',
  },
  itemCategory: {
    fontSize: 12,
    color: '#8b949e',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#61DAFB',
  },
  // Paso 5: feedback de presión
  itemPressed: {
    opacity: 0.6,
    backgroundColor: '#21262d',
  },

  // Paso 2: separador
  separator: {
    height: 1,
    backgroundColor: '#30363d',
    marginHorizontal: 16,
  },

  // Paso 3: estado vacío
  emptyText: {
    fontSize: 15,
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 60,
  },

  // Placeholder inicial
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#484f58',
    textAlign: 'center',
  },
});
