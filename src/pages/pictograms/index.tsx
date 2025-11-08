import { Table } from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestPictograms } from '@/store/modules/pictograms';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export function PictogramsPage() {
  const dispatch = useAppDispatch();
  const { loading, list } = useAppSelector((state) => state.tags);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    getData(page, size);
  }, [page, size]);

  const getData = async (page: number, pageSize: number) => {
    await dispatch(requestPictograms({ page, pageSize }));
  };

  return (
    <>
      <p className={styles.something}>Pictogramas</p>
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
