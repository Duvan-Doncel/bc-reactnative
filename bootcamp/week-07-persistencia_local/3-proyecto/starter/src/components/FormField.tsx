// src/components/FormField.tsx
// Componente reutilizable: encapsula Controller + TextInput + error.
// Reutilizado de semana 06.

import React from 'react';
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

interface FormFieldProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  errorMessage?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  errorMessage,
  ...inputProps
}: FormFieldProps<T>): React.JSX.Element {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errorMessage ? styles.inputError : null]}
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={COLORS.textMuted}
            {...inputProps}
          />
        )}
      />
      {/* minHeight: 16 evita saltos de layout al aparecer/desaparecer el error */}
      <Text style={styles.error}>{errorMessage ?? ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.label },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
    fontSize: 16,
  },
  inputError: { borderColor: COLORS.danger },
  error: { fontSize: 12, color: COLORS.danger, minHeight: 16 },
});
