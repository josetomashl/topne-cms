import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import type { CategoryList } from '@/dtos/Category';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteCategory, requestCategories, setPage, setPageSize } from '@/store/modules/categories';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function CategoriesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, list, page, pageSize, total } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(requestCategories({ page, pageSize }));
  }, [page, pageSize]);

  const [isDeleting, setIsDeleting] = useState<CategoryList>();
  const handleDelete = async () => {
    if (!isDeleting) return;
    await dispatch(deleteCategory(isDeleting.id));
    setIsDeleting(undefined);
  };

  return (
    <>
      <div className={styles.header}>
        <h3>Categorías</h3>
        <Button title='Añadir' onClick={() => navigate('/categories/add')} />
      </div>
      <Table
        headers={[
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' }
        ]}
        items={list}
        loading={loading}
        actions={[
          { icon: 'eye', variant: 'success', onClick: (item) => navigate(`/categories/${item.id}`) },
          {
            icon: 'pencil',
            variant: 'warning',
            onClick: (item) => navigate(`/categories/${item.id}/edit`)
          },
          { icon: 'trash', variant: 'error', onClick: setIsDeleting }
        ]}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={(p) => dispatch(setPage(p))}
        onPageSizeChange={(p) => dispatch(setPageSize(p))}
      />
      {isDeleting && (
        <Modal isOpen={!!isDeleting} onClose={() => setIsDeleting(undefined)}>
          <h3>
            ¿Borrar categoría "<b>{isDeleting.name}</b>"?
          </h3>
          <Flex gap={10} justifyContent='space-between' style={{ marginTop: '20px' }}>
            <Button title='Cancelar' onClick={() => setIsDeleting(undefined)} />
            <Button title='Borrar' color={Colors.error} loading={loading} onClick={handleDelete} />
          </Flex>
        </Modal>
      )}
    </>
  );
}
