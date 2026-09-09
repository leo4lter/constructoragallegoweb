import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase, type Project, type Client, type Equipment, type SiteSettings } from '@/lib/supabase';

type DataContextType = {
  projects: Project[];
  clients: Client[];
  equipment: Equipment[];
  siteSettings: SiteSettings;
  loading: boolean;
  error: string | null;
  refreshProjects: () => Promise<void>;
  refreshClients: () => Promise<void>;
  refreshEquipment: () => Promise<void>;
  refreshSiteSettings: () => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  addProject: (p: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
  updateProject: (id: string, p: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addClient: (c: Omit<Client, 'id' | 'created_at'>) => Promise<void>;
  updateClient: (id: string, c: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  addEquipment: (e: Omit<Equipment, 'id' | 'created_at'>) => Promise<void>;
  updateEquipment: (id: string, e: Partial<Equipment>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;
};

const defaultSettings: SiteSettings = {
  id: 'default',
  logo_url: '',
  icon_url: '',
  site_title: 'Constructora El Gallego',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSiteSettings = useCallback(async () => {
    try {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 'default').single();
      if (data) {
        setSiteSettings(data as unknown as SiteSettings);
      }
    } catch (err: unknown) {
      console.warn('Failed to fetch site settings:', err);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
        return;
      }
      setError(null);
      setProjects(data || []);
    } catch (err: unknown) {
      console.error('Failed to fetch projects:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar proyectos');
    }
  }, []);

  const fetchClients = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
        return;
      }
      setError(null);
      setClients(data || []);
    } catch (err: unknown) {
      console.error('Failed to fetch clients:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar clientes');
    }
  }, []);

  const fetchEquipment = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
        return;
      }
      setError(null);
      setEquipment(data || []);
    } catch (err: unknown) {
      console.error('Failed to fetch equipment:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar equipamiento');
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await Promise.all([fetchProjects(), fetchClients(), fetchEquipment(), fetchSiteSettings()]);
      } catch (err) {
        console.error('Initial data load error:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchProjects, fetchClients, fetchEquipment, fetchSiteSettings]);

  // Update browser tab favicon whenever siteSettings.icon_url changes
  useEffect(() => {
    if (siteSettings?.icon_url) {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
      if (link) {
        link.href = siteSettings.icon_url;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'shortcut icon';
        newLink.href = siteSettings.icon_url;
        document.head.appendChild(newLink);
      }
    }
  }, [siteSettings?.icon_url]);

  const updateSiteSettings = useCallback(async (newSettings: Partial<SiteSettings>) => {
    const updated = {
      ...siteSettings,
      ...newSettings,
      id: 'default',
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('site_settings').upsert(updated);
    if (error) throw error;
    setSiteSettings(updated);
    await fetchSiteSettings();
  }, [siteSettings, fetchSiteSettings]);

  const addProject = useCallback(async (p: Omit<Project, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('projects').insert([p]);
    if (error) throw error;
    await fetchProjects();
  }, [fetchProjects]);

  const updateProject = useCallback(async (id: string, p: Partial<Project>) => {
    const { error } = await supabase.from('projects').update(p).eq('id', id);
    if (error) throw error;
    await fetchProjects();
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    await fetchProjects();
  }, [fetchProjects]);

  const addClient = useCallback(async (c: Omit<Client, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('clients').insert([c]);
    if (error) throw error;
    await fetchClients();
  }, [fetchClients]);

  const updateClient = useCallback(async (id: string, c: Partial<Client>) => {
    const { error } = await supabase.from('clients').update(c).eq('id', id);
    if (error) throw error;
    await fetchClients();
  }, [fetchClients]);

  const deleteClient = useCallback(async (id: string) => {
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (error) throw error;
    await fetchClients();
  }, [fetchClients]);

  const addEquipment = useCallback(async (e: Omit<Equipment, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('equipment').insert([e]);
    if (error) throw error;
    await fetchEquipment();
  }, [fetchEquipment]);

  const updateEquipment = useCallback(async (id: string, e: Partial<Equipment>) => {
    const { error } = await supabase.from('equipment').update(e).eq('id', id);
    if (error) throw error;
    await fetchEquipment();
  }, [fetchEquipment]);

  const deleteEquipment = useCallback(async (id: string) => {
    const { error } = await supabase.from('equipment').delete().eq('id', id);
    if (error) throw error;
    await fetchEquipment();
  }, [fetchEquipment]);

  return (
    <DataContext.Provider
      value={{
        projects,
        clients,
        equipment,
        siteSettings,
        loading,
        error,
        refreshProjects: fetchProjects,
        refreshClients: fetchClients,
        refreshEquipment: fetchEquipment,
        refreshSiteSettings: fetchSiteSettings,
        updateSiteSettings,
        addProject,
        updateProject,
        deleteProject,
        addClient,
        updateClient,
        deleteClient,
        addEquipment,
        updateEquipment,
        deleteEquipment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
