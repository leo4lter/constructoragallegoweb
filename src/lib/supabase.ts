import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { safeStorage } from './storage';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  created_at?: string;
};

export type Client = {
  id: string;
  name: string;
  logo_url: string;
  created_at?: string;
};

export type Equipment = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at?: string;
};

export type SiteSettings = {
  id: string;
  logo_url: string;
  icon_url: string;
  site_title?: string;
  created_at?: string;
  updated_at?: string;
};

export const initialSiteSettings: SiteSettings[] = [
  {
    id: 'default',
    logo_url: '', // Empty string means use the default brand symbol / name
    icon_url: '',
    site_title: 'Constructora El Gallego',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Movimiento de Suelo y Nivelación',
    description: 'Excavación y preparación de terrenos con maquinaria pesada propia para proyectos viales y civiles.',
    image_url: 'https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Movimiento de Suelos',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: '2',
    title: 'Pavimentación con Adoquines de Fábrica',
    description: 'Colocación de adoquines de alta resistencia elaborados en nuestra planta propia para calles y paseos.',
    image_url: 'https://images.pexels.com/photos/5690811/pexels-photo-5690811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Adoquines y Premoldeados',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Obra Vial y Consolidación de Caminos',
    description: 'Construcción y mejora de caminos con durabilidad y alto rendimiento en condiciones exigentes.',
    image_url: 'https://images.pexels.com/photos/35846752/pexels-photo-35846752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Obras Viales',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: '4',
    title: 'Infraestructura y Obras Hidráulicas',
    description: 'Soluciones para el control, canalización y drenaje de agua que protegen y optimizan cada proyecto.',
    image_url: 'https://images.pexels.com/photos/37733178/pexels-photo-37733178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Obras Hidráulicas',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: '5',
    title: 'Diseño y Planificación de Obra Civil',
    description: 'Cálculo, replanteo y ejecución técnica coordinada con equipos técnicos especializados.',
    image_url: 'https://images.pexels.com/photos/30751525/pexels-photo-30751525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Diseño de Obras',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: '6',
    title: 'Elementos Premoldeados Estructurales',
    description: 'Piezas premoldeadas producidas localmente con control de calidad y listas para montaje.',
    image_url: 'https://images.pexels.com/photos/36606410/pexels-photo-36606410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Adoquines y Premoldeados',
    created_at: new Date().toISOString(),
  },
];

export const initialClients: Client[] = [
  {
    id: '1',
    name: 'Municipalidad de Sierra Grande',
    logo_url: 'https://images.pexels.com/photos/8961146/pexels-photo-8961146.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Vialidad Provincial',
    logo_url: 'https://images.pexels.com/photos/544971/pexels-photo-544971.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cámara de Construcción',
    logo_url: 'https://images.pexels.com/photos/8482546/pexels-photo-8482546.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Desarrollos Playas Doradas',
    logo_url: 'https://images.pexels.com/photos/8482551/pexels-photo-8482551.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    created_at: new Date().toISOString(),
  },
];

export const initialEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Excavadora Hidráulica',
    description: 'Equipo pesado para movimiento de suelo y excavación de gran escala.',
    image_url: 'https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Retroexcavadora',
    description: 'Maquinaria versátil para obras civiles, mantenimiento y refacciones.',
    image_url: 'https://images.pexels.com/photos/35846752/pexels-photo-35846752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Excavadora Urbana',
    description: 'Equipo compacto para trabajos en zonas urbanas con espacio reducido.',
    image_url: 'https://images.pexels.com/photos/30751525/pexels-photo-30751525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    created_at: new Date().toISOString(),
  },
];

type BaseRecord = {
  id?: string;
  created_at?: string;
  [key: string]: unknown;
};

// Helper to access in-memory / localStorage store
function getLocalTable(table: string): BaseRecord[] {
  try {
    const raw = safeStorage.getItem(`constructora_${table}`);
    if (raw) {
      return JSON.parse(raw) as BaseRecord[];
    }
  } catch {
    // fallback
  }

  let defaults: BaseRecord[] = [];
  if (table === 'projects') defaults = initialProjects;
  else if (table === 'clients') defaults = initialClients;
  else if (table === 'equipment') defaults = initialEquipment;
  else if (table === 'site_settings') defaults = initialSiteSettings;

  try {
    safeStorage.setItem(`constructora_${table}`, JSON.stringify(defaults));
  } catch {
    // ignore
  }
  return [...defaults];
}

function setLocalTable(table: string, items: BaseRecord[]) {
  try {
    safeStorage.setItem(`constructora_${table}`, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function createLocalMock() {
  return {
    from: (table: string) => ({
      select: () => ({
        order: (_col?: string, options?: { ascending?: boolean }) => {
          const items = getLocalTable(table);
          if (options?.ascending) {
            items.sort((a, b) => (String(a.created_at || '') > String(b.created_at || '') ? 1 : -1));
          } else {
            items.sort((a, b) => (String(a.created_at || '') < String(b.created_at || '') ? 1 : -1));
          }
          return Promise.resolve({ data: items, error: null });
        },
        eq: (col: string, val: unknown) => {
          const items = getLocalTable(table);
          const filtered = items.filter((item) => item[col] === val);
          return {
            single: () => Promise.resolve({ data: filtered[0] || null, error: null }),
            then: (resolve: (val: { data: BaseRecord[]; error: null }) => void) =>
              Promise.resolve({ data: filtered, error: null }).then(resolve),
          };
        },
        single: () => {
          const items = getLocalTable(table);
          return Promise.resolve({ data: items[0] || null, error: null });
        },
      }),
      insert: (rows: BaseRecord[]) => {
        const existing = getLocalTable(table);
        const newRows = rows.map((r) => ({
          ...r,
          id: r.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
          created_at: r.created_at || new Date().toISOString(),
        }));
        const updated = [...newRows, ...existing];
        setLocalTable(table, updated);
        return Promise.resolve({ data: newRows, error: null });
      },
      upsert: (rows: BaseRecord[] | BaseRecord) => {
        const rowList = Array.isArray(rows) ? rows : [rows];
        let existing = getLocalTable(table);
        for (const row of rowList) {
          const id = row.id || 'default';
          const idx = existing.findIndex((item) => item.id === id);
          const record = {
            ...row,
            id,
            updated_at: new Date().toISOString(),
          };
          if (idx >= 0) {
            existing[idx] = { ...existing[idx], ...record };
          } else {
            existing = [record, ...existing];
          }
        }
        setLocalTable(table, existing);
        return Promise.resolve({ data: rowList, error: null });
      },
      update: (updates: Partial<BaseRecord>) => ({
        eq: (column: string, value: unknown) => {
          const existing = getLocalTable(table);
          const updated = existing.map((item) => (item[column] === value ? { ...item, ...updates } : item));
          setLocalTable(table, updated);
          return Promise.resolve({ data: updated, error: null });
        },
      }),
      delete: () => ({
        eq: (column: string, value: unknown) => {
          const existing = getLocalTable(table);
          const updated = existing.filter((item) => item[column] !== value);
          setLocalTable(table, updated);
          return Promise.resolve({ data: updated, error: null });
        },
      }),
    }),
  };
}

let realClient: SupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  try {
    realClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('[AI Studio] Supabase client initialization failed, using local mock store:', err);
  }
}

const localMock = createLocalMock();

export const supabase = {
  from: (table: string) => {
    if (!realClient) {
      return localMock.from(table);
    }

    return {
      select: (fields?: string) => ({
        order: async (col: string, options?: { ascending?: boolean }) => {
          try {
            const res = await realClient!.from(table).select(fields).order(col, options);
            if (res.error) {
              console.warn(`[AI Studio] Supabase error on ${table}.select, using local fallback:`, res.error);
              return localMock.from(table).select(fields).order(col, options);
            }
            return res;
          } catch (e) {
            console.warn(`[AI Studio] Failed to fetch from Supabase table ${table}, using local fallback:`, e);
            return localMock.from(table).select(fields).order(col, options);
          }
        },
        eq: (col: string, val: unknown) => ({
          single: async () => {
            try {
              const res = await realClient!.from(table).select(fields).eq(col, val).single();
              if (res.error) {
                console.warn(`[AI Studio] Supabase error on ${table}.single, using local fallback:`, res.error);
                return localMock.from(table).select(fields).eq(col, val).single();
              }
              return res;
            } catch (e) {
              console.warn(`[AI Studio] Failed to fetch single from Supabase table ${table}, using local fallback:`, e);
              return localMock.from(table).select(fields).eq(col, val).single();
            }
          },
        }),
        single: async () => {
          try {
            const res = await realClient!.from(table).select(fields).limit(1).single();
            if (res.error) {
              console.warn(`[AI Studio] Supabase error on ${table}.single, using local fallback:`, res.error);
              return localMock.from(table).select(fields).single();
            }
            return res;
          } catch (e) {
            console.warn(`[AI Studio] Failed to fetch single from Supabase table ${table}, using local fallback:`, e);
            return localMock.from(table).select(fields).single();
          }
        },
      }),
      insert: async (rows: BaseRecord[]) => {
        try {
          const res = await realClient!.from(table).insert(rows);
          if (res.error) {
            console.warn(`[AI Studio] Supabase error on ${table}.insert, using local fallback:`, res.error);
            return localMock.from(table).insert(rows);
          }
          return res;
        } catch (e) {
          console.warn(`[AI Studio] Failed to insert to Supabase table ${table}, using local fallback:`, e);
          return localMock.from(table).insert(rows);
        }
      },
      upsert: async (rows: BaseRecord[] | BaseRecord) => {
        try {
          const res = await realClient!.from(table).upsert(rows);
          if (res.error) {
            console.warn(`[AI Studio] Supabase error on ${table}.upsert, using local fallback:`, res.error);
            return localMock.from(table).upsert(rows);
          }
          return res;
        } catch (e) {
          console.warn(`[AI Studio] Failed to upsert in Supabase table ${table}, using local fallback:`, e);
          return localMock.from(table).upsert(rows);
        }
      },
      update: (updates: Partial<BaseRecord>) => ({
        eq: async (col: string, val: unknown) => {
          try {
            const res = await realClient!.from(table).update(updates).eq(col, val);
            if (res.error) {
              console.warn(`[AI Studio] Supabase error on ${table}.update, using local fallback:`, res.error);
              return localMock.from(table).update(updates).eq(col, val);
            }
            return res;
          } catch (e) {
            console.warn(`[AI Studio] Failed to update in Supabase table ${table}, using local fallback:`, e);
            return localMock.from(table).update(updates).eq(col, val);
          }
        },
      }),
      delete: () => ({
        eq: async (col: string, val: unknown) => {
          try {
            const res = await realClient!.from(table).delete().eq(col, val);
            if (res.error) {
              console.warn(`[AI Studio] Supabase error on ${table}.delete, using local fallback:`, res.error);
              return localMock.from(table).delete().eq(col, val);
            }
            return res;
          } catch (e) {
            console.warn(`[AI Studio] Failed to delete in Supabase table ${table}, using local fallback:`, e);
            return localMock.from(table).delete().eq(col, val);
          }
        },
      }),
    };
  },
  storage: {
    from: (bucket: string) => {
      if (!realClient) {
        return {
          upload: async (path: string) => {
            return { data: { path }, error: null };
          },
          getPublicUrl: (path: string) => {
            return { data: { publicUrl: path } };
          },
        };
      }
      return realClient.storage.from(bucket);
    },
  },
};
