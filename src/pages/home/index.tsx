import { useEffect } from 'react';

import { Avatar } from '@/components/Avatar';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { Statistics } from '@/views/statistics';
import styles from './styles.module.scss';

export function HomePage() {
  const { isLoading, me, getMe } = useAuth();

  useEffect(() => {
    getMe();
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
      {me && <Statistics />}
    </>
  );
}
