import { Input } from '@/components/Input';
import { RegisterRequest } from '@/dtos/Auth';
import { useAuth } from '@/hooks/useAuth';
import { useTitle } from '@/hooks/useTitle';
import { REGEX } from '@/plugins/data/regex';
import { type SubmitEvent, useState } from 'react';
import { Link } from 'react-router';
import styles from './styles.module.scss';

export function RegisterPage() {
  useTitle('Register page');
  const { isLoading, register } = useAuth();

  const [form, setForm] = useState<RegisterRequest>({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const disabled =
    isLoading ||
    !form.name ||
    !form.surname ||
    !form.email ||
    !form.password ||
    !REGEX.email.test(form.email) ||
    !REGEX.password.test(form.password);
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    await register({ name: form.name, surname: form.surname, email: form.email, password: form.password });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Registro</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label='Nombre'
            value={form.name}
            onChange={(value) => {
              setForm((prev) => ({
                ...prev,
                name: value
              }));
            }}
            required
          />
          <Input
            label='Apellidos'
            value={form.surname}
            onChange={(value) => {
              setForm((prev) => ({
                ...prev,
                surname: value
              }));
            }}
            required
          />
          <Input
            type='email'
            label='Email'
            value={form.email}
            onChange={(value) => {
              setForm((prev) => ({
                ...prev,
                email: value
              }));
            }}
            regExp={REGEX.email}
            errorMessage='Introduce un email válido'
            required
          />
          <Input
            type='password'
            value={form.password}
            label='Password'
            onChange={(value) => {
              setForm((prev) => ({
                ...prev,
                password: value
              }));
            }}
            required
            regExp={REGEX.password}
            errorMessage='La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra mayúscula y una letra minúscula.'
          />

          <Link to='/login' className='underlined' style={{ marginRight: 10 }}>
            <span className={styles.link}>Ya tengo cuenta</span>
          </Link>
          <button type='submit' disabled={disabled}>
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
