import { useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router';

import { Spinner } from '@/components/Spinner';
import type { ReviewList } from '@/dtos/Review';
import { ellipsize } from '@/utils';
import styles from './styles.module.scss';

interface Props {
  review: ReviewList;
}

export function ReviewCard({ review }: Props) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/reviews/${review.id}`);
  }, [navigate, review.id]);

  return (
    <article
      className={styles.container}
      role='button'
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
      <div className={styles.reviewImage}>
        <ReactPlayer src={review.url} muted fallback={<Spinner />} width={'100%'} height={'100%'} />
      </div>
      <div className={styles.reviewContent}>
        <h3>{review.title}</h3>
        <p>{ellipsize(review.content, 50)}</p>
        <span className={styles.readMore}>Ver detalles</span>
      </div>
    </article>
  );
}
