import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import type { UpdateUserDto } from '@/dtos/User';
import { Flex } from '@/layouts/Flex';
import { REGEX } from '@/plugins/data/regex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushNotification } from '@/store/modules/root';
import { requestUser, updateUser } from '@/store/modules/users';
import { type SubmitEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './styles.module.scss';

export function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, item } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id && item?.id !== id) {
      dispatch(requestUser(id));
    }
  }, [id, item]);

  const [form, setForm] = useState<UpdateUserDto>({
    name: '',
    surname: '',
    email: '',
    isActive: false
  });

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        surname: item.surname,
        email: item.email,
        isActive: item.isActive
      });
    }
  }, [item]);

  const handleSubmit = async (e: SubmitEvent) => {
    if (!id || !item) return;
    e.preventDefault();
    const res = await dispatch(updateUser({ id, payload: form })).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Usuario actualizado con éxito.' }));
      navigate('/users');
    }
  };

  const disabled = loading || !form.name || !form.surname || !form.email || !REGEX.email.test(form.email) || !item;

  return (
    <>
      <h3 className={styles.something}>
        Editar usuario "<b>{item?.email}</b>":
      </h3>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nombre'
          value={form.name}
          onChange={(val) => setForm({ ...form, name: val })}
          disabled={loading}
          required
        />
        <Input
          label='Descripción'
          value={form.surname}
          onChange={(val) => setForm({ ...form, surname: val })}
          disabled={loading}
          required
        />
        <Input
          type='email'
          label='Email'
          value={form.email}
          onChange={(val) => setForm({ ...form, email: val })}
          disabled={loading}
          regExp={REGEX.email}
          required
        />
        <Switch label='Activado' value={form.isActive} onChange={(value) => setForm({ ...form, isActive: value })} />
        <Flex justifyContent='space-between' style={{ marginTop: '20px' }}>
          <button type='reset' onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type='submit' disabled={disabled}>
            Actualizar
          </button>
        </Flex>
      </form>
    </>
  );
}
