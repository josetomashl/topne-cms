import { useAuth } from '@/hooks/useAuth';
import styles from './styles.module.scss';

export function HomePage() {
  const { me, logout } = useAuth();

  return (
    <>
      <p className={styles.something}>Welcome {me?.name}</p>
      <p onClick={logout}>Log out</p>
    </>
  );
}
