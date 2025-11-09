import { Spinner } from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestTag } from '@/store/modules/tags';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './styles.module.scss';

export function TagPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.tags);

  useEffect(() => {
    if (id) {
      dispatch(requestTag(id));
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p className={styles.something}>Etiqueta no encontrada.</p>;
  }

  return (
    <>
      <p className={styles.something}>Etiqueta {item.name}</p>
      <pre>
        <code>{JSON.stringify(item, null, 2)}</code>
      </pre>
    </>
  );
}
