import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import type { PictogramList } from '@/dtos/Pictogram';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deletePictogram, requestPictograms, setPage, setPageSize } from '@/store/modules/pictograms';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function PictogramsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, page, pageSize, total, list } = useAppSelector((state) => state.pictograms);

  useEffect(() => {
    dispatch(requestPictograms({ page, pageSize }));
  }, [page, pageSize]);

  const [isDeleting, setIsDeleting] = useState<PictogramList>();
  const handleDelete = async () => {
    if (!isDeleting) return;
    await dispatch(deletePictogram(isDeleting.id));
    setIsDeleting(undefined);
  };

  return (
    <>
      <div className={styles.header}>
        <h3>Pictogramas</h3>
        <Button title='Añadir' onClick={() => navigate('/pictograms/add')} />
      </div>
      {/* TODO: search bar (title) */}
      {/* TODO: filter dropdown clearable (tags) */}
      {/* TODO: filter dropdown clearable (author) */}
      <Table
        headers={[
          { key: 'title', label: 'Título' },
          { key: 'description', label: 'Descripción' },
          { key: 'author', label: 'Autor' },
          { key: 'isPublished', label: 'Publicado' }
        ]}
        items={list}
        loading={loading}
        actions={[
          { icon: 'eye', variant: 'success', onClick: (item) => navigate(`/pictograms/${item.id}`) },
          {
            icon: 'pencil',
            variant: 'warning',
            onClick: (item) => navigate(`/pictograms/${item.id}/edit`)
          },
          { icon: 'trash', variant: 'error', onClick: setIsDeleting }
        ]}
      />
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={(p) => dispatch(setPage(p))}
        onPageSizeChange={(p) => dispatch(setPageSize(p))}
      />
      {isDeleting && (
        <Modal isOpen={!!isDeleting} onClose={() => setIsDeleting(undefined)}>
          <h3>
            ¿Borrar pictograma "<b>{isDeleting.title}</b>"?
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
