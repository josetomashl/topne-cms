import { Input } from '@/components/Input';
import { LoginRequest } from '@/dtos/Auth';
import { useAuth } from '@/hooks/useAuth';
import { useTitle } from '@/hooks/useTitle';
import { REGEX } from '@/plugins/data/regex';
import { type SubmitEvent, useState } from 'react';
import styles from './styles.module.scss';

export function LoginPage() {
  useTitle('Login - CMS');
  const { isLoading, login } = useAuth();

  const [form, setForm] = useState<LoginRequest>({
    email: '',
    password: ''
  });

  const disabled =
    isLoading || !form.email || !form.password || !REGEX.email.test(form.email) || !REGEX.password.test(form.password);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    await login({ email: form.email, password: form.password });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.header}>Iniciar sesión</p>
        <form onSubmit={handleSubmit} className={styles.form}>
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

          <button type='submit' disabled={disabled}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
