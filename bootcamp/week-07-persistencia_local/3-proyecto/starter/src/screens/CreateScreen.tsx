// src/screens/CreateScreen.tsx
// Formulario para registrar un producto del mercado campesino (RHF + Zod).

import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: '', body: '', price: '', category: '' },
  });

  const { mutate: createItem, isPending } = useCreateItem();

  function onSubmit(data: ItemFormData): void {
    createItem(
      {
        title: data.title,
        body: data.body ?? '',
        userId: 1,
        price: data.price ? Number(data.price) : undefined,
        category: data.category || undefined,
      },
      { onSuccess: () => navigation.goBack() },
    );
  }

  const canSubmit = !isSubmitting && !isPending;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.hint}>Registra un producto de tu puesto en el mercado.</Text>

        <FormField
          control={control}
          name="title"
          label="Nombre del producto *"
          placeholder="Ej: Papa criolla, Mora, Queso campesino…"
          returnKeyType="next"
          errorMessage={errors.title?.message}
        />

        <FormField
          control={control}
          name="category"
          label="Categoría"
          placeholder="Ej: Verduras, Frutas, Lácteos…"
          returnKeyType="next"
          errorMessage={errors.category?.message}
        />

        <FormField
          control={control}
          name="price"
          label="Precio (COP)"
          placeholder="Ej: 4500"
          keyboardType="numeric"
          returnKeyType="next"
          errorMessage={errors.price?.message}
        />

        <FormField
          control={control}
          name="body"
          label="Descripción"
          placeholder="Origen, presentación, si es orgánico…"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          errorMessage={errors.body?.message}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting || isPending
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Crear producto</Text>
            }
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  hint: { ...TYPOGRAPHY.caption, fontStyle: 'italic' },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700' },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
