import { Button } from '@/components/Button';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestUsers, setPage, setPageSize } from '@/store/modules/users';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function UsersPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, page, pageSize, loading, total } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(requestUsers({ page, pageSize }));
  }, [page, pageSize]);

  return (
    <>
      <div className={styles.header}>
        <h3>Usuarios</h3>
        <Button title='Añadir' onClick={() => navigate('/users/add')} />
      </div>
      <Table
        items={list}
        headers={[
          { key: 'name', label: 'Nombre' },
          { key: 'surname', label: 'Apellidos' },
          { key: 'email', label: 'Email' },
          { key: 'isActive', label: 'Activo' }
        ]}
        actions={[
          {
            icon: 'circleExclamation',
            onClick: (item) => navigate(`/users/${item.id}`)
          }
        ]}
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
