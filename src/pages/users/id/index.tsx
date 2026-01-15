import { useEffect } from 'react';
import { useParams } from 'react-router';

import { Alert } from '@/components/Alert';
import { Avatar } from '@/components/Avatar';
import { PictogramCard } from '@/components/PictogramCard';
import { ReviewCard } from '@/components/ReviewCard';
import { Spinner } from '@/components/Spinner';
import { Flex } from '@/layouts/Flex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestUser } from '@/store/modules/users';

export function UserPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(requestUser(id));
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center' style={{ marginBottom: 10 }}>
        <h3>
          Detalles del usuario "<b>{item.email}</b>"
        </h3>
        <span>Actualizado: {new Date(item.updatedAt).toLocaleString()}</span>
      </Flex>

      <Flex gap={10}>
        <Avatar src={item.avatar} alt='avatar' />
        <b style={{ fontSize: 18 }}>
          {item.name} {item.surname}
        </b>
      </Flex>

      {!item.isActive && (
        <Alert hideClose type='warning'>
          <Flex justifyContent='space-between'>¡Usuario deshabilitado!</Flex>
        </Alert>
      )}

      <br />
      {item.pictograms?.length ? (
        <>
          <span>Pictogramas relacionados:</span>
          <Flex alignItems='stretch' gap={10} style={{ padding: '10px 0' }}>
            {item.pictograms.map((p) => (
              <PictogramCard key={p.id} pictogram={p} />
            ))}
          </Flex>
        </>
      ) : null}

      <br />
      {item.reviews?.length ? (
        <>
          <span>Reviews relacionadas:</span>
          <Flex alignItems='stretch' gap={10} style={{ padding: '10px 0' }}>
            {item.reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </Flex>
        </>
      ) : null}
    </>
  );
}
