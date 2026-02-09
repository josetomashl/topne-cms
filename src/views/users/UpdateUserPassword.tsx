import { Alert } from '@/components/Alert';
import { Input } from '@/components/Input';
import { Flex } from '@/layouts/Flex';
import { REGEX } from '@/plugins/data/regex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushNotification } from '@/store/modules/root';
import { updateUserPassword } from '@/store/modules/users';
import { type SubmitEvent, useState } from 'react';

interface Props {
  userId: string;
  userEmail: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function UpdateUserPassword({ userId, userEmail = '', onCancel, onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);

  const [form, setForm] = useState({
    password: '',
    repeatedPassword: ''
  });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const res = await dispatch(updateUserPassword({ id: userId, payload: { password: form.password } })).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Contraseña actualizada con éxito.' }));
      if (onSuccess) {
        onSuccess();
      }
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const disabled =
    loading ||
    !form.password ||
    !form.repeatedPassword ||
    form.password !== form.repeatedPassword ||
    !REGEX.password.test(form.password);

  return (
    <>
      <h3>
        Cambiar contraseña del usuario "<b>{userEmail}</b>".
      </h3>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nueva contraseña'
          type='password'
          value={form.password}
          onChange={(val) => setForm({ ...form, password: val })}
          disabled={loading}
          regExp={REGEX.password}
          required
        />
        <Input
          label='Repetir contraseña'
          type='password'
          value={form.repeatedPassword}
          onChange={(val) => setForm({ ...form, repeatedPassword: val })}
          disabled={loading}
          required
        />
        {form.password !== form.repeatedPassword && (
          <Alert type='warning'>
            <p>Las contraseñas deben coincidir.</p>
          </Alert>
        )}
        <Flex justifyContent='space-between' style={{ marginTop: '20px' }}>
          {onCancel && (
            <button type='reset' onClick={handleCancel}>
              Cancelar
            </button>
          )}
          <button type='submit' disabled={disabled}>
            Actualizar
          </button>
        </Flex>
      </form>
    </>
  );
}
