import { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminLayout, { type AdminSection } from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ClientsManager from '@/components/admin/ClientsManager';
import EquipmentManager from '@/components/admin/EquipmentManager';
import BrandingSettings from '@/components/admin/BrandingSettings';
import { safeSessionStorage } from '@/lib/storage';

export default function AdminPage({ onGoHome }: { onGoHome?: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<AdminSection>('dashboard');

  useEffect(() => {
    if (safeSessionStorage.getItem('admin_auth') === 'true') {
      setAuthed(true);
    }
  }, []);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminLayout
      active={section}
      onNavigate={setSection}
      onLogout={() => {
        safeSessionStorage.removeItem('admin_auth');
        setAuthed(false);
      }}
      onGoHome={onGoHome}
    >
      {section === 'dashboard' && <AdminDashboard onNavigate={setSection} />}
      {section === 'branding' && <BrandingSettings />}
      {section === 'projects' && <ProjectsManager />}
      {section === 'clients' && <ClientsManager />}
      {section === 'equipment' && <EquipmentManager />}
    </AdminLayout>
  );
}
