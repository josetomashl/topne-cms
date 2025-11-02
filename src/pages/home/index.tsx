import { useAuth } from '@/hooks/useAuth';
import styles from './styles.module.scss';

export function HomePage() {
  const { me } = useAuth();

  return (
    <>
      <p className={styles.something}>Bienvenid@, {me?.name}</p>
      <h3>Resumen de datos</h3>
    </>
  );
}
