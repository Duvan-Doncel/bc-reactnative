import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
// PASO 1 y 2: descomenta las siguientes importaciones:
// import * as WebBrowser from 'expo-web-browser';
// import {
//   makeRedirectUri,
//   useAuthRequest,
//   type AuthSessionResult,
// } from 'expo-auth-session';

// PASO 1: Registrar el manejador de deep links para el callback de OAuth
// Debe llamarse en el nivel superior del módulo (fuera de cualquier componente)
// WebBrowser.maybeCompleteAuthSession();

// ============================================
// PASO 1: Configurar makeRedirectUri
// ============================================
// Descomenta la constante redirectUri:
//
// const redirectUri = makeRedirectUri({ scheme: 'bcauth08' });
// console.log('Redirect URI:', redirectUri);
// En build nativo:  "bcauth08://"
// En Expo Go:       "exp://192.168.x.x:8081"

// ============================================
// PASO 2: Discovery document de GitHub
// ============================================
// Descomenta el objeto discovery:
//
// const discovery = {
//   authorizationEndpoint: 'https://github.com/login/oauth/authorize',
//   tokenEndpoint: 'https://github.com/login/oauth/access_token',
// };

// Reemplaza con tu Client ID de GitHub OAuth App
const GITHUB_CLIENT_ID = 'REEMPLAZA_CON_TU_CLIENT_ID';

export default function App(): React.JSX.Element {
  const [status, setStatus] = useState<string>('idle');
  const [code, setCode] = useState<string | null>(null);
  const [codeVerifier, setCodeVerifier] = useState<string | null>(null);

  // ============================================
  // PASO 2: Hook useAuthRequest
  // ============================================
  // Descomenta el hook:
  //
  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     clientId: GITHUB_CLIENT_ID,
  //     scopes: ['read:user', 'user:email'],
  //     redirectUri,
  //     usePKCE: true,
  //     // usePKCE: true es el default — expo-auth-session genera:
  //     //   code_verifier: string aleatoria de 43-128 chars
  //     //   code_challenge: base64url(SHA256(code_verifier))
  //   },
  //   discovery,
  // );

  // ============================================
  // PASO 3 y 4: Manejar la respuesta OAuth
  // ============================================
  // Descomenta el useEffect que lee `response`:
  //
  // React.useEffect(() => {
  //   if (!response) return;
  //
  //   // PASO 3: Éxito
  //   if (response.type === 'success') {
  //     const authCode = response.params.code;
  //     setCode(authCode);
  //     setCodeVerifier(request?.codeVerifier ?? null);
  //     setStatus('success');
  //     console.log('--- OAuth Success ---');
  //     console.log('code:', authCode);
  //     console.log('code_verifier:', request?.codeVerifier);
  //     // ⚠️ SIGUIENTE PASO en producción:
  //     // Enviar { code, code_verifier } a tu backend
  //     // para que intercambie por access_token con GitHub
  //     return;
  //   }
  //
  //   // PASO 4: Cancelación o error
  //   if (response.type === 'cancel' || response.type === 'dismiss') {
  //     setStatus('cancelled');
  //     return;
  //   }
  //   if (response.type === 'error') {
  //     setStatus(`error: ${response.error?.message ?? 'desconocido'}`);
  //   }
  // }, [response]);

  // ============================================
  // RENDER
  // ============================================
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ejercicio 02 — OAuth PKCE</Text>
      <Text style={styles.subtitle}>GitHub OAuth con Expo AuthSession</Text>

      {/* Estado del flujo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estado del flujo</Text>
        <View style={[styles.statusBadge, getStatusStyle(status)]}>
          <Text style={styles.statusText}>{getStatusLabel(status)}</Text>
        </View>
      </View>

      {/* Paso 1: Redirect URI */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 1: Redirect URI</Text>
        {/* Cuando descomentes makeRedirectUri, muestra la URI aquí */}
        <Text style={styles.tokenText}>
          {/* redirectUri ?? */ '⬆️ Descomenta los pasos en el código'}
        </Text>
        <Text style={styles.hint}>
          💡 Descomenta WebBrowser.maybeCompleteAuthSession() y makeRedirectUri
        </Text>
      </View>

      {/* Paso 2 y 3: Botón de login */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Paso 2 y 3: Iniciar OAuth</Text>
        <Pressable
          style={[
            styles.button,
            styles.buttonGitHub,
            // request ? {} : styles.buttonDisabled,
            styles.buttonDisabled,
          ]}
          onPress={() => {
            // Cuando descomentes el useAuthRequest, activa esto:
            // setStatus('loading');
            // promptAsync();
          }}
          // disabled={!request}
        >
          <Text style={styles.buttonText}>🐙 Continuar con GitHub</Text>
        </Pressable>
        <Text style={styles.hint}>
          💡 Descomenta useAuthRequest y promptAsync()
        </Text>
      </View>

      {/* Resultado del code */}
      {code && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Authorization Code recibido</Text>
          <Text style={styles.label}>code:</Text>
          <Text style={styles.tokenText}>{code}</Text>
          <Text style={styles.label}>code_verifier (PKCE):</Text>
          <Text style={styles.tokenText}>
            {codeVerifier?.substring(0, 50)}...
          </Text>
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ En producción: enviar {'{code, code_verifier}'} al backend{'\n'}
              El backend hace el exchange con GitHub → access_token{'\n'}
              NUNCA exponer client_secret en el cliente
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    idle: '⏸️ Esperando...',
    loading: '⏳ Abriendo browser...',
    success: '✅ Autorización exitosa',
    cancelled: '🚫 Cancelado por el usuario',
  };
  return labels[status] ?? `❌ ${status}`;
}

function getStatusStyle(status: string): object {
  if (status === 'success') return { backgroundColor: '#14532d' };
  if (status === 'cancelled') return { backgroundColor: '#7c2d12' };
  if (status.startsWith('error')) return { backgroundColor: '#7f1d1d' };
  return { backgroundColor: '#1e293b' };
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
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
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
  statusBadge: {
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  statusText: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
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
  button: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonGitHub: {
    backgroundColor: '#24292e',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  warningBox: {
    backgroundColor: '#451a03',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#f97316',
  },
  warningText: {
    color: '#fed7aa',
    fontSize: 12,
    lineHeight: 18,
  },
});
