import { Spinner } from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestUser } from '@/store/modules/users';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './styles.module.scss';

export function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(requestUser(id));
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <p className={styles.something}>User details page</p>
      <pre>
        <code>{JSON.stringify(item, null, 2)}</code>
      </pre>
    </>
  );
}
