import { useEffect } from 'react';
import { useParams } from 'react-router';

import { Alert } from '@/components/Alert';
import { ReviewCard } from '@/components/ReviewCard';
import { Spinner } from '@/components/Spinner';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestCategory } from '@/store/modules/categories';
import styles from './styles.module.scss';

export function CategoryPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (id) {
      dispatch(requestCategory(id));
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Categoría no encontrada.</p>;
  }

  return (
    <>
      <h3 style={{ marginBottom: 10 }}>
        Categoría "<b>{item.name}</b>":
      </h3>
      <div className={styles.description}>{item.description || 'No hay una descripción disponible.'}</div>
      <br />
      {item.reviews?.length ? (
        <>
          <span>Reviews relacionadas:</span>
          <Flex alignItems='stretch' gap={10} style={{ padding: '10px 0' }}>
            {item.reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </Flex>
        </>
      ) : (
        <Alert type='warning' hideClose>
          No tiene reviews asociados.
        </Alert>
      )}
    </>
  );
}
