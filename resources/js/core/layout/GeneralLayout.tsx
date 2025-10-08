import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useAuthStore } from '../stores/authStore';
import { GeneralLayoutProps } from '../types/types';
import Dashboard from '../components/Dashboard';
import { LoadingSpiner } from '../components/LoadingSpin';

export const GeneralLayout = ({ children, page }: GeneralLayoutProps) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !checkAuth()) {
      router.visit('/login');
    }
  }, [isAuthenticated, checkAuth]);

  if (!isAuthenticated && !checkAuth()) {
    return <LoadingSpiner type='Redireccion'/>
  }

  return (
    <>
      <Dashboard page={page} />
      {children}
    </>
  );
};
