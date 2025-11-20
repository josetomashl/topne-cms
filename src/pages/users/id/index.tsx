import { Spinner } from '@/components/Spinner';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestUser } from '@/store/modules/users';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './styles.module.scss';

export function UserPage() {
  const { id } = useParams();
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

  if (!item) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center'>
        <h3 className={styles.something}>
          Detalles del usuario "<b>{item?.email}</b>"
        </h3>
        <span>Actualizado: {new Date(item.updatedAt).toLocaleString()}</span>
      </Flex>
      <pre>
        <code>{JSON.stringify(item, null, 2)}</code>
      </pre>
    </>
  );
}
