// ============================================
// TEST: ItemCard.test.tsx
// Tests de componente con RNTL
//
// 📋 INSTRUCCIONES:
// Descomenta cada sección (Paso 1, 2) para completar el ejercicio.
// ============================================
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ItemCard } from '../src/components/ItemCard';

// ============================================
// PASO 1: render + queries básicas
// ============================================
console.log('--- Paso 1: render y queries ---');

// Descomenta las siguientes líneas:
// describe('ItemCard', () => {
//   it('muestra el nombre del item', () => {
//     render(<ItemCard name="Laptop" price={2500} />);
//     expect(screen.getByText('Laptop')).toBeTruthy();
//   });
//
//   it('muestra el precio formateado', () => {
//     render(<ItemCard name="Mouse" price={150} />);
//     expect(screen.getByText('$150')).toBeTruthy();
//   });
//
//   it('muestra "Disponible" cuando inStock es true (por defecto)', () => {
//     render(<ItemCard name="Teclado" price={300} />);
//     expect(screen.getByText('Disponible')).toBeTruthy();
//     expect(screen.queryByText('Sin stock')).toBeNull();
//   });
//
//   it('muestra "Sin stock" cuando inStock es false', () => {
//     render(<ItemCard name="Auriculares" price={800} inStock={false} />);
//     expect(screen.getByText('Sin stock')).toBeTruthy();
//     expect(screen.queryByText('Disponible')).toBeNull();
//   });
// });

// ============================================
// PASO 2: fireEvent.press y callbacks
// ============================================
console.log('--- Paso 2: fireEvent.press ---');

// Descomenta las siguientes líneas:
// describe('ItemCard — interacciones', () => {
//   it('llama onPress con el nombre al presionar', () => {
//     const handlePress = jest.fn();
//     render(<ItemCard name="Monitor" price={1200} onPress={handlePress} />);
//
//     // Presionar usando accessibilityLabel (semántico)
//     fireEvent.press(screen.getByRole('button', { name: 'Monitor' }));
//
//     expect(handlePress).toHaveBeenCalledTimes(1);
//     expect(handlePress).toHaveBeenCalledWith('Monitor');
//   });
//
//   it('no llama onPress si no se pasó el callback', () => {
//     // No debe lanzar error aunque onPress sea undefined
//     render(<ItemCard name="Webcam" price={500} />);
//     expect(() => fireEvent.press(screen.getByRole('button'))).not.toThrow();
//   });
//
//   it('renderiza con testID correcto por defecto', () => {
//     render(<ItemCard name="Laptop Stand" price={200} />);
//     expect(screen.getByTestId('item-card-laptop-stand')).toBeTruthy();
//   });
//
//   it('usa el testID personalizado cuando se provee', () => {
//     render(<ItemCard name="Mesa" price={900} testID="custom-id" />);
//     expect(screen.getByTestId('custom-id')).toBeTruthy();
//   });
// });
