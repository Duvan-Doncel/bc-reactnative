import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';
import { DomainItem } from '../types';

// TODO: Replace this title with your domain name
// Example: "Catálogo de Libros", "Medicamentos", "Rutinas del Gimnasio"
const SCREEN_TITLE = 'TODO: Nombre de tu dominio';

export function HomeScreen(): React.JSX.Element {
  // TODO: When you integrate TanStack Query (week-10), replace MOCK_ITEMS
  // with a useQuery hook that fetches real data from your API

  const handleItemPress = (item: DomainItem): void => {
    // TODO: Navigate to DetailScreen when you add React Navigation
    Alert.alert(item.name, item.description);
  };

  const renderItem: ListRenderItem<DomainItem> = ({ item }) => (
    <ItemCard item={item} onPress={handleItemPress} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{SCREEN_TITLE}</Text>
        <Text style={styles.subtitle}>{MOCK_ITEMS.length} elementos</Text>
      </View>

      <FlatList
        data={MOCK_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  list: {
    paddingTop: 8,
    paddingBottom: 24,
  },
});
