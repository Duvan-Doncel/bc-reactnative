// ============================================
// TEST: ItemListScreen.test.tsx
// Tests de pantalla — filtrado y fetch asíncrono
//
// 📋 INSTRUCCIONES:
// Descomenta cada sección (Paso 3, 4) para completar el ejercicio.
// ============================================
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { ItemListScreen } from '../src/screens/ItemListScreen';
import { fetchItems } from '../src/services/api';

// Mock del módulo de API — DEBE estar en nivel de módulo (antes de describe)
jest.mock('../src/services/api');

const MOCK_ITEMS = [
  { id: '1', name: 'Laptop', price: 2500, inStock: true },
  { id: '2', name: 'Mouse', price: 150, inStock: true },
  { id: '3', name: 'Teclado', price: 300, inStock: false },
];

// ============================================
// PASO 3: fireEvent.changeText — filtrado
// ============================================
console.log('--- Paso 3: fireEvent.changeText ---');

// Descomenta las siguientes líneas:
// describe('ItemListScreen — filtrado', () => {
//   beforeEach(() => {
//     // Configurar el mock para que devuelva datos de forma predecible
//     (fetchItems as jest.Mock).mockResolvedValue(MOCK_ITEMS);
//   });
//
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//
//   it('muestra todos los items al cargar', async () => {
//     render(<ItemListScreen />);
//
//     await waitFor(() => {
//       expect(screen.getByText('Laptop')).toBeTruthy();
//       expect(screen.getByText('Mouse')).toBeTruthy();
//       expect(screen.getByText('Teclado')).toBeTruthy();
//     });
//   });
//
//   it('filtra items al escribir en el buscador', async () => {
//     render(<ItemListScreen />);
//     await waitFor(() => expect(screen.getByText('Laptop')).toBeTruthy());
//
//     const input = screen.getByPlaceholderText('Buscar...');
//     fireEvent.changeText(input, 'lap');
//
//     expect(screen.getByText('Laptop')).toBeTruthy();
//     expect(screen.queryByText('Mouse')).toBeNull();
//     expect(screen.queryByText('Teclado')).toBeNull();
//   });
//
//   it('muestra "Sin resultados" si no hay coincidencia', async () => {
//     render(<ItemListScreen />);
//     await waitFor(() => expect(screen.getByText('Laptop')).toBeTruthy());
//
//     fireEvent.changeText(screen.getByPlaceholderText('Buscar...'), 'xyz');
//     expect(screen.getByText('Sin resultados')).toBeTruthy();
//   });
// });

// ============================================
// PASO 4: waitFor con llamada API mockeada
// ============================================
console.log('--- Paso 4: waitFor + fetch mock ---');

// Descomenta las siguientes líneas:
// describe('ItemListScreen — estados de carga', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//
//   it('muestra indicador de carga mientras espera', () => {
//     // Mock que nunca resuelve (simula carga prolongada)
//     (fetchItems as jest.Mock).mockReturnValue(new Promise(() => {}));
//
//     render(<ItemListScreen />);
//
//     expect(screen.getByTestId('loading-indicator')).toBeTruthy();
//   });
//
//   it('muestra la lista cuando el fetch resuelve', async () => {
//     (fetchItems as jest.Mock).mockResolvedValue(MOCK_ITEMS);
//
//     render(<ItemListScreen />);
//
//     // Esperar a que desaparezca el loading y aparezcan los datos
//     await waitFor(() => {
//       expect(screen.queryByTestId('loading-indicator')).toBeNull();
//       expect(screen.getByText('Laptop')).toBeTruthy();
//     });
//   });
//
//   it('muestra mensaje de error si el fetch falla', async () => {
//     (fetchItems as jest.Mock).mockRejectedValue(new Error('Network error'));
//
//     render(<ItemListScreen />);
//
//     await waitFor(() => {
//       expect(screen.getByText('Error al cargar elementos')).toBeTruthy();
//     });
//   });
// });
