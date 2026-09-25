// ============================================
// TIPOS GLOBALES — week-08 Autenticación
// ============================================

/** Tokens recibidos del server al autenticarse */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Datos del usuario autenticado (dominio: mercado campesino) */
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  /** Puesto asignado al vendedor dentro del mercado */
  stallName: string;
  /** Cantidad de productos publicados por el vendedor */
  productsPublished: number;
  /** Fecha en la que el vendedor se unió al mercado (YYYY-MM-DD) */
  memberSince: string;
}

/** Payload decodificado del JWT */
export interface JwtPayload {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}

/** Credentials para login */
export interface LoginCredentials {
  username: string;
  password: string;
}

/** Datos para registro */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/** Respuesta del endpoint /auth/login y /auth/refresh */
export interface AuthResponse extends AuthTokens {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}
