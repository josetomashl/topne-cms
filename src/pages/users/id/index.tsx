import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Alert } from '@/components/Alert';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { PictogramCard } from '@/components/PictogramCard';
import { ReviewCard } from '@/components/ReviewCard';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { Flex } from '@/layouts/Flex';
import { Colors } from '@/plugins/data/colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestUser } from '@/store/modules/users';

export function UserPage() {
  const { id } = useParams();
  const { me } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        {item.id === me?.id ? (
          <h3>Mi perfil</h3>
        ) : (
          <h3>
            Detalles del usuario "<b>{item.email}</b>"
          </h3>
        )}

        <span>Actualizado: {new Date(item.updatedAt).toLocaleString()}</span>
      </Flex>

      <Flex gap={32}>
        <Flex gap={10}>
          <Avatar src={item.avatar} alt='avatar' />
          <Flex flexDirection='column' alignItems='flex-start'>
            <b style={{ fontSize: 20 }}>
              {item.name} {item.surname}
            </b>
            <small style={{ color: Colors.grayDark }}>{item.email}</small>
          </Flex>
        </Flex>
        <Button title='Modificar' onClick={() => navigate(`/users/${item.id}/edit`)} rounded color={Colors.info} />
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
