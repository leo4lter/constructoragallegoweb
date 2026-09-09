import { useState, useEffect } from 'react';
import { DataProvider } from '@/context/DataContext';
import LandingPage from '@/components/landing/LandingPage';
import AdminPage from '@/components/admin/AdminPage';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('admin') || window.location.pathname.startsWith('/admin')) {
        return 'admin';
      }
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('admin') || window.location.pathname.startsWith('/admin')) {
        setCurrentPath('admin');
      } else {
        setCurrentPath('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: 'home' | 'admin') => {
    if (path === 'admin') {
      window.location.hash = '/admin';
      setCurrentPath('admin');
    } else {
      window.location.hash = '';
      setCurrentPath('home');
    }
  };

  return (
    <ErrorBoundary>
      <DataProvider>
        {currentPath === 'admin' ? (
          <AdminPage onGoHome={() => navigateTo('home')} />
        ) : (
          <LandingPage onGoAdmin={() => navigateTo('admin')} />
        )}
      </DataProvider>
    </ErrorBoundary>
  );
}
