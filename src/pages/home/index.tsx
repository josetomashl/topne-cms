import { Avatar } from '@/components/Avatar';
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
      {me && (
        <div className={styles.header}>
          <Avatar src={me.avatar} alt='Imagen de perfil' />
          <h4>
            Bienvenid@, {me.name} {me.surname}
          </h4>
        </div>
      )}
      <h3>Resumen de datos</h3>
      <p>Últimos 3 pictogramas/reviews publicados</p>
      <p>Pictogramas/Reviews pendientes de publicar (borrador)</p>
    </>
  );
}
