import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedCard } from '../components/AnimatedCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { COLORS, SPACING } from '../theme';
import type { Item } from '../types';
import type { RootStackParamList } from '../navigation/types';

// Android requires this flag to enable LayoutAnimation.
// Must be called outside the component, at module level.
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// Productos de ejemplo del puesto en el mercado campesino.
const SAMPLE_ITEMS: Item[] = [
  { id: '1', name: 'Tomate chonto', description: 'Tomate fresco de cosecha semanal', category: 'Verduras', price: 2500, progress: 0.8 },
  { id: '2', name: 'Papa criolla', description: 'Papa criolla seleccionada, ideal para sancocho', category: 'Tubérculos', price: 3200, progress: 0.45 },
  { id: '3', name: 'Leche entera', description: 'Leche de finca, entrega diaria', category: 'Lácteos', price: 4000, progress: 0.2 },
  { id: '4', name: 'Mango tommy', description: 'Mango dulce de temporada', category: 'Frutas', price: 2800, progress: 0.65 },
];

const CATEGORY_POOL = ['Verduras', 'Frutas', 'Lácteos', 'Tubérculos'];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const [items, setItems] = useState<Item[]>(SAMPLE_ITEMS);

  // Un Animated.Value por producto, creado de forma perezosa.
  // Los productos presentes al montar arrancan en 0 (se animan en cascada);
  // los que se agregan después arrancan en 1 (LayoutAnimation ya anima su entrada).
  const initialIds = useRef(new Set(SAMPLE_ITEMS.map(item => item.id))).current;
  const itemAnims = useRef<Map<string, Animated.Value>>(new Map()).current;

  const getItemAnim = (id: string): Animated.Value => {
    let anim = itemAnims.get(id);
    if (!anim) {
      anim = new Animated.Value(initialIds.has(id) ? 0 : 1);
      itemAnims.set(id, anim);
    }
    return anim;
  };

  useEffect(() => {
    Animated.stagger(
      80,
      SAMPLE_ITEMS.map(item =>
        Animated.timing(getItemAnim(item.id), {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    itemAnims.delete(id);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: `Producto ${items.length + 1}`,
      description: 'Nuevo producto añadido al puesto',
      category: CATEGORY_POOL[Math.floor(Math.random() * CATEGORY_POOL.length)],
      price: Math.round((Math.random() * 4000 + 1000) / 100) * 100,
      progress: Math.random(),
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(prev => [...prev, newItem]);
  };

  const renderItem = ({ item }: { item: Item }) => {
    const anim = getItemAnim(item.id);

    return (
      <Animated.View
        style={{
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        }}
      >
        <AnimatedCard
          onPress={() => navigation.navigate('Detail', { item })}
          style={styles.card}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>
            {item.category} · ${item.price.toLocaleString('es-CO')} COP
          </Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          {item.progress !== undefined && (
            <ProgressBar
              progress={item.progress}
              label="Stock disponible"
            />
          )}
          <AnimatedButton
            label="Eliminar"
            variant="success"
            onPress={() => handleRemoveItem(item.id)}
          />
        </AnimatedCard>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Mercado Campesino</Text>
            <Text style={styles.subtitle}>{items.length} productos en tu puesto</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <AnimatedButton label="+ Añadir item" onPress={handleAddItem} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    gap: SPACING.sm,
  },
  itemName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  itemMeta: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  itemDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  separator: {
    height: SPACING.md,
  },
  footer: {
    marginTop: SPACING.xl,
  },
});
