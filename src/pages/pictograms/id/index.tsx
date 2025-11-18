import { Alert } from '@/components/Alert';
import { Spinner } from '@/components/Spinner';
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
      <h3 style={{ marginBottom: 10 }}>
        Pictograma "<b>{item.title}</b>":
      </h3>
      <Alert hideClose>{item.description || 'No hay una descripción disponible.'}</Alert>
    </>
  );
}
