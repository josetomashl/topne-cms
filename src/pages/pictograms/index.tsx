import { Button } from '@/components/Button';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestPictograms, setPage, setPageSize } from '@/store/modules/pictograms';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function PictogramsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, page, pageSize, total, list } = useAppSelector((state) => state.pictograms);

  useEffect(() => {
    dispatch(requestPictograms({ page, pageSize }));
  }, [page, pageSize]);

  return (
    <>
      <div className={styles.header}>
        <h3>Pictogramas</h3>
        <Button title='Añadir' onClick={() => navigate('/pictograms/add')} />
      </div>
      <Table
        loading={loading}
        headers={[
          { key: 'title', label: 'Título' },
          { key: 'description', label: 'Descripción' },
          { key: 'isPublished', label: 'Publicado' },
          { key: 'url', label: 'URL', format: 'url' }
        ]}
        items={list}
      />
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={(p) => dispatch(setPage(p))}
        onPageSizeChange={(p) => dispatch(setPageSize(p))}
      />
    </>
  );
}
