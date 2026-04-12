// ============================================
// COMPONENTE: ListItem
// Fila de la lista grande — candidato a React.memo
// ============================================

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListEntry } from '../data/mockData';

interface ListItemProps {
  item: ListEntry;
}

// ============================================
// PASO 1: React.memo
// ============================================
// Sin memo: cada scroll re-renderiza todos los items visibles
// Con memo: solo re-renderiza si item cambia (muy raramente en listas estáticas)

// Versión SIN memo (activa por defecto):
function ListItemBase({ item }: ListItemProps): React.JSX.Element {
  // Uncomment to verify re-renders:
  // console.log('Render ListItem:', item.id);

  const isOutOfStock = item.subtitle === 'Agotado';

  return (
    <View style={styles.container}>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{item.index + 1}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.subtitle, isOutOfStock && styles.subtitleRed]}>
          {item.subtitle}
        </Text>
      </View>
      <Text style={styles.value}>${item.value.toFixed(2)}</Text>
    </View>
  );
}

// Descomenta para el Paso 1 y cambia el export al final:
// const ListItemMemo = React.memo(function ListItem({ item }: ListItemProps): React.JSX.Element {
//   // console.log('Render ListItem:', item.id);
//   const isOutOfStock = item.subtitle === 'Agotado';
//   return (
//     <View style={styles.container}>
//       <View style={styles.indexBadge}>
//         <Text style={styles.indexText}>{item.index + 1}</Text>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
//         <Text style={[styles.subtitle, isOutOfStock && styles.subtitleRed]}>
//           {item.subtitle}
//         </Text>
//       </View>
//       <Text style={styles.value}>${item.value.toFixed(2)}</Text>
//     </View>
//   );
// });

export default ListItemBase;
// export default ListItemMemo;

export const ITEM_HEIGHT = 72; // px — debe coincidir con la altura del container

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  indexBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  indexText: { fontSize: 11, color: '#94A3B8', fontWeight: '700' },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: '#F1F5F9' },
  subtitle: { fontSize: 12, color: '#10B981', marginTop: 2 },
  subtitleRed: { color: '#F87171' },
  value: { fontSize: 14, fontWeight: '700', color: '#60A5FA' },
});
