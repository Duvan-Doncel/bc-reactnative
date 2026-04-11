// Design tokens for the app.

export const COLORS = {
  background: '#0f172a',
  surface: '#1e293b',
  surfaceSecondary: '#334155',
  primary: '#3b82f6',
  primaryDark: '#1d4ed8',
  success: '#22c55e',
  warning: '#facc15',
  error: '#ef4444',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  accent: '#61DAFB',
  border: '#334155',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
} as const;

export const RADII = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 999,
} as const;
