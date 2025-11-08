import { Button } from '@/components/Button';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestTags, setPage, setPageSize } from '@/store/modules/tags';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function TagsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, list, page, pageSize, total } = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(requestTags({ page, pageSize }));
  }, [page, pageSize]);

  return (
    <>
      <div className={styles.header}>
        <h3>Etiquetas</h3>
        <Button title='Añadir' onClick={() => navigate('/tags/add')} />
      </div>
      <Table
        headers={[
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' }
        ]}
        items={list}
        loading={loading}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={(p) => dispatch(setPage(p))}
        onPageSizeChange={(p) => dispatch(setPageSize(p))}
      />
    </>
  );
}
