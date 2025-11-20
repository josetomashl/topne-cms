import { Alert } from '@/components/Alert';
import { Spinner } from '@/components/Spinner';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestPictogram } from '@/store/modules/pictograms';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export function PictogramPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.pictograms);

  useEffect(() => {
    if (id) {
      dispatch(requestPictogram(id));
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Pictograma no encontrado.</p>;
  }

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center' style={{ marginBottom: 10 }}>
        <h3>
          Pictograma "<b>{item.title}</b>":
        </h3>
        <span>Actualizado: {new Date(item.updatedAt).toLocaleString()}</span>
      </Flex>
      <Alert hideClose>{item.description || 'No hay una descripción disponible.'}</Alert>
    </>
  );
}
