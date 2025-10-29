import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { useTitle } from '@/hooks/useTitle';
import { REGEX } from '@/plugins/data/regex';
import { type FormEvent, useState } from 'react';
import styles from './styles.module.scss';

export function RegisterPage() {
  useTitle('Register page');
  const { isLoading, register } = useAuth();

  const [form, setForm] = useState<{
    name: string;
    surname: string;
    email: string;
    password: string;
    errors: string[];
  }>({
    name: '',
    surname: '',
    email: '',
    password: '',
    errors: []
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({ name: form.name, surname: form.surname, email: form.email, password: form.password });
  };

  return (
    <div>
      <p className={styles.something}>Login page</p>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nombre'
          value={form.name}
          onChange={(value, valid) => {
            setForm((prev) => ({
              ...prev,
              name: value,
              errors: !valid ? [...prev.errors, 'name'] : prev.errors.filter((e) => e !== 'name')
            }));
          }}
          errorMessage='Please enter a valid name'
          required
        />
        <Input
          label='Apellidos'
          value={form.surname}
          onChange={(value, valid) => {
            setForm((prev) => ({
              ...prev,
              surname: value,
              errors: !valid ? [...prev.errors, 'surname'] : prev.errors.filter((e) => e !== 'surname')
            }));
          }}
          errorMessage='Please enter a valid surname'
          required
        />
        <Input
          type='email'
          label='Email'
          value={form.email}
          onChange={(value, valid) => {
            setForm((prev) => ({
              ...prev,
              email: value,
              errors: !valid ? [...prev.errors, 'email'] : prev.errors.filter((e) => e !== 'email')
            }));
          }}
          regExp={REGEX.email}
          errorMessage='Please enter a valid email address'
          required
        />
        <Input
          type='password'
          value={form.password}
          label='Password'
          onChange={(value, valid) => {
            setForm((prev) => ({
              ...prev,
              password: value,
              errors: !valid ? [...prev.errors, 'password'] : prev.errors.filter((e) => e !== 'password')
            }));
          }}
          required
          regExp={REGEX.password}
          errorMessage='Password must be at least 8 characters long and contain at least one number, one uppercase letter and one lowercase letter'
        />

        <button type='submit' disabled={isLoading || form.errors.length > 0}>
          Login
        </button>
      </form>
    </div>
  );
}
