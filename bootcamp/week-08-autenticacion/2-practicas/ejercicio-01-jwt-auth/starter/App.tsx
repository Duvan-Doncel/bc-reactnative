import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

// ============================================
// TIPOS
// ============================================
interface JwtPayload {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}

interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

// Claves para SecureStore
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const BASE_URL = 'https://dummyjson.com';

export default function App(): React.JSX.Element {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [secureStoreValue, setSecureStoreValue] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<object | null>(null);

  // ============================================
  // PASO 1: Login y mostrar tokens decodificados
  // ============================================
  // Descomenta la función handleLogin completa:
  //
  // const handleLogin = async () => {
  //   if (!username.trim() || !password.trim()) {
  //     Alert.alert('Error', 'Ingresa usuario y contraseña');
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${BASE_URL}/auth/login`, {
  //       username: username.trim(),
  //       password: password.trim(),
  //       expiresInMins: 30,
  //     });
  //     const data: AuthUser = response.data;
  //     // Decodificar el accessToken para ver su contenido
  //     const decoded = jwtDecode<JwtPayload>(data.accessToken);
  //     console.log('--- JWT Decoded Payload ---');
  //     console.log('sub (userId):', decoded.sub);
  //     console.log('username:', decoded.username);
  //     console.log('iat:', new Date(decoded.iat * 1000).toISOString());
  //     console.log('exp:', new Date(decoded.exp * 1000).toISOString());
  //     // PASO 2 → guardar en SecureStore
  //     await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
  //     await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
  //     setUser(data);
  //     Alert.alert('✅ Login exitoso', `Bienvenido ${data.firstName}`);
  //   } catch (error) {
  //     const message = axios.isAxiosError(error)
  //       ? error.response?.data?.message ?? 'Error de red'
  //       : 'Error desconocido';
  //     Alert.alert('❌ Error de login', message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ============================================
  // PASO 2: Verificar que los tokens están en SecureStore
  // ============================================
  // Descomenta la función handleVerifySecureStore:
  //
  // const handleVerifySecureStore = async () => {
  //   const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  //   setSecureStoreValue(token ? `${token.substring(0, 40)}...` : 'No hay token guardado');
  // };

  // ============================================
  // PASO 3: Llamar a ruta protegida /auth/me con Bearer token
  // ============================================
  // Descomenta la función handleGetProfile:
  //
  // const handleGetProfile = async () => {
  //   setIsLoading(true);
  //   try {
  //     const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  //     if (!token) {
  //       Alert.alert('Sin token', 'Debes hacer login primero');
  //       return;
  //     }
  //     const response = await axios.get(`${BASE_URL}/auth/me`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setProfileData({
  //       id: response.data.id,
  //       fullName: `${response.data.firstName} ${response.data.lastName}`,
  //       email: response.data.email,
  //       age: response.data.age,
  //       phone: response.data.phone,
  //     });
  //   } catch (error) {
  //     const status = axios.isAxiosError(error) ? error.response?.status : null;
  //     Alert.alert(
  //       status === 401 ? '🔒 No autorizado (401)' : '❌ Error',
  //       status === 401 ? 'Token inválido o expirado' : 'Error inesperado',
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ============================================
  // PASO 4: Logout — limpiar tokens y estado
  // ============================================
  // Descomenta la función handleLogout:
  //
  // const handleLogout = async () => {
  //   await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  //   await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  //   setUser(null);
  //   setSecureStoreValue(null);
  //   setProfileData(null);
  //   Alert.alert('👋 Logout', 'Tokens eliminados de SecureStore');
  // };

  // ============================================
  // RENDER
  // ============================================
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ejercicio 01 — JWT Auth</Text>

      {/* Login Form */}
      {!user ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Paso 1 y 2: Login + SecureStore</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Usuario"
            placeholderTextColor="#64748b"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            placeholderTextColor="#64748b"
            secureTextEntry
          />
          {/* Paso 1 y 2: Cuando descomentes handleLogin, activa este botón */}
          <Pressable
            style={[styles.button, styles.buttonDisabled]}
            // onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            )}
          </Pressable>
          <Text style={styles.hint}>
            💡 Descomenta handleLogin en el código (Pasos 1 y 2)
          </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Autenticado</Text>
          <Text style={styles.info}>Usuario: {user.username}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>
            Token: {user.accessToken.substring(0, 30)}...
          </Text>
        </View>
      )}

      {/* Paso 2: Verificar SecureStore */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 2: Verificar SecureStore</Text>
        {/* Activa este botón cuando descomentes handleVerifySecureStore */}
        <Pressable
          style={[styles.button, styles.buttonSecondary, styles.buttonDisabled]}
          // onPress={handleVerifySecureStore}
        >
          <Text style={styles.buttonTextSecondary}>Verificar en SecureStore</Text>
        </Pressable>
        {secureStoreValue && (
          <Text style={styles.tokenText}>{secureStoreValue}</Text>
        )}
        <Text style={styles.hint}>
          💡 Descomenta handleVerifySecureStore en el código
        </Text>
      </View>

      {/* Paso 3: Ruta protegida */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 3: GET /auth/me (Bearer)</Text>
        {/* Activa este botón cuando descomentes handleGetProfile */}
        <Pressable
          style={[styles.button, styles.buttonSuccess, styles.buttonDisabled]}
          // onPress={handleGetProfile}
        >
          <Text style={styles.buttonText}>Llamar /auth/me</Text>
        </Pressable>
        {profileData && (
          <Text style={styles.info}>{JSON.stringify(profileData, null, 2)}</Text>
        )}
        <Text style={styles.hint}>
          💡 Descomenta handleGetProfile en el código
        </Text>
      </View>

      {/* Paso 4: Logout */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 4: Logout</Text>
        {/* Activa este botón cuando descomentes handleLogout */}
        <Pressable
          style={[styles.button, styles.buttonDanger, styles.buttonDisabled]}
          // onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </Pressable>
        <Text style={styles.hint}>
          💡 Descomenta handleLogout en el código
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#61DAFB',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    color: '#f1f5f9',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#475569',
  },
  buttonSuccess: {
    backgroundColor: '#166534',
  },
  buttonDanger: {
    backgroundColor: '#991b1b',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonTextSecondary: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 14,
  },
  info: {
    color: '#cbd5e1',
    fontSize: 13,
    fontFamily: 'monospace',
  },
  tokenText: {
    color: '#a78bfa',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  hint: {
    color: '#475569',
    fontSize: 11,
    fontStyle: 'italic',
  },
});
