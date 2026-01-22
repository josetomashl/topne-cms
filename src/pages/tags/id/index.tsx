import { useEffect } from 'react';
import { useParams } from 'react-router';

import { Alert } from '@/components/Alert';
import { PictogramCard } from '@/components/PictogramCard';
import { Spinner } from '@/components/Spinner';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestTag } from '@/store/modules/tags';
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
    return <p>Etiqueta no encontrada.</p>;
  }

  return (
    <>
      <h3 style={{ marginBottom: 10 }}>
        Etiqueta "<b>{item.name}</b>":
      </h3>
      <div className={styles.description}>{item.description || 'No hay una descripción disponible.'}</div>
      <br />
      {item.pictograms?.length ? (
        <>
          <span>Pictogramas relacionados:</span>
          <Flex alignItems='stretch' gap={10} style={{ padding: '10px 0' }}>
            {item.pictograms.map((p) => (
              <PictogramCard key={p.id} pictogram={p} />
            ))}
          </Flex>
        </>
      ) : (
        <Alert type='warning' hideClose>
          No tiene pictogramas asociados.
        </Alert>
      )}
    </>
  );
}
