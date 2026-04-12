// ============================================
// COMPONENTE: ProductItem
// Fila de producto para la lista de compras
// ============================================

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ProductItemProps {
  name: string;
  price: number;
  category: string;
  onAddToCart: (name: string) => void;
}

// ============================================
// PASO 2: React.memo
// ============================================
// Este componente re-renderiza cada vez que HomeScreen lo hace,
// aunque name, price y category no cambien.
//
// Descomenta la función memoizada y comenta (o elimina) la de arriba:

function ProductItemBase({
  name,
  price,
  category,
  onAddToCart,
}: ProductItemProps): React.JSX.Element {
  // Log para detectar re-renders (dejar activo durante el ejercicio)
  console.log('Render ProductItem:', name);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Pressable
          style={styles.button}
          onPress={() => onAddToCart(name)}
          accessibilityRole="button"
          accessibilityLabel={`Agregar ${name} al carrito`}
        >
          <Text style={styles.buttonText}>+ Carrito</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Descomenta para el Paso 2:
// const ProductItemMemo = React.memo(function ProductItem({
//   name,
//   price,
//   category,
//   onAddToCart,
// }: ProductItemProps): React.JSX.Element {
//   console.log('Render ProductItem:', name);
//   return (
//     <View style={styles.container}>
//       <View style={styles.info}>
//         <Text style={styles.name}>{name}</Text>
//         <Text style={styles.category}>{category}</Text>
//       </View>
//       <View style={styles.right}>
//         <Text style={styles.price}>${price.toFixed(2)}</Text>
//         <Pressable
//           style={styles.button}
//           onPress={() => onAddToCart(name)}
//           accessibilityRole="button"
//           accessibilityLabel={`Agregar ${name} al carrito`}
//         >
//           <Text style={styles.buttonText}>+ Carrito</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// });

// Cambia el export cuando descomentes el componente memoizado:
export default ProductItemBase;
// export default ProductItemMemo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 14,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: '#F1F5F9' },
  category: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 6 },
  price: { fontSize: 15, fontWeight: '700', color: '#60A5FA' },
  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: { fontSize: 12, color: '#FFFFFF', fontWeight: '600' },
});
