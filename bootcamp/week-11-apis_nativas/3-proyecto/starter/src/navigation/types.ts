// ============================================
// NAVIGATION TYPES
// ============================================

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Detail: { itemId: string };
  Camera: { itemId: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
export type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;
