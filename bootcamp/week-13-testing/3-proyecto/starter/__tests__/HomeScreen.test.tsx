// ============================================
// TEST: HomeScreen.test.tsx
// Tests de la pantalla principal
//
// 📋 PARA EL APRENDIZ:
// Completa los TODOs con assertions reales.
// Adapta los datos de prueba a tu dominio asignado.
// Objetivo: ≥ 5 tests en verde.
// ============================================
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';
import { fetchItems } from '../src/services/api';
import type { Item } from '../src/types';

// Mock del módulo de API — reemplaza fetchItems con un jest.fn()
jest.mock('../src/services/api');

// Datos de prueba — adapta a tu dominio
const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Elemento Alpha',
    description: 'Primero de la lista',
    price: 1000,
    inStock: true,
    // TODO: Agregar propiedades de tu dominio
  },
  {
    id: '2',
    name: 'Elemento Beta',
    description: 'Segundo de la lista',
    price: 500,
    inStock: false,
    // TODO: Agregar propiedades de tu dominio
  },
  {
    id: '3',
    name: 'Gamma Especial',
    description: 'Tercero de la lista',
    price: 2000,
    inStock: true,
    // TODO: Agregar propiedades de tu dominio
  },
];

describe('HomeScreen', () => {
  // Limpiar mocks entre tests para evitar contaminación
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('estados de carga', () => {
    it('debe mostrar el indicador de carga mientras espera el fetch', () => {
      // TODO: Configurar el mock para que NUNCA resuelva:
      //   (fetchItems as jest.Mock).mockReturnValue(new Promise(() => {}));
      // Renderizar HomeScreen
      // Verificar que 'loading-indicator' está en pantalla
    });

    it('debe mostrar la lista cuando el fetch resuelve', async () => {
      // TODO: Configurar el mock para que resuelva con MOCK_ITEMS:
      //   (fetchItems as jest.Mock).mockResolvedValue(MOCK_ITEMS);
      // Renderizar HomeScreen
      // Usar waitFor para esperar que aparezcan los items
      // Verificar que 'Elemento Alpha' y 'Elemento Beta' están en pantalla
      // Verificar que el loading-indicator ya NO está
    });

    it('debe mostrar mensaje de error si el fetch falla', async () => {
      // TODO: Configurar el mock para que rechace:
      //   (fetchItems as jest.Mock).mockRejectedValue(new Error('Network error'));
      // Renderizar HomeScreen
      // Usar waitFor para esperar que aparezca el error
      // Verificar que 'Error al cargar elementos' está en pantalla
    });
  });

  describe('búsqueda y filtrado', () => {
    beforeEach(() => {
      // TODO: Configurar el mock para que resuelva con MOCK_ITEMS en cada test de este describe
    });

    it('debe mostrar todos los items al cargar (sin filtro)', async () => {
      // TODO: Renderizar y esperar carga
      // Verificar que los 3 items aparecen en pantalla
    });

    it('debe filtrar items al escribir en el buscador', async () => {
      // TODO: Renderizar y esperar carga
      // Simular escritura en 'search-input' con 'Gamma'
      // Verificar que 'Gamma Especial' sigue visible
      // Verificar que 'Elemento Alpha' y 'Elemento Beta' ya no están
    });

    it('debe mostrar "Sin resultados" cuando no hay coincidencia', async () => {
      // TODO: Renderizar, esperar carga, luego buscar 'zzz'
      // Verificar que 'Sin resultados' aparece en pantalla
    });
  });
});
