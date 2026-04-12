import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DomainItem } from '../types';

interface ItemCardProps {
  item: DomainItem;
  onPress: (item: DomainItem) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      testID={`item-card-${item.id}`}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      {/* TODO: Add domain-specific fields below */}
      {/* Example (Farmacia): <Text style={styles.price}>${item.price}</Text> */}
      {/* Example (Biblioteca): <Text style={styles.author}>{item.author}</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
});
