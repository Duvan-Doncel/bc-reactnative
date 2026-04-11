// ============================================
// THEME
// ============================================
// Paleta de colores y espaciados del proyecto.
// Adapta los colores según las necesidades de tu dominio.

export const theme = {
  colors: {
    background: '#0f172a',
    surface: '#1e293b',
    surfaceAlt: '#334155',
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    textSubtle: '#64748b',
    border: '#334155',
    accent: '#61DAFB',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 6,
    md: 12,
    lg: 16,
    full: 9999,
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
} as const;
