// ============================================
// COMPONENT: ItemCard.tsx
// Tarjeta de item — ya implementada, el estudiante escribe los tests
// ============================================
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface ItemCardProps {
  name: string;
  price: number;
  inStock?: boolean;
  onPress?: (name: string) => void;
  testID?: string;
}

export function ItemCard({
  name,
  price,
  inStock = true,
  onPress,
  testID,
}: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress?.(name)}
      testID={testID ?? `item-card-${name.toLowerCase().replace(/\s/g, '-')}`}
      accessibilityRole="button"
      accessibilityLabel={name}
    >
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <Text
        style={[styles.stock, inStock ? styles.inStockText : styles.outOfStockText]}
        testID="stock-status"
      >
        {inStock ? 'Disponible' : 'Sin stock'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#61DAFB',
    fontSize: 14,
    marginTop: 4,
  },
  stock: {
    fontSize: 12,
    fontWeight: '600',
  },
  inStockText: {
    color: '#22c55e',
  },
  outOfStockText: {
    color: '#ef4444',
  },
});
