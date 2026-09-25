// ============================================
// AUTH STORE — Zustand con persist + SecureStore
// ============================================
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthUser, LoginCredentials, RegisterData } from '../types';
import { saveTokens, clearTokens, getRefreshToken } from '../services/tokenService';
import * as authService from '../services/authService';

interface AuthState {
  // State
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  /** Autentica al usuario, guarda tokens en SecureStore y actualiza estado */
  login: (credentials: LoginCredentials) => Promise<void>;
  /** Registra un nuevo usuario */
  register: (data: RegisterData) => Promise<void>;
  /** Cierra sesión y limpia todos los tokens */
  logout: () => Promise<void>;
  /** Renueva el access token usando el refresh token almacenado */
  refreshTokens: () => Promise<void>;
  /** Limpia el error del estado */
  clearError: () => void;
}

function extractErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { message?: string } | undefined)?.message ?? 'Error de autenticación';
  }
  return 'Error de autenticación';
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ─── Estado inicial ─────────────────────────────────
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ─── login ──────────────────────────────────────────
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          await saveTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
          set({
            user: {
              id: response.id,
              username: response.username,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              image: response.image,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({ error: extractErrorMessage(err), isLoading: false });
          throw err;
        }
      },

      // ─── register ───────────────────────────────────────
      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          await saveTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
          set({
            user: {
              id: response.id,
              username: response.username,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              image: response.image,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({ error: extractErrorMessage(err), isLoading: false });
          throw err;
        }
      },

      // ─── logout ─────────────────────────────────────────
      logout: async () => {
        await clearTokens();
        set({ user: null, isAuthenticated: false, error: null });
      },

      // ─── refreshTokens ──────────────────────────────────
      refreshTokens: async () => {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          await get().logout();
          return;
        }
        try {
          const response = await authService.refreshTokens(refreshToken);
          await saveTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
        } catch {
          await get().logout();
        }
      },

      // ─── clearError ─────────────────────────────────────
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // partialize: solo persiste user e isAuthenticated
      // Los tokens NO se persisten aquí — están en SecureStore
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
