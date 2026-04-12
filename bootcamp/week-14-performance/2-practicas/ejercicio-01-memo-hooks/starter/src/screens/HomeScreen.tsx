// ============================================
// SCREEN: HomeScreen
// Pantalla principal con contador, filtro y lista de productos
// Aplica memo, useCallback y useMemo paso a paso
// ============================================

import React, { useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductItem from '../components/ProductItem';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Laptop Pro 15"', price: 1299.99, category: 'Computación' },
  { id: '2', name: 'Teclado Mecánico', price: 89.99, category: 'Periféricos' },
  { id: '3', name: 'Monitor 4K 27"', price: 499.99, category: 'Computación' },
  { id: '4', name: 'Mouse Inalámbrico', price: 45.99, category: 'Periféricos' },
  { id: '5', name: 'Auriculares BT', price: 129.99, category: 'Audio' },
  { id: '6', name: 'Webcam HD', price: 79.99, category: 'Periféricos' },
];

const CATEGORIES = ['Todos', 'Computación', 'Periféricos', 'Audio'];

export function HomeScreen(): React.JSX.Element {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // ============================================
  // PASO 3: useCallback para el handler del carrito
  // ============================================
  // Sin useCallback: nueva función en cada render → rompe React.memo de ProductItem
  // Con useCallback: misma referencia → ProductItem no re-renderiza

  // ❌ Versión sin memoizar (activa por defecto):
  const handleAddToCart = (name: string) => {
    setCart((prev) => [...prev, name]);
  };

  // Descomenta para el Paso 3 (y comenta la de arriba):
  // const handleAddToCart = useCallback((name: string) => {
  //   setCart((prev) => [...prev, name]);
  // }, []); // setCart es estable → dependencias vacías

  // ============================================
  // PASO 4: useMemo para la lista filtrada
  // ============================================
  // Sin useMemo: se filtra el array en cada render (aunque products y selectedCategory no cambien)
  // Con useMemo: solo recalcula cuando cambian products o selectedCategory

  // ❌ Versión sin memoizar (activa por defecto):
  const filteredProducts =
    selectedCategory === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  // Descomenta para el Paso 4 (y comenta el bloque de arriba):
  // const filteredProducts = useMemo(() => {
  //   console.log('Recalculando lista filtrada');
  //   return selectedCategory === 'Todos'
  //     ? PRODUCTS
  //     : PRODUCTS.filter((p) => p.category === selectedCategory);
  // }, [selectedCategory]); // PRODUCTS es constante fuera del componente

  return (
    <SafeAreaView style={styles.container}>
      {/* Contador — cambia estado del padre sin tocar la lista */}
      <View style={styles.counterRow}>
        <Text style={styles.label}>Contador (no afecta la lista):</Text>
        <Pressable style={styles.counterBtn} onPress={() => setCount((c) => c + 1)}>
          <Text style={styles.counterText}>{count} +1</Text>
        </Pressable>
      </View>

      {/* Carrito */}
      <Text style={styles.cartInfo}>
        🛒 Carrito: {cart.length} items
        {cart.length > 0 && ` — último: ${cart[cart.length - 1]}`}
      </Text>

      {/* Filtro por categoría */}
      <View style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.catBtn, selectedCategory === cat && styles.catBtnActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[styles.catText, selectedCategory === cat && styles.catTextActive]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Lista de productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            name={item.name}
            price={item.price}
            category={item.category}
            onAddToCart={handleAddToCart}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1E293B',
  },
  label: { fontSize: 13, color: '#94A3B8' },
  counterBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  counterText: { color: '#E9D5FF', fontWeight: '700', fontSize: 14 },
  cartInfo: { padding: 12, fontSize: 13, color: '#34D399', backgroundColor: '#064E3B' },
  categories: { flexDirection: 'row', padding: 12, gap: 8 },
  catBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#334155',
  },
  catBtnActive: { backgroundColor: '#2563EB' },
  catText: { fontSize: 12, color: '#94A3B8' },
  catTextActive: { color: '#FFFFFF', fontWeight: '600' },
});
