import { Button } from '@/components/Button';
import { InputFile } from '@/components/Input/InputFile';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushNotification } from '@/store/modules/root';
import { requestUser, updateUserAvatar } from '@/store/modules/users';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './styles.module.scss';

export function EditAvatarPage() {
  const { me, getMe } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id && item?.id !== id) {
      dispatch(requestUser(id));
    }
  }, [id, item]);

  const [avatar, setAvatar] = useState<File | null>(null);

  const handleUploadAvatar = async () => {
    if (!id || !item || !avatar) return;
    const res = await dispatch(updateUserAvatar({ id, payload: avatar })).unwrap();

    if (res) {
      if (me) {
        getMe();
      }
      dispatch(pushNotification({ type: 'success', message: 'Avatar subido con éxito.' }));
      navigate('/users');
    }
  };

  return (
    <>
      <h3 className={styles.something}>
        Modificando avatar de "<b>{item?.email}</b>":
      </h3>
      <div>
        <InputFile value={avatar} onChange={setAvatar} accept='img/*' label='Avatar' required showPreview />
        <Button title='Actualizar' onClick={handleUploadAvatar} disabled={loading || !avatar} loading={loading} />
      </div>
    </>
  );
}
