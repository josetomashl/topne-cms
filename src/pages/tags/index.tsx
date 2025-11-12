import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import type { TagList } from '@/dtos/Tag';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteTag, requestTags, setPage, setPageSize } from '@/store/modules/tags';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function TagsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, list, page, pageSize, total } = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(requestTags({ page, pageSize }));
  }, [page, pageSize]);

  const [isDeleting, setIsDeleting] = useState<TagList>();
  const handleDelete = async (item: TagList) => {
    await dispatch(deleteTag(item.id));
    setIsDeleting(undefined);
  };

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
        actions={[
          { icon: 'eye', variant: 'success', onClick: (item) => navigate(`/tags/${item.id}`) },
          {
            icon: 'pencil',
            variant: 'warning',
            onClick: (item) => navigate(`/tags/${item.id}/edit`)
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
      <Modal isOpen={!!isDeleting} onClose={() => setIsDeleting(undefined)}>
        <h3>
          Borrar etiqueta "<b>{isDeleting?.name}</b>"
        </h3>
        <Flex gap={10} justifyContent='space-between' style={{ marginTop: '20px' }}>
          <Button title='Cancelar' onClick={() => setIsDeleting(undefined)} />
          <Button
            title='Borrar'
            type='reset'
            loading={loading}
            onClick={() => isDeleting && handleDelete(isDeleting)}
          />
        </Flex>
      </Modal>
    </>
  );
}
