// src/storage/mmkv.ts
// Instancia global de MMKV para toda la app.
// Requiere build nativo, no funciona con Expo Go.

import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'app-storage' });
