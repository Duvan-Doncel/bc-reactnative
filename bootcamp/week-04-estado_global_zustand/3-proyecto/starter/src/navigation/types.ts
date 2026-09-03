// src/navigation/types.ts
// Tipos de parámetros para los navigators del proyecto.

// src/navigation/types.ts

export type RootTabParamList = {
  Home: undefined;
  Saved: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    name: string;
  };
};