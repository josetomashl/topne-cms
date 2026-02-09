import { Input } from '@/components/Input';
import { CreateUserDto } from '@/dtos/User';
import { Flex } from '@/layouts/Flex';
import { REGEX } from '@/plugins/data/regex';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushNotification } from '@/store/modules/root';
import { createUser } from '@/store/modules/users';
import { type SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export function AddUserPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);

  const [form, setForm] = useState<CreateUserDto>({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const disabled = !form.name || !form.surname || !form.email || !REGEX.password.test(form.password);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const res = await dispatch(createUser(form)).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Usuario creada con éxito.' }));
      navigate(`/users/${res.id}`);
    }
  };

  return (
    <>
      <h3>Añadir nuevo usuario:</h3>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nombre'
          value={form.name}
          onChange={(val) => setForm({ ...form, name: val })}
          disabled={loading}
          required
        />
        <Input
          label='Apellidos'
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
          required
        />
        <Input
          type='password'
          label='Contraseña'
          value={form.password}
          onChange={(val) => setForm({ ...form, password: val })}
          disabled={loading}
          required
          regExp={REGEX.password}
        />
        <Flex justifyContent='space-between' style={{ marginTop: '20px' }}>
          <button type='reset'>Cancelar</button>
          <button type='submit' disabled={loading || disabled}>
            Crear
          </button>
        </Flex>
      </form>
    </>
  );
}
