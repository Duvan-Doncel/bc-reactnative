// ============================================
// COMPONENT: SearchBar
// Campo de búsqueda reutilizable
// ============================================
// OPTIMIZACIÓN: El callback onChangeText debe provenir de useCallback
// en el componente padre para que React.memo funcione correctamente aquí.
// ============================================

import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

// TODO: Envuelve este componente en React.memo
// Justificación: SearchBar solo debe re-renderizar cuando value cambia,
// no cuando HomeScreen actualiza otro estado.

function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar…',
}: SearchBarProps): React.JSX.Element {
  // TODO: Agrega console.log para verificar re-renders antes y después de memo
  // console.log('Render SearchBar');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        clearButtonMode="while-editing"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Campo de búsqueda"
        accessibilityRole="search"
      />
    </View>
  );
}

// TODO: Reemplaza el export con React.memo cuando lo hayas implementado
export default SearchBar;
// export default React.memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
  },
  input: {
    backgroundColor: '#0F172A',
    color: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },
});
