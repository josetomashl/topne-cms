import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import type { ReviewList } from '@/dtos/Review';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteReview, requestReviews, setPage, setPageSize } from '@/store/modules/reviews';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function ReviewsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, list, page, pageSize, total } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(requestReviews({ page, pageSize }));
  }, [page, pageSize]);

  const [isDeleting, setIsDeleting] = useState<ReviewList>();
  const handleDelete = async () => {
    if (!isDeleting) return;
    await dispatch(deleteReview(isDeleting.id));
    setIsDeleting(undefined);
  };

  return (
    <>
      <div className={styles.header}>
        <h3>Reviews</h3>
        <Button title='Añadir' onClick={() => navigate('/reviews/add')} />
      </div>
      <Table
        headers={[
          { key: 'title', label: 'Título' },
          { key: 'isPublished', label: 'Publicado' }
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
      {isDeleting && (
        <Modal isOpen={!!isDeleting} onClose={() => setIsDeleting(undefined)}>
          <h3>
            ¿Borrar review "<b>{isDeleting.title}</b>"?
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
