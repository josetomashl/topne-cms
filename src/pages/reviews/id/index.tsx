import { Spinner } from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestReview } from '@/store/modules/reviews';
import { useEffect } from 'react';
import { useParams } from 'react-router';

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
      <h3 style={{ marginBottom: 10 }}>
        Review "<b>{item.title}</b>":
      </h3>
      <p>{item.content}</p>
    </>
  );
}
