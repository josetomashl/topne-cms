import { Button } from '@/components/Button';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestReviews, setPage, setPageSize } from '@/store/modules/reviews';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function ReviewsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, list, page, pageSize, total } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(requestReviews({ page, pageSize }));
  }, [page, pageSize]);

  return (
    <>
      <div className={styles.header}>
        <h3>Reviews</h3>
        <Button title='Añadir' onClick={() => navigate('/tags/add')} />
      </div>
      <Table
        headers={[
          { key: 'title', label: 'Título' },
          { key: 'isPublished', label: 'Publicado' }
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
