// src/navigation/RootNavigator.tsx
import React from 'react';
import { Pressable, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { RootStackParamList } from './types';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Ítems',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Create')}
              style={{ marginRight: 4 }}
            >
              <Text style={{ color: COLORS.accent, fontSize: 28, lineHeight: 32 }}>+</Text>
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={{ marginLeft: 4, marginRight: 12 }}
            >
              <Text style={{ color: COLORS.accent, fontSize: 20 }}>⚙️</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Crear ítem', presentation: 'modal' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Ajustes' }}
      />
    </Stack.Navigator>
  );
}
