import { Alert } from '@/components/Alert';
import { Spinner } from '@/components/Spinner';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestReview } from '@/store/modules/reviews';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import styles from './styles.module.scss';

export function ReviewPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(requestReview(id));
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Review no encontrada.</p>;
  }

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center'>
        <h3>
          Review "<b>{item.title}</b>":
        </h3>
        <span>Actualizado: {new Date(item.updatedAt).toLocaleString()}</span>
      </Flex>
      {/* TODO: show categories and add/remove them */}
      <div className={styles.contentContainer}>{item.content}</div>
      <Alert type='success' hideClose>
        <Link to={item.url} target='_blank' style={{ color: 'blue', textDecoration: 'underline' }}>
          Ir al vídeo
        </Link>
      </Alert>
    </>
  );
}
