// ============================================
// COMPONENT: ItemCard
// Tarjeta de item del dominio asignado
// ============================================
// OPTIMIZACIÓN: Este componente es candidato a React.memo.
// Aplícalo cuando hayas verificado que re-renderiza sin necesidad.
// ============================================

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Item } from '../types';
import { formatPrice, truncateText } from '../utils/formatters';

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

// TODO: Envuelve este componente en React.memo
// Justificación: ItemCard debe re-renderizar solo cuando su prop `item` cambia,
// no cuando HomeScreen escribe en el TextInput de búsqueda.

function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  // TODO: Agrega console.log para detectar re-renders (quitar antes de entregar)
  // console.log('Render ItemCard:', item.name);

  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${item.name}`}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.main}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {truncateText(item.description)}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={[styles.badge, !item.inStock && styles.badgeOut]}>
          <Text style={styles.badgeText}>
            {item.inStock ? 'Disponible' : 'Agotado'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// TODO: Reemplaza el export con React.memo cuando lo hayas implementado
export default ItemCard;
// export default React.memo(ItemCard);

// Altura constante — debe coincidir con ITEM_HEIGHT en mockData.ts
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 88,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  main: { flex: 1, paddingRight: 12 },
  name: { fontSize: 15, fontWeight: '600', color: '#F1F5F9' },
  description: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 6 },
  price: { fontSize: 14, fontWeight: '700', color: '#60A5FA' },
  badge: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeOut: { backgroundColor: '#7F1D1D' },
  badgeText: { fontSize: 11, color: '#A7F3D0', fontWeight: '600' },
});
