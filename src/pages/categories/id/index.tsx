import { Alert } from '@/components/Alert';
import { Spinner } from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestCategory } from '@/store/modules/categories';
import { useEffect } from 'react';
import { useParams } from 'react-router';

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
      <Alert hideClose>{item.description || 'No hay una descripción disponible.'}</Alert>
      {/* TODO: show reviews as a table */}
    </>
  );
}
