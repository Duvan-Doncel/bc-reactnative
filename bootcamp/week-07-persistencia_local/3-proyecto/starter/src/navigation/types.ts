// src/navigation/types.ts
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Settings: undefined;
};

export type HomeScreenProps     = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type CreateScreenProps   = NativeStackScreenProps<RootStackParamList, 'Create'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
