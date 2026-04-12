import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DomainItem } from '../types';

interface ItemCardProps {
  item: DomainItem;
  onPress: (item: DomainItem) => void;
}

// TODO: Adapt this card to show the relevant fields of your domain
// Example (Biblioteca): show title, author, availability badge
// Example (Farmacia):   show name, price, stock with low-stock warning
// Example (Gimnasio):   show member name, plan badge, active status

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const handlePress = (): void => {
    onPress(item);
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        {/* TODO: Add domain-specific fields here */}
        {/* Example (Farmacia): stock badge
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Stock: {item.stock}</Text>
        </View>
        */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardPressed: {
    opacity: 0.75,
    backgroundColor: '#273449',
  },
  content: {
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F1F5F9',
  },
  description: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
});
