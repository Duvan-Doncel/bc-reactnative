// ============================================
// DATA: mockData
// Genera 500 items con datos realistas para la lista de performance
// ============================================

export interface ListEntry {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  index: number;
}

const TITLES = [
  'Laptop Pro', 'Monitor 4K', 'Teclado Mecánico', 'Mouse Inalámbrico',
  'Auriculares BT', 'Webcam HD', 'SSD NVMe', 'RAM DDR5', 'GPU RTX',
  'CPU AMD', 'Gabinete ATX', 'Fuente 850W', 'Cooler Líquido', 'Switch Red',
  'Router WiFi 6', 'Cable HDMI', 'Adaptador USB-C', 'Hub USB 4 puertos',
];

const SUBTITLES = [
  'En stock', 'Últimas unidades', 'Agotado', 'Pedido especial', 'En oferta',
];

export function generateMockData(count: number = 500): ListEntry[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    title: `${TITLES[i % TITLES.length]} #${i + 1}`,
    subtitle: SUBTITLES[i % SUBTITLES.length],
    value: Math.round((Math.random() * 1500 + 10) * 100) / 100,
    index: i,
  }));
}

export const MOCK_DATA = generateMockData(500);
