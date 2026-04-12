// ============================================
// TEST: ItemCard.test.tsx
// Tests del componente ItemCard
//
// 📋 PARA EL APRENDIZ:
// Completa los TODOs con assertions reales.
// Adapta los datos de prueba a tu dominio asignado.
// Objetivo: ≥ 4 tests en verde.
// ============================================
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ItemCard } from '../src/components/ItemCard';
import type { Item } from '../src/types';

// Datos de prueba — adapta a tu dominio
const MOCK_ITEM_IN_STOCK: Item = {
  id: '1',
  name: 'Elemento de Prueba',
  description: 'Descripción del elemento',
  price: 1500,
  inStock: true,
  // TODO: Agregar propiedades de tu dominio
};

const MOCK_ITEM_OUT_OF_STOCK: Item = {
  id: '2',
  name: 'Elemento Agotado',
  description: 'Este elemento no tiene stock',
  price: 800,
  inStock: false,
  // TODO: Agregar propiedades de tu dominio
};

describe('ItemCard', () => {
  describe('renderizado', () => {
    it('debe mostrar el nombre del item', () => {
      // TODO: Renderizar MOCK_ITEM_IN_STOCK
      // Verificar que el nombre aparece en pantalla
    });

    it('debe mostrar el precio del item', () => {
      // TODO: Renderizar MOCK_ITEM_IN_STOCK
      // Verificar que el precio aparece en pantalla (puede ser como string '$1500' o formateado)
    });

    it('debe mostrar "Disponible" cuando inStock es true', () => {
      // TODO: Renderizar MOCK_ITEM_IN_STOCK
      // Verificar que muestra 'Disponible'
      // Verificar que NO muestra 'Sin stock'
    });

    it('debe mostrar "Sin stock" cuando inStock es false', () => {
      // TODO: Renderizar MOCK_ITEM_OUT_OF_STOCK
      // Verificar que muestra 'Sin stock'
      // Verificar que NO muestra 'Disponible'
    });

    it('debe mostrar la descripción del item', () => {
      // TODO: Verificar que la descripción aparece en pantalla
    });
  });

  describe('interacciones', () => {
    it('debe llamar onPress con el item al presionar', () => {
      // TODO: Crear un mock function con jest.fn()
      // Renderizar con el mock como prop onPress
      // Simular press con fireEvent.press(screen.getByRole('button'))
      // Verificar que el mock fue llamado con MOCK_ITEM_IN_STOCK
    });

    it('debe usar el testID correcto', () => {
      // TODO: Renderizar y verificar que el testID es 'item-card-1' (por el id='1')
    });

    it('no debe lanzar error si onPress no se provee', () => {
      // TODO: Renderizar SIN prop onPress
      // Presionar el card
      // Verificar que no lanza error (usar expect(...).not.toThrow())
    });
  });
});
