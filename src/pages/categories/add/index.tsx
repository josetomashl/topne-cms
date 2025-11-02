import { Input } from '@/components/Input';
import type { CreateCategoryDto } from '@/dtos/Category';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createCategory } from '@/store/modules/categories';
import { pushNotification } from '@/store/modules/root';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export function AddCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.categories);

  const [form, setForm] = useState<CreateCategoryDto>({
    name: '',
    description: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(createCategory(form)).unwrap();

    if (res) {
      dispatch(pushNotification({ type: 'success', message: 'Categoría creada con éxito.' }));
      navigate('/categories');
    }
  };

  return (
    <>
      <p className={styles.something}>Create category page</p>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nombre'
          value={form.name}
          onChange={(val) => setForm({ ...form, name: val })}
          disabled={loading}
          required
        />
        <Input
          label='Descripción (opcional)'
          value={form.description || ''}
          onChange={(val) => setForm({ ...form, description: val })}
          disabled={loading}
        />
        <button type='reset'>Cancelar</button>
        <button type='submit' disabled={loading || !form.name}>
          Crear
        </button>
      </form>
    </>
  );
}
