// src/storage/mmkv.ts
// Instancia global de MMKV para toda la app.
// Importa `storage` desde aquí en cualquier hook o pantalla.
// ⚠️  Requiere build nativo — no funciona con Expo Go.

import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'app-storage' });
