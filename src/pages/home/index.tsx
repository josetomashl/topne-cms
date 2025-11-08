import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export function HomePage() {
  const { isLoading, me, getMe } = useAuth();

  useEffect(() => {
    if (!me) {
      getMe();
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <p className={styles.something}>Bienvenid@, {me?.name}</p>
      <h3>Resumen de datos</h3>
    </>
  );
}
