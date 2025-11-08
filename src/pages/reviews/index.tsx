import { Table } from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestReviews } from '@/store/modules/reviews';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export function ReviewsPage() {
  const dispatch = useAppDispatch();
  const { loading, list } = useAppSelector((state) => state.tags);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    getData(page, size);
  }, [page, size]);

  const getData = async (page: number, pageSize: number) => {
    await dispatch(requestReviews({ page, pageSize }));
  };

  return (
    <>
      <p className={styles.something}>Reviews</p>
      <Table
        headers={[
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' }
        ]}
        items={list}
      />
    </>
  );
}
