// ============================================
// UTILS: httpClient.ts
// Cliente HTTP mínimo — se mockea en tests
// ============================================

export const httpClient = {
  async get<T>(url: string): Promise<{ data: T }> {
    const res = await fetch(`https://api.ejemplo.com${url}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: T = await res.json();
    return { data };
  },
};
