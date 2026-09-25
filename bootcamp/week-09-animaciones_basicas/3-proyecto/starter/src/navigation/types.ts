// Navigation parameter types for the app.

import type { Item } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Detail: { item: Item };
};
